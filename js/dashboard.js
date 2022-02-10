// API base url
var url = 'http://mm2go.us-east-1.elasticbeanstalk.com'

// Vue instance managing all navbar functionalities
var nav_bar  = new Vue({
    el: "#navbar",
    methods : {
        changeTab : function(){
            // Button has nested htmls, this isolates the text. 
            var tab = event.target.childNodes[1].nodeValue;
    
            switch(tab){
                    case "Edición de Menú":
                    document.getElementById("station-editing").style.display = "block"
                    document.getElementById("station-editing-container").style.display = "block"
                    document.getElementById("station-offerings").style.display = "none"
                    document.getElementById("view-orders").style.display = "none"
                    document.getElementById("reports").style.display = "none"
                    document.getElementById("email").style.display = "none"
                    document.getElementById("admin").style.display = "none"

                    // active
                    document.getElementById("nav-item-1").style.backgroundColor = "#d3d9df";

                    // inactive
                    document.getElementById("nav-item-2").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-3").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-4").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-5").style.backgroundColor = "#f7f8f9";

                    break
                case "Ver Órdenes":
                    document.getElementById("station-editing").style.display = "none"
                    document.getElementById("station-offerings").style.display = "none"
                    document.getElementById("view-orders").style.display = "block"
                    document.getElementById("reports").style.display = "none"
                    document.getElementById("email").style.display = "none"
                    document.getElementById("admin").style.display = "none"

                    // active
                    document.getElementById("nav-item-2").style.backgroundColor = "#d3d9df";

                    // inactive
                    document.getElementById("nav-item-1").style.backgroundColor = "#f7f8f9";                 
                    document.getElementById("nav-item-3").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-4").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-5").style.backgroundColor = "#f7f8f9";

                    break
                case "Reportes":
                    document.getElementById("station-editing").style.display = "none"
                    document.getElementById("station-offerings").style.display = "none"
                    document.getElementById("view-orders").style.display = "none"
                    document.getElementById("reports").style.display = "block"
                    document.getElementById("email").style.display = "none"
                    document.getElementById("admin").style.display = "none"

                    // active
                    document.getElementById("nav-item-3").style.backgroundColor =  "#d3d9df";

                    // inactive
                    document.getElementById("nav-item-1").style.backgroundColor = "#f7f8f9"; 
                    document.getElementById("nav-item-2").style.backgroundColor = "#f7f8f9";            
                    document.getElementById("nav-item-4").style.backgroundColor = "#f7f8f9";
                    document.getElementById("nav-item-5").style.backgroundColor = "#f7f8f9";

                    break
                case "Componer Email":
                    document.getElementById("station-editing").style.display = "none"
                    document.getElementById("station-offerings").style.display = "none"
                    document.getElementById("view-orders").style.display = "none"
                    document.getElementById("reports").style.display = "none"
                    document.getElementById("email").style.display = "block"
                    document.getElementById("admin").style.display = "none"

                    // active
                    document.getElementById("nav-item-4").style.backgroundColor =  "#d3d9df";

                    // inactive
                    document.getElementById("nav-item-1").style.backgroundColor = "#f7f8f9";  
                    document.getElementById("nav-item-2").style.backgroundColor = "#f7f8f9";  
                    document.getElementById("nav-item-3").style.backgroundColor = "#f7f8f9";          
                    document.getElementById("nav-item-5").style.backgroundColor = "#f7f8f9";


                    break
                case "Administradores":
                    document.getElementById("station-editing").style.display = "none"
                    document.getElementById("station-offerings").style.display = "none"
                    document.getElementById("view-orders").style.display = "none"
                    document.getElementById("reports").style.display = "none"
                    document.getElementById("email").style.display = "none"
                    document.getElementById("admin").style.display = "block"

                    // active
                    document.getElementById("nav-item-5").style.backgroundColor =  "#d3d9df";

                    // inactive
                    document.getElementById("nav-item-1").style.backgroundColor = "#f7f8f9"; 
                    document.getElementById("nav-item-2").style.backgroundColor = "#f7f8f9";  
                    document.getElementById("nav-item-3").style.backgroundColor = "#f7f8f9";          
                    document.getElementById("nav-item-4").style.backgroundColor = "#f7f8f9";
                    break
                default:
                    break
                    }
        },
        // Logs the user out and redirects the user to the home page. 
        redirectToHome : function(){
            localStorage.clear()
            window.location.href = "./../index.html"
        }
    }
})

// Menu Editing Instances

// Vue instance to manage all functionalities related to editing stations
var stations = new Vue({
    el: "#station-editing",
    data: {
        time_from: '',
        time_to: '',
        delivery_fee: '',
        sales_tax: '',
        station_search: '',
        chosen_station_id: '',
        chosen_station_name: '',
        station_edit_name: '',
        stations: [],
    },

    beforeMount : function(){
        this.getStations()
        this.getGeneralInfo()
    },

    computed : {
        filteredStations : function(){
            // console.log(this.stations)
            return this.$data.stations.filter((station) =>{ 
                return station.station_name.toLowerCase().match(this.station_search.toLowerCase())
            })
        },

        validateTime : function(){
            if(this.time_from === '' || this.time_from <= this.time_to)
                return null
            else
                return false
        },

        validateTax : function(){
            if (/^\d+(\.\d{0,2})?$/.test(this.sales_tax) === true)
                return null
            return false
        },
        validateDeliveryFee : function(){
            if(/^\d+(\.\d{0,2})?$/.test(this.delivery_fee) === true)
                return null
            return false
        },
        isAStation : function(){
            for(var i = 0; i < this.stations; i++){
                console.log(this.stations[i].station_name)
                if(this.stations[i].station_name === this.station_edit_name){
                    return false // inverse return to alter visual state
                }
            }
            return null
        }
    },  

    methods: {
        openStation : function(){
            this.setStation()
            
            document.getElementById("station-editing-container").style.display = "none"
            document.getElementById("station-offerings").style.display = "block"

            station_offerings.getStationCombos()
            station_offerings.method_active = 'combo'
        },

        // Adds a new station to the menu editing view and it is active by default.
        addStation : function(){
   
            var json = {
                is_active: 1,
                station_name : document.getElementById("station-field").value
            }
            
            axios.post(url + "/dashboard/menuediting/stations", json).then((response) => {
                console.log(response)
                this.getStations()});

        },
        // Removes a station permanently from the menu editing view. 
        removeStation: function(){
            var json = {
                station_id: this.chosen_station_id
            }

            console.log(json)
            axios.delete(url + "/dashboard/menuediting/stations", { data : { station_id : this.chosen_station_id } }).then((response) =>
            {
                console.log(response)
                this.getStations()
            }).catch((error) => {
                console.log(error);
            });
        },

        // Fetches all the stations from the database.
        getStations: function(){
            axios.get(url + "/dashboard/menuediting/stations").then((response) => {
                // console.log(response.data)

                var array = response.data

                // Sorts the view in alphabetical order. 
                array.sort((a,b) => (a.station_name > b.station_name) ? 1 : ((b.station_name > a.station_name) ? -1 : 0))
                
                this.stations = array
            });
        },

        // Given the station id, finds the station name associated to it. 
        getStationName : function(id){
            var array = this.$data.stations

            for(var i = 0; i < array.length; i++){
                if(array[i].station_id === id){
                    return array[i].station_name
                }
            }
        },

        // Edits the station name. 
        changeStationName : function(){
            var json = {
                station_id: this.chosen_station_id,
                station_name: document.getElementById("change-station-name-field").value,
                is_active: this.getStationVisibility(this.chosen_station_id)
            }

            // console.log(json)
            axios.put(url + "/dashboard/menuediting/stations", json).then((response) =>
                    {
                        // console.log(response)
                        this.getStations()
                    });
        },
        // Updates instance variables.
        setStation : function(){
            this.chosen_station_id = event.currentTarget.value
            station_offerings.chosen_station_id = this.chosen_station_id 
            this.chosen_station_name = this.getStationName(this.chosen_station_id)
            station_offerings.chosen_station_name = this.chosen_station_name
        },

        // Get the visibility of a station by providing the id associated with it. 
        getStationVisibility : function(id){
            var array = this.$data.stations

            for(var i = 0; i < array.length; i++){
                if(array[i].station_id === id){
                    return array[i].is_active
                }
            }
        },

        // Toggles the visibility of a station. If active, it disables and viceversa. 
        setStationVisibility : function(){
            var id = event.currentTarget.value

            var visibility = this.getStationVisibility(id)

            var active = ''

            if(visibility === '1')
                active = '0'
            else    
                active = '1'

            var json = {
                station_id: id,
                station_name: this.getStationName(id),
                is_active: active
            }

            axios.put(url + "/dashboard/menuediting/stations", json).then((response) =>
            {
                this.getStations()
            })
        },

        // Fetches the general operational data of the delivery system from the database. 
        getGeneralInfo : function(){
            axios.get(url + "/dashboard/general").then((response) =>{
            this.time_from = response.data.operating_hours_from
            this.time_to = response.data.operating_hours_to
            this.sales_tax = (parseFloat(response.data.tax)*100).toFixed(2) // Value is stored fractional in database. Converts to percent.  
            this.delivery_fee = response.data.delivery_fee
             })
        },

        // Updates all the 
        updateGeneralInfo : function(){
            var json =  {
                delivery_fee :  document.getElementById("delivery-fee").value,
                operating_hours_from : document.getElementById("opening-hour").value,
                operating_hours_to : document.getElementById("closing-hour").value,
                tax : document.getElementById("tax").value/100 // User inputs the tax as a percentage, but stored fractionally in the database. 
            }

            axios.put(url + "/dashboard/general",json).then((response) => 
            {
                this.getGeneralInfo()
                alert("Información actualizada.")
            })
        }
    }
})

// Vue instance to manage all functionalities relating to editing stations' content. 
var station_offerings = new Vue({
    el: "#station-offerings",
    data: {
        chosen_combo_name: '', 
        chosen_combo_id: '',
        chosen_item_name: '',
        chosen_item_id: '',
        chosen_station_name : '',
        chosen_station_id: '',
        combo_search: '',
        combo_offerings: [],
        item_offerings: [],
        item_search: '',
        method_active: '',
        type: 'Tipo de Artículo', // auxiliary for item insertions
    },

    computed : {
        filteredCombos: function(){
            return this.combo_offerings.filter((combo) =>{
                return combo.combo_name.toLowerCase().match(this.combo_search.toLowerCase())
            })
        },

        filteredItems: function(){
            return this.item_offerings.filter((item) =>{
                return item.item_name.toLowerCase().match(this.item_search.toLowerCase())
            })
        }
    },
    methods : {
        getStationCombos : function(){
            axios.get(url + "/dashboard/menuediting/" +  this.chosen_station_id + "/combo").then((response) => {
                var array = response.data
                array.sort((a,b) => (a.combo_name > b.combo_name) ? 1 : ((b.combo_name > a.combo_name) ? -1 : 0))
                this.combo_offerings = array
            })
        },
        getStationItems: function(){
            axios.get(url + "/dashboard/menuediting/" +  this.chosen_station_id + "/individual").then((response) => {
                var array = response.data
                array.sort((a,b) => (a.item_name > b.item_name) ? 1 : ((b.item_name > a.item_name) ? -1 : 0))
                this.item_offerings = array
            })
        },
        
        changeToCombo : function(){
            this.method_active = 'combo'
            this.getStationCombos()
        },

        changeToItems : function(){
            this.method_active = 'item'
            this.getStationItems()
        },
        changeToStations : function(){
            document.getElementById("station-offerings").style.display = "none"
            document.getElementById("station-editing-container").style.display = "block"
            this.combo_offerings = []
            this.item_offerings = []
        },

        addCombo : function(){
            var json = {
                combo_name : document.getElementById("combo-name").value,
                num_of_sides : parseInt(document.getElementById("num-of-sides").value),
                combo_price : parseFloat(document.getElementById("price").value),
                is_active : 1,
                num_of_free_toppings : parseInt(document.getElementById("num-of-free-top").value),
                num_of_paid_toppings : parseInt(document.getElementById("num-of-paid-top").value),
                num_of_drinks : parseInt(document.getElementById("num-of-drinks").value),
                description : document.getElementById("description").value
            }
            axios.post(url + "/dashboard/menuediting/" + this.chosen_station_id + "/combo", json).then((response) =>
            {
                console.log(response.data)
                this.getStationCombos()
            })
        },

        editCombo : function(){
            var json = {
                combo_id: this.chosen_combo_id,
                combo_name : document.getElementById("edit-combo-name").value,
                num_of_sides : parseInt(document.getElementById("edit-num-of-sides").value),
                combo_price : parseFloat(document.getElementById("edit-price").value),
                is_active : 1,
                num_of_free_toppings : parseInt(document.getElementById("edit-num-of-free-top").value),
                num_of_paid_toppings : parseInt(document.getElementById("edit-num-of-paid-top").value),
                num_of_drinks : parseInt(document.getElementById("edit-num-of-drinks").value),
                description : document.getElementById("edit-description").value
            }
            console.log(json)
            axios.put(url + "/dashboard/menuediting/" + this.chosen_station_id + "/combo", json).then((response) =>
            {
                console.log(response.data)
                this.getStationCombos()
            })
        },

        removeCombo : function(){
            axios.delete(url + "/dashboard/menuediting/" + this.chosen_station_id + "/combo", { data : { combo_id : this.chosen_combo_id } })
            .then((response) => {
                this.getStationCombos()
            })
        },

        addItem: function(){
            if(this.type === 'Tipo de Artículo'){
                event.preventDefault()
                alert("El artículo no fue añadido.")
            }

            else{
            var json = {
                item_name : document.getElementById("item-name").value,
                item_type : this.getItemTypeString(this.type), // remember to revert
                item_price : parseFloat(document.getElementById("price").value),
                is_active: 1
            }

            console.log(json)
            axios.post(url + "/dashboard/menuediting/" + this.chosen_station_id + "/individual", json).then((response) => {
                this.getStationItems()
                this.type = 'Tipo de Artículo'
            })
        }
        },

        editItem: function(){
            if(this.type === 'Tipo de Artículo'){
                event.preventDefault()
                alert("Editaje de artículo inválido.")
            }

            else{
            var json = {
                item_id : this.chosen_item_id,
                item_name : document.getElementById("edit-item-name").value,
                item_type : this.getItemTypeString(this.type),
                item_price : parseFloat(document.getElementById("edit-price").value),
                is_active: 1,
            }
            console.log(json)
            axios.put(url + "/dashboard/menuediting/" + this.chosen_station_id + "/individual", json).then((response) => {
                this.getStationItems()
                this.type = 'Tipo de Artículo'
            })
        }

        },

        removeItem: function(){
            axios.delete(url + "/dashboard/menuediting/" + this.chosen_station_id + "/individual", { data : { item_id : this.chosen_item_id } })
            .then((response) => {
                this.getStationItems()
            })
        },
        setComboVisibility: function(){
            var id = event.currentTarget.value 
        
            var visibility = this.getComboVisibility(id)

            var active = ''

            if(visibility === '1')
                active = '0'
            else    
                active = '1'
            
            var json = {
                combo_id: id,
                is_active: active
            }

            axios.put(url + "/dashboard/menuediting/visibility/combo", json).then((response) =>
            {
                this.getStationCombos()
            })
        },
        getComboVisibility: function(id){
            var combos = this.combo_offerings

            for(var i = 0; i < combos.length; i++){
                if(combos[i].combo_id === id){
                    return combos[i].is_active
                }
            }
        },

        getComboName: function(id){
            var combos = this.combo_offerings

            for(var i = 0; i < combos.length; i++){
                if(combos[i].combo_id === id)
                    return combos[i].is_active
            }
        },

        setChosenCombo : function(){
            this.chosen_combo_id = event.currentTarget.value
            this.chosen_combo_name = this.getComboNameById(this.chosen_combo_id)
        },

        getComboNameById : function(id){
            for(var i = 0; i < this.combo_offerings.length; i++){
                if(this.combo_offerings[i].combo_id === id)
                    return this.combo_offerings[i].combo_name
            }
        },

        setChosenItem : function(){
            this.chosen_item_id = event.currentTarget.value
            this.chosen_item_name = this.getItemNameById(this.chosen_item_id)
        },

        getItemNameById : function(id){
            for(var i = 0; i < this.item_offerings.length; i++){
                if(this.item_offerings[i].item_id === id)
                    return this.item_offerings[i].item_name
            }
        },

        setItemVisibility : function(){
            var id = event.currentTarget.value 
        
            var visibility = this.getItemVisibility(id)

            var active = ''

            if(visibility === '1')
                active = '0'
            else    
                active = '1'
            
            var json = {
                item_id: id,
                is_active: active
            }

            axios.put(url + "/dashboard/menuediting/visibility/individual", json).then((response) =>
            {
                this.getStationItems()
            })
        },
        getItemVisibility : function(id){
            var items = this.item_offerings

            for(var i = 0; i < items.length; i++){
                if(items[i].item_id === id){
                    return items[i].is_active
                }
            }
        },
        getItemTypeString : function(type){
            switch(type){
                case "Proteína":
                    return "protein"
                case "Acompañante":
                    return "side"
                case "Relleno/Topping Gratuito":
                    return "freetopping"
                case "Relleno/Topping Pagado":
                    return "paidtopping"
                case "Bebida":
                    return "drink"
                default:
                    return null 

            }
        },
        changeType : function(){
            this.type = event.target.innerHTML
            console.log(this.type)
        }
    }
})

// Vue instance to manage queued orders. 
var view_orders = new Vue({
    el: "#view-orders",
    data: { 
            building_search: '',
            buildings: [],
            orders: [],
            fields: ['cash', 'ath_movil'],
            chosen_order: ''
    },
    // Fetches orders and buildings on load. 
    beforeMount : function(){
        this.getOrders()
        this.getBuildings()
    },
    computed : {
        // Filter method to search buildings by name. 
        filteredBuildings : function(){
            return this.buildings.filter((building) =>{
                return building.toLowerCase().match(this.building_search.toLowerCase())
            })
        }
    },
    methods : {
        // Fetches buildings from the database.
        getBuildings : function(){
            this.buildings = []
            axios.get(url + "/dashboard/buildings").then((response) => {
                console.log(response.data)

                for(var i = 0; i < response.data.length; i++){
                    this.buildings.push(response.data[i].building_name)
                }
                this.buildings.sort((a,b) => (a > b) ? 1 : ((b > a) ? -1 : 0))
            })
        },

        // Gets all the orders of a specified building. 
        getOrdersByBuilding: function(building){
            var new_array = []

            var object = {
                cash : [],
                ath_movil : []
            }

            for(var i = 0; i < this.orders.length; i++){
                if(this.orders[i].building === building){
                    if(this.orders[i].payment_method === "cash")
                        object.cash.push(this.orders[i])
                    else
                        object.ath_movil.push(this.orders[i])
                }     
            }
                new_array.push(object)
                return new_array
        },
        // Gets all the orders of a specified building. 
        getCashOrdersByBuilding: function(building){
            var new_array = []

            for(var i = 0; i < this.orders.length; i++){
                if(this.orders[i].building === building){
                    if(this.orders[i].payment_method === "cash")
                        new_array.push(this.orders[i])
                }     
            }
            console.log(new_array)
                if(new_array.length > 0)
                    return new_array
                else 
                    return ''
        },
        // Gets all the orders of a specified building. 
        getATHMovilOrdersByBuilding: function(building){
            var new_array = []

            for(var i = 0; i < this.orders.length; i++){
                if(this.orders[i].building === building){
                    if(this.orders[i].payment_method !== "cash")
                        new_array.push(this.orders[i])
                }     
            }
                if(new_array.length > 0)
                    return new_array
                else 
                    return ''
        },
        // Verifies if a building has orders
        hasOrders : function(building){
            for(var i = 0; i < this.orders.length; i++){
                if(this.orders[i].building === building)
                    return true
            }
            return false
        },
        // Fetches all orders for the date of operation from the database
        getOrders : function(){
            axios.get(url + "/dashboard/orders").then((response) =>{
                console.log(response.data)
                this.orders = response.data
            })
        },

        setOrderForRemoval : function(){
            this.chosen_order = event.currentTarget.value
        },

        // Removes a queued order. 
        removeOrder : function(){
            var json = {
                order_id: this.chosen_order
            }
            axios.delete(url + "/dashboard/orders", { data : json }).then((response) =>{
                console.log(response.data)
                this.getOrders()
            })

            
        }
    }
})

// Vue instance to manage report generation
var reports = new Vue({
    el: "#reports",
    data: {
        report_type: 'Reporte', // v-model to change report view, toggling between written & graph
        written_to: '', // Starting date for written report info
        written_from: '', // Final date for written report info
        graph_to: '', // Starting date for graph info
        graph_from: '', // Final date for graph info
        items: [], 
        fields: ['fecha', 'número_de_ordenes', 'total'], // Written report headers
        bar_graph_labels: [], // Independent variable (x-axis) labels for graph
        bar_graph_data: [], // Dependent variable (y-axis) values for graph
        num_of_sales: '', // Aggregate number of sales for written report
        sales_total: '', // Aggregate sales total for written report
        },
    methods:{
        // Get data for written report 
        getWrittenData : function(){
            // Converts input data into date objects. 
            var from = new Date(document.getElementById("written-from").value)
            var to = new Date(document.getElementById("written-to").value)
    
            // Validates if from date is greater than to date.   
            if(from > to){ 
                document.getElementById("written-error").style.display = "block"
                document.getElementById("written-error").innerHTML = "Fechas inválidas."
            }

            // Input data is valid, fetch data from the database. 
            else{
                document.getElementById("written-error").style.display = "none"
                this.items = []
                var json = {
                    date_from : document.getElementById("written-from").value,
                    date_to: document.getElementById("written-to").value
                }

                axios.post(url + "/dashboard/reports/writtenreport", json).then((response) =>{
                    console.log(response)

                    this.sales_total = this.getSalesTotal(response.data)
                    this.num_of_sales = this.getNumberOfSales(response.data)

                    // Parses the response data for table to be shown. 
                    for(var i = 0; i < response.data.length; i++){
                        var obj = {
                            fecha: response.data[i].date,
                            "Número de Órdenes": response.data[i].sales.number_of_orders,
                            "Total de Ventas" : "$" + response.data[i].sales.sales_total
                        }
                        this.items.push(obj)
                    }       
                    
                    // Adds the aggregate data at the end of the table. 
                    this.items.push({
                        fecha: "Total", 
                        "Número de Órdenes": this.num_of_sales,
                        "Total de Ventas" : this.sales_total
                    })
                })
        }
        },
        // Returns the total earnings of the selected period. 
        getSalesTotal : function(array){
            var total = 0

            for(var i = 0; i < array.length; i++){
                total += parseFloat(array[i].sales.sales_total)    
            }
            return "$" + total.toFixed(2)
        },
        // Return the total number of sales from the data fetched from the database. 
        getNumberOfSales : function(array){
            var num_of_sales = 0

            for(var i = 0; i < array.length; i++){
                num_of_sales += parseInt(array[i].sales.number_of_orders)
            }
            return num_of_sales
        },
        // Fetches graph information from the database. 
        getGraphData: function(){
            // Validate dates
            var from = new Date(document.getElementById("graph-from").value)
            var to = new Date(document.getElementById("graph-to").value)
  
            // Verify that the starting date is a Monday and ending date is a Friday
            // Additionally, verify that they correspond to the same week. 
            if(from.getDay() !== 0 || to.getDay() !== 4 || (to.getDay() - from.getDay() !== 4) || from >= to){
                document.getElementById("graph-error").style.display = "block"
                document.getElementById("graph-error").innerHTML = "Fechas inválidas. Favor de ingresar un lapso de tiempo empezando lunes y culminando viernes en la misma semana."
            }

            // Valid date entry; fetch data from database.
            else{
                document.getElementById("graph-error").style.display = "none"
                var json = {
                    date_from : document.getElementById("graph-from").value,
                    date_to: document.getElementById("graph-to").value
                }

                axios.post(url + "/dashboard/reports/charts", json).then((response) =>{
                    console.log(response.data)
                    this.bar_graph_labels = this.getBarGraphLabels(response.data)
                    this.bar_graph_data = this.getBarGraphData(response.data)

                    // Shows graph with updated data
                    this.$refs.bar_chart.update()
                })
            }
        },
        // Fetches the independent variable (x-axis) data labels.
        getBarGraphLabels: function(array){
            var labels = []

            for(var i = 0; i < array.length; i++){
                labels.push(array[i].date)
            }

            return labels
        },
        // Fetches the dependent variable (y-axis) data labels.
        getBarGraphData : function(array){
            var data = []

            for(var i = 0; i < array.length; i++){
                data.push(parseFloat(array[i].most_selled_combo.total_profit)) // database misspell
            }

            return data
        },
        // Changes the report view between written report or graph. 
        changeReportType: function(){
            this.report_type = event.currentTarget.innerHTML 
        },

    }
})

// Vue.js chart.js component for graphs
var BarChart = Vue.component('bar-chart', {
    extends: VueChartJs.Bar,
    methods : {
    update : function(){
        this.renderChart({
            labels: reports.$data.bar_graph_labels,
            datasets: [
              {
                label: 'Ingreso Total',
                backgroundColor: '#f87979',
                data: reports.$data.bar_graph_data
              }
            ],
            options: {
                responsive: true, 
                maintainAspectRatio: false
                }

      })
    }
    }})

// Vue instance to manage promotional email
var email = new Vue({
    el: "#email",
    data: {
        items: [], //  Array containing the subscribers
        view: 'Email' // Indicates the view for the email tab; varies between email/subscribers. 
    },

    // Fetches all subscribers on load. 
    beforeMount : function(){
        this.getEmailSubscribers()
    },
    methods : {
        // Sends promotional email after grabbing the user's inputted subject and body. 
        sendPromoEmail : function(){ // VALIDATE EMPTY FIELDS
            var json = {
                subject : document.getElementById("subject").value,
                body: document.getElementById("email-content").value
            }
            // console.log(json)
            axios.post(url + "/dashboard/email", json).then((response) =>
            console.log(response.data)
            )
        },
        // Fetches internal mailing list's list of subscribers. 
        getEmailSubscribers : function(){
            this.items = [] 
            axios.get(url +  "/dashboard/subscribers").then((response) => {
                // Parses response data to show the appropriate table headers. 
                for(var i = 0; i < response.data.length; i++){
                    var obj = {
                        nombre : response.data[i].client_fullname,
                        email : response.data[i].client_email
                    }
                    this.items.push(obj)
                }
            })
        },

        // Changes email view between emails & subscribers. 
        changeEmailView : function(){
            this.view = event.currentTarget.innerHTML
        }
        }
    })

// Vue instance to manage administrative privileges
var administrators = new Vue({
    el: "#admin",
    data: {
        role: '', // Indicates whether the administrator is the head or not
        administrators: '', // List of administrators
        chosen_administrator_name: '', // Auxiliary v-model for admin removal
        chosen_administrator_id: '', // v-model for 
        admin_email: '', // v-model for administrator-to-be's email 
    },
    computed : {
        // Validates that the typed administrator-to-be's email has the proper formatting. 
        validateEmail : function(){
            if(this.admin_email === '')
                return null
            else    
                return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.admin_email)
        }
    },
    // Fetches administrators and gets the administrator's role on load. 
    beforeMount: function(){
        this.getAdministrators();
        this.role = localStorage.getItem("role")
    },
    methods : {
        // Fetches the list of administrators from the database.
        getAdministrators: function(){
            axios.get(url + "/dashboard/administrator").then((response) =>
            {
                var array = response.data

                // Sorts the administrators by role, prioritizing the head administrator. 
                array.sort((a,b) => (a.role > b.role) ? -1 : ((b.role > a.role) ? 1 : 0))
                
                this.administrators = array
            })
        },
        // Auxiliary method to fetch an administrator's full name given its id. 
        setAdministratorName : function(id){
            console.log(id)
            for(var i = 0; i < this.administrators.length; i++){
                if(this.administrators[i].administrator_id === id){
                    this.chosen_administrator_name = this.administrators[i].administrator_firstname + " " + this.administrators[i].administrator_lastname
                }
        }
        },

        // Sets instance variables. 
        setAdministrator : function(){
            this.chosen_administrator_id = event.currentTarget.value
            this.setAdministratorName(event.currentTarget.value)
        },
        // Head administrator calls this function and sends an email to the target administrator-to-be.
        addAdministrator : function(){
            var json = {
                administrator_email : document.getElementById("administrator-email").value
            }

            axios.post(url + "/dashboard/registeradmin", json).then((response) => 
            console.log(response.data) // verify response data to validate or prompt error 
            )
        },

        // Head administrator calls this function and removes an administrator (other than himself),
        // from the system. 
        removeAdministrator : function(){
            var json = {
                administrator_id: this.chosen_administrator_id
            }

            axios.delete(url + "/dashboard/administrator", { data : json }).then((response) =>
            {
                console.log(response)
                this.getAdministrators()
            }
            )
        }
    }})
