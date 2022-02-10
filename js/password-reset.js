var url = 'http://mm2go.us-east-1.elasticbeanstalk.com'
var recovery = new Vue({
    el: "#password-recovery",
    data: {
        password: '',
        confirm_password: ''
    },
    computed : {
        validatePassword : function(){
            if(this.password === '')
                return null
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(this.password)
        },
        validateConfirmPassword : function(){
            if(this.confirm_password === '')
                return null
            return this.password === this.confirm_password
        }
    },
    methods : {
        resetPassword : function(){
            var json = {
                administrator_password : this.password
            }
            
            var token = 'Bearer ' + window.location.search.substring(1, window.location.search.length)

            // var header = {
            //     'Content-Type': 'application/json',
            //     'Authorization': token
            // }

            axios.put(url + "/dashboard/resetpassword", json, { headers : {
                'Content-Type': 'application/json',
                'Authorization': token
            }}).then((response) => {
                // window.location.href = "./login.html"
                console.log(response.data)
            })
        }
    }
    
})