exports.handleError = (err) => {
    let errors = {
        email: '',
        password: '',
        username: '',
        displayName: ''
    }

    if(err.message ==='A password is required'){
        errors.email = 'Please enter a password.'
    }
    
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }

    if(err.code === 11000){
        errors.err = `That ${Object.keys(err.keyPattern)} is already taken`
    }

    return errors
}