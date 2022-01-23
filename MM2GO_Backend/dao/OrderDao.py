import psycopg2
from datetime import datetime
from pytz import timezone
from config.dbconfig import pg_config

class OrderDao:

    conn = psycopg2.connect(
        host=pg_config['host'],
        port=pg_config['port'],
        user=pg_config['user'],
        password=pg_config['password'],
        database=pg_config['database']
    )

    def getClientID(self, email):
        cursor = self.conn.cursor()
        query = "select client_id from client where client_email =  %s"
        try:
            cursor.execute(query, (email, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        return result

    def updateClientInformation(self, firstname, lastname, client_id, cursor):
        query = "update client set client_firstname = %s, client_lastname = %s where client_id = %s"
        try:
            cursor.execute(query, (firstname, lastname, client_id,))
        except psycopg2.Error as e:
            return
        return "Done"

    def createClient(self, firstname, lastname, email, cursor):
        query = "insert into client (client_firstname, client_lastname, client_email, is_subscribed) values (%s, %s, %s, 0) returning client_id"
        try:
            cursor.execute(query, (firstname, lastname, email, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        user_id = result[0]
        return user_id

    def createOrder(self, client_id, building, room, phone, ext, order_price, payment_method, cursor):
        dateFormat = "%Y-%m-%d"
        timeFormat = "%H:%M:%S"
        now_PR = datetime.now(timezone('America/Puerto_Rico'))
        query = "insert into public.order (building, room, phone_number, ext, order_price, payment_method, order_date, client_id, o_is_deleted) " \
                "values (%s, %s, %s, %s, %s, %s, %s, %s, 0) returning order_id"
        try:
            cursor.execute(query, (building, room, phone, ext, order_price, payment_method, now_PR.strftime(dateFormat), client_id, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        order_id = result[0]
        return order_id

    def addComboToOrder(self, order_id, combo_details_id, cursor):
        query = "insert into comboinorder (order_id, combo_details_id) values (%s, %s)"
        try:
            cursor.execute(query, (order_id, combo_details_id, ))
        except psycopg2.Error as e:
            return
        return "Done"

    def createComboDetails(self, combo_id, sides, drink, order_id, ingredients, special_instructions, cursor):
        query = "insert into combodetails (combo_id, sides, drink, ingredients, special_instructions, order_id, is_deleted) " \
                "values (%s, %s, %s, %s, %s, %s, 0) returning combo_details_id"
        try:
            cursor.execute(query, (combo_id, sides, drink, ingredients, special_instructions, order_id, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        combo_details_id = result[0]
        return combo_details_id

    def addItemToOrder(self, order_id, item_id, cursor):
        query = "insert into iteminorder (order_id, item_id, is_deleted) " \
                "values (%s, %s, 0)"
        try:
            cursor.execute(query, (order_id, item_id, ))
        except psycopg2.Error as e:
            return
        return "Done"

    def getOrdersByDate(self, date):
        cursor = self.conn.cursor()
        query = "SELECT order_id, client_firstname, client_lastname, phone_number, building, room, payment_method, order_price, ext FROM public.order " \
                "natural inner join client where order_date = %s and o_is_deleted = 0"
        try:
            cursor.execute(query, (date, ))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def deleteOrderByOrderID(self, order_id, cursor):
        query = "update public.order set o_is_deleted = 1 where order_id = %s"
        try:
            cursor.execute(query, (order_id,))
        except psycopg2.Error as e:
            return "Error"
        return "Done"

    def deleteItemsOfOrderByOrderID(self, order_id, cursor):
        query = "update iteminorder set is_deleted = 1 where order_id = %s"
        try:
            cursor.execute(query, (order_id,))
        except psycopg2.Error as e:
            return "Error"
        return "Done"

    def deleteCombosOrderByOrderID(self, order_id, cursor):
        query = "update combodetails set is_deleted = 1 where order_id = %s"
        try:
            cursor.execute(query, (order_id,))
        except psycopg2.Error as e:
            return "Error"
        return "Done"


    def getCombosByOrderId(self, order_id):
        cursor = self.conn.cursor()
        query = "select combo_name, sides, drink, combo_price, ingredients, special_instructions from combo natural inner join combodetails " \
                "where order_id = %s"
        try:
            cursor.execute(query, (order_id, ))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getItemsByOrderId(self, order_id):
        cursor = self.conn.cursor()
        query = "select item_name, item_price from item natural inner join iteminorder where order_id = %s"
        try:
            cursor.execute(query, (order_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getOperatingHours(self):
        cursor = self.conn.cursor()
        query = "select operating_hours_from, operating_hours_to from uniquedata"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        self.conn.commit()
        return result

    def getComboNameByID(self, combo_id):
        cursor = self.conn.cursor()
        query = "select combo_name from combo where combo_id = %s"
        try:
            cursor.execute(query,(combo_id, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        self.conn.commit()
        return result

    def getItemNameByID(self, item_id):
        cursor = self.conn.cursor()
        query = "select item_name from item where item_id = %s"
        try:
            cursor.execute(query, (item_id,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        self.conn.commit()
        return result