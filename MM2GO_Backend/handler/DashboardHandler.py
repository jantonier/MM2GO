from flask import jsonify, make_response
from dao.DashboardDao import DashboardDao
from dictionaryMapping import *
import psycopg2
import time
from handler.EmailHandler import EmailHandler
from config.dbconfig import pg_config
import datetime
import pandas as pd
dateFormat = "%Y-%m-%d"


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

def validate(date_text):
    try:
        datetime.datetime.strptime(date_text, '%Y-%m-%d')
    except ValueError:
        return False
    return True


class DashboardHandler:
    # ************************************************************************************
    conn = psycopg2.connect(
        host=pg_config['host'],
        port=pg_config['port'],
        user=pg_config['user'],
        password=pg_config['password'],
        database=pg_config['database']
    )

    # ************************************************************************************


    def getDashboardComboMenuByStationID(self, station_id):
        dao = DashboardDao()
        result = dao.getDashboardComboMenuByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapComboToDict(r))
        return jsonify(mapped_result)

    def menuEditingIndividual(self, station_id):
        dao = DashboardDao()
        result = dao.getDashboardIndividualItemsByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

    def getAllStations(self):
        dao = DashboardDao()
        result = dao.getAllStations()
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapStationToDict(r))
        return jsonify(mapped_result)

    def getStationByID(self, station_id):
        dao = DashboardDao()
        result = dao.getStationByID(station_id)
        if not result:
            return jsonify(Error="Not found"), 404
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

    def addComboByStationID(self, station_id, json):
        dao = DashboardDao()

        combo_name = json.get('combo_name')
        num_of_sides = json.get('num_of_sides')
        combo_price = json.get('combo_price')
        photo_url = json.get('photo_url')
        is_active = json.get('is_active')
        num_of_free_toppings = json.get('num_of_free_toppings')
        num_of_paid_toppings = json.get('num_of_paid_toppings')
        num_of_drinks = json.get('num_of_drinks')
        description = json.get('description')

        if combo_name is None or num_of_sides is None or num_of_free_toppings is None or combo_price is None or \
                is_active is None or num_of_paid_toppings is None or num_of_drinks is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(num_of_sides) or notInt(is_active) or notInt(num_of_free_toppings) or notInt(num_of_paid_toppings) or notInt(num_of_drinks):
            return jsonify(Error="Malformed Request"), 400
        if notFloat(combo_price):
            return jsonify(Error="Malformed Request"), 400
        result = dao.addComboByStationID(combo_name, num_of_sides, combo_price, photo_url, is_active, station_id, num_of_free_toppings,
                                         num_of_paid_toppings, num_of_drinks, description)
        return jsonify(result)

    def editComboByComboID(self, json):
        dao = DashboardDao()

        combo_id = json.get('combo_id')
        combo_name = json.get('combo_name')
        num_of_sides = json.get('num_of_sides')
        combo_price = json.get('combo_price')
        # photo_url = json.get('photo_url')
        is_active = json.get('is_active')
        # station_id = json.get('station_id')
        num_of_free_toppings = json.get('num_of_free_toppings')
        num_of_paid_toppings = json.get('num_of_paid_toppings')
        num_of_drinks = json.get('num_of_drinks')
        description = json.get('description')
        #Verifica que no hayan campos requeridos vacíos
        if combo_id is None or combo_name is None or num_of_sides is None or num_of_free_toppings is None or combo_price is None\
                or is_active is None or num_of_paid_toppings is None or num_of_drinks is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(num_of_sides) or notInt(is_active) or notInt(num_of_free_toppings) or notInt(num_of_paid_toppings) or notInt(num_of_drinks) or notInt(combo_id):
            return jsonify(Error="Malformed Request"), 400
        if notFloat(combo_price):
            return jsonify(Error="Malformed Request"), 400

        result = dao.editComboByStationComboID(combo_id, combo_name, num_of_sides, combo_price, is_active,
                                               num_of_free_toppings, num_of_paid_toppings, num_of_drinks, description)
        return jsonify(result), 200

    def deleteComboByComboID(self, json):
        dao = DashboardDao()
        combo_id = json.get('combo_id')
        if combo_id is None or notInt(combo_id):
            return jsonify(Error="Malformed Request"), 400
        # Verifica que no hayan campos requeridos vacíos
        result = dao.deleteComboByComboID(combo_id)
        if result is not "Done":
            return jsonify(Error="Error deleting combo"), 400
        return jsonify(result)

    def editComboVisibility(self, json):
        dao = DashboardDao()
        combo_id = json.get('combo_id')
        is_active = json.get('is_active')
        if combo_id is None or notInt(combo_id) or is_active is None or notInt(is_active):
            return jsonify(Error="Malformed Request"), 400
        # Verifica que no hayan campos requeridos vacíos
        result = dao.editComboVisibility(combo_id, is_active)
        if result is not "Done":
            return jsonify(Error="Error deleting combo"), 406
        return jsonify(result)

    def editItemVisibility(self, json):
        dao = DashboardDao()
        item_id = json.get('item_id')
        is_active = json.get('is_active')
        if item_id is None or notInt(item_id) or is_active is None or notInt(is_active):
            return jsonify(Error="Malformed Request"), 400
        # Verifica que no hayan campos requeridos vacíos
        result = dao.editItemVisibility(item_id, is_active)
        if result is not "Done":
            return jsonify(Error="Error editing item visibility"), 406
        return jsonify(result)

    def addItemByStationID(self, station_id, json):
        dao = DashboardDao()

        item_name = json.get('item_name')
        item_price = json.get('item_price')
        photo_url = json.get('photo_url')
        is_active = json.get('is_active')
        item_type = json.get('item_type')
        if item_name is None or item_type is None or item_price is None or is_active is None:
            return jsonify(Error="Malformed Request"), 400
        cursor = self.conn.cursor()
        item_id = dao.addItem(item_name, item_type, item_price, photo_url, is_active, cursor)

        if item_id is None:
            self.conn.rollback()
            return jsonify(Error="Malformed Request"), 400

        result = dao.addItemToStation(station_id, item_id, cursor)
        if result is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error adding item to station"), 400
        self.conn.commit()
        return jsonify(result), 200

    def editItemByItemID(self, json):
        dao = DashboardDao()
        item_id = json.get('item_id')
        item_name = json.get('item_name')
        item_price = json.get('item_price')
        # photo_url = json.get('photo_url')
        is_active = json.get('is_active')
        item_type = json.get('item_type')
        if item_id is None or item_name is None or item_type is None or item_price is None or is_active is None:
            return jsonify(Error="Malformed Request"), 400
        result = dao.editItemByItemID(item_id, item_name, item_price, is_active, item_type)
        return jsonify(result)

    def removeItemFromStationByItemID(self, station_id, json):
        dao = DashboardDao()
        item_id = json.get('item_id')
        result = dao.removeItemFromStationByItemID(station_id, item_id)
        if result is not "Done":
            return jsonify(Error="Error removing item from station"), 400
        return jsonify("Item successfully removed from station")

    def addStation(self, json):
        dao = DashboardDao()
        station_name = json.get('station_name')
        is_active = json.get('is_active')
        if station_name is None or is_active is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(is_active):
            return jsonify(Error="Malformed Request"), 400
        result = dao.addStation(station_name, is_active)
        return jsonify(result)

    def editStationByStationID(self, json):
        dao = DashboardDao()
        station_id = json.get('station_id')
        station_name = json.get('station_name')
        is_active = json.get('is_active')
        if station_name is None or is_active is None or station_id is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(station_id) or notInt(is_active):
            return jsonify(Error="Malformed Request"), 400
        result = dao.editStationByStationID(station_id, station_name, is_active)
        if result is None:
            return jsonify(Error="Error editing station"), 400
        return make_response(jsonify({"message": "Station updated"}), 200)

    def deleteStationByStationID(self, json):
        dao = DashboardDao()
        station_id = json.get('station_id')
        if station_id is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(station_id):
            return jsonify(Error="Malformed Request"), 400
        cursor = self.conn.cursor()
        result = dao.deleteStationByStationID(station_id, cursor)
        if result is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting station"), 400
        result2 = dao.removeItemsAssociatedWithStationByStationID(station_id, cursor)
        if result2 is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error removing items from station"), 400
        result3 = dao.deleteCombosAssociatedWithStationByStationID(station_id, cursor)
        if result3 is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting combos associated with station"), 400
        self.conn.commit()
        return make_response(jsonify({"message": "Station deleted"}), 200)

    def sendPromotionalEmail(self, json):
        dao = DashboardDao()
        emailHandler = EmailHandler()
        email_subject = json.get('subject')
        email_body = json.get('body')
        email_body = email_body + "<br><br>Si desea dejar de recibir este email promocional, favor de oprimir el siguiente enlace:" \
                                  "<br>http://unsubscribe"
        if email_subject is None or email_body is None:
            return jsonify(Error="Malformed Request"), 400
        listOfEmails = dao.getSubscribedClientsInfo()
        mappedEmails = []
        for e in listOfEmails:
            mappedEmails.append(mapClientInformationToDict(e))
        result = emailHandler.sendEmail(email_subject, mappedEmails, email_body)
        return jsonify(result), 200


    def getchartReportByDateRange(self, json):
        dao = DashboardDao()

        date_from = json.get('date_from')
        date_to = json.get('date_to')

        if date_from is None or date_to is None or date_from is "" or date_to is "":
            return jsonify(Error="Malformed Request"), 400

        if not validate(date_from):
            return jsonify(Error="Malformed Request"), 400
        if not validate(date_to):
            return jsonify(Error="Malformed Request"), 400


        # datesArray = dao.getSalesDatesInRange(date_from, date_to)
        datesArray = pd.date_range(date_from, date_to).strftime(dateFormat).to_list()
        if datesArray is None:
            return jsonify(None)

        mostSelledComboByDay = []
        for d in datesArray:
            mostSelledCombo = dao.getMostSelledComboNameByDate(d)
            sales = dao.getSalesByDate(d)
            # sales[2] contiene el profit total de ese dia
            if mostSelledCombo is not None:
                mappedCombo = mapComboNameToDict(mostSelledCombo, sales[2])
                mostSelledComboByDay.append(mapReportComboToDict(mostSelledCombo, mappedCombo))
            else:
                mostSelledComboByDay.append(mapNoneComboToDict(d))

        return jsonify(mostSelledComboByDay)

    def getWrittenReportByDateRange(self, json):
        dao = DashboardDao()
        date_from = json.get('date_from')
        date_to = json.get('date_to')
        if date_from is None or date_to is None or date_from is "" or date_to is "":
            return jsonify(Error="Malformed Request"), 400

        if not validate(date_from):
            return jsonify(Error="Malformed Request"), 400
        if not validate(date_to):
            return jsonify(Error="Malformed Request"), 400

        datesArray = dao.getSalesDatesInRange(date_from, date_to)
        if datesArray is None:
            return jsonify(None)

        SalesByDay = []
        for d in datesArray:
            sales = dao.getSalesByDate(d[0])
            if sales is not None:
                mappedSale = mapSaleToDict(sales)
                SalesByDay.append(mapSalesReportToDict(sales, mappedSale))

        return jsonify(SalesByDay)

    def getExistentItemsInOtherStations(self, station_id):
        dao = DashboardDao()
        result = dao.getExistentItemsInOtherStations(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

    def addExistentItemByStationID(self, station_id, json):
        dao = DashboardDao()
        item_id = json.get('item_id')
        if item_id is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(item_id):
            return jsonify(Error="Malformed Request"), 400
        result = dao.addExistentItemByStationID(station_id, item_id)
        if result is not "Done":
            return jsonify(Error="Error adding item to station"), 400
        return jsonify(result)

    def deleteItem(self, json):
        dao = DashboardDao()
        item_id = json.get('item_id')
        if item_id is None:
            return jsonify(Error="Malformed Request"), 400
        if notInt(item_id):
            return jsonify(Error="Malformed Request"), 400
        cursor = self.conn.cursor()
        result = dao.deleteItem(item_id, cursor)
        if result is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error deleting item"), 400
        result2 = dao.removeItemFromAllStations(item_id, cursor)
        if result2 is not "Done":
            self.conn.rollback()
            return jsonify(Error="Error removing deleted item from stations"), 400
        self.conn.commit()
        return jsonify(result)

#This method returns a json with the operational hours of the ordering system. No orders will be allowed outside this period
    def getOperatingHours(self):
        dao = DashboardDao()
        result = dao.getOperatingHours()
        if not result:
            return jsonify(None)
        #mapped_result = []
        # for r in result:
        mapped_result = mapHoursToDict(result)
        return jsonify(mapped_result)

    def editOperatingHours(self, json):
        hourFrom = json.get('operating_hours_from')
        hourTo = json.get('operating_hours_to')
        timeFormat = "%H:%M"
        try:
            if time.strptime(hourFrom, timeFormat) > time.strptime(hourTo, timeFormat):
                return jsonify("Not Valid hours selected")
        except:
            return jsonify("Invalid hour format")
        dao = DashboardDao()
        result = dao.editOperatingHours(hourFrom, hourTo)
        return jsonify(result)

#This method returns the tax to be applied to all orders
    def getTax(self):
        dao = DashboardDao()
        result = dao.getTax()
        if not result:
            return jsonify(None)
        mapped_result = mapTaxToDict(result)
        return jsonify(mapped_result)

    def editTax(self, json):
        tax = json.get('tax')
        if tax is None:
            return jsonify(Error="Malformed request"), 400
        try:
            float(tax)
        except ValueError:
            return jsonify(Error="Malformed request"), 400
        dao = DashboardDao()
        result = dao.editTax(tax)
        return jsonify(result)

#This method returns a json with the delivery fee for each order
    def getDeliveryFee(self):
        dao = DashboardDao()
        result = dao.getDeliveryFee()
        if not result:
            return jsonify(None)
        mapped_result = mapDeliveryFeeToDict(result)
        return jsonify(mapped_result)

    def editDeliveryFee(self, json):
        delivery_fee = json.get('delivery_fee')
        if delivery_fee is None:
            return jsonify(Error="Malformed request1"), 400
        try:
            float(delivery_fee)
        except ValueError:
            return jsonify(Error="Malformed request2"), 400
        dao = DashboardDao()
        result = dao.editDeliveryFee(delivery_fee)
        return jsonify(result)

    def getGeneralData(self):
        dao = DashboardDao()
        result = dao.getGeneralData()
        if not result:
            return jsonify(None)
        mapped_result = mapGeneralDataToDict(result)
        return jsonify(mapped_result)

    def editGeneralData(self, json):
        hourFrom = json.get('operating_hours_from')
        hourTo = json.get('operating_hours_to')
        tax = json.get('tax')
        delivery_fee = json.get('delivery_fee')
        timeFormat = "%H:%M"
        try:
            if time.strptime(hourFrom, timeFormat) > time.strptime(hourTo, timeFormat):
                return jsonify("Not Valid hours selected"),
        except:
            return "Invalid hour format"

        if tax is None:
            return jsonify(Error="Malformed request"), 400
        try:
            float(tax)
        except ValueError:
            return jsonify(Error="Malformed request"), 400

        if delivery_fee is None:
            return jsonify(Error="Malformed request"), 400
        try:
            float(delivery_fee)
        except ValueError:
            return jsonify(Error="Malformed request"), 400

        dao = DashboardDao()
        result = dao.editGeneralData(hourFrom, hourTo, tax, delivery_fee)
        if result is not "Done":
            return jsonify(Error="Malformed request"), 400
        return jsonify("Successfully updated"), 200

#This method returns a list of all the buildings available to do the deliveries
    def getBuildings(self):
        dao = DashboardDao()
        result = dao.getBuildings()
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapBuildingToDict(r))
        return jsonify(mapped_result)

#Thos method returns a list of all the buildings available to do the deliveries
#Returns error 404 if there are no buildings
    def getMenuBuildings(self):
        dao = DashboardDao()
        result = dao.getBuildings()
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapMenuBuildingToDict(r))
        return jsonify(mapped_result)

#This method creates add a building to be available to do deliveries to it.
#It will be available to select in both, the ordering system and the administrative dashboard
    def addBuilding(self, json):
        dao = DashboardDao()
        building_name = json.get('building_name')
        if building_name is None or building_name is "":
            return jsonify(Error="Malformed Request"), 400
        result = dao.addBuilding(building_name)
        if result is not "Done":
            return jsonify(Error="Error adding building"), 400
        return jsonify(result), 201

#This method removes the specified building from the database. It literally deletes it from the db
#returns a 200 status code if the building was successfully removed. Or an error otherwise
    def deleteBuilding(self, json):
        dao = DashboardDao()
        building_name = json.get('building_name')
        if building_name is None or building_name is "":
            return jsonify(Error="Malformed Request"), 400
        result = dao.deleteBuilding(building_name)
        if result is not "Done":
            return jsonify(Error="Error removing building"), 404
        return jsonify(result), 200
