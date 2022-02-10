var url = 'http://mm2go.us-east-1.elasticbeanstalk.com'
var register = new Vue({
    el: "#register",
    data: {
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    },

    computed : {
        validateName : function(){
            if (this.name === '')
                return null
            return /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(this.name) && this.name.length > 1
        },
        validateLastName: function(){
            if (this.last_name === '')
                return null
            return /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(this.last_name) && this.name.length > 1
        },
        validateEmail: function(){
            if(this.email === '')
                return null
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        },
        validatePassword: function(){
            if(this.password === '')
                return null
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(this.password)
        
        }, 
        validateConfirmPassword: function(){
            if(this.confirm_password === '')
                return null
            return this.password === this.confirm_password
        }
    },
    methods : {
        // verify edge cases 
        registerAdmin: function(){
            var json = {
                administrator_firstname : this.name,
                administrator_lastname: this.last_name,
                administrator_email : this.email,
                administrator_password: this.password
            }

            axios.post(url + "/dashboard/administrator", json).then((response) =>
                {
                    console.log(response.data)
                    window.location.href = "./login.html"
                }
            )
            
        },
        isUser : function(user){
            var users = this.$data.users

            for(var i = 0; i < user.length; i++){
                if(user === users[i].email)
                    return true
            }

            return false
        }
    }
})

document.addEventListener('keyup',(e) => {
    if(e.code === "Enter")
        this.register.validateRegistration()
})
