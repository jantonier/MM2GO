class Post {
  constructor(title, price) {
    this.combo_name = title;
    this.combo_price= price;
    
  }
}

var menu = new Vue({
  el: "#menu-list",
  data: {
    //Se encargan de guardar el input de los searchs de cada contenedor
    searchCombos: '',
    searchItems: '',
    searchSides: '',
    searchDrinks: '',
    searchFreeToppings: '',
    searchPayToppings: '',
    searchBuildings: '',

 
    
// Arreglos que almacenan la data proveniente del Handler
    Stations2:[],
    Combos2:[],
    Combos:[],
    Items2:[],Items:[],
    Sides2:[],
    Drinks2:[],
    RellenosGratis2:[],
    FreeToppings:[],
    JSONpayToppingsData:[],
    PayToppings:[],

    JSONfee:[],deliveryFee:[],
    JSONtax:[],tax:[],
    MilitarOperatingHours:[],
    Operating_Hours:[],
    payLimitCombo:[],
    extraPrice_PayTopping:[0],
    Building_Options:[],
// arrays que guardan las opciones seleccionadas en los combos
    stationIdentifier:[],
    currentPage:[],
    currentCombo:[{name:'',c_price:'',c_description:'',c_id:'',c_type:''}],
    currentSidesArray:[], 
    currentFreeArray:[],currentPayArray:[],//guarda los toppings gratis del combo actual
    currentDrinks:[{name:''}],//guarda el nombre de la bebida actual
    text: '',
    time1:'',time2:'',
    name:'',last_name:'',email:'',phone:'',ext:'',building:null,room:'',payment_method:'',
// arrays que guardan la cantidad de opciones permitidas dependiendo la pantalla 
    sidesDelCombo:[],// guarda cantidad acompañantes permitidos
    drinksDelCombo:[],//guarda cantidad drinks permitidos
    freeTDelCombo:[],// guarda cantidad free toppings permitidos
    payLimitCombo:[],// guarda pay toppings permitidos
    
    ShoppingCart:[],//recibe los pedidos del carrito
  },
/**Inicializa la pantalla, recoge los JSONS del tax y del delivery fee 
*/
  mounted: function(){ 
   
    this.getActiveStations();
    this.getCurrentTax();
    this.getcurrentDeliveryFee();
    this.getBuildings();
    this.getHours();
    document.getElementById("titulo_Estacion").style.display='inline-block'
    document.getElementById("titulo_Oferta").style.display='inline-block'
  
  },
  computed: {
/**
 * Métodos que comparan y  retornan el nombre de los productos que contienen las letras escritas en el buscador
 */
    filteredListC() {
      return this.Combos.filter(post => {
        return post.combo_name.toLowerCase().includes(this.searchCombos.toLowerCase())
      })
    },
  /**
 * Filtra lista de items individuales
 */
    filteredListI() {
      return this.Items.filter(post => {
        return post.item_name.toLowerCase().includes(this.searchItems.toLowerCase())
      })
    },
  /**
 * Filtra lista de acompañantes
 */
    filteredListSides() {
      return this.Sides2.filter(post => {
        return post.item_name.toLowerCase().includes(this.searchSides.toLowerCase())
      })
    },
 
    filteredListDrinks() {
      return this.Drinks2.filter(post => {
        return post.item_name.toLowerCase().includes(this.searchDrinks.toLowerCase())
      })
    },
    filteredListFreeToppings() {
      return this.RellenosGratis2.filter(post => {
        return post.item_name.toLowerCase().includes(this.searchFreeToppings.toLowerCase())
      })
    },

    filteredListPayToppings() {
      return this.PayToppings.filter(post => {
        return post.item_name.toLowerCase().includes(this.searchPayToppings.toLowerCase())
      })
    },
    filteredListBuildings() {
      return this.Building_Options.filter(post => {
        return post.name.toLowerCase().includes(this.searchBuildings.toLowerCase())
      })
    },
/**Organiza el arreglo currentPayArray de mayor a menor basado en el atributo de precio
@return arreglo organizado de mayor a menor precio
*/
        sortedCurrentPayTPrice: function() {//mayor a menor
          function compare(a, b) {
          if (parseFloat(a.item_price) < parseFloat(b.item_price))
          return 1;
          if (parseFloat(a.item_price) >parseFloat(b.item_price))
          return -1;
          return 0;
          }
          return this.currentPayArray.sort(compare);
          },
/**Transforma el tax en un resultado parecido
@return el tax
*/
    getTax: function(){
      return this.tax*100;
    },

/**Transforma el delivery fee en un valor de 2 cifras decimales
@return  delivery fee
*/
    getDeliveryFee: function(){
      return (this.deliveryFee[0].toFixed(2))
    },

/**Transforma el subTotal a un valor de 2 cifras decimales
@return la suma de precios dentro del carrito
*/
    subTotal: function(){
      let sum = 0;
      for (let i = 0; i < this.ShoppingCart.length; i++) {

        //verificar si tiene decimales
      var a=(this.ShoppingCart[i].p_cantidad).toString()
        if(a.includes("."))
        {
          for(var index=0;index<a.length;index++){
            if(a[index]=='.'){
              a=a.substring(0,a[index])
            }
          }
      }
        
      sum += parseFloat(this.ShoppingCart[i].p_precio*( parseFloat(a)).toFixed(0));  
      } 
      return sum.toFixed(2);
    },
/**calcula el precio adicional por el % del ivu
@return la suma de precios dentro del carrito
*/
  ivuPrice: function(){
      return (this.subTotal*( this.tax)).toFixed(2)

  },
  /**calcula el precio final tomando en consideracion el delivery fee
@return la suma total final del carrito
*/
  total: function(){
    var totalFinal=0;
    if(this.ShoppingCart==0){

      return totalFinal.toFixed(2);
    }
    else{
     totalFinal=this.subTotal*(this.tax);
    totalFinal+= parseFloat( this.subTotal )
    totalFinal+= parseFloat(this.deliveryFee[0])
    return totalFinal.toFixed(2);}
           },

/**Verifica si el nombre del formulario del Ordering System cumple con la validación
@return un valor boleano
*/
    checkName:function(){
      if(this.name==''){
        return null
      }
      else
        return /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ]+)$/.test(this.name)
    },
/**Verifica si los apellidos del formulario del Ordering System cumplen con la validación
@return un valor boleano
*/
    checkLastName:function(){
      if(this.last_name==''){
        return null
      }
      else
        return /^([A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ]+([\s][A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ]+){0,1})$/.test(this.last_name)
    },
/**Verifica si el numero de teléfono del formulario del Ordering System contiene 9 dígitos
@return un valor boleano
*/
    checkPhone:function(){
      if(this.phone==''){
        return null
      }
      else
        return /^([0-9]{10})$/.test(this.phone)
    },
/**Valida  la extencion del formulario
@return un valor boleano
*/
    checkExt:function(){
      if(this.ext==''){
        return true
      }
      else
        return /^([0-9]{4})$/.test(this.ext)
    },
/**Valida haber seleccionado un edificio en el formulario
@return un valor boleano
*/
    checkBuilding:function(){
      if(this.building==null){
        return null
      }
      else
        return true
    },
/**Valida  la extencion del formulario
@return un valor boleano
*/
    checkRoomNumber:function(){
      if(this.room==''){
        return null
      }
      else
      return /^([0-9]{1,3}([-]{0,1}[A-Za-z])*)$/.test(this.room)
        
    },
/**Valida  el correo del formulario
@return un valor boleano
*/
    checkEmail:function(){
      if(this.email==''){
        return null
      }
      else
        return/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    },

  

/**Activa, desactiva el boton del formulario */

    checkForm: function(){
      if(this.checkName!=true|| this.checkLastName!=true||this.checkPhone!=true||this.checkExt!=true||this.checkBuilding!=true
       || this.checkRoomNumber!=true || this.checkEmail!=true|| this.payment_method=='' ){
        
        document.getElementById("input-Summit").disabled = true;
        document.getElementById("input-Summit").style.opacity = 0.7;
        document.getElementById("input-Summit").style.background='grey';
      }
      else{
        document.getElementById("input-Summit").disabled = false;
        document.getElementById("input-Summit").style.opacity =1;
        document.getElementById("input-Summit").style.background='#0c3a33';

      }
   },
    
  },
  
  methods:{
 //++++++++++++++++++++++++++++++++++++  METODOS  FORMULARIO   ++++++++++++++++++++++++++++++++++++++++++++++++++
 /**Valida  el input para aumentar o disminuir la cantidad
@return un valor boleano
*/
checkQuantityBox:function(quantity){

  this.disableCheckOut()
  return /^([0-9]+)$/.test(quantity)
},

formatQuantity:function(e){
      return String(e).substring(0,3);
    },
 /**Mueve la orden realizada a la base de datos
*/
  moveForm: function(){
        var json={
          user:{
              email:this.email,
              name:this.name,
              last_name:this.last_name,
              phone:this.phone,
              ext:this.ext
          },
          location:{
              building:this.building,
              room:this.room
          },
          order:{
              price:this.total,
              order_tax:this.ivuPrice,
              payment_method:this.payment_method,
              combos:this.collectCombos(),
              items:this.getItemsID()         
          }
        }
        axios.post('http://mm2go.us-east-1.elasticbeanstalk.com/menu/checkout',json).then((response) => {
          console.log(response)
      })

  },
  /**
   * borra formulario,carrito de compras y regresa a la pantalla de combos
*/  
  endClient:function(){
      this.clearForm();
      this.ShoppingCart=[]
      this.pasarMain()
     
  },
  /**
   * Borra campos del formulario
*/
  clearForm: function(){
    this.name='',this.last_name='',this.phone='',this.ext='',this.building=null,this.room='',
    this.email='',this.payment_method=''

  },
 /**
  * Verifica si la primera estacion en el dropdown contiene combo o item

*/ 
  getActiveStations: function(){
    var url='http://mm2go.us-east-1.elasticbeanstalk.com/menu/'
    axios.get( url+'stations').then((response) => {
      this.$data.Stations2 = response.data
      document.getElementById("titulo_Estacion").innerHTML = this.$data.Stations2[0].station_name
      this.stationIdentifier.push(parseFloat(this.$data.Stations2[0].station_id))
          document.getElementById("CombosContainer").style.display = "none";
          document.getElementById("ItemsContainer").style.display = "none";
        axios.get( url+parseFloat(this.$data.Stations2[0].station_id)+'/combo').then((response) => {
              if(response.data==null){
              
                  document.getElementById("CombosContainer").style.display = "none";
                  document.getElementById("titulo_Oferta").innerHTML = 'Individual'
              }
              else{
             
                this.$data.Combos2 = response.data
                this.transformComboPrices();
                document.getElementById("CombosContainer").style.display = "inline-block";
               /**
                * Método que corre cuando la pantalla de ordenar se accesa por primera vez
                * recibe el costo por envio desde el JSON y lo acomoda en uel array de deliveryFee
                */ 
               document.getElementById("ItemsContainer").style.display = "none";
                document.getElementById("titulo_Oferta").innerHTML = 'Combos'
              }
        })

        axios.get( url+parseFloat(this.$data.Stations2[0].station_id)+'/individual').then((response) => {
          this.$data.Items2 = response.data
          this.transformItemPrices();
                  if(this.Combos2[0]==null && response.data!=null){
                
                    document.getElementById("ItemsContainer").style.display = "inline-block";    
                    }
                    else{
                  

                    }
                  
        })
     })
  },
//+++++++++++++++++++++++METODOS DE LIMPIEZA+++++++++++++++++++++++++++++++++++++++++++++++++++
   /**
  * Borra todos los checkboxes en el sistema 
  */
 borrarCheckBoxes: function(){
  
    this.borrarCheckCombos();
    this.borrarCheckSides() 
    this.borrarCheckFreeT();
    this.borrarCheckPayT();
    this.borrarCheckDrinks();
    this.borrarCheckItems();
    
  },
  /**
  *Desactiva todos los checkboxes de los Combos
  */ 
 borrarCheckCombos: function () {
  var items = document.getElementsByName("chCombo")
    for (var i = 0; i < items.length; i++) {
     
    if (items[i].type == "checkbox")
    { 
      items[i].checked = false }
    }
  },

   /**
  * Desactiva todos los checkboxes de los Items
  */ 
 borrarCheckItems: function () {
    var items = document.getElementsByName("checkItems");
    for (var i = 0; i < items.length; i++) {
    if (items[i].type == "checkbox") {
    items[i].checked = false;
    }
    }
  },
   /**
  *Desactiva todos los checkboxes de Free Toppings
  */ 
 borrarCheckFreeT: function () {
  var items = document.getElementsByName('chFree')
      for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox')
      {items[i].checked = false} 
      }
      }, 
  /**
  * Desactiva todos los checkboxes de los Pay Toppings
  */ 
  borrarCheckPayT: function () {
      var items = document.getElementsByName('chPay')
      for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox')
      {items[i].checked = false} 
      }
      },
  /**
  * Desactiva todos los checkboxes de los Sides
  */
  borrarCheckSides: function() {
      var items = document.getElementsByName('chSides')
      for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox') 
      {items[i].checked = false}
      }
      },
  
  /**
  * Desactiva todos los checkboxes de los Drinks
  */
  borrarCheckDrinks: function () {
      var items = document.getElementsByName('chDrinks')
      for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox')
      {items[i].checked = false} 
      }
     
      },
  /**
  * Borra todas los nombres mostrados en la pantalla de preview
  */
  borrarPreview: function(){

    this.currentCombo=[{name:'',c_price:'',c_description:'',c_id:''}]
    this.currentSidesArray=[]
    this.currentFreeArray=[]
    this.currentPayArray=[]
    this.currentDrinks=[{name:''}]
    this.extraPrice_PayTopping=[0]
  },
   /**
  *Elimina elemento de x array
  *@param array el arreglo a escoger
  *@param index el indice a eliminar dentro del arreglo
  */
  remove: function(array,index){
    this.$delete(array, index) 
    },
    
    clearForm: function(){
    this.name='',this.last_name='',this.phone='',this.ext='',this.building=null,this.room='',
    this.email='',this.payment_method=''

  },
   //+++++++++++++++++++++++++++++++COMBO++++++++++++++++++++++++++++++++++++++++++++++++++++
     /**
  * Desabilita todos los checkboxes de los combos, excepto el ultimo que se marcó
  * @param id id que identifica al combo marcado
  */ 
   borrarComboAnterior: function(checkID){
  
    var cOpciones = document.getElementsByName("chCombo");
    for (var i = 0; i < cOpciones.length; i++){
    if (  cOpciones[i].value !=checkID)
        {
       
        cOpciones[i].checked = false;
        }
    }
    },
  /**
  * Verifica si se marco uno de los combos, si no, tira una notificación 
  */
    permitirPasoCombo: function(){
      var b = this.countCombos();
      if (b == 1){ this.pasarPantalla2();}  
      else { 
        
        this.$bvToast.show('popCombos'); }
      },
  /**
  * Cuenta la cantidad de combos seleccionados
  */
  countCombos: function () {
    var cOpciones = document.getElementsByName("chCombo");
    var count = 0;
    for (var c = 0; c < cOpciones.length; c++) {
    if ((cOpciones[c].checked === true)) {
    count++;
    }
    }
    return count;
    },
   /**
  * Mueve combo seleccionado al arreglo currentCombo
  */
  pushCombo: function(){
  
     var cOpciones=document.getElementsByName("chCombo");
        for(var i=0;i<cOpciones.length;i++){
                if(cOpciones[i].checked===true){
                 
                  for( var j=0 ; j< this.Combos.length ;j++){
                      if(this.Combos[j].combo_id==cOpciones[i].value)
                  
                      {this.currentCombo.shift()
                      this.currentCombo.push({name:this.Combos[j].combo_name,c_price: parseFloat(this.Combos[j].combo_price).toFixed(2) ,
                        c_description:this.Combos[j].description,c_id:this.Combos[j].combo_id,c_type:"combo"})}
                  }
                }                  
          }
    },
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++ METODOS ACOMPAÑANTES  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /**
  * Verifica que el # de acompañantes seleccionados del combo sea igual o menor al # de acompañantes permitidos
  *@return false - el numero de acompañantes no supera el límite
   *@return  true - el numero de acompañantes supera el límite
  */
 limitarSides: function(){
  var c=this.countSides();
  if(c>this.sidesDelCombo){
    this.$bvToast.show('popAcompañantes');
    return true; 
  }
    return false;
  },
 /**
  * Cuanta cantidad de acompañantes marcados
  * @return numero acompañantes seleccionados
  */
  countSides: function () {
    var sOpciones = document.getElementsByName("chSides");
    var count = 0;
    for (var c = 0; c < sOpciones.length; c++) {
    if ((sOpciones[c].type == "checkbox") & (sOpciones[c].checked === true)) {
    count++;
    }
    }

    return count;
    },

 /**
  * Cooncede paso a próxima pantalla si el límite de sides no se sobrepasa
  */
  permitirPasoSides: function(){
    var b= this.limitarSides();
    if(b===false){
     this.pasarPantalla3();
    }
},
/**
  *Cuenta el # de acompañantes marcados en el combo y los acomoda en un arreglo
  */
 addRemoveSidesToArray: function(checkID){
  var cOpciones=document.getElementsByName("chSides");
  for( var i=0;i<cOpciones.length;i++){
  
  if(cOpciones[i].checked===true && cOpciones[i].value==checkID){ //lo activo
  for(var j=0;j<this.Sides2.length;j++){ //añade el check al array
    
    if(this.Sides2[j].item_id==checkID){
    
    this.currentSidesArray.push(this.Sides2[j])
    }
    } 
  }
  if(cOpciones[i].checked===false && cOpciones[i].value==checkID){ //lo desactivo
      for(var j=0;j<this.currentSidesArray.length;j++){
      if( this.currentSidesArray[j].item_id==checkID){
      
      this.remove( this.currentSidesArray,j)
      }
      } 
      }
  }
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++METODOS DE BEBIDAS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 /**
  * Borra todos los checkboxes seleccionados en las bebidas excepto el ultimo que se seleccionó
  */
borrarDrinkAnterior: function(checkID){
  
  var cOpciones = document.getElementsByName("chDrinks");
  for (var i = 0; i < cOpciones.length; i++){
  if ( (cOpciones[i].value!=checkID)){
  cOpciones[i].checked = false;
  }
  else{//encontre el id del drink
      this.setDrink(checkID)

  }

  }
  },
 /**
  * Verifica si la cantidad de bebdias seleccionadas es la misma que la permitida
  * Si el usuario marcó de mas, no lo deja continuar a la próxima página
  */
  limitarDrinks: function(){
    var c=this.countDrinks();
   
    if( c ==this.drinksDelCombo){
    //deja pasar 
    this.pasarPantalla3();
    }
    else{

    this.$bvToast.show('popDrinks');
    }
    },
 /**
  * Cuenta todos las bebidas seleccionadas en el combo
  */
countDrinks: function () {
      var cOpciones = document.getElementsByName("chDrinks");
      var count = 0;
      for (var c = 0; c < cOpciones.length; c++) {
      if ((cOpciones[c].type == "checkbox") & (cOpciones[c].checked === true)) {
      count++;
      }
      }
      return count;
      },
 /**
  * Mueve la bebida seleccionada al arrat de currentDrink
  */
setDrink( checkID){

  for(var j=0 ; j< this.Drinks2.length ; j++){
    if(this.Drinks2[j].item_id==checkID){
      this.currentDrinks.shift();
      this.currentDrinks.push({name:this.Drinks2[j].item_name})
    }
  }
},
//+++++++++++++++++++++++++++++++++++FREE TOPPINGS++++++++++++++++++++++++++++++++++++++++++
 /**
  *Cuenta el # de ingredientes gratis marcados en el combo y los acomoda en un arreglo
  */
 addRemoveFreeToppingToArray: function(checkID){
  var cOpciones=document.getElementsByName("chFree");
  for( var i=0;i<cOpciones.length;i++){
  
  if(cOpciones[i].checked===true && cOpciones[i].value==checkID){ //lo activo
  for(var j=0;j<this.FreeToppings.length;j++){ //añade el check al array
    
    if(this.FreeToppings[j].item_id==checkID){
    this.currentFreeArray.push(this.FreeToppings[j])
    }
    } 
  }
  if(cOpciones[i].checked===false && cOpciones[i].value==checkID){ //lo desactivo
      for(var j=0;j<this.currentFreeArray.length;j++){
      if( this.currentFreeArray[j].item_id==checkID){
       
      this.remove( this.currentFreeArray,j)
      }
      } 
      }
  }
  },
 /**
  *Verifica que la cantidad seleccionada no sobrepase el límite
  */
  checkFreeTNumber: function(){
    var c=this.countFreeT();
    if( c<=this.freeTDelCombo||this.freeTDelCombo==-1){
      return 1;
    }
   this.$bvToast.show('popFree');
  return -1;  
  },
 /**
  *Decide si pasa o no pasa de la pantalla de free toppings
  */
  permitirPasoFreeTopping: function(){
    var boolean =this.checkFreeTNumber();
    if( boolean==1){
      this.pasarPantalla3();
    }
    else{  
      this.$bvToast.show('popFree');
    }
  },
  /**
  *Cuenta el # de ingredientes gratis marcados en el combo
  */
 countFreeT: function () {
  var cOpciones = document.getElementsByName("chFree");
  var count = 0;
  for (var c = 0; c < cOpciones.length; c++) {
  if ((cOpciones[c].type == "checkbox") & (cOpciones[c].checked === true)) {
  count++;
  }
  }
  return count;
  },

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++PAY TOPPINGS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /**
  *Cuenta el # de ingredientes pagados marcados en el combo
  */
  countPayT: function () {
      var cOpciones = document.getElementsByName("chPay");
      var count = 0;
      for (var c = 0; c < cOpciones.length; c++) {
      if ( (cOpciones[c].checked === true)) {
          count++;  
          }
          }
      return count;
  },
  /**
  *Cuenta el # de ingredientes pagados marcados en el combo
  *Acomoda dinamicamente en un arreglo los ingredientes marcados
  */
  addRemoveTPaytoArray: function(checkID){
  var cOpciones=document.getElementsByName("chPay");
  for( var i=0;i<cOpciones.length;i++){
  
      if(cOpciones[i].checked===true && cOpciones[i].value==checkID){ 
      for(var j=0;j<this.PayToppings.length;j++){ 
        //añade el check al array
            if(this.PayToppings[j].item_id==checkID){
            this.currentPayArray.push(this.PayToppings[j])
            }
          } 
      } 
      //lo desactivo
      if(cOpciones[i].checked===false && cOpciones[i].value==checkID){ 
       
       for(var j=0;j<this.currentPayArray.length;j++){
        if( this.currentPayArray[j].item_id==checkID){
        
        this.remove( this.currentPayArray,j)
        }
        } 
    }
    }
  },

  /**
  *Suma el costo extra por tomar ingredientes de los pagados
  */
 updateExtraTPrice: function(){ 
  var payTPrecio=0; 
   var c=this.countPayT();

      if(c  >this.payLimitCombo[0] ){
          var adicional =c- this.payLimitCombo[0];
          var arr= this.sortedCurrentPayTPrice  //organizarlo

              for(var i=0; i < this.currentPayArray.length; i++){
                if(i < adicional){
                  payTPrecio = payTPrecio + parseFloat(arr[i].item_price)
                }
            }
      }
       
      this.extraPrice_PayTopping.shift()
      this.extraPrice_PayTopping.push(parseFloat(payTPrecio).toFixed(2))
      
      },

//++++++++++++++++++++++++++++++++++++++++++++++++ METODOS DE CARRITO +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

 /**
  * Mueve Items seleccionados al arreglo ShoppingCart
  */
añadirItems: function(){
  var cOpciones= document.getElementsByName("checkItems")
      for (var i = 0; i < cOpciones.length; i++) {
        if (cOpciones[i].checked===true){
            
              var count=0;
            for(var k=0; k< this.ShoppingCart.length;k++){
   
            if( this.ShoppingCart[k].p_id ===cOpciones[i].value  && count==0)
                  {
                this.ShoppingCart[k].p_cantidad= parseFloat(this.ShoppingCart[k].p_cantidad)+1;
              
                 count++;
                  }  
                 }

            for(var j=0;j< this.Items.length;j++){
           // Verificar si esta en el Shopping Cart

               if(this.Items[j].item_id== cOpciones[i].value && count==0)
                {
                this.ShoppingCart.push({ pedido:this.Items[j].item_name,
                  p_gratis:'',p_pagado:'',p_sides:'',p_bebida:'',
                  p_descripcion:'',p_precio:this.Items[j].item_price,p_id:this.Items[j].item_id,p_tipo:this.Items[j].item_type,p_cantidad:1})
                  }
                
              }   
          
        } 
      }
      this.disableCheckOut()
        },

 /**
  * Mueve Combo seleccionados al arreglo ShoppingCart
  */      
añadirCombo: function(){
          totalDelCombo=parseFloat(this.currentCombo[0].c_price);
           totalDelCombo=totalDelCombo+parseFloat(this.extraPrice_PayTopping[0])
            var sides; var free; var pay;var drink;
            if(this.currentSidesArray.length==0){sides=''}
            else{ sides=this.currentSidesArray}
                           
            if(this.currentFreeArray.length==0){free=''}
             else{free=this.currentFreeArray }
            
             if(this.currentPayArray.length==0){ pay=''}
             else{ pay=this.currentPayArray }
             
             if(this.currentDrinks[0].name==''){ drink=''}
             else{ drink=this.currentDrinks[0].name }   
         
            this.ShoppingCart.push({pedido:this.currentCombo[0].name,
                    p_gratis:free,p_pagado:pay,p_sides:sides,p_bebida:drink,
                    p_descripcion:this.text, p_precio:totalDelCombo.toFixed(2), p_id:this.currentCombo[0].c_id, p_tipo: this.currentCombo[0].c_type,p_cantidad:1})
                
                   this.disableCheckOut()
                   },

   /**
  * Borra el item/ combo de la lista del carrito
  */ 
 borrarOrden: function (texto,descripcion) {
   
  for (var i = 0; i < this.ShoppingCart.length; i++) {
  if (this.ShoppingCart[i].pedido == texto && (this.ShoppingCart[i].p_descripcion == descripcion)) {
  
  this.remove(this.ShoppingCart,i);
  this.disableCheckOut();
  return;
  
  }
  }
  
  }, 
 /**
  * Habilta o desabilita los botones de Checkout
  */
  disableCheckOut: function () {
  if (this.subTotal<3 ||this.subTotal=="NaN" ) {
 
  document.getElementById("checkButton1").disabled = true;
  document.getElementById("checkButton1").style.opacity = 0.7;
  document.getElementById("checkButton1").style.background='grey';
  document.getElementById("checkButton2").disabled = true;

  document.getElementById("checkButton2").style.opacity = 0.7;
  document.getElementById("checkButton2").style.background='grey';
  document.getElementById("checkButton3").disabled = true;
  document.getElementById("checkButton3").style.opacity = 0.7;
  document.getElementById("checkButton3").style.background='grey';

  } else {

  document.getElementById("checkButton1").disabled = false;
  document.getElementById("checkButton1").style.opacity = 1;  
  document.getElementById("checkButton1").style.background=' #0c3a33';//#13bb00  #339727
  document.getElementById("checkButton2").disabled = false;
  document.getElementById("checkButton2").style.opacity = 1;  
  document.getElementById("checkButton2").style.background=' #0c3a33';
  document.getElementById("checkButton3").disabled = false;
  document.getElementById("checkButton3").style.opacity = 1;  
  document.getElementById("checkButton3").style.background=' #0c3a33';
  }
  }, 
/**
  *desactiva divisiones que aparecen en el Preview
  */
  disablePreviewInformation: function(){

     document.getElementById("sidesInfo").style.display='none'
    document.getElementById("drinkInfo").style.display='none'
    document.getElementById("toppingInfo").style.display= 'none'
 
    document.getElementById("ingredientes").style.display='none'
    
  },
  /**
  * Recoge todos los ID de los items del ShoppingCart y los acomoda en un string con comas
  */
  collectItemsID: function(){
    var formItemsList=''
    for(var i=0;i<this.ShoppingCart.length;i++){
       
      if(this.ShoppingCart[i].p_tipo!='combo'){            
            var c=0; 
        while(c< parseFloat(this.ShoppingCart[i].p_cantidad).toFixed(0)){
          //p_cantidad
            c++;    
        formItemsList= formItemsList +this.ShoppingCart[i].p_id +',';}       
      }       
    }return formItemsList
},
/**
*remueve ultima coma del array de Items
return string de Items id
*/
getItemsID: function(){
 var list= this.collectItemsID()

 if(list.length>0){
    return list.substring(0,list.length-1) 
 }
 return list;

},
/**
  * Recoge los combos del ShoppingCart en un formato valido para enviar al handler
  * return arreglo de combos
  */
collectCombos:function(){
      var formCombos=[];
     
      for(var i=0;i<this.ShoppingCart.length;i++){
      var newSides=''
      var newIngredients=''
        if(this.ShoppingCart[i].p_tipo=='combo'){
          //getSides
          for(var s=0;s<this.ShoppingCart[i].p_sides.length;s++){
             newSides=newSides+this.ShoppingCart[i].p_sides[s].item_name+','
          }
          if(newSides.length>0)
          {newSides=newSides.substring(0,newSides.length-1)}
          //getIngredients
          for(var ing=0;ing<this.ShoppingCart[i].p_gratis.length;ing++){
            newIngredients= newIngredients + this.ShoppingCart[i].p_gratis[ing].item_name+','
         }
         for(var ing2=0;ing2<this.ShoppingCart[i].p_pagado.length;ing2++){
          newIngredients= newIngredients + this.ShoppingCart[i].p_pagado[ing2].item_name+','
           }
           if(newIngredients.length>0)
          {newIngredients=newIngredients.substring(0,newIngredients.length-1)}
           

          formCombos.push({combo_id:this.ShoppingCart[i].p_id,
          sides:newSides,ingredients:newIngredients,drink:this.ShoppingCart[i].p_bebida,
          special_instructions:this.ShoppingCart[i].p_descripcion})

      }
       } 
       
       return formCombos
    },
//+++++++++++++++++++++++++++++++++CAMBIOS DE PANTALLAS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 /**
  * Nos dice cual pantalla se debe mostrar luego de la pantalla de combo
  * @returns el numero de acompañantes del combo
  */
 pasarPantalla2: function(){ 
  document.getElementById("apagarCombo_Cuadro").style.display='none'; 
  var cCheckBox = document.getElementsByName("chCombo");
  for(var i=0;i< cCheckBox.length;i++){
    if(cCheckBox[i].checked===true)
      {
      var nOfSides=this.buscarComboSides(cCheckBox[i].value);
      var nOfFreeTAllow=this.buscarComboToppingsG(cCheckBox[i].value);//0 nada, -1 todos los que quiera , 2
      var nOfPayTAllow=this.getNumberOfPayToppingsAllow(cCheckBox[i].value);
      var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].value);

      this.disablePreviewInformation();
      
     if(nOfFreeTAllow!=0 || nOfPayTAllow!=0) {
      document.getElementById("ingredientes").style.display= 'inline-block'
       document.getElementById("toppingInfo").style.display= 'inline-block'
      if(nOfFreeTAllow!=0 ){
       
        this.updateFreeT(this.stationIdentifier) 
        if(nOfFreeTAllow<0 ) {
          document.getElementById("freeToppingsDescription1").style.display= 'inline-block',document.getElementById("freeToppingsDescription2").style.display= 'none'} 
        else{
          document.getElementById("freeToppingsDescription2").style.display= 'inline-block',document.getElementById("freeToppingsDescription1").style.display= 'none'
        }   
      }
      if(nOfPayTAllow!=0 ){
        this.updatePayT(this.stationIdentifier)
  
      }
    }
      if(nOfSides >0 ){
        this.updateSides(this.stationIdentifier)
        document.getElementById("sidesInfo").style.display= 'inline-block'
      }
      if(nOfDrinks >0 ){
         this.updateDrinks(this.stationIdentifier)
         document.getElemen  /**
         * Método que corre cuando la pantalla de ordenar se accesa por primera vez
         * recibe el costo por envio desde el JSON y lo acomoda en uel array de deliveryFee
         */ document.getElementById("drinkInfo").style.display= 'inline-block'
       }
      


    }
  } //0 no tiene
  //0 no existe, -1:free= todos gratis  , -1:pay=todos se pagan
  if(nOfFreeTAllow !=0){
    document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block'; 
    this.updateFreeT(this.stationIdentifier)
    this.currentPage.shift()
    this.currentPage.push(1)
  }
  else if(nOfPayTAllow !=0){
   document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block'; 
    this.currentPage.shift()
    this.currentPage.push(2)

  } 
    
  
  else if(nOfSides >0 ) // 0 no tiene sides
  { document.getElementById("apagarSides_Cuadro").style.display='inline-block';  
    this.currentPage.shift()   
    this.currentPage.push( 3)
  }
  else if(nOfDrinks >0 ) // 0 no tiene bebidas
  { document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push( 4) 
    
  }
  else{ 
  //pantalla Special Instructions
  document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';

  this.currentPage.shift()
  this.currentPage.push(5) 
  } 
  },
   /**
  * Se encarga de borrar los checkbox,deshabilitar la pantalla de SpecialInstruction y habilitar la pantalla de Combo
  */ 
 pasarMain: function(){
  this.borrarCheckBoxes();
  this.borrarPreview();
  this.text=''
  document.getElementById("apagarDrinks_Cuadro").style.display='none'; 
  document.getElementById("apagarPayToppings_Cuadro").style.display='none';
  document.getElementById("apagarFreeToppings_Cuadro").style.display='none';
  document.getElementById("apagarSpecialInstruction_Cuadro").style.display='none';
  document.getElementById("apagarCombo_Cuadro").style.display='inline-block';
  document.getElementById("apagarForm").style.display='none';
  document.getElementById("CombosContainer").style.display='inline-block';
  document.getElementById("titulo_Estacion").style.display='inline-block';
  document.getElementById("titulo_Oferta").style.display='inline-block';
  document.getElementById("titulo_Formulario").style.display='none';
  document.getElementById("apagarRegresarButton").style.display='none';
  document.getElementById("apagarHomeButton").style.display='inline-block';
  document.getElementById("apagarStationButton").style.display='inline-block';
  document.getElementById("apagarOfferButton").style.display='inline-block';
  document.getElementById("checkButton2").style.display='inline-block';
  },
  

   /**
  * Decide cual es la proxima pantalla del combo seleccionado basandose del numero del currentPage[0]
  * Actualiza valor de currentPage[0]
  */
 pasarPantalla3: function(){
  var cCheckBox = document.getElementsByName("chCombo");
  for(var i=0;i< cCheckBox.length;i++){

  if(cCheckBox[i].checked===true )
    {var nOfSides=this.buscarComboSides(cCheckBox[i].value);
    var nOfPayTAllow=this.getNumberOfPayToppingsAllow(cCheckBox[i].value);
    var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].value);

} 
}

switch(this.currentPage[0]) {

  case 1://free toppings
      document.getElementById("apagarFreeToppings_Cuadro").style.display='none';
 
   if(nOfPayTAllow !=0){
      document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(2)
 
      break; 
    }
    else if(nOfSides>0){
      document.getElementById("apagarSides_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(3)
     
      break; 
    }
    else if(nOfDrinks>0){
     
      document.getElementById("apagarDrinks_Cuadro").style.display='inline-block'; 
      this.currentPage.shift()
      this.currentPage.push( 4)
  
      break;}
    else{
      document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
      
      this.currentPage.shift()
      this.currentPage.push(5)
    } 
    break;
  case 2://pay toppings   
      document.getElementById("apagarPayToppings_Cuadro").style.display='none';
     if(nOfSides>0){
      document.getElementById("apagarSides_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(3)
  
      break; 
    }
    else if(nOfDrinks>0){
     
      document.getElementById("apagarDrinks_Cuadro").style.display='inline-block'; 
      this.currentPage.shift()
      this.currentPage.push( 4)
     
      break;}
    else{
      document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(5)
    } 
    break;
  case 3://sides
    document.getElementById("apagarSides_Cuadro").style.display='none'; 
    if(nOfDrinks > 0){
    
      document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';      
      this.currentPage.shift()
      this.currentPage.push(4) 
       break;
    }
    else{
    document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push(5)
    }
    break;
  case 4://drinks
    document.getElementById("apagarDrinks_Cuadro").style.display='none';
    
      document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(5)
      break;
    
  default:

  }
},

/**
  * Premite regresar a la pantalla anterior del contenedor
  * Verifica la pagina actual
  */
revirarPantalla: function(){
  document.getElementById("apagarCombo_Cuadro").style.display='none';

  var cCheckBox = document.getElementsByName("chCombo");
  for(var i=0;i< cCheckBox.length;i++){
  
  if(cCheckBox[i].checked===true )
  {var nOfSides=this.buscarComboSides(cCheckBox[i].value);
  var nOfFreeTAllow=this.buscarComboToppingsG(cCheckBox[i].value);//0 nada, -1 todos los que quiera , 2
  var nOfPayTAllow=this.getNumberOfPayToppingsAllow(cCheckBox[i].value);
  var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].value);
}
}

switch(this.currentPage[0]) {
  case 1://free toppings
    document.getElementById("apagarFreeToppings_Cuadro").style.display='none';

    document.getElementById("apagarCombo_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push(0) 
    break; 

  case 2://pay toppings
    document.getElementById("apagarPayToppings_Cuadro").style.display='none';
      if(nOfFreeTAllow !=0){
        document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
        this.currentPage.shift()
        this.currentPage.push(1) 
        break;
        } 
        else{
          document.getElementById("apagarCombo_Cuadro").style.display='inline-block'; 
          this.currentPage.shift()
          this.currentPage.push(0) 
          break;}

  case 3://sides
    document.getElementById("apagarSides_Cuadro").style.display='none';
    if(nOfPayTAllow !=0 ){
        document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block'; 
        this.currentPage.shift()
        this.currentPage.push(2) 
        break;
        }

  else if(nOfFreeTAllow !=0){
      document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
      this.currentPage.shift()
      this.currentPage.push(1) 
      break;
      } 

  else{
      document.getElementById("apagarCombo_Cuadro").style.display='inline-block'; 
      this.currentPage.shift()
      this.currentPage.push(0) 
      break;}

  case 4://drinks
    document.getElementById("apagarDrinks_Cuadro").style.display='none';  
    if(nOfSides>0){
    document.getElementById("apagarSides_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push(3)
    break; 
    }
  
    else if( nOfPayTAllow !=0 ){
    document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block'; 
    this.currentPage.shift()
    this.currentPage.push(2)
    break; 
    }
    
    else if(nOfFreeTAllow !=0){
    document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push(1)
    break; 

}  
  else{
  document.getElementById("apagarCombo_Cuadro").style.display='inline-block'
  this.currentPage.shift()
  this.currentPage.push(0)
  break;
  }

case 5://special instructions
  document.getElementById("apagarSpecialInstruction_Cuadro").style.display='none'
  if(nOfDrinks > 0){
  document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
  this.currentPage.shift()
  this.currentPage.push(4)
  break;
  }
  else if(nOfSides>0){
  document.getElementById("apagarSides_Cuadro").style.display='inline-block';
  this.currentPage.shift()
  this.currentPage.push(3)
  break; 
  } 
  else if(nOfPayTAllow !=0 ){
    document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';
    this.currentPage.shift()
    this.currentPage.push(2) 
    break;
    }
  if(nOfFreeTAllow !=0){
  document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
  this.currentPage.shift()
  this.currentPage.push(1) 
  break;
  } 
  else{
  document.getElementById("apagarCombo_Cuadro").style.display='inline-block'
  this.currentPage.shift()
  this.currentPage.push(1) 
  }
  default:
 }
 
},
// +++++++++++++++++++++++++++++++++++RECOPIAR INFO DEL COMBO++++++++++++++++++++++++++++++++++++++++++++++++

  /**
  * Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
  * @returns el numero de acompañantes del combo
  */
 buscarComboSides: function( idCheckbox ){
  for(var i=0;i< this.Combos.length;i++){
      if( this.Combos[i].combo_id ==idCheckbox){
        this.sidesDelCombo.shift()
        this.sidesDelCombo.push( this.Combos[i].num_of_sides)
        
        return this.Combos[i].num_of_sides;
      }
  }
  },
    /**
  * Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
  * @returns el numero de toppings gratis permitidos del combo
  */
 buscarComboToppingsG: function( idCheckbox ){
  for(var i=0;i< this.Combos.length;i++){
  if( this.Combos[i].combo_id ==idCheckbox){
  this.freeTDelCombo.shift()
  this.freeTDelCombo.push( this.Combos[i].num_of_free_toppings)
  return this.Combos[i].num_of_free_toppings;
  }
  }
  },
  /**
  * Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
  * mueve el valor de num_of_paid_toppins a un array para saber el limite de toppings pagados del combo seleccionado
  * @returns el numero de toppings no gratis permitidos del combo
  */
  getNumberOfPayToppingsAllow: function( idCheckbox ){
    for(var i=0;i< this.Combos.length;i++){
      if( this.Combos[i].combo_id ==idCheckbox){
        this.payLimitCombo.shift()
        this.payLimitCombo.push( this.Combos[i].num_of_paid_toppings) 
      return this.Combos[i].num_of_paid_toppings;
      }
  }
  },
  
  /**
  * Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
  * @returns el numero de drinks permitidos del combo
  */
  buscarComboDrinks: function( idCheckbox ){
    for(var i=0;i< this.Combos.length;i++){
      if( this.Combos[i].combo_id ==idCheckbox){
      this.drinksDelCombo.shift()
      this.drinksDelCombo.push( this.Combos[i].num_of_drinks)
      return this.Combos[i].num_of_drinks;
      }
    }
  },
  //+++++++++++++++++++++++++++++++++RECOPILAR DATA DE JSONS+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  /**
 * Método que corre cuando la pantalla de ordenar se accesa por primera vez
 * recibe el tax desde el JSON y lo acomoda en un array de tax
 */ 
  getCurrentTax: function(){
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/tax').then((response) => {
      this.$data.JSONtax =response.data
      this.transformTax()
         })
  },
  transformTax: function(){
    this.tax.push( parseFloat(this.JSONtax.tax))
  },

    /**
 * Método que corre cuando la pantalla de ordenar se accesa por primera vez
 * recibe el costo por envio desde el JSON y lo acomoda en el array de deliveryFee
 */ 
  getcurrentDeliveryFee: function(){
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/deliveryfee').then((response) => {
       
      this.$data.JSONfee =response.data
      this.transformDeliveryFee()
         })
  },
  transformDeliveryFee: function(){
    this.deliveryFee.push(parseFloat(this.JSONfee.delivery_fee).toFixed(2))
  },
   /**
 * Método que corre cuando la pantalla de ordenar se accesa por primera vez
 * recibe la lista de edificios disponibles desde el JSON y lo acomoda en el array de Building_Options
 */ 
  getBuildings:function(){
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/buildings').then((response) => {    
      this.Building_Options=[]  
      this.$data.Building_Options =response.data
         })
  },

     /**
 * Método que corre cuando la pantalla de ordenar se accesa por primera vez
 * recibe los rangos del horario deiponibles desde el JSON y lo acomoda en el array de Operating_Hours
 */ 
getHours:function(){
  axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/operatinghours').then((response) => {    
    this.MilitarOperatingHours=[]  
    this.$data.MilitarOperatingHours =response.data
    this.transformHours() 
   }) 
    
},
    transformHours:function(){
      this.Operating_Hours=[]
      this.time1='am'
      this.time2='am'


      var first=this.MilitarOperatingHours.operating_hours_from
      var last=this.MilitarOperatingHours.operating_hours_to
      var a1=parseFloat(first.substring(0,2));var a2=first.substring(3)
      var b1=parseFloat(last.substring(0,2));var b2=last.substring(3)     
      if(a1>=12){
        //pm
          this.time1='pm'
          a1=a1%12
      }
      if(b1>=12){
        //pm
        this.time2='pm'
        b1=b1%12
      }
      this.Operating_Hours.push({hourA:a1, minuteA:a2 ,hourB:b1,minuteB:b2})

    },
       


 /**Actualiza los items de las estaciones
  * @param id de la estación seleccionada
   */
updateStations_Items: function(stationID){
  
    this.Items2=[];
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+stationID+'/individual').then((response) => {
    var array=[]
    array = response.data
    this.$data.Items2 = array
    this.transformItemPrices()

    });
    },
    transformItemPrices: function(){
        this.Items=[];
      for(var i=0;i< this.Items2.length;i++){
        this.Items.push({item_id:this.Items2[i].item_id,item_name:this.Items2[i].item_name,item_price:parseFloat(this.Items2[i].item_price).toFixed(2),
          item_type:this.Items2[i].item_type, photo_url :this.Items2[i].photo_url})
         
      }
  },
 /**Actualiza las estaciones
  * @param id de la estación seleccionada
   */
updateStations_Combo: function(stationID){
    this.Combos2=[];
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+stationID+'/combo').then((response) => {
    this.$data.Combos2 = response.data 
    this.transformComboPrices();
    });

    
    },

  transformComboPrices: function(){
    this.Combos=[]
      for(var i=0;i< this.Combos2.length;i++){
   
        this.Combos.push({combo_id:this.Combos2[i].combo_id,combo_name:this.Combos2[i].combo_name,combo_price:parseFloat(this.Combos2[i].combo_price).toFixed(2),description:this.Combos2[i].description,
          num_of_drinks:this.Combos2[i].num_of_drinks,num_of_free_toppings:this.Combos2[i].num_of_free_toppings  ,num_of_paid_toppings:this.Combos2[i].num_of_paid_toppings,num_of_sides:this.Combos2[i].num_of_sides,
          photo_url :this.Combos2[i].photo_url})
      }
  },
 /**Actualiza los acompañantes de las estaciones
  * @param id de la estación seleccionada
   */
updateSides: function(stationID){

      this.Sides2=[];
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+ stationID +'/combo/sides').then((response) => {
      var array=[]
      array = response.data
      this.$data.Sides2 = array  
    });
    },
 /**Actualiza las bebidas de las estaciones
  * @param id de la estación seleccionada
   */
updateDrinks: function(stationID){
 
      this.Drinks2=[];
    axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+stationID+'/combo/drinks').then((response) => {
      var array=[]
      array = response.data
      this.$data.Drinks2 = array  
    });
    },

 /**Actualiza los free toppings de las estaciones
  * @param id de la estación seleccionada
   */
updateFreeT: function(stationID){

        this.RellenosGratis2=[];
      axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+stationID+'/combo/freetoppings').then((response) => {
        var array=[]
        array = response.data
        this.$data.RellenosGratis2 = array 
        this.transformFreeToppingsPrices() 
    });
    },

    transformFreeToppingsPrices: function(){
      this.FreeToppings=[]
        for(var i=0;i< this.RellenosGratis2.length;i++){
          this.FreeToppings.push({item_id:this.RellenosGratis2[i].item_id,item_name:this.RellenosGratis2[i].item_name,item_price:parseFloat(this.RellenosGratis2[i].item_price).toFixed(2),item_type:this.RellenosGratis2[i].item_type,
            photo_url :this.RellenosGratis2[i].photo_url})
        }
    },
/**Actualiza los pay toppings de la estacion
  * @param id de la estación seleccionada
   */
updatePayT: function(stationID){

          this.JSONpayToppingsData=[];
         
        axios.get('http://mm2go.us-east-1.elasticbeanstalk.com/menu/'+stationID+'/combo/paidtoppings').then((response) => {
          var array=[]
          array = response.data
          this.$data.JSONpayToppingsData = array  
          this.transformPayToppingsPrices()
      });
    },

    transformPayToppingsPrices: function(){
      this.PayToppings=[]
        for(var i=0;i< this.JSONpayToppingsData.length;i++){
       
          this.PayToppings.push({item_id:this.JSONpayToppingsData[i].item_id,item_name:this.JSONpayToppingsData[i].item_name,item_price:parseFloat(this.JSONpayToppingsData[i].item_price).toFixed(2),item_type:this.JSONpayToppingsData[i].item_type,
            photo_url :this.JSONpayToppingsData[i].photo_url})
        }
    },
      
//+++++++++++++++++++++++++Desabilitar/ Habiliar Combo/ Individual Continers++++++++++++++++++++++++++++++++++++++++++++++
  /**
  *Activa el contenedor de los Items, desabilita el contenedor de Combos
  */ 
 activarIndividual: function () {
  this.borrarCheckCombos();
  document.getElementById("ItemsContainer").style.display = "inline-block";
  document.getElementById("CombosContainer").style.display = "none";
  document.getElementById("titulo_Oferta").innerHTML= "Individual";
  },
  
  /**
  *Activa el contenedor de los Combos, desabilita el contenedor de Items
  */ 
  activarCombo: function () {
      this.borrarCheckItems();
      document.getElementById("ItemsContainer").style.display = "none"; 
     
      document.getElementById("CombosContainer").style.display = "inline-block";
      document.getElementById("titulo_Oferta").innerHTML= "Combo";
  },
 /**
  *desactiva las pantalla para realizar compra y activa la pantalla del formulario
  */ 
  pantallaForm: function(){
    document.getElementById("titulo_Estacion").style.display = "none";
    document.getElementById("titulo_Oferta").style.display = "none";
    document.getElementById("titulo_Formulario").style.display = "inline-block";
    document.getElementById("ItemsContainer").style.display = "none";
    document.getElementById("CombosContainer").style.display = "none"; 
    document.getElementById("apagarHomeButton").style.display=  "none ";
    document.getElementById("apagarStationButton").style.display=  "none ";
    document.getElementById("apagarOfferButton").style.display=  "none ";
    document.getElementById("apagarForm").style.display = "inline-block ";
    document.getElementById("checkButton2").style.display = "none ";
    document.getElementById("apagarRegresarButton").style.display=  "inline-block";
    //document.getElementById("t1").style.display=  "none";//document.getElementById("t2").style.display="inline-block";
    
  },
/**
  *desactiva todo lo relacionado al Form, activa el menu de hacer ordenes
  */ 
 pantallaItemCombo: function(){
    document.getElementById("ItemsContainer").style.display = "none";
    document.getElementById("checkButton2").style.display = "inline-block ";
    document.getElementById("CombosContainer").style.display = "inline-block ";
    document.getElementById("apagarHomeButton").style.display=  "inline-block";
    document.getElementById("apagarStationButton").style.display=  "inline-block ";
    document.getElementById("apagarOfferButton").style.display=  "inline-block";
    document.getElementById("apagarRegresarButton").style.display=  "none ";
   // document.getElementById("t1").style.display=  "inline-block";//document.getElementById("t2").style.display=  "none";
   document.getElementById("apagarForm").style.display = "none ";
   document.getElementById("titulo_Oferta").style.display='inline-block'
   document.getElementById("titulo_Estacion").style.display='inline-block'
   document.getElementById("titulo_Formulario").style.display='none'

 },
     /**
  * Desablita todas las pantallas ,menos la de combo
  * Guarda el id de la estacion escogida en un array para referencia 
  *@param name nombre de la estacion
  *@param stationID el ID de la estacion presionada
  */
 checkStation: function(name, stationID){
      document.getElementById('titulo_Estacion').innerHTML = name;  
      this.updateStations_Items(stationID);
      this.updateStations_Combo(stationID);      
      document.getElementById("apagarCombo_Cuadro").style.display = "inline-block";
      document.getElementById("apagarFreeToppings_Cuadro").style.display = "none";
      document.getElementById("apagarPayToppings_Cuadro").style.display = "none";
      document.getElementById("apagarSides_Cuadro").style.display = "none";
      document.getElementById("apagarDrinks_Cuadro").style.display = "none";
      document.getElementById("apagarSpecialInstruction_Cuadro").style.display = "none";
      this.stationIdentifier.shift()
      this.stationIdentifier.push(stationID)  
},
    },
})
