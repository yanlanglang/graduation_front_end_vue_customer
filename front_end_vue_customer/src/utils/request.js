import axios from 'axios';
import {
  Message
} from 'element-ui'

//创建一个axios实例
const instance = axios.create({
  //在这里就可以统一操作服务器的域名
  //baseURL会在发送请求的时候拼接在url参数前面
  baseURL: 'http://localhost:8000/yl/',
  timeout: 5000
});

//请求拦截
//所有的网络请求(即当前request.js中定义的请求方法)都会先走这个方法
instance.interceptors.request.use(
  config => {
    // do something before request is sent
    //config.headers.token = localStorage.getItem('token')

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
);

//响应拦截
//服务器返回数据之后，都会先执行此方法
//此处可以根据服务器的返回状态码做出相应的数据
instance.interceptors.response.use(
  response => {
    const res = response.data
    //console.log(res);

    // if the custom code is not 100, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error check your token or method',
        type: 'error',
        duration: 2 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res;
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
);

export default instance.request


