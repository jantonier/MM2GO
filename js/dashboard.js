$('.modal_location').hide();
$(document).on('keydown', function(event) {
    if (event.key == "Escape") {
     $('.modal_location').fadeOut(300);
    }
});
$( ".close-modal" ).click(function() {
    $('.modal_location').fadeOut(300);
});


var menu_editing = new Vue({
    el: "#menu-editing",
    data: {
        stations: ["Criolla", "Pastas", "Burritos & Wraps",
                   "Sandwiches", "Frituras", "Ensaladas", "Bebidas"],
        
        menu : {  
                "Criolla" : {
                             combos: [{combo_name: "Carne Guisada", complements: 2, price: 4.99},
                                      {combo_name: "Lasagna", complements: 2, price: 4.99},
                                      {combo_name: "Masitas de Mero", complements: 2, price: 4.50},
                                      {combo_name: "Biftec", complements: 2, price: 5.25},
                                      {combo_name: "Carne Frita", complements: 2, price: 4.99}],
                            sides: [{side_name: "Arroz Blanco", price: 1.39}, 
                                    {side_name:"Habichuelas Blancas", price: 1.39},
                                    {side_name: "Coditos", price: 1.39},
                                    {side_name: "Papas Fritas", price: 1.39}],

                             items: [{item_name: "Pollo Frito", price: 2.99},
                                     {item_name: "Pastelón", price: 2.99},
                                     {item_name: "Chuletas", price: 2.99},
                                     {item_name: "Lomo de Cerdo", price: 3.59}]
                          },
                "Pastas" : {
                             combos: [{combo_name: "Pasta Carbonara", complements: 1, price: 6.50},
                                      {combo_name: "Fettucini Alfredo", complements: 1, price: 4.99},
                                      {combo_name: "Spaghetti con Carne Molida", complements: 1, price: 4.50},
                                      {combo_name: "Ravioli Five Cheese", complements: 1, price: 6.00},
                                      {combo_name: "Gnocchi", complements: 2, price: 3.99}],
                             sides: [{side_name: "Pan con ajo", price: 1.50},
                                     {side_name: "Pan", price: 1.00}],
                             items: []
                          },
                "Burritos & Wraps" : {
                             combos: [{combo_name: "Burrito de Pollo con Plantilla de Espinaca", complements: 0, price: 4.99},
                                      {combo_name: "Burrito de Carne con Plantilla Regular", complements: 0, price: 4.99},
                                      {combo_name: "Quesadillas de Pollo", complements: 0, price: 4.50},
                                      {combo_name: "Wrap de Pollo", complements: 0, price: 5.25},
                                      {combo_name: "Wrap Vegetariano", complements: 0, price: 4.99}],
                             sides: [{side_name: "Papas Fritas", price: 2.00}, 
                                     {side_name: "Sopa de Queso & Brocolli", price: 2.00}],
                             items: []
                          },
                "Sandwiches" : {
                             combos: [{combo_name: "Sandwich Cubano", complements: 1, price: 4.99},
                                      {combo_name: "Sandwich Jamón & Queso", complements: 1, price: 4.99},
                                      {combo_name: "Sandwich de Pollo", complements: 1, price: 4.50},
                                      {combo_name: "Cheeseburger", complements: 1, price: 5.25}],
                             sides: [{side_name: "Papas Fritas", price: 2.00},
                                     {side_name: "Tostones", price: 2.00}],
                             items: [{item_name: "Sandwich Cubano", price: 3.00},
                                     {item_name: "Sandwich Jamón & Queso", price: 3.00},
                                     {item_name: "Sandwich de Pollo", price: 3.00},
                                     {item_name: "Cheeseburger", price: 3.00}]
                          },  
                "Frituras" : {
                             combos: [],
                             sides: [{side_name: "Papas Fritas", price: 2.00}],
                             items: [{item_name: "Bacalaito Frito", price: 2.00},
                                     {item_name: "Alcapurrias", price: 2.00},
                                     {item_name: "Empanadillas de Pizza", price: 2.00},
                                     {item_name: "Pastelillo de Carne", price: 2.00}]
                          },
                "Ensaladas" : {
                             combos: [{combo_name: "Ensalada Caesar", complements: 0, price: 4.99},
                                      {combo_name: "Insalata Caprese", complements: 0, price: 4.99},
                                      {combo_name: "Crea Tu Propia Ensalada", complements: 4, price: 4.50}],
                             sides:  [{side_name: "Sopa de Queso & Brocolli", price: 2.00}],
                             items: [{item_name: "Lechuga Romana", price: 1.00},
                                     {item_name: "Espinaca" , price: 1.00},
                                     {item_name: "Croutones", price: 0.25 },
                                     {item_name: "Pollo a la Parrilla", price: 3.00},
                                     {item_name: "Huevo Hervido", price: 0.25},
                                     {item_name: "Zanahoria", price: 0.25},
                                     {item_name: "Aderezo Caesar", price: 0.25},
                                     {item_name: "Aderezo French", price: 0.25},
                                    ]
                          },
                "Bebidas" : {
                             items: [{item_name: "Agua", price: 1.00},
                                     {item_name: "Coca Cola", price: 1.00},
                                     {item_name: "Sprite", price: 1.00},
                                     {item_name: "Iced Tea", price: 1.00},
                                     {item_name: "Café", price: 1.00}]
                          },
        },
        hasContent: false,
        selectedStation: "Criolla",
        selectedMethod: "Combo",
        getStation : function(){
            return this.selectedStation
        },
        getMethod: function(){
            return this.selectedMethod
        },
        getStationCombos: function(){
            return this.$data.menu[this.getStation()].combos
        },
        getStationItems: function(){
            return this.$data.menu[this.getStation()].items
        },
        getStationSides: function(){
            return this.$data.menu[this.getStation()].sides
        }
    },
        
    mounted() {
        this.displayCombos()
    },
    methods : {
        onChangeRadio: function(event){
            this.selectedMethod = event.target.value
            this.changeScreen()
        },
        onChangeStation: function(event){
            this.selectedStation = event.target.value
            this.changeScreen()
        },
        
        changeScreen: function(){
          if(this.selectedMethod === "Combo"){
              this.displayCombos()
          }  
          else{
              this.displayItems()
          }
        },
        displayCombos: function(){
            if(this.hasContent)
                document.getElementById("food-list").remove()
                
                // Show Combos 
            
                var combos  = this.getStationCombos()
                var ul = document.createElement("ul")
                ul.setAttribute("id", "food-list")
                document.getElementById("menu-container").appendChild(ul)
           
               
                for(var i = 0; i < combos.length; i++){
                
                    var li = document.createElement("li");
                    ul.appendChild(li)
                   
                    var item = combos[i]
                    if(item["complements"] === 0){
                        li.innerHTML = '<p class="menu-item-' + i + '" >' + item["combo_name"] + " - $" + item["price"].toFixed(2) + "</p> " 
                    }
                    else{
                        li.innerHTML =  '<p class="menu-item-' + i + '" >' + item["combo_name"] + " + " + item["complements"] + 
                                    " complementos - $" + item["price"].toFixed(2) + " </p> "
                    }
                    // Add Edit & Remove Buttons
                    var edit_button = document.createElement("button")
                    edit_button.innerHTML = "Editar"
                    edit_button.setAttribute("class", i)
                    edit_button.addEventListener("click", function(){
                       var myClass = $(this).attr("class");
                       $('.edited-item').empty().append($('.menu-item-' + myClass ).text());                               
                  
                       $('.modal_location').fadeIn(300);
                    })

                    var remove_button = document.createElement("button")
                    remove_button.innerHTML = "Remover"
                    remove_button.setAttribute("id", "remove-button")
                    remove_button.addEventListener("click", function(){
                        
                    })
                    li.appendChild(edit_button)
                    li.appendChild(remove_button)
                   
                }
                // Add Add Button
                var add_combo_button = document.createElement("button")
             
                add_combo_button.innerHTML = "Añadir Combo"
                ul.appendChild(add_combo_button)
                add_combo_button.addEventListener("click", function(){
                    $('.modal_location').fadeIn(300);
                    $('.edited-item').empty();  
                })

                // Add Space + Create Division
                var h4 = document.createElement("h4")
                var text = document.createTextNode("Acompañantes")
                h4.appendChild(text)
                document.getElementById("food-list").append(h4)
                // Show Sides
                var sides = this.getStationSides()
                for(var i = 0; i < sides.length; i++){
                    var li = document.createElement("li");
                    ul.appendChild(li)
                    li.innerHTML =  '<p class="menu-item2-' + i + '" >'  +  sides[i].side_name + " - $" + sides[i].price.toFixed(2) + "</p>"
                   
                    var edit_button = document.createElement("button")
                    edit_button.innerHTML = "Editar"
                    edit_button.setAttribute("id", "edit-button")
                    edit_button.setAttribute("class", i )
                    edit_button.addEventListener("click", function(){
                        var myClass = $(this).attr("class");
                       $('.edited-item').empty().append($('.menu-item2-' + myClass ).text());                               
                       $('.modal_location').fadeIn(300);
                    })

                    var remove_button = document.createElement("button")
                    remove_button.innerHTML = "Remover"
                    remove_button.setAttribute("id", "remove-button")
                    remove_button.addEventListener("click", function(){
                        alert("Remover")
                    })
                    li.appendChild(edit_button)
                    li.appendChild(remove_button)
                }
                
                var add_side_button = document.createElement("button")
                add_side_button.innerHTML = "Añadir Acompañante"
                ul.appendChild(add_side_button)
                this.hasContent = true
                add_side_button.addEventListener("click", function(){
                    $('.modal_location').fadeIn(300);
                    $('.edited-item').empty();  
                })
              
        },

        displayItems: function (){
            if(this.hasContent)
                document.getElementById("food-list").remove()
                
            var items  = this.getStationItems()
            var ul = document.createElement("ul")
            ul.setAttribute("id", "food-list")
            document.getElementById("menu-container").appendChild(ul)
    
            for(var i = 0; i < items.length; i++){
                var li = document.createElement("li");
                ul.appendChild(li)
                var item = items[i]
                li.innerHTML = "<p>" + item["item_name"] + " - $" + item["price"].toFixed(2) + "</p>"
                var edit_button = document.createElement("button")
                edit_button.innerHTML = "Editar"
                var remove_button = document.createElement("button")
                remove_button.innerHTML = "Remover"

                li.appendChild(edit_button)
                li.appendChild(remove_button)
            }

            var add_item_button = document.createElement("button")
            add_item_button.innerHTML = "Añadir Artículo"
            ul.appendChild(add_item_button)
        }
    }
});

var report_generator = new Vue({
    el: "#report",
    data: {
        written_report_data: [{date: new Date(2020,3,1), numOfOrders: 20, total: 100.50},
                              {date: new Date(2020,3,2), numOfOrders: 12, total: 82.30},
                              {date: new Date(2020,3,3), numOfOrders: 4, total: 23.49},
                              {date: new Date(2020,3,4), numOfOrders: 44, total: 233.21},
                              {date: new Date(2020,3,5), numOfOrders: 12, total: 72.95},
                              {date: new Date(2020,3,8), numOfOrders: 7, total: 35.63},
                              {date: new Date(2020,3,9), numOfOrders: 45, total: 192.35},
                              {date: new Date(2020,3,10), numOfOrders: 25, total: 101.23},
                              {date: new Date(2020,3,11), numOfOrders: 33, total: 140.60},
                              {date: new Date(2020,3,12), numOfOrders: 24, total: 110.23},
                              {date: new Date(2020,3,15), numOfOrders: 43, total: 200.25},
                              {date: new Date(2020,3,16), numOfOrders: 54, total: 235.50},
                              {date: new Date(2020,3,17), numOfOrders: 11, total: 52.50},
                              {date: new Date(2020,3,18), numOfOrders: 27, total: 124},
                              {date: new Date(2020,3,19), numOfOrders: 29, total: 122.21},
                              {date: new Date(2020,3,22), numOfOrders: 22, total: 103.76},
                              {date: new Date(2020,3,23), numOfOrders: 89, total: 100},
                              {date: new Date(2020,3,24), numOfOrders: 13, total: 60},
                              {date: new Date(2020,3,25), numOfOrders: 44, total: 190},
                              {date: new Date(2020,3,26), numOfOrders: 23, total: 91.50},
                              {date: new Date(2020,3,29), numOfOrders: 8, total: 44.50},
                              {date: new Date(2020,3,30), numOfOrders: 13, total: 85}
                            ]
    }

});

var orders = new Vue({
    el: "#orders",
    data: {
        name: "Ver Órdenes",
        buildings: ['Chardón', 'Celis', 'Stefani', 'Piñero', 
                    'Ingeniería Industrial', 'Física', 'Sánchez Hidalgo',
                    'Enfermería', 'Administración de Empresas',
                    'Ingeniería Química', 'Ingeniería Civil', 'Lucchetti'],
        cashOrders: [],
        athOrders : [],
        orders: 
            [
                { client_firstname: "Carlos", 
                  client_lastname: "Lopez", 
                  phone_number: 7872425932, 
                  order: {
                    combos : [{combo_name: "Lasagna",
                    sides: ["Arroz y Habichuelas","Ensalada Verde"],
                    drink: "Agua"
                  },
                  {
                    combo_name: "Biftec Encebollado",
                    sides: ["Ensalada"],
                    drink: "Agua"
                  }],
                    items : ["Coca-Cola","Amarillos","Pollo frito"] 
                },
                  payment_method: "Cash",
                  location: "Lucchetti"
                 },
                 //-----------//
                 { client_firstname: "Pedro", 
                 client_lastname: "Rivera", 
                 phone_number: 1234567890, 
                 order: {
                   combos : [{combo_name: "Chuleta",
                   sides: ["Arroz y Habichuelas"],
                   drink: "Coca-Cola"
                 }],
                   items : ["Tostones"] 
               },
                 payment_method: "Cash",
                 location: "Stefani"
                },

                //----------//
                { client_firstname: "Marta", 
                client_lastname: "Perez", 
                phone_number: 3123422932, 
                order: {
                  combos : [{combo_name: "Masitas de Mero",
                  sides: ["Arroz y Habichuelas","Coditos"],
                  drink: "Agua"
                },
                {
                  combo_name: "Burrito de Pollo",
                  sides: [],
                  drink: "Agua"
                }],
                  items : [] 
              },
                payment_method: "Cash",
                location: "Lucchetti"
               },

               //-----------//
               { client_firstname: "Keila", 
               client_lastname: "Barbosa", 
               phone_number: 9897654132, 
               order: {
                 combos : [{combo_name: "Ensalada Caesar",
                 sides: ["Croutones","Queso Parmesano"],
                 drink: "Agua"
                 }],
                 items : [] 
             },
               payment_method: "ATH Móvil",
               location: "Ingeniería Química"
              },

              //--------------------//
              { client_firstname: "Edgar", 
              client_lastname: "Calvo", 
              phone_number: 7872123452, 
              order: {
                combos : [{combo_name: "Quesadillas de Pollo",
                sides: ["Pico de Gallo","Sour Cream"],
                drink: "Agua"
              },
              {
                combo_name: "Honey BBQ Wings",
                sides: ["Mozzarella Sticks"],
                drink: "Agua"
              }],
                items : [] 
            },
              payment_method: "ATH Móvil",
              location: "Sánchez Hidalgo"
             },

              //--------------------//
              { client_firstname: "Luis", 
              client_lastname: "Rodríguez", 
              phone_number: 9394256831, 
              order: {
                combos : [{combo_name: "Hamburger de Pollo",
                sides: ["Papas Fritas"],
                drink: "Coca-Cola"
              },
              {
                combo_name: "Burger Sliders",
                sides: ["Onion Rings"],
                drink: "Agua"
              }],
                items : [] 
            },
              payment_method: "Cash",
              location: "Ingeniería Civil"
             },
             //--------------------//
             { client_firstname: "Rosa", 
             client_lastname: "Hernández", 
             phone_number: 7872998212, 
             order: {
               combos : [{combo_name: "Cielito Lindo",
               sides: ["Tostitos"],
               drink: "Pepsi"
             }],
               items : [] 
           },
             payment_method: "Cash",
             location: "Piñero"
            },
            //--------------------//
            { client_firstname: "Héctor", 
            client_lastname: "Pomales", 
            phone_number: 8234529104, 
            order: {
              combos : [{combo_name: "Pollo a la Naranja",
              sides: ["Arroz Frito", "Tostones al Ajillo"],
              drink: "Agua"
            }],
              items : ["Egg Roll"] 
          },
            payment_method: "ATH Móvil",
            location: "Ingeniería Industrial"
           }]
    },

    mounted : function(){
        var orders = this.$data.orders

        var cash = []
        var ath = []

        for(var i = 0; i < orders.length; i++){
            if(orders[i].payment_method === "Cash")
                cash.push(orders[i])
            else if(orders[i].payment_method === "ATH Móvil")
                ath.push(orders[i])
        }

        console.log(cash)
        console.log(ath)

        this.cashOrders = cash
        this.athOrders = ath
    }, 

});

var email_service = new Vue({
    el: "#email",
    data: {
        subscribers: ["whatever@aol.com","lola.lapotra12@hotmail.com","papayaman-2@gmail.com",
                      "pepe_el_nene@live.com","idontknow@yahoo.com"],
    },

    methods: {
        sendEmail : function(){
            //alert("Email Sent!")
            window.open("mailto:" + this.subscribers)
        }
    }
});

var admin_privileges = new Vue({
    el: "#admin",
    data: {
        admins: [{first_name: "Carlos", last_name: "López", role: "Head Administrator"},
                 {first_name: "Lisa", last_name: "Ramirez", role: "Administrator"},
                 {first_name: "Jimmy", last_name: "Torres", role: "Administrator"},
               ]
    },

    methods:{
        addAdministrator : function(){
            if(localStorage.getItem("role") === "1"){
            var new_admin = {
                first_name: "Lorenzo",
                last_name: "Díaz",
                role: "Administrador"
            }

            if(!this.$data.admins.includes(new_admin))
                this.$data.admins.push(new_admin)
        }

        else{
            alert("No tienes los permiso para modificar privilegios administrativos.")
        }
    
    },
        removeAdministrator : function()
        {
            if(localStorage.getItem("role") === "1"){
            if(this.$data.admins[this.$data.admins.length-1].role === "Head Administrator")
                alert("No puedes eliminar al administrador principal.")
            else
                this.$data.admins.pop()
            }

            else{
                alert("No tienes los permiso para modificar privilegios administrativos.")
            }
        }
    }

});

// Logout

function logout(){
    if (confirm("Quieres salir del sistema?")){
        localStorage.setItem("log", false)
        localStorage.setItem("role", null)
        window.location.href = "./../index.html"
    }
    else
        return;
}

// Default hiding of containers

$('.reportes').hide();
$('.ver-ordenes').hide();
$('.enviar-email').hide();
$('.administradores').hide();




$(document).ready(function() {
    $(".dashboard-ul li").click(function () {
       $(".dashboard-ul li").removeClass("active");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).addClass("active"); 


        var editajeDeMenu = $('.dashboard-ul li:nth-child(1)').hasClass('active')
        if (editajeDeMenu) {
            $('.editaje-de-menu').show();
            $('.ver-ordenes').hide();
            $('.reportes').hide();
            $('.enviar-email').hide();
            $('.administradores').hide();
        }


        var verOrdenes= $('.dashboard-ul li:nth-child(2)').hasClass('active')
        if (verOrdenes) {
           
            $('.editaje-de-menu').hide();
            $('.ver-ordenes').show();
            $('.reportes').hide();
            $('.enviar-email').hide();
            $('.administradores').hide();
        }

        var Reportes = $('.dashboard-ul li:nth-child(3)').hasClass('active')
        if (Reportes) {
            $('.editaje-de-menu').hide();
            $('.ver-ordenes').hide();
            $('.reportes').show();
            $('.enviar-email').hide();
            $('.administradores').hide();
            
        }

        var enviarEmail = $('.dashboard-ul li:nth-child(4)').hasClass('active')
        if (enviarEmail) {
           
            $('.editaje-de-menu').hide();
            $('.ver-ordenes').hide();
            $('.reportes').hide();
            $('.enviar-email').show();
            $('.administradores').hide();
            
        }


        var Administradores = $('.dashboard-ul li:nth-child(5)').hasClass('active')
        if (Administradores) {
           
            $('.editaje-de-menu').hide();
            $('.ver-ordenes').hide();
            $('.reportes').hide(); 
            $('.enviar-email').hide();
            $('.administradores').show();
            
        }
    })});


    // $(document).ready(function(){
    //     $(".w3-button").click(function(){
    //       $(".tabs-container").animate({
            
    //         height: '400px'
            
    //       });
    //     });
    //   });
