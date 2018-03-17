
function install(Vue, options) {
  if (!Vue.http) {
    throw 'Help on the way auth plugin, requires Vue-Resource to be installed first'
  }
  
  const retrieve = async () => {
    const { body: { name, role } } = await Vue.http.get(`${process.env.SERVER_BASE_URL}/me`)
    return { name, role }
  }


  const authContext = {
    getUser: retrieve,
  };
  Object.defineProperty(Vue.prototype, '$authContext', {
    value: Object.freeze(authContext),
    writable: false,
  })
}

export default {
    install,
}
