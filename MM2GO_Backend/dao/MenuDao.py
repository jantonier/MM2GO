import psycopg2
from config.dbconfig import pg_config

class MenuDao:

    conn = psycopg2.connect(
        host= pg_config['host'],
        port= pg_config['port'],
        user= pg_config['user'],
        password= pg_config['password'],
        database= pg_config['database']
    )



    def getAllActiveStationsWithItems(self):
        cursor = self.conn.cursor()
        query = "select station_id, station_name, is_active from station natural inner join iteminstation natural inner join item " \
                "where (is_active = 1 and is_deleted = 0 and item_type = 'side')" \
                " or (is_active = 1 and is_deleted = 0 and item_type = 'drink') " \
                "or (is_active = 1 and is_deleted = 0 and item_type = 'protein')"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAllActiveStationsWithCombos(self):
        cursor = self.conn.cursor()
        query = "select station_id, station_name, is_active from station natural inner join combo where is_active = 1 and is_deleted = 0"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveComboByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select combo_id, combo_name, num_of_sides, combo_price, photo_url, is_active, num_of_free_toppings, num_of_paid_toppings," \
                "num_of_drinks, description from combo where station_id = %s and is_active = 1 and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveComboSidesByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "natural inner join station where station_id = %s and item.is_active = 1 and item_type = 'side'" \
                "and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveComboFreeToppingsByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "natural inner join station where station_id = %s and item.is_active = 1 and item_type = 'freetopping'" \
                "and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveComboPaidToppingsByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "natural inner join station where station_id = %s and item.is_active = 1 and item_type = 'paidtopping'" \
                "and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result


    def getActiveComboDrinksByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "natural inner join station where station_id = %s and item.is_active = 1 and item_type = 'drink'"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getActiveIndividualItemsByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "natural inner join station where (station_id = %s and item.is_active = 1 and is_deleted = 0 and item_type = 'side')" \
                "or (station_id = %s and item.is_active = 1 and is_deleted = 0 and item_type = 'drink') " \
                "or (station_id = %s and item.is_active = 1 and is_deleted = 0 and item_type = 'protein')"
        try:
            cursor.execute(query, (station_id, station_id, station_id))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def createClientSubscribed(self, client_firstname, client_lastname, client_email):
        cursor = self.conn.cursor()
        query = "insert into client (client_firstname, client_lastname, client_email, is_subscribed) values (%s, %s, %s, 1)"
        try:
            cursor.execute(query, (client_firstname, client_lastname, client_email,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def subscribeExistentClient(self, client_firstname, client_lastname, client_id):
        cursor = self.conn.cursor()
        query = "update client set client_firstname = %s, client_lastname = %s, is_subscribed = 1 where client_id = %s"
        try:
            cursor.execute(query, (client_firstname, client_lastname, client_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def unsubscribeExistentClient(self, client_id):
        cursor = self.conn.cursor()
        query = "update client set is_subscribed = 0 where client_id = %s"
        try:
            cursor.execute(query, (client_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def getSubscribedClients(self):
        cursor = self.conn.cursor()
        query = "select client_firstname, client_lastname, client_email from client where is_subscribed = 1"
        try:
            cursor.execute(query,)
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result


    def getNumOfSidesByComboID(self, combo_id, cursor):
        query = "select num_of_sides from combo where combo_id = %s"
        try:
            cursor.execute(query, (combo_id,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        num_of_sides = result[0]
        return num_of_sides








