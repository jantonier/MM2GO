var url = 'http://mm2go.us-east-1.elasticbeanstalk.com'

// Vue instance to allow BootstrapVue components in header. 
var header = new Vue({
    el: "#header",
    methods : {
        redirect : function(){
            // If no admin is logged in, redirect to 
            if(localStorage.getItem("session-token") === null)
                window.location.href = "./pages/login.html"
            else 
                window.location.href = "./pages/dashboard.html"
        }
    }
})

var subscribe = new Vue({
    el: "#subscribes",
    data: {
        name: '',
        last_name: '',
        email: ''
    },
    computed: {
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
        validateEmail : function(){
            if(this.email === '')
                return null
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
        }
    },
    methods: {
        subscribeUser : function(){
            var json = {
                client_firstname: document.getElementById("name").value,
                client_lastname: document.getElementById("last_name").value,
                client_email : document.getElementById("email").value
            }

            console.log(json)

            axios.post(url + "/registerclient", json).then((response) =>
                console.log(response.data)
            )
        }
    }
})
// Vue instance manages combo container and subscribe container. 
var combos = new Vue({
    el: "#combos",
    data : {
        items: [],
        stations: [],
        stickyHeader: true, 
    },
    beforeMount : function() {
        this.getCriolloCombos()
    },
    methods : {
        redirectToOrder : function(){
            window.location.href = "./pages/ordering-system.html"
        },
        
        getCriolloCombos : function(){
            axios.get(url + "/menu/1/combo").then((response) => {
                console.log(response.data)
                var array = response.data
                var combo_name = ''

                for(var i = 0; i < array.length; i++){
                    if(array[i].num_of_sides === 1)
                        combo_name = array[i].combo_name + " + " + array[i].num_of_sides + " complemento"
                    else
                        combo_name = array[i].combo_name + " + " + array[i].num_of_sides + " complementos"        
                    this.items.push(
                    {
                        combo: combo_name,
                        precio: "$" +  parseFloat(array[i].combo_price).toFixed(2).toString()
                    }) 
                }
            })
        }
    }
})