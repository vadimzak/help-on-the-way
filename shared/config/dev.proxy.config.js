module.exports = {
        '/server': {
          target: 'http://server.dev.dorldor.org.il',
          changeOrigin: true,
          pathRewrite: {
            '^/server': ''
          }      
        }  
}