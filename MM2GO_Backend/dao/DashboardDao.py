import psycopg2
from config.dbconfig import pg_config

class DashboardDao:

    conn = psycopg2.connect(
        host=pg_config['host'],
        port=pg_config['port'],
        user=pg_config['user'],
        password=pg_config['password'],
        database=pg_config['database']
    )

    def getOrdersByDate(self, date):
        cursor = self.conn.cursor()
        query = "select * from order " \
                "natural inner join comboinstation " \
                "natural inner join station where station_id = %s and is_active = 1"
        try:
            cursor.execute(query, (date,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getDashboardComboMenuByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select combo_id, combo_name, num_of_sides, combo_price, photo_url, is_active, num_of_free_toppings, num_of_paid_toppings," \
                "num_of_drinks, description from combo where station_id = %s and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getDashboardIndividualItemsByStationID(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation " \
                "where station_id = %s and is_deleted = 0"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAllStations(self):
        cursor = self.conn.cursor()
        query = "select station_id, station_name, is_active from station where is_deleted = 0"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getStationByID(self, station_id):
        cursor = self.conn.cursor()
        query = "select station_id, station_name, is_active from station where station_id = %s"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def addComboByStationID(self, combo_name, num_of_sides, combo_price, photo_url, is_active, station_id, num_of_free_toppings,
                            num_of_paid_toppings, num_of_drinks, description):
        cursor = self.conn.cursor()
        query = "insert into combo (combo_name, num_of_sides, combo_price, photo_url, is_active, station_id, num_of_free_toppings, " \
                "num_of_paid_toppings, num_of_drinks, description, is_deleted) " \
                "values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, 0)"
        try:
            cursor.execute(query, (combo_name, num_of_sides, combo_price, photo_url, is_active, station_id, num_of_free_toppings,
                                   num_of_paid_toppings, num_of_drinks, description))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def editComboByStationComboID(self, combo_id, combo_name, num_of_sides, combo_price, is_active, num_of_free_toppings,
                                  num_of_paid_toppings, num_of_drinks, description):
        cursor = self.conn.cursor()
        query = "update combo " \
                "set combo_name = %s, combo_price = %s, num_of_sides = %s, is_active = %s, " \
                "num_of_free_toppings = %s, num_of_paid_toppings = %s, num_of_drinks = %s, description = %s " \
                "where combo_id = %s and is_deleted = 0;"
        try:
            cursor.execute(query, (combo_name, combo_price, num_of_sides, is_active, num_of_free_toppings,
                                   num_of_paid_toppings, num_of_drinks, description, combo_id))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def deleteComboByComboID(self, combo_id):
        cursor = self.conn.cursor()
        query = "update combo set is_deleted = 1 where combo_id = %s;"
        try:
            cursor.execute(query, (combo_id, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def editComboVisibility(self, combo_id, is_active):
        cursor = self.conn.cursor()
        query = "update combo set is_active = %s where combo_id = %s;"
        try:
            cursor.execute(query, (is_active, combo_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def editItemVisibility(self, item_id, is_active):
        cursor = self.conn.cursor()
        query = "update item set is_active = %s where item_id = %s;"
        try:
            cursor.execute(query, (is_active, item_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def addItem(self, item_name, item_type, item_price, photo_url, is_active, cursor):
        query = "insert into item (item_name, item_type, item_price, photo_url, is_active, is_deleted) " \
                "values (%s, %s, %s, %s, %s, 0) returning item_id"
        try:
            cursor.execute(query, (item_name, item_type, item_price, photo_url, is_active,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        item_id = result[0]
        return item_id

    def addItemToStation(self, station_id, item_id, cursor):
        query = "insert into iteminstation (station_id, item_id) values (%s, %s)"
        try:
            cursor.execute(query, (station_id, item_id))
        except psycopg2.Error as e:
            return
        return "Done"

    def editItemByItemID(self, item_id, item_name, item_price, is_active, item_type):
        cursor = self.conn.cursor()
        query = "update item " \
                "set item_name = %s, item_price = %s, item_type = %s, is_active = %s" \
                "where item_id =%s and is_deleted = 0;"
        try:
            cursor.execute(query, (item_name, item_price, item_type, is_active, item_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def removeItemFromStationByItemID(self, station_id, item_id):
        cursor = self.conn.cursor()
        query = "delete from iteminstation where station_id = %s and item_id = %s"
        try:
            cursor.execute(query, (station_id, item_id, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def deleteItemInStationByItemID(self, item_id, station_id, cursor):
        query = "update iteminstation " \
                "set is_deleted = 1 where item_id =%s and station_id = %s "
        try:
            cursor.execute(query, (item_id, station_id))
        except psycopg2.Error as e:
            return
        return "Done"

    def addStation(self, station_name, is_active):
        cursor = self.conn.cursor()
        query = "insert into station (station_name, is_active, is_deleted) values (%s, %s, 0)"
        try:
            cursor.execute(query, (station_name, is_active))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def editStationByStationID(self, station_id, station_name, is_active):
        cursor = self.conn.cursor()
        query = "update station set station_name = %s, is_active = %s where station_id = %s"
        try:
            cursor.execute(query, (station_name, is_active, station_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def deleteStationByStationID(self, station_id, cursor):
        query = "update station set is_deleted = 1 where station_id = %s"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        return "Done"

    def removeItemsAssociatedWithStationByStationID(self, station_id, cursor):
        query = "delete from iteminstation where station_id = %s"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        return "Done"

    def deleteCombosAssociatedWithStationByStationID(self, station_id, cursor):
        query = "update combo set is_deleted = 1 where station_id = %s"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        return "Done"


    def getSalesDatesInRange(self, date_from, date_to):
        cursor = self.conn.cursor()
        query = "select distinct order_date from public.order where order_date between %s and %s and o_is_deleted = 0"
        try:
            cursor.execute(query, (date_from, date_to))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getMostSelledComboNameByDate(self, date):
        cursor = self.conn.cursor()
        query = "select combo_name, count(*) as quantity , order_date  from combo " \
                "natural inner join combodetails natural inner join public.order " \
                "where order_date = %s and o_is_deleted = 0 group by  combo_id, order_date order by quantity desc limit 1"
        try:
            cursor.execute(query, (date, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        self.conn.commit()
        return result

    def getSalesByDate(self, date):
        cursor = self.conn.cursor()
        query = "select order_date, count(order_id) as quantity, sum(order_price) as total " \
                "from public.order where order_date = %s and o_is_deleted = 0 group by order_date;"
        try:
            cursor.execute(query, (date,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        self.conn.commit()
        return result

    def getExistentItemsInOtherStations(self, station_id):
        cursor = self.conn.cursor()
        query = "select item_id, item_name, item_type, item_price, photo_url, is_active from item " \
                "natural inner join iteminstation where not station_id = %s and is_deleted = 0;"
        try:
            cursor.execute(query, (station_id,))
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def addExistentItemByStationID(self, station_id, item_id):
        cursor = self.conn.cursor()
        query = "insert into iteminstation (station_id, item_id) values (%s, %s)"
        try:
            cursor.execute(query, (station_id, item_id, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def deleteItem(self, item_id, cursor):
        query = "update item set is_deleted = 1 where item_id = %s"
        try:
            cursor.execute(query, (item_id,))
        except psycopg2.Error as e:
            return
        return "Done"

    def removeItemFromAllStations(self, item_id, cursor):
        query = "delete from iteminstation where item_id = %s"
        try:
            cursor.execute(query, (item_id,))
        except psycopg2.Error as e:
            return
        return "Done"

    def getOperatingHours(self):
        cursor = self.conn.cursor()
        query = "select operating_hours_from, operating_hours_to from uniquedata"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        return result

    def editOperatingHours(self, hourFrom, hourTo):
        cursor = self.conn.cursor()
        query = "update uniquedata set operating_hours_from = %s, operating_hours_to = %s"
        try:
            cursor.execute(query, (hourFrom, hourTo, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def getTax(self):
        cursor = self.conn.cursor()
        query = "select tax from uniquedata"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        return result

    def editTax(self, tax):
        cursor = self.conn.cursor()
        query = "update uniquedata set tax = %s"
        try:
            cursor.execute(query, (tax,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def getDeliveryFee(self):
        cursor = self.conn.cursor()
        query = "select delivery_fee from uniquedata"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        return result

    def editDeliveryFee(self, deliveryFee):
        cursor = self.conn.cursor()
        query = "update uniquedata set delivery_fee = %s"
        try:
            cursor.execute(query, (deliveryFee,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def getGeneralData(self):
        cursor = self.conn.cursor()
        query = "select operating_hours_from, operating_hours_to, tax, delivery_fee from uniquedata"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        return result

    def editGeneralData(self, hour_from, hour_to, tax, delivery_fee):
        cursor = self.conn.cursor()
        query = "update uniquedata set operating_hours_from = %s, operating_hours_to = %s, tax = %s, delivery_fee = %s"
        try:
            cursor.execute(query, (hour_from, hour_to, tax, delivery_fee, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def getSubscribedClientsInfo(self):
        cursor = self.conn.cursor()
        query = "select client_firstname, client_lastname, client_email from client where is_subscribed = 1"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getBuildings(self):
        cursor = self.conn.cursor()
        query = "select building_name from buildings"
        try:
            cursor.execute(query, )
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def addBuilding(self, building_name):
        cursor = self.conn.cursor()
        query = "insert into buildings (building_name) values (%s)"
        try:
            cursor.execute(query, (building_name,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"

    def deleteBuilding(self, building_name):
        cursor = self.conn.cursor()
        query = "delete from buildings where building_name = %s"
        try:
            cursor.execute(query, (building_name,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"