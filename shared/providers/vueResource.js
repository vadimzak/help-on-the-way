import VueResource from 'vue-resource'

function install(Vue) {
    Vue.use(VueResource)
    Vue.http.interceptors.push((request, next) => {
        request.credentials = true
        next()
      })
    Vue.http.headers.common['Access-Control-Allow-Credentials'] = 'include'
    Vue.http.headers.common['Access-Control-Allow-Origin'] = process.env.SERVER_BASE_URL
        
}

export default {
    install,
}