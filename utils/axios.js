
import Vue from 'vue'
import axios from 'axios'
import {Indicator} from 'mint-ui'
Vue.component(Indicator)
let CancelToken = axios.CancelToken //取消请求
let cancelFlag = true
axios.defaults.withCredentials = true
// axios.defaults.baseURL = "https://easy-mock.com/mock/5b7bc3d450a6182006a1986e"
axios.interceptors.request.use(config => {
    //设置默认请求头
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    config.timeout = 20000 // 超时设置
    let cancelGroupName
    if (config.method === 'post') {
        if (config.data && config.data.cancelGroupName) { // post请求ajax取消函数配置
            cancelGroupName = config.data.cancelGroupName
        }
        // config.data = qs.stringify(config.data)
    } else {
        if (config.params && config.params.cancelGroupName) { // get请求ajax取消函数配置
            cancelGroupName = config.params.cancelGroupName
        }
    }
    if (cancelGroupName) {
        if (axios[cancelGroupName] && axios[cancelGroupName].cancel) {
            axios[cancelGroupName].cancel()
        }
        config.cancelToken = new CancelToken(c => {
            axios[cancelGroupName] = {}
            axios[cancelGroupName].cancel = c
        })
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(config => {
    Indicator.close()
    return config
}, error => {
    Indicator.close()
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
            error.message = `连接错误${error.response.status}`
        }
      } else {
        error.message = "连接到服务器失败"
      }
    return Promise.reject(error.message)
})

export default axios