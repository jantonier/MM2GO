var url =  'http://mm2go.us-east-1.elasticbeanstalk.com'

var login = new Vue({
    el: "#login",
    data:{
        email: '',
        password: ''
    },

    computed : {
        validateEmail : function(){
            if(this.email === '')
                return null
            else    
                return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        }
    },

    mounted : function(){
        document.getElementById("error").style.visibility = "none";
        document.getElementById("email").value = ""
        document.getElementById("password").value = ""
    },

    methods: {
        validateLogin : function(){  
            var email = document.getElementById("email").value 
            var password = document.getElementById("password").value

            // Tests
            // 1. No empty fields
            if (email === "" || password === ""|| /\s+/.test(email) || /\s+/.test(password)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Login Inválido. No debe dejar campos vacíos."

                return;
            }

            // 2. Invalid email formatting
            else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Login Inválido. Ingrese un email válido."

            }
             // Send credentials to database for validation 
            else{
                var json = {
                    administrator_email: email,
                    administrator_password: password 
                }

                axios.post(url + '/dashboard/login', json).then((response) =>
                {
                    document.getElementById("error").style.display = "none" // todo: fix space after removal
                    localStorage.setItem("session-token", response.data.access_token)
                    localStorage.setItem("role", response.data.role)
                    window.location.href = "./dashboard.html"
                }).catch((error) => {
                    console.log(error)
                    document.getElementById("error").style.visibility = "visible"
                    document.getElementById("error").innerHTML = "Login Inválido. Credenciales Inválidos."
                    });
             }
        },

        isAUser: function(user){
            var users = this.$data.users

            for(var i = 0; i < users.length; i++){
                if(user === users[i].email)
                    return true
            }
            return false 
        },

        getUserPassword: function(user){
            var users = this.$data.users

            for(var i = 0; i < users.length; i++){
                if(user === users[i].email)
                    return users[i].password
            }
            return null
        },
        getUser: function(user){
            var users = this.$data.users

            for(var i = 0; i < users.length; i++){
                if(user === users[i].email)
                    return users[i]
            }

            return null
        },
        recoverPassword: function(){
            // todo input validations and empty fields
            var email = document.getElementById("recovery-email").value

            var json = {
                administrator_email : email
            }

            console.log(json)

            axios.post(url + '/forgotpassword', json).then((response) => {
                console.log(response)
            })
        }
    }})

document.addEventListener('keyup',(e) => {
    if(e.code === "Enter")
        this.login.validateLogin()
})
