import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
    console.log(config)
    return config
}, error => {
    return Promise.reject(error)
})

export default axios