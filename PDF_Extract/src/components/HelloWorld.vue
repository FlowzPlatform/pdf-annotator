<template>
  <!-- eslint-disable  -->
  <div class="hello">
    <div>
      <form-wizard @on-complete="onComplete"
                   @on-change="onChange"
                   title="Flowz"
                   subtitle="PDF annotation demo">
          <tab-content title="Personal details"
                       icon="ti-user">
              <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
            <!-- <vue-dropzone :awss3="awss3" id="dropzone" :options="dropzoneOptions" v-on:vdropzone-s3-upload-error="s3UploadError" v-on:vdropzone-s3-upload-success="s3UploadSuccess"></vue-dropzone> -->
          </tab-content>
          <tab-content title="Additional Info"
                       icon="ti-settings">
            <Table :columns="columns1" :data="data1"></Table>
          </tab-content>
          <tab-content title="Last step"
                       icon="ti-check">
            Yuhuuu! This seems pretty damn simple
          </tab-content>
      </form-wizard>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
/* eslint-disable */
import Vue from 'vue'
import VueFormWizard from 'vue-form-wizard'
Vue.use(VueFormWizard)
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {FormWizard, TabContent} from 'vue-form-wizard'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
import axios from 'axios'

 
Vue.use(axios)
export default {
  name: 'HelloWorld',
  data () {
    return {
      dropzoneOptions: {
          url: 'http://localhost:8081/upload',
          thumbnailWidth: 150,
          maxFilesize: 5,
          acceptedFiles: ".pdf"
      },
      columns1: [
                    {
                        title: '#',
                        key: 'id'
                    },
                    {
                        title: 'File Name',
                        key: 'fileName'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        icon: 'compose',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, 'View'),
                                // h('Button', {
                                //     props: {
                                //         type: 'error',
                                //         size: 'small'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.remove(params.index)
                                //         }
                                //     }
                                // }, 'Delete')
                            ]);
                        }
                    }
                ],
                data1: []
    }
  },
  methods: {
    onComplete: function(){
      alert('Yay. Done!');
    },
    onChange (previous, next){
      console.log('on change called:', previous,'--', next)
      if (previous == 0 && next == 1){
          let self = this
          axios.get('http://localhost:8081/getFileList')
        .then(function (response) {
          console.log(response.data);
          self.data1 = response.data
          console.log('data1:', self.data1)
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    show(params){
      console.log("show method call:",params.row.fileName)
      let url = 'http://localhost:8081/'+params.row.fileName
      window.open(url,'_blank');
    }
  },
  components: {
    FormWizard,
    TabContent,
    vueDropzone: vue2Dropzone
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
