var login = new Vue({
    el: "#login",
    data:{
        users: [
                {email: "clopezzayas15@gmail.com", password: "Capstone2020!", role: 1},
                {email: "lisa.ramirez@upr.edu", password: "Latorre7!", role: 0 },
                {email: "jimmy.torres@upr.edu", password: "camelCase123$", role: 0}
        ]
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
             /* tests 3 and 4 will be in charge of backend */

            // 3. User is not in the server  -- ELIMINATE and Merge with 4. 
            else if(!this.isAUser(email)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Login Inválido. No existe administrator asociado con el email ingresado."
                return;
            }

            //4. Invalid credentials -- Test both email and password
            else if(password !== this.getUserPassword(email)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Login Inválido. Credenciales Inválidos."
                return;
            }
            
            else{
                document.getElementById("error").style.visibility = "none";
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""

                localStorage.setItem("log", true);
                localStorage.setItem("role", this.getUser(email).role)
                
                window.location.href = "./dashboard.html"
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
    }
})

document.addEventListener('keyup',(e) => {
    if(e.code === "Enter")
        this.login.validateLogin()
})
