const store  = require('store-js')
exports.isAuthenticated = () => {
    const isLoggedIn = store.get('user')
    console.log("🚀 ~ file: auth.js ~ line 4 ~ isLoggedIn", isLoggedIn)
    return isLoggedIn
}

exports.unAuthenticate = () => {
    store.set('user', false)
}

exports.authenticate = () => {
    store.set('user', true)
}