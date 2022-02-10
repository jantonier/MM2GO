var url = 'http://mm2go.us-east-1.elasticbeanstalk.com'

var unsubscribe = new Vue({
    el: "#unsubscribe",
    data: {
        email : ''
    },

    computed : {
        validateEmail : function(){
            if(this.email === '')
                return null
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        }
    },

    methods : {
        unsubscribe : function(){
            var json = {
                
            }
        }
    }
})