var register = new Vue({
    el: "#register",
    data: {
        users: [
            {email: "clopezzayas15@gmail.com", password: "Capstone2020!", role: 1},
            {email: "lisa.ramirez@upr.edu", password: "Latorre7!", role: 0 },
            {email: "jimmy.torres@upr.edu", password: "camelCase123$", role: 0}
        ]
    },
    methods:{
        validateRegistration: function(){
            var name = document.getElementById("name").value
            var last_name = document.getElementById("last-name").value
            var email = document.getElementById("email").value
            var pass = document.getElementById("password").value
            var conf_pass = document.getElementById("confirm-password").value

            var name_regex = /[^a-zA-Z]+/
            var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/

            // Test #1 - Test Empty Fields 
            if(name === "" || last_name === "" || email === "" || pass === "" || conf_pass === "" || /\s+/.test(name) || /\s+/.test(last_name) || /\s+/.test(email) || /\s+/.test(pass) || /\s+/.test(conf_pass)){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Invalida. Favor de llenar todos los campos."
            }

            // Test #2 - Name / Last Name Fields
            else if(name_regex.test(name) || name_regex.test(last_name)){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Inválida. Nombre y apellidos deben ser estrictamente alfabéticos."
            }

            // Test #3 - Email Field
            else if(!email_regex.test(email)){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Inválida. Ingrese un email válido."
            }

            // Test #4 - Password Matching
            else if(pass !== conf_pass){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Inválida. Contraseñas ingresadas no son iguales."
            }

            // Test #5 - Password Strength 
            else if(!password_regex.test(pass)){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Inválida.<br> \
                                                              Contraseñas deben seguir las siguientes reglas:<br> \
                                                              1. Mínimo 8 caracteres.<br> \
                                                              2. Máximo 16 caracteres.<br>\n \
                                                              3. Al menos una letra minúscula.<br>\n \
                                                              4. Al menos una letra mayúscula.<br>\n \
                                                              5. Al menos un dígito.<br>\n \
                                                              6. Al menos un caracter especial." 
            }

            // Test #6 - Validate if email already exists
            else if(this.isUser(email)){
                document.getElementById("error").style.visibility = "visible";
                document.getElementById("error").innerHTML = "Registración Inválida. Ya existe un administrador registrado con ese email."
            }

            // All is valid, register!
            else{
                document.getElementById("error").style.visibility = "none";
                alert("Registración Válida!")
                document.getElementById("name").value = ""
                document.getElementById("last-name").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("confirm-password").value = ""
                window.href.location = "./../index.html"
            }
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
            /* Cases: Name and Last Name should not have digits or special characters
                        Email should follow example@something.whatever pattern 
                */

            // Name test:
            // var name_regex = new RegExp(/);
            // else if(name_regex.test(name) || name_regex.test(last_name)){
            //     document.getElementById("error").style.visibility = "visible";
            //     document.getElementById("error").innerHTML = "Registración Invalida. Nombre y apellido no deben contener dígitos, espacios,\
            //                                                 ni caracteres especiales."
            // }
            
            // Email test:

            //var email_regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
            
            // Test #1 - Validate that all fields are filled
            //     if(name === "" && last_name === "" && email === "" && pass === "" && conf_pass === ""){
            //         document.getElementById("error").style.visibility = "visible";
            //         document.getElementById("error").innerHTML = "Registración Invalida. Favor de llenar todos los campos solicitados."
            //     }
            //     else if(pass !== conf_pass){
            //         document.getElementById("error").style.visibility = "visible";
            //         document.getElementById("error").innerHTML = "Registración Inválida. Las contraseñas ingresadas no son iguales."
            //     }
            // }
        //}

document.addEventListener('keyup',(e) => {
    if(e.code === "Enter")
        this.register.validateRegistration()
})
