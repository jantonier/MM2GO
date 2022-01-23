var menu = new Vue({
 el: "#menu-list",
 data: {
  titulo: '',

  status:'',
  Combos: [
    { name: "Arroz blanco  ",  number_of_sides: 1,number_of_drinks: 1,freeToppingsAllow:-1,payToppingsAllow:-1, price: 4.99, combo_id: 1, station_id: 1,c_desc:'Contiene a ,b c',special_i:'' },
    {name: "Arroz con salchichas ", number_of_sides: 2, number_of_drinks: 1,freeToppingsAllow:-1,payToppingsAllow:-1, price: 10.99, combo_id: 2, station_id: 1,c_desc:'Contiene a ,b c',special_i:''},
    { name: "Arroz con tocino ", number_of_sides: 1, number_of_drinks: 1,freeToppingsAllow:-1,payToppingsAllow:-1, price: 3, combo_id: 3, station_id: 1,c_desc:'Contiene a ,b c',special_i:'' } ,
    {
     name:"Pasta con 1 carne",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 6, combo_id: 21, station_id: 2,c_desc:'Contiene a ,b c',special_i:''},
    {name:"Pasta con 2 carnes",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 4.45, combo_id: 22, station_id: 2,c_desc:'Contiene a ,b c',special_i:''},
    {name:"Pasta con vegetales",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 5, combo_id: 23, station_id: 2,c_desc:'Contiene a ,b c',special_i:''},
    {name:"Pasta con vegetales y 1 carne",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 7, combo_id: 24, station_id: 2,c_desc:'Contiene a ,b c',special_i:''},
    {name:"Pasta con vegetales y 2 carnes",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 8, combo_id: 25, station_id: 2,c_desc:'Contiene a ,b c',special_i:''},
    {
     name: "Burrito con 1 carne ",number_of_sides: 1,number_of_drinks:1,freeToppingsAllow:2,payToppingsAllow:-1,price: 5.5,combo_id: 31,station_id: 3,c_desc:'plantilla: normal(predeterminado) , espinaca, integral',special_i:''},
    { name: "Burrito con 2 carnes ", number_of_sides: 2, number_of_drinks: 1,freeToppingsAllow:2,payToppingsAllow:-1, price: 8, combo_id: 32, station_id: 3,c_desc:'plantilla: normal(predeterminado) , espinaca, integral',special_i:''},
    { name: "Burrito con vegetales ", number_of_sides: 0, number_of_drinks: 1,freeToppingsAllow:2,payToppingsAllow:-1, price: 8, combo_id: 33, station_id: 3,c_desc:'plantilla: normal(predeterminado) , espinaca, integral',special_i:''},
    { name: "Burrito con vegetales y 1 carne ", number_of_sides: 1, number_of_drinks: 1,freeToppingsAllow:2,payToppingsAllow:-1, price: 8, combo_id: 34, station_id: 3,c_desc:'plantilla: normal(predeterminado) , espinaca, integral',special_i:''},
    { name: "Burrito con vegetales y 2 carnes", number_of_sides: 2, number_of_drinks: 1,freeToppingsAllow:2,payToppingsAllow:-1, price: 8, combo_id: 35, station_id: 3,c_desc:'plantilla: normal(predeterminado) , espinaca, integral',special_i:''},
    {
     name: "Sandwish 1 ",number_of_sides: 0,number_of_drinks: 1,freeToppingsAllow:0,payToppingsAllow:2, price: 2, combo_id: 41, station_id: 4,c_desc:'Contiene a ,b c',special_i:''},
    {name: "Sandwish de jamon y queso ",number_of_sides: 0,number_of_drinks: 0,freeToppingsAllow:0,payToppingsAllow:2, price: 18, combo_id: 42, station_id: 4,c_desc:'Contiene a ,b c',special_i:''},
    {
     name: "Empanadilla ",number_of_sides: 1, number_of_drinks: 0,freeToppingsAllow:-1,payToppingsAllow:-1, price: 18, combo_id: 50, station_id: 5,c_desc:'Contiene a ,b c',special_i:''},
    {
     name: "Ensalada ",number_of_sides: 0,number_of_drinks: 0,freeToppingsAllow:4,payToppingsAllow:0,price: 3,combo_id: 60,station_id: 6,c_desc:'Contiene a ,b c',special_i:''},
    { 
      name: "Pizza personal",number_of_sides: 0, number_of_drinks: 0,freeToppingsAllow:-1,payToppingsAllow:0, price: 5, combo_id: 90, station_id: 9,c_desc:'Contiene a ,b c',special_i:''}, 
    { name: "Pizza coliflor",number_of_sides: 0,  number_of_drinks: 0,freeToppingsAllow:-1,payToppingsAllow:0,  price: 5, combo_id: 90, station_id: 9,c_desc:'Contiene a ,b c',special_i:''},
  
   ],

  Stations:[{station_id:1, station_name:'Estación Criolla'  ,is_active: 1},
  {station_id:2, station_name:'Estación de Pastas'  ,is_active: 1},
  {station_id:3, station_name:'Estación de Burritos'  ,is_active: 1},
  {station_id:4, station_name:'Estación de Sandwishes'  ,is_active: 1},
  {station_id:5, station_name:'Estación de Frituras'  ,is_active: 1},
  {station_id:6, station_name:'Estación de Ensaladas'  ,is_active: 1},
  {station_id:7, station_name:'Estación de Cafe'  ,is_active: 1},
  {station_id:8, station_name:'Estación de Bebidas'  ,is_active: 1},
  {station_id:9, station_name:'Estación de Pizza'  ,is_active: 1},
  {station_id:10, station_name:'Estación de hamburger'  ,is_active: 1},
] ,
  Item: [
   {name: "habichuelas ", item_type: "sides", item_id: 100,station_id:1, item_price: 2},
   {name: "ensalada coditos ",item_type: "sides", item_id: 101, station_id:1,item_price: 3,},
   {name: "i 3 ", item_type: "sides", item_id: 113,station_id:1, item_price: 2.5},
   {name: "i 4 ", item_type: "sides", item_id: 600,station_id:2, item_price: 2},
   {name: "i 5 ", item_type: "sides", item_id: 157, station_id:2,item_price: 2},
   {name: "i 6 ",item_type: "sides",item_id: 122,station_id:2,item_price: 2,},
   {name: "i 7 ", item_type: "sides", item_id: 142,station_id:3, item_price: 3},
   {name: "i 8 ", item_type: "sides", item_id: 332,station_id:3, item_price: 4},
   {name: "i 9 ", item_type: "sides", item_id: 532,station_id:4, item_price: 2},
   {name: "i 10",item_type: "sides",item_id: 144,station_id:4,item_price: 2,},
   {name: "ensalada de papa",item_type: "sides",item_id: 105,station_id:4,item_price: 4,},
   {name: "i 12  ", item_type: "sides", item_id: 107, station_id:5,item_price: 2},
   {name: "i 13", item_type: "sides", item_id: 108, station_id:5,item_price: 2},
   {name: "Amarillitos", item_type: "sides", item_id: 58, station_id:6,item_price: 2},
   {name: "i 15  ",item_type: "sides",item_id: 304,station_id:6,item_price: 2,},
   {name: "papas majadas",item_type: "sides",item_id: 131,station_id:6,item_price: 2,},
   {name: "Papas fritas  ",item_type: "sides",item_id: 148,station_id:7,item_price: 2,},
   {name: "papas A", item_type: "sides", item_id: 501, station_id:7,item_price: 2},
   {name: "i 19  ", item_type: "sides", item_id: 243,station_id:7, item_price: 2},
   {name: "sides 44", item_type: "sides", item_id: 244,station_id:8, item_price: 2},
   {name: " revoltillo con vegetales", item_type: "sides", item_id: 702,station_id:8, item_price: 4 },
   {name: "batatas fritas", item_type: "sides", item_id: 703,station_id:9, item_price: 3},
   {name: "Bistec ensebollado",item_type: "protein",item_id: 300,station_id:9,item_price: 6},
   {name: "Arroz blanco con habichuelas",item_type: "protein",item_id: 301,station_id:2, item_price: 3},
   {name: "Pechuga a la parrilla", item_type: "protein", item_id: 306,station_id:1, item_price:6},
   {name: "Mofongo ",item_type: "protein",item_id: 308,station_id:1,item_price: 7},
   {name: "Arroz chino ",item_type: "protein",item_id: 310,station_id:1,item_price: 2.50},
   {name: "Masitas de carne", item_type: "protein", item_id: 311,station_id:1, item_price: 8},
   {name: "Ensalada de repollo",item_type: "protein",item_id: 412,station_id:5,item_price: 5},
   {name: "Pollo frito",item_type: "protein",item_id: 450,station_id:1,item_price: 6},
   {name: "Lechón al horno", item_type: "protein", item_id: 460,station_id:1, item_price: 8},
   {name: "Lasagna", item_type: "protein", item_id: 800,station_id:1,item_price: 6},
  ],

  comboDetails: [
   {
    combo_details_id: 17,
    combo_id: 1,
    sides: [
     {name: "habichuelas ", item_type: "sides", item_id: 100},
     {name: "ensalada coditos ", item_type: "sides", item_id: 101},
     {name: "side CC ", item_type: "sides", item_id: 113},
     {name: "side DD ", item_type: "sides", item_id: 600},
     {name: "side AA1 ", item_type: "sides", item_id: 157},
    ],
    drinks: [
     {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "Pepsi 12oz  ", item_type: "drinks", item_id: 201},
    ],
   },
   {
    combo_details_id: 32,
    combo_id: 2,
    sides: [
     {name: "Combo Sides 2 ", item_type: "sides", item_id: 122},
     {name: "papitas ", item_type: "sides", item_id: 142},
     {name: "Tostones ", item_type: "sides", item_id: 332},
     {name: "amarillitos ", item_type: "sides", item_id: 532},
    ],
    drinks: [
     {name: "Refresco  ", item_type: "drinks", item_id: 202},
     {name: "Pepsi  ", item_type: "drinks", item_id: 203},
     {name: "Minute Maid  ", item_type: "drinks", item_id: 204},
    ],
   },
   {
    combo_details_id: 93,
    combo_id: 3,
    sides: [
     {name: "ensalada de coditos", item_type: "sides", item_id: 144},
     {name: "ensalada de papa", item_type: "sides", item_id: 105},
    ],
    drinks: [
     {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "Coca-Cola  ", item_type: "drinks", item_id: 206},
     {name: "Jugo de china ", item_type: "drinks", item_id: 220},
    ],
   },
   {
    combo_details_id: 15,
    combo_id: 21,
    sides: [
     {name: "side EE  ", item_type: "sides", item_id: 107},
     {name: "side FF", item_type: "sides", item_id: 108},
     {name: "Tostones", item_type: "sides", item_id: 332},
     {name: "Amarillitos", item_type: "sides", item_id: 58},
    ],
    drinks: [
     {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "Jugo FFF ", item_type: "drinks", item_id: 208},
    ],
   },
   {
    combo_details_id: 11,
    combo_id: 22,
    sides: [
     {name: "Pan con ajo  ", item_type: "sides", item_id: 304},
     {name: "papas majadas", item_type: "sides", item_id: 131},
    ],
    drinks: [
     {name: "Fruit Punch  ", item_type: "drinks", item_id: 209},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
     {name: "Agua", item_type: "drinks", item_id: 205},
    ],
   },
   {
    combo_details_id: 181,
    combo_id: 31,
    sides: [
     {name: "Papas fritas  ", item_type: "sides", item_id: 148},
     {name: "papas A", item_type: "sides", item_id: 501},
    ],
    drinks: [
     {name: "Fruit Punch  ", item_type: "drinks", item_id: 209},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
     {name: "Agua", item_type: "drinks", item_id: 205},
    ],
   },
   {
    combo_details_id: 91,
    combo_id: 32,
    sides: [
     {name: "guacamole  ", item_type: "sides", item_id: 700},
     {name: "crema de aguacate", item_type: "sides", item_id: 701},
    ],
    drinks: [
     {name: "Fruit Punch  ", item_type: "drinks", item_id: 209},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
     {name: "Agua", item_type: "drinks", item_id: 205},
    ],
   },

   {
    combo_details_id: 125,
    combo_id: 41,
    sides: [
     {name: " revoltillo ", item_type: "sides", item_id: 243 },
     {name: "sides 44", item_type: "sides", item_id: 244},
     {name: "papas fritas", item_type: "sides", item_id: 244},
    ],
    drinks: [
     {name: "Fruit Punch  ", item_type: "drinks", item_id: 209},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
     {name: "Agua", item_type: "drinks", item_id: 205},
    ],
   }, {
    combo_details_id: 222,
    combo_id: 42,
    sides: [
     {name: " revoltillo con vegetales", item_type: "sides", item_id: 702 },
     {name: "batatas fritas", item_type: "sides", item_id: 703},
     {name: "papas fritas", item_type: "sides", item_id: 244},
    ],
    drinks: [
     {name: "Fruit Punch  ", item_type: "drinks", item_id: 209},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
     {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "jugo de limon", item_type: "drinks", item_id: 705},
    ],
   },

   {
    combo_details_id: 13,
    combo_id: 43,
    sides: [
     {name: " revoltillo con vegetales", item_type: "sides", item_id: 702 },
     {name: "batatas fritas", item_type: "sides", item_id: 703},
     {name: "papas fritas", item_type: "sides", item_id: 244},
    ],
    drinks: [
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
   
     {name: "jugo de limon", item_type: "drinks", item_id: 705},
     {name: "jugo de manzana", item_type: "drinks", item_id: 710},
     {name: "jugo de parcha", item_type: "drinks", item_id: 711},
    ],
   },
   {
    combo_details_id: 15,
    combo_id: 44,
    sides: [
     {name: " revoltillo con vegetales", item_type: "sides", item_id: 702 },
     {name: "batatas fritas", item_type: "sides", item_id: 703},
     {name: "papas fritas", item_type: "sides", item_id: 244},
    ],
    drinks: [
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
   
     {name: "jugo de uva", item_type: "drinks", item_id: 712},
     {name: "jugo de razzberry", item_type: "drinks", item_id: 714},
     {name: "jugo de parcha", item_type: "drinks", item_id: 711},
    ],
   },

   {
    combo_details_id: 300,
    combo_id: 50,
    sides: [
     {name: " complemento1", item_type: "sides", item_id: 716 },
     {name: "complemento2", item_type: "sides", item_id: 717},
     {name: "complemento3", item_type: "sides", item_id: 718},
    ],
    drinks: [
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
    ],
   },

   {
    combo_details_id: 301,
    combo_id: 52,
    sides: [
     {name: " complemento1", item_type: "sides", item_id: 716 },
     {name: "complemento2", item_type: "sides", item_id: 717},
     {name: "complemento3", item_type: "sides", item_id: 718},
    ],
    drinks: [
      {name: "Mountain Dew ", item_type: "drinks", item_id: 720},
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
    ],
   },

   {
    combo_details_id: 302,
    combo_id: 60,
    sides: [
     {name: " cebolla lila", item_type: "sides", item_id: 722 },
     {name: "aguacate", item_type: "sides", item_id: 723},
     {name: "pico de gallo", item_type: "sides", item_id: 724},
    ],
    drinks: [
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "7 Up ", item_type: "drinks", item_id: 210},
    ],
   },

   {
    combo_details_id: 303,
    combo_id: 63,
    sides: [
     {name: " cilantro balsamico", item_type: "sides", item_id: 725 },
     {name: "cebolla roja", item_type: "sides", item_id: 726},
     {name: "dientes de ajo", item_type: "sides", item_id: 727},
    ],
    drinks: [
      {name: "Agua", item_type: "drinks", item_id: 205},
     {name: "Jugo de parcha ", item_type: "drinks", item_id: 711},
    ],
   },
  ],

  Sides:[
    {name:'Yuca', price:5 ,item_type: "sides", item_id: 117,station_id:1},
  {name:'Acompañante B', price:6 ,item_type: "sides", item_id: 13,station_id:1},
  {name:'Acompañante C', price:7, item_type: "sides", item_id: 122,station_id:1},
  {name:'Acompañante D', price:3 ,item_type: "sides", item_id: 157,station_id:1},
  {name:'Acompañante E', price:3 ,item_type: "sides", item_id: 157,station_id:1},
  {name:'Carne molida', price:0 ,item_type: "sides", item_id: 118,station_id:3},
  {name:'Carne de pollo', price:0 ,item_type: "sides", item_id: 119,station_id:3},
  {name:'Doble carne molida', price:1 ,item_type: "sides", item_id: 118,station_id:3},
  {name:'Doble carne de pollo', price:1 ,item_type: "sides", item_id: 119,station_id:3},
],

  Drinks:[

    {name: "Agua", item_type: "drinks", item_id: 2,station_id:1},
    {name: "Pepsi 12oz  ", item_type: "drinks", item_id:4,station_id:1},
    {name: "Agua Nikita", item_type: "drinks", item_id:6,station_id:1},
    {name: "Agua 2", item_type: "drinks", item_id:8,station_id:2},
    {name: "Agua 3 ", item_type: "drinks", item_id: 10,station_id:3, item_price: 1},
    {name: "Coca Cola 12oz ", item_type: "drinks", item_id: 12,station_id:3, item_price: 1},
  ],
  RellenosGratis:[
    { name: 'tocino',price:0.50, item_id: 13,station_id:4},
    { name: 'majada',price:0.50, item_id: 1,station_id:3},
    { name: 'arroz',price:0.40, item_id: 2,station_id:3},
    { name: 'amarillito',price:0.80, item_id: 3,station_id:3},
    { name: 'garbanzos',price:0.50, item_id: 12,station_id:6},
    { name: 'cebolla',price:0.30, item_id: 32,station_id:6},
    { name: 'habichuelas negras',price:0.50, item_id: 22,station_id:6},
    { name: 'almendras',price:0.50, item_id: 42,station_id:6},
    { name: 'aceituna',price:0.40, item_id: 52,station_id:6},
    { name: 'zanahoria',price:0.50, item_id: 62,station_id:6},
    { name: 'tomate',price:0.70, item_id: 72,station_id:6},
    { name: 'pico de gallo',price:0.80,item_id: 82, station_id:6},
    { name: 'cereza',price:0.70,item_id: 92, station_id:6},
    { name: 'queso rallado',price:0.70, item_id: 102,station_id:6},
    { name: 'queso parmesano',price:0.70, item_id: 112,station_id:6},
] ,

RellenosConPago:[
  { name: 'Bacon',price:1.25,item_id: 13, station_id:3},
  { name: 'Ensalada',price:2 ,item_id: 23,station_id:3},
  { name: 'Atun',price:2,item_id: 15, station_id:6},
  { name: 'Pollo 2',price:2.5 ,item_id: 17,station_id:6},
  { name: 'Bacon 2',price:1.25,item_id: 19, station_id:6},
  { name: 'Humus',price:2 ,item_id: 21,station_id:6},
  { name: 'Pollo',price:1,item_id: 33, station_id:9},
  { name: 'Peperoni',price:1 ,item_id: 43,station_id:9},
  { name: 'Carne molida',price:3 ,item_id: 44,station_id:2},
  { name: 'Carne de pollo',price:3 ,item_id: 45,station_id:2},
] ,

  
  item_comboElegido: [],
  informacion: [],
  nTotal:[],
  stationIdentifier:[],
  
  currentFreeArray:[],
  currentPayArray:[],
  extraPriceFT:[],
  extraPricePT:[],
/**
* CurrentPage- Numero para referenciar pagina mostrada(0:combo, 1:Toppings,2:sides,3:Drinks)
*/ 
  currentPage:[0], // 0 combo. 1 sides, 2 toppings ,3drinks 4 specialInstruction
  sidesDelCombo:[],
  drinksDelCombo:[],
  freeTDelCombo:[],
  comboIdentifier:[],

 },
  mounted: function(){ { 
    this.default() }
},
 computed: {
  total: function () {
   let sum = 0;
   for (let i = 0; i < this.item_comboElegido.length; i++) {
    sum += parseFloat(this.item_comboElegido[i].precio);
   }
   this.moveTotal(sum);
   return sum;
  },

  sortedCurrentFreeTPrice: function() {//mayor a menor
    function compare(a, b) {
      if (a.price < b.price)
        return 1;
      if (a.price > b.price)
        return -1;
      return 0;
    }
    return this.currentFreeArray.sort(compare);
  },
  sortedCurrentPayTPrice: function() {//mayor a menor
    function compare(a, b) {
      if (a.price < b.price)
        return 1;
      if (a.price > b.price)
        return -1;
      return 0;
    }
    return this.currentPayArray.sort(compare);
  },
  
 },


 methods: {

default: function(){
  document.getElementById('titulo').innerHTML = 'Estacion Criolla';  
 for(var i=0;i<this.Stations.length;i++){
  if(this.Stations[i].station_name=='Estación Criolla'){
      this.stationIdentifier.push(   
      this.Stations[i].station_id)
     // alert('sali de def con  :'+this.Stations[i].station_name +' empezando ');
    }
 } 
  document.getElementById("apagarCombo_Cuadro").style.display='inline-block';
  
},
 
 //+++++++++++++++++++++COMBO++++++++++++++++++++++++++++++++++++++++++++++++++++
 borrarComboAnterior: function(checkID){


  var cOpciones = document.getElementsByName("chCombo");
  for (var i = 0; i < cOpciones.length; i++){
    
    if ( (cOpciones[i].type == "checkbox") & (cOpciones[i].id !=checkID)){
     //alert(cOpciones[i].id + ' no es ' + checkID);
      cOpciones[i].checked = false;
    }
    }
 },
 
 permitirPasoCombo: function(){
     var b = this.countCombos();
     if (b == 1){ /*eja pasar*/this.pasarPantalla2();}
   
      else { alert("Seleccciona 1 Combo ");  }
   },


   //cuenta # de combos marcados
   countCombos: function () {
     var cOpciones = document.getElementsByName("chCombo");
     var count = 0;
     for (var c = 0; c < cOpciones.length; c++) {
      if ((cOpciones[c].type == "checkbox") & (cOpciones[c].checked === true)) {
       count++;
      }
     }
     return count;
    },
   /**
* Nos dice cual pantalla se debe mostrar luego de la pantalla de combo
* @returns el numero de acompañantes del combo
*/
   pasarPantalla2: function(){ 
      document.getElementById("apagarCombo_Cuadro").style.display='none';    
     var cCheckBox = document.getElementsByName("chCombo");
     for(var i=0;i< cCheckBox.length;i++){
 
       if(cCheckBox[i].checked===true & (cCheckBox[i].type == "checkbox"))
       {var nOfSides=this.buscarComboSides(cCheckBox[i].id);
        var nOfFreeTAllow=this.buscarComboToppingsG(cCheckBox[i].id);//0 nada, -1 todos los que quiera , 2
        var nOfPayTAllow=this.buscarComboToppingsP(cCheckBox[i].id);
        var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].id);
        alert('nS:'+nOfSides+ '  nfT:'+nOfFreeTAllow +'  npT:'+nOfPayTAllow + '  nD:'+nOfDrinks)
         }
        
        } 
        
        if(nOfSides >0 ) // 0 no tiene sides
         {  document.getElementById("apagarSides_Cuadro").style.display='inline-block';
            //alert('tiene Sides') 
            this.currentPage.shift()
            this.currentPage.push(   1) 
           }
      else if(nOfFreeTAllow >-1 ||nOfPayTAllow > -1 ){//-1 no tiene ,0 tiene pero ninguno es gratis,  + cant que te sale gratis
            
          //  alert('tiene Free Toppings o Pay')
            if(nOfFreeTAllow >-1){
             // alert('tiene Free Toppings')
             document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block'; 
            }
            if(nOfPayTAllow >-1){
             // alert('tiene Pay Toppings')
              document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';
             if(nOfFreeTAllow < 0  ){//si no hay free
              
              document.getElementById("list2").style.left='300px';             
            } 
              }                         
            this.currentPage.shift()
            this.currentPage.push(2)
          }                
     
      else if(nOfDrinks >0 ) // 0 no tiene bebidas
         {  document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
            //alert('tiene Bebidas') 
            this.currentPage.shift()
            this.currentPage.push( 3) 
         }
        else{ 
       //pantalla Special Instructions
       document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
       
       alert('combo sin nada mas') 
       this.currentPage.shift()
       this.currentPage.push(4) 
       alert('this.currentPage= '+this.currentPage[0])
    }            
  
   },
/**
* Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
*Es la segunda y tercera iteracion de pantallas
*
*/
   pasarPantalla3: function(){
    var cCheckBox = document.getElementsByName("chCombo");
    for(var i=0;i< cCheckBox.length;i++){

      if(cCheckBox[i].checked===true & (cCheckBox[i].type == "checkbox"))
      {var nOfSides=this.buscarComboSides(cCheckBox[i].id);
       var nOfFreeTAllow=this.buscarComboToppingsG(cCheckBox[i].id);//0 nada, -1 todos los que quiera , 2
       var nOfPayTAllow=this.buscarComboToppingsP(cCheckBox[i].id);
       var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].id);
       //alert('nS:'+nOfSides+ '  nfT:'+nOfFreeTAllow +'  npT:'+nOfPayTAllow + '  nD:'+nOfDrinks)
        }     
       }

       switch(this.currentPage[0]) {
        
        case 1://sides
        
          document.getElementById("apagarSides_Cuadro").style.display='none'; 
       //   alert('estas en Sides')
          
          if(nOfFreeTAllow >-1 ||nOfPayTAllow > -1 ){//-1 no tiene ,0 tiene pero ninguno es gratis,  + cant que te sale gratis
            
        //  alert('tiene Free Toppings o Pay')
          if(nOfFreeTAllow >-1){
           // alert('tiene Free Toppings')
           document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block'; 
          }
          if(nOfPayTAllow >-1){
           // alert('tiene Pay Toppings')
            document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';
           if(nOfFreeTAllow < 0  ){//si no hay free
            
            document.getElementById("list2").style.left='300px';             
          } 
            }                         
          this.currentPage.shift()
          this.currentPage.push(2)
        }    
          if(nOfDrinks>0){
            document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
            this.currentPage.shift()
            this.currentPage.push(3) }
         else{
         //  alert('no drinks')        
           document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
          this.currentPage.shift()
          this.currentPage.push(4)
          break;
          }   
          

        case 2://toppings
          document.getElementById("apagarFreeToppings_Cuadro").style.display='none';
          document.getElementById("apagarPayToppings_Cuadro").style.display='none';
       //   alert('estas en Toppings')
            
          if(nOfDrinks>0){
             document.getElementById("apagarDrinks_Cuadro").style.display='inline-block'; 
             this.currentPage.shift()
             this.currentPage.push( 3)}
          else{
            document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
            this.currentPage.shift()
            this.currentPage.push(4)}         
          break;

          case 3://drinks
          document.getElementById("apagarDrinks_Cuadro").style.display='none';
        //  alert('estas en Drinks')
          document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';
          this.currentPage.shift()
          this.currentPage.push(4)
          break;

        default:
          // code block
          //Special Instruction
      }
  
  },

revirarPantalla: function(){
  document.getElementById("apagarCombo_Cuadro").style.display='none';    
  var cCheckBox = document.getElementsByName("chCombo");
  for(var i=0;i< cCheckBox.length;i++){

    if(cCheckBox[i].checked===true & (cCheckBox[i].type == "checkbox"))
    {var nOfSides=this.buscarComboSides(cCheckBox[i].id);
     var nOfFreeTAllow=this.buscarComboToppingsG(cCheckBox[i].id);//0 nada, -1 todos los que quiera , 2
     var nOfPayTAllow=this.buscarComboToppingsP(cCheckBox[i].id);
     var nOfDrinks=this.buscarComboDrinks(cCheckBox[i].id);
     alert('nS:'+nOfSides+ '  nfT:'+nOfFreeTAllow +'  npT:'+nOfPayTAllow + '  nD:'+nOfDrinks)
      }
     
     }

     switch(this.currentPage[0]) {
        
  
      case 1://sides
        document.getElementById("apagarSides_Cuadro").style.display='none'; 
       // alert('estas en Sides')
        document.getElementById("apagarCombo_Cuadro").style.display='inline-block'; 
        this.currentPage.shift()
        this.currentPage.push(0)     
        break;

        case 2://toppings
              document.getElementById("apagarFreeToppings_Cuadro").style.display='none';
              document.getElementById("apagarPayToppings_Cuadro").style.display='none';
            //  alert('estas en Toppings')

            if(nOfSides>0){
              document.getElementById("apagarSides_Cuadro").style.display='inline-block';
              this.currentPage.shift()
          this.currentPage.push(1)
            }
              else{document.getElementById("apagarCombo_Cuadro").style.display='inline-block';}
              
              break;
        case 3://drinks
        document.getElementById("apagarDrinks_Cuadro").style.display='none';
       // alert('estas en Drinks')

        if(nOfSides>0){
          document.getElementById("apagarSides_Cuadro").style.display='inline-block';
          this.currentPage.shift()
          this.currentPage.push(1)
          break; 
        }

        else if(nOfFreeTAllow>-1 || nOfPayTAllow>-1 ){
          if(nOfFreeTAllow>-1){
            document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
           }          
           if(nOfPayTAllow>-1 ){
           document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';  
           }
           this.currentPage.shift()
           this.currentPage.push(2)
           break;
           }
        else{
            document.getElementById("apagarCombo_Cuadro").style.display='inline-block'
           }

           case 4://special instructions
           alert('4 : special instruction')
             document.getElementById("apagarSpecialInstruction_Cuadro").style.display='none'
                if(nOfDrinks > 0){
                  document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
                  this.currentPage.shift()
                  this.currentPage.push(3)
                  break;
                }
                else if(nOfFreeTAllow>-1 || nOfPayTAllow>-1 ){
                  if(nOfFreeTAllow>-1){
                    document.getElementById("apagarFreeToppings_Cuadro").style.display='inline-block';
                  }          
                  if(nOfPayTAllow>-1 ){
                  document.getElementById("apagarPayToppings_Cuadro").style.display='inline-block';  
                  }
                  this.currentPage.shift()
                  this.currentPage.push(2)
                  break;
                  }
                else if(nOfSides>0){
                  document.getElementById("apagarSides_Cuadro").style.display='inline-block';
                  this.currentPage.shift()
                  this.currentPage.push(1)
                  break; 
                }
        
                
                else{
                
                    document.getElementById("apagarCombo_Cuadro").style.display='inline-block'
                  }
         default:
        // code block
        //Special Instruction  
    }

},

   apagaCombo: function(){
    document.getElementById("apagarCombo_Cuadro").style.display='none';
   },
/**
* Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
* @returns el numero de acompañantes del combo
*/
   buscarComboSides: function( idCheckbox ){
     for(var i=0;i< this.Combos.length;i++){
       if( this.Combos[i].combo_id ==idCheckbox){
        // alert('ID : ' + this.Combos[i].combo_id +'  tiene :'+this.Combos[i].number_of_sides+ ' sides')
       //envia valor de los sides al array
        this.sidesDelCombo.shift()
        this.sidesDelCombo.push(   this.Combos[i].number_of_sides)


         return this.Combos[i].number_of_sides;
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
       // alert('ID : ' + this.Combos[i].combo_id +'  tiene :'+this.Combos[i].freeToppingsAllow + ' toppings gratis')
       this.freeTDelCombo.shift()
       this.freeTDelCombo.push(  this.Combos[i].freeToppingsAllow)
        return this.Combos[i].freeToppingsAllow;
      }
    }
  },
/**
* Toma de parametro el id del checkbox elegido y verifica cual combo comparte el mismo id
* @returns el numero de toppings no gratis permitidos del combo
*/
  buscarComboToppingsP: function( idCheckbox ){
    for(var i=0;i< this.Combos.length;i++){
      if( this.Combos[i].combo_id ==idCheckbox){
        return this.Combos[i].payToppingsAllow;
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
      this.drinksDelCombo.push(   this.Combos[i].number_of_drinks)
      return this.Combos[i].number_of_drinks;
    }
  }
},

  //+++++++++++++++++++++++++++++++++++Sides+++++++++++++++++++++++++++++++++++++++++
/**
* Verifica que el # de acompañantes seleccionados del combo sea igual al # de acompañantes permitidos
* Si el # es igual,entonces permite el paso a la proxima pantalla
*/
limitarSides: function(){
   var c=this.countSides();
if(c==this.sidesDelCombo){
  //deja pasar
  this.pasarPantalla3();
}
else{
alert('debe elegir '+this.sidesDelCombo +' de los acompañantes' )
}

},
/**
*Cuenta el # de acompañantes marcados en el combo
*/
countSides: function () {
  var cOpciones = document.getElementsByName("chSides");
  var count = 0;
  for (var c = 0; c < cOpciones.length; c++) {
   if ((cOpciones[c].type == "checkbox") & (cOpciones[c].checked === true)) {
    count++;
   }
  }
  return count;
 },
  //++++++++++++++++++++++++++++FREE TOPPINGS    & Pay TOPPINGS+++++++++++++++++++++++++++++++++++++
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
/**
*Cuenta el # de ingredientes gratis marcados en el combo y los acomoda en un arreglo
*/
  addRemoveTGtoArray: function(checkID){
      var cOpciones=document.getElementsByName("chFree");
      for( var i=0;i<cOpciones.length;i++){

        if(cOpciones[i].checked===true && cOpciones[i].id==checkID){ //lo activo
          for(var j=0;j<this.RellenosGratis.length;j++){ //añade el check al array
                if(this.RellenosGratis[j].item_id==checkID){
                    this.currentFreeArray.push(this.RellenosGratis[j])
                }
          }       
        }
        if(cOpciones[i].checked===false && cOpciones[i].id==checkID){ //lo desactivo
          for(var j=0;j<this.currentFreeArray.length;j++){
                if(  this.currentFreeArray[j].item_id==checkID){
                  this.remove( this.currentFreeArray,j)
                }
          }       
        }
      }
   },
/**
*Cuenta el # de ingredientes gratis, verifica si el cliente sobrepasa la cantidad
*Suma el costo extra por tomar mas ingredientes de los gratis
*/
   limitarFreeT: function(){
     var c=this.countFreeT();
     if(c>this.freeTDelCombo){
       var extraPrecio=0;
       var adicional=c- this.freeTDelCombo;
       var arr=this.sortedCurrentFreeTPrice
       alert('se pasa por ' + adicional)
      for(var m=0;m<this.currentFreeArray.length;m++){//sumar la diferencia
        
        if( m< adicional ){
            extraPrecio= extraPrecio +arr[m].price;          
        }
      }
      this.extraPriceFT.shift()
      this.extraPriceFT.push(extraPrecio)
    alert('extraPrecio: ' + extraPrecio)
     }
   },
//++++++++++++++++++++++++++++++++++++PAY Toppings++++++++++++++++
/**
*Cuenta el # de ingredientes pagados marcados en el combo
*/
   countPayT: function () {
    var cOpciones = document.getElementsByName("chPay");
    var count = 0;
    for (var c = 0; c < cOpciones.length; c++) {
     if ((cOpciones[c].type == "checkbox") & (cOpciones[c].checked === true)) {
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

      if(cOpciones[i].checked===true && cOpciones[i].id==checkID){ //lo activo
        for(var j=0;j<this.RellenosConPago.length;j++){ //añade el check al array
              if(this.RellenosConPago[j].item_id==checkID){
                  this.currentPayArray.push(this.RellenosConPago[j])
              }
        }       
      }
      if(cOpciones[i].checked===false && cOpciones[i].id==checkID){ //lo desactivo
        for(var j=0;j<this.currentPayArray.length;j++){
              if(  this.currentPayArray[j].item_id==checkID){
                this.remove( this.currentPayArray,j)
              }
        }       
      }
    }
 },
 /**
*Suma el costo extra por tomar ingredientes de los pagados
*/
    updatePayTPrice: function(){ 
    var payTPrecio=0;
      for(var i=0; i < this.currentPayArray.length; i++){
          payTPrecio = payTPrecio + this.currentPayArray[i].price;          
      }
     this.extraPricePT.shift()
     this.extraPricePT.push(payTPrecio)
     alert('extraPrecioPT: ' + payTPrecio) 
  
    
  },
/**
*Elimina elemento de x array
*@param array  el arreglo a escoger
*@param index  el indice a eliminar dentro del arreglo
*/
   remove: function(array,index){
    this.$delete(array, index) 
   },
  //
  //++++++++++++++++++++++++++++++++++DRINKS++++++++++++++++++++++++++++++++++++++++++++
pasarPantallaDrink: function(){
 
     document.getElementById("apagarSides_Cuadro").style.display='none';
     document.getElementById("apagarDrinks_Cuadro").style.display='inline-block';
   },

   popUpItemSpecificationText: function(){
    
    document.getElementById("apagarSpecialInstruction_Cuadro").style.display='inline-block';

   },

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
limitarDrinks: function(){
    var c=this.countDrinks();
     //alert('c  :'+c+' drinksDelCombo:'+this.drinksDelCombo)
 if( c ==this.drinksDelCombo){
  
   //deja pasar
   this.pasarPantalla3();
 }
 else{
 alert('debe elegir '+this.drinksDelCombo +' de las bebidas' )
 }
 
 },
   
/**
* Se encarga de borrar los checkbox,deshabilitar la pantalla de SpecialInstruction y habilitar la pantalla de Combo
*/ 
   pasarMain: function(){
     this.borrarCheckBoxes;
     this.borrarCheckBoxes;
     document.getElementById("apagarDrinks_Cuadro").style.display='none';
    document.getElementById("apagarSpecialInstruction_Cuadro").style.display='none';
    document.getElementById("apagarCombo_Cuadro").style.display='inline-block';
   },

   borrarDrinkAnterior: function(checkID){


    var cOpciones = document.getElementsByName("chDrinks");
    for (var i = 0; i < cOpciones.length; i++){
      
      if ( (cOpciones[i].type == "checkbox") & (cOpciones[i].id !=checkID)){
       
        cOpciones[i].checked = false;
      }
    
      }
   },
 
   //+++++++++++++++++++++++NO SEEEEEEEEEEEEEEEEEEEEEEEEEEEEE+++++++++++++++++++++++++++++++++++,
 /* 
   moveTotal: function(sum){
     this.nTotal.shift()
     this.nTotal.push({ sum})
    
    },
 
   borrarOrden: function (texto) {
    for (var i = 0; i < this.item_comboElegido.length; i++) {
     if (this.item_comboElegido[i].pedido == texto) {
      this.item_comboElegido.splice(i, 1);
     }
     //;
    }
    this.disableCheckOut();
   },
 
   disableCheckOut: function () {
    if (this.item_comboElegido.length <1) {
    //  alert('ya no tiene')
     document.getElementById("checkButton").disabled = true;
     document.getElementById("checkButton").style.opacity = 0.5;
    } else {
    // alert('tiene mas de uno')
     document.getElementById("checkButton").disabled = false;
    
     document.getElementById("checkButton").style.opacity = 1;
    }
   },
 
 
   //++++++++++++++++++++++++++++++SIDES+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 
  countSides: function () {
    var sOpciones = document.getElementsByName("chSides");
    var count = 0;
    for (var c = 0; c < sOpciones.length; c++) {
     if ((sOpciones[c].type == "checkbox") & (sOpciones[c].checked === true)) {
      count++;
     }
    }
    //alert("count sides: " + count);
    return count;
   },
 
 
   //++ +++++++++++++++++++++++++++++++++++++++DRINKS++++++++++++++++++++++++++++++++++++++++++++++++++++++
   countDrinks: function () {
    var dOpciones = document.getElementsByName("chDrinks");
    var count = 0;
    for (var c = 0; c < dOpciones.length; c++) {
     if ((dOpciones[c].type == "checkbox") & (dOpciones[c].checked === true)) {
      count++;
     }
    }
    // alert("count drinks: " + count);
    return count;
   },
   */
 
   //++++++++++++++++++++INDIVIDUAL ITEMS++++++++++++++++++++++++++++++++
   activarIndividual: function () {
    this.borrarCheckCombos();
 
    document.getElementById("ItemsContainer").style.display = "inline-block";
    document.getElementById("CombosContainer").style.display = "none";
    document.getElementById("tOferta").innerHTML= "Individual";
   },

   
   activarCombo: function () {
    this.borrarCheckItems();
    document.getElementById("ItemsContainer").style.display = "none";
    document.getElementById("CombosContainer").style.display = "inline-block";
    document.getElementById("tOferta").innerHTML= "Combo";
   },
    defContainer: function(){
 
      document.getElementById("SideContainer").style.display = "none";
      document.getElementById("DrinksContainer").style.display = "none";
   },
   borrarCheckCombos: function () {
       
     var items2 = document.getElementsByName('chCombo')
     for (var i = 0; i < items2.length; i++) {
       if (items2[i].type == 'checkbox') 
       {items2[i].checked = false}
     }
   },
 /**
* Quita todas las marcas de los checkboxes que acompañan a los Free Toppings
*/ 
   borrarCheckFreeT: function () {
    var items = document.getElementsByName('chFree')
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox')
      {items[i].checked = false} 
    }
  },  
 /**
* Quita todas las marcas de los checkboxes que acompañan a los Pay Toppings
*/ 
  borrarCheckPayT: function () {
    var items = document.getElementsByName('chPay')
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'checkbox')
      {items[i].checked = false} 
    }
  },
/**
* Quita todas las marcas de los checkboxes que acompañan a los Sides
*/
    borrarCheckSides: function() {
      
     var items = document.getElementsByName('chSides')
     for (var i = 0; i < items.length; i++) {
       if (items[i].type == 'checkbox') 
       {items[i].checked = false}
     }
   },

/**
* Quita todas las marcas de los checkboxes que acompañan a los Drinks
*/
   borrarCheckDrinks: function () {
     var items = document.getElementsByName('chDrinks')
     for (var i = 0; i < items.length; i++) {
       if (items[i].type == 'checkbox')
       {items[i].checked = false} 
     }
   },
/**
* Quita todas las marcas de los checkboxes que acompañan a los Items
*/ 
   borrarCheckItems: function () {
    var items = document.getElementsByName("chItem");
    for (var i = 0; i < items.length; i++) {
     if (items[i].type == "checkbox") {
      items[i].checked = false;
     }
    }
   },
/**
* Boora todos los checkboxes en el sistema 
*/
   borrarCheckBoxes: function(){
     this.borrarCheckCombos;
     this.borrarCheckSides;
     this.borrarCheckFreeT;
     this.borrarCheckPayT;
     this.borrarCheckDrinks;
     this.borrarCheckItems;

   },
  
 //+++++++++++++++++++++++++++++EDIT++++++++++++++++++++++++
 /**
* Desablita todas las pantallas ,menos la de combo
* Guarda el id de la estacion escogida en un array para referencia 
*@param name nombre de la estacion
*@param stationID el ID de la estacion presionada
*/
 checkStation: function(name, stationID){
   
   document.getElementById('titulo').innerHTML = name;
   document.getElementById("apagarCombo_Cuadro").style.display = "inline-block";
   document.getElementById("apagarFreeToppings_Cuadro").style.display = "none";
   document.getElementById("apagarPayToppings_Cuadro").style.display = "none";
   document.getElementById("apagarSides_Cuadro").style.display = "none";
   document.getElementById("apagarDrinks_Cuadro").style.display = "none";

   this.stationIdentifier.shift()
  this.stationIdentifier.push(   stationID)
    //alert('Station name : '+ name + 'stationID: '+stationID+ '/StationIdentifier '+ this.stationIdentifier[0])      
             
 
 },
  
 //________________________________________________________________________
   
 
  },
 });
