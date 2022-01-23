// Vue instance to allow BootstrapVue components in header. 
var header = new Vue({
    el: "#header"
})

// Vue instance to allow BootstrapVue component for dashboard button. 
var dashboard_redirect = new Vue({
    el: "#dashboard",
    methods: {
        redirect : function(){

        }
    }
})

// Vue instance to allow BootstrapVue component for dashboard button. 
var ordering_system = new Vue({
    el: "#order",
    methods: {
        redirect : function(){

        }
    }
})

var combos = new Vue({
    el: "#body-container",
    data : {
        items : [
            { combo : "Carne guisada + 2 complementos", precio: "$4.99"},
            { combo : "Lasagna + 2 complementos", precio: "$4.99"},
            { combo : "Masitas de meros + 2 complementos", precio: "$4.99"},
            { combo : "Biftec encebollado + 2 complementos", precio: "$4.99"},
    ]
    },

    
    mounted : function() {
        if(localStorage.getItem("log") === null){
            localStorage.setItem("log", false)
        }
    },
})

var subscribe = new Vue({
    el: "#subscribe-container",
    data:{
        subscribers: ["carlos.lopez26@upr.edu", "maria.ramirez@upr.edu"]
    },

    methods : {
        subscribe : function(){
            var name = document.getElementById("first_name").value
            var last_name = document.getElementById("last_name").value
            var email = document.getElementById("email").value
            var name_regex = /[^a-zA-Z]+/
            var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            // Test #1 - Empty Fields
            if(name === "" || last_name === "" || email === ""){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Subscripción Inválida. Favor de no dejar campos vacíos."
            }

            else if((name_regex.test(name)) || (name_regex.test(last_name))){
                console.log((name_regex.test(name)))
                console.log((name_regex.test(last_name)))
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Subscripción Inválida. Nombre y Apellido solo deben contener caracteres alfabéticos."
            }

            else if(!email_regex.test(email)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Subscripción Inválida. Ingrese un email válido."
            }

            else if(this.isUser(email)){
                document.getElementById("error").style.visibility = "visible"
                document.getElementById("error").innerHTML = "Subscripción Inválida. Usuario con ese email ya está registrado."
                }
            else{
                document.getElementById("error").style.visibility = "none"
                document.getElementById("first_name").value = ""
                document.getElementById("last_name").value = ""
                document.getElementById("email").value = ""
                this.$data.subscribers.push(email)
                alert("Subscripción Válida!")  
            }},

            isUser: function(email){
                var users = this.$data.subscribers
                return users.includes(email)
            }
        }
})

function redirect(){
    var isLogged = localStorage.getItem("log")
        if(isLogged === "true"){
            window.location.href = "./pages/dashboard.html"
        }       
        else{    
            window.location.href = "./pages/login.html"
        }
    }

