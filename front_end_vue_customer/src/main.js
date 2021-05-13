// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入element UI的资源包
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
//CodeMirror
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
//axios
import axios from 'axios';
//vuex
import store from './store/store'


//axios
axios.defaults.withCredentials = true;// 允许跨域携带cookie
Vue.prototype.$axios = axios;

//项目的接口根路径
Vue.prototype.$baseUrl = 'yl';


Vue.use(VueCodeMirror);


//在Vue脚手架中使用elementUI
Vue.use(ElementUI);
Vue.config.productionTip = false;

//Add unimported components to ignore list to prevent warnings.
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

Vue.filter('timeFormat', function (data) {
  //根据形参data，得到特定的时间
  var dt = new Date(data);
  var year = dt.getFullYear();
  var month = (dt.getMonth() + 1).toString().padStart(2, "0");
  var day = dt.getDate().toString().padStart(2, "0");
  var hour = dt.getHours().toString().padStart(2, "0");
  var minute = dt.getMinutes().toString().padStart(2, "0");
  var second = dt.getSeconds().toString().padStart(2, "0");

  //返回模板
  return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
})


Vue.filter('stringSplit', function (data) {

  var length = data.length;
  
  if(length >= 20){
    //截取字符串，防止字符串过长
    var s = data.substring(0,20);
    return s+'...'; 
  }else {
    return data;
  }

})
