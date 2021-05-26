exports.isLoggedIn = async () => {
    const response = await fetch('http://localhost:5000/auth/local/login')
    return response.status === 200 ? true : false;
}