from flask import jsonify
from dao.OrderDao import OrderDao
from dao.DashboardDao import DashboardDao
from dictionaryMapping import *
from handler.EmailHandler import EmailHandler
from datetime import datetime
from pytz import timezone
import time
import psycopg2
from json2html import *
from config.dbconfig import pg_config


def notInt(s):
    try:
        int(s)
        return False
    except ValueError:
        return True

def notFloat(s):
    try:
        float(s)
        return False
    except ValueError:
        return True

class OrderHandler:

    #************************************************************************************
    conn = psycopg2.connect(
        host=pg_config['host'],
        port=pg_config['port'],
        user=pg_config['user'],
        password=pg_config['password'],
        database=pg_config['database']
    )
    # ************************************************************************************


    def getTodaysOrdersByDate(self):
        dao = OrderDao()
        dateFormat = "%Y-%m-%d"
        timeFormat = "%H:%M"
        now_PR = datetime.now(timezone('America/Puerto_Rico'))
        today = now_PR.strftime(dateFormat)
        # date = json.get('date')
        orders = dao.getOrdersByDate(today)
        if not orders:
            return jsonify(None)

        mapped_result = []
        for o in orders:

            combos = dao.getCombosByOrderId(o[0])
            if combos is not None:
                mapped_combos = []
                for c in combos:
                    if c[1] is not None:
                        sides = c[1].split(",")
                    if c[1] is None:
                        sides =  None
                    if c[4] is not None:
                        ingredients = c[4].split(",")
                    if c[4] is None:
                        ingredients = None
                    mapped_combos.append(mapCombosToDict(c, sides, ingredients))

            items = dao.getItemsByOrderId(o[0])
            if len(items) > 0:
                mapped_items = []
                for i in items:
                    mapped_items.append(mapItemsToDict(i))

            if len(combos) > 0 and len(items) > 0:
                mapped_combosandItems = mapCombosAndItemsToDict(mapped_combos, mapped_items)

            elif len(combos) > 0:
                mapped_combosandItems = mapCombosAndItemsToDict(mapped_combos, None)

            elif len(items) > 0:
                mapped_combosandItems = mapCombosAndItemsToDict(None, mapped_items)

            mapped_result.append(mapOrdersViewToDict(o, mapped_combosandItems))

        return jsonify(mapped_result)

    def deleteOrderByID(self, json):
        dao = OrderDao()
        order_id = json.get('order_id')
        if order_id is None or order_id is "":
            return jsonify("Malformed request"), 400
        if notInt(order_id):
            return jsonify("Malformed request"), 400
        cursor = self.conn.cursor()
        result = dao.deleteOrderByOrderID(order_id, cursor)
        if result is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting order"), 409
        result1 = dao.deleteItemsOfOrderByOrderID(order_id, cursor)
        if result1 is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting items of the order"), 409
        result2 = dao.deleteCombosOrderByOrderID(order_id, cursor)
        if result2 is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting items of the order"), 409
        self.conn.commit()
        return jsonify("Order successfully deleted"), 200






#This method is the most importnt one of the ordering system. It receives all the details of one order and inserts it on the database
#It is composed of multiple insertions to the database and after each insertion, it verifies if the insertion was properly made to the database.
#If an error is found during the process, it is able to do a rollback and revert al the insertions, to avoid corrupted data
    def checkout(self, jsonn, hour):
        orderDao = OrderDao()

        # Primero que nada, verificamos si el sistema permitia ordenes en este momento
        timeFormat = "%H:%M"
        operating_hours = orderDao.getOperatingHours()
        if time.strptime(hour, timeFormat) < time.strptime(operating_hours[0], timeFormat) or \
                time.strptime(hour, timeFormat) > time.strptime(operating_hours[1], timeFormat):
            return jsonify("Not accepting orders right now"), 400

        firstname = jsonn['user']['name']
        lastname = jsonn['user']['last_name']
        email = jsonn['user']['email']
        phone = jsonn['user']['phone']
        ext = jsonn['user']['ext']
        order_price = jsonn['order']['price']
        order_tax = jsonn['order']['order_tax']
        payment_method = jsonn['order']['payment_method']
        building = jsonn['location']['building']
        room = jsonn['location']['room']
        combos = jsonn['order']['combos']
        items = jsonn['order']['items']
        newClient = False


        #Verifica que tenga data en los campos requeridos
        if firstname is None or lastname is None or email is None or phone is None or order_price is None \
                or payment_method is None or building is None or room is None:
            return jsonify(Error="Malformed Request"), 400
        if firstname is "" or lastname is "" or email is "" or phone is "" or order_price is "" \
                or payment_method is "" or building is "" or room is "":
            return jsonify(Error="Malformed Request"), 400

        # Verificar si el cliente existe
        client_id = orderDao.getClientID(email)
        cursor = self.conn.cursor()
        # Si el cliente no existe, registralo
        if client_id is not None:
            orderDao.updateClientInformation(firstname, lastname, client_id, cursor)
        else:
            client_id = orderDao.createClient(firstname, lastname, email, cursor)
            newClient = True

        # Se vuelve a verificar si el cliente fue creado con exito
        if client_id is None:
            self.conn.rollback()
            return jsonify(Error="Error creating client"), 400


        #Se procede entonces a crear la orden
        order_id = orderDao.createOrder(client_id, building, room, phone, ext, order_price, payment_method, cursor)

        # Si la orden no fue creada exitosamente, devuelve error
        if order_id is None:
            self.conn.rollback()
            return jsonify(Error="Error creating order"), 400

        #Si hay combos en la orden, crealos
        email_combo = []
        email_item = []
        if len(combos) > 0:
            for r in combos:
                combo_id = r['combo_id']
                sides = r['sides']
                drink = r['drink']
                ingredients = r['ingredients']
                special_instructions = r['special_instructions']

                combo_details_id = OrderDao().createComboDetails(combo_id, sides, drink, order_id, ingredients, special_instructions, cursor)
                if combo_details_id is None:
                    self.conn.rollback()
                    return jsonify(Error="Error creating order. Error in combo details"), 400
                combo_name = orderDao.getComboNameByID(combo_id)
                email_combo.append(mapEmailComboToDict(combo_name[0], ingredients, sides, drink, special_instructions))

        if items is not "":
            itemss = items.split(",")
            for i in itemss:
                item_id = i
                wep2 = OrderDao().addItemToOrder(order_id, item_id, cursor)
                if wep2 is None:
                    self.conn.rollback()
                    return jsonify(Error="Error creating order. Error adding items to order"), 400
                email_item.append(orderDao.getItemNameByID(i))

        self.conn.commit()
        # self.conn.rollback()

        #Hay que enviarle email con recibo al cliente > ahi se usa el tax que me envian

        hand = EmailHandler()
        if payment_method == "cash":
            metodoDePago = "Efectivo"
        else:
            metodoDePago = "ATH Móvil"

        deliveryFee = DashboardDao().getDeliveryFee()
        email_to = mapClientInformationToDict([firstname, lastname, email])

        jsonnn = {
            "Cliente": {
                "name": firstname + " " + lastname,
                "email": email,
                "Tel": phone,
                "Ext": ext
            },
            "Localizacion": {
                "Edificio": building,
                "Oficina": room
            },
            "Orden": {
                "Combos": email_combo,

                "Artículos": email_item
            },
            "Cargo por envío" : str(deliveryFee[0]),
            "Tax": str(order_tax),
            "Precio Total": str(order_price),
            "Metodo de pago": metodoDePago
        }
        html = json2html.convert(jsonnn)
        subject = "Recibo de compra en Mama Mia Cafetería"
        emailTo = [email_to]

        hand.sendEmail(subject, emailTo, html)

        return jsonify(newClient), 201 #status 201



