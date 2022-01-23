from flask import jsonify
from dao.MenuDao import MenuDao
from dao.OrderDao import OrderDao
from dictionaryMapping import *

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

class MenuHandler:

#This method returns all the active food stations to the ordering system.
#To be  considered active the station have to be active and having at least 1 item or combo associated with it
    def getAllActiveStations(self):
        dao = MenuDao()
        result = dao.getAllActiveStationsWithItems()
        result2 = dao.getAllActiveStationsWithCombos()
        mapped_result = []
        for r in result:
            if mapStationToDict(r) not in mapped_result:
                mapped_result.append(mapStationToDict(r))
        for r in result2:
            if mapStationToDict(r) not in mapped_result:
                mapped_result.append(mapStationToDict(r))
        return jsonify(mapped_result)

#This method returns a list of all the active combos associated to the actual station.
# If there are no combos, it returns null
    def getActiveCombo(self, station_id):
        dao = MenuDao()
        result = dao.getActiveComboByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapComboToDict(r))
        return jsonify(mapped_result)

    def getComboSides(self, station_id):
        dao = MenuDao()
        result = dao.getActiveComboSidesByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

#This method returns a list of all the active free toppings associated with the combos of a specific food station
#If there are no free toppings associated, it returns null
    def getActiveFreeToppings(self, station_id):
        dao = MenuDao()
        result = dao.getActiveComboFreeToppingsByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

#This method returns a list of all the active non-free toppings associated with the combos of a specific food station
#If there are no non-free toppings associated, it returns null
    def getActivePaidToppings(self, station_id):
        dao = MenuDao()
        result = dao.getActiveComboPaidToppingsByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

#This method returns a list of all the active drinks associated with the combos of a specific food station
#If there are no drinks associated, it returns null
    def getActiveComboDrinks(self, station_id):
        dao = MenuDao()
        result = dao.getActiveComboDrinksByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

#This method returns a list of all the active items (Of all types) associated with the combos of a specific food station
#If there are no active items associated, it returns null
    def getActiveIndividualItems(self, station_id):
        dao = MenuDao()
        result = dao.getActiveIndividualItemsByStationID(station_id)
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapItemToDict(r))
        return jsonify(mapped_result)

#This method is used to subscribe a client to the mailing service. This is to receive daily promotional emails
#It returns "Done" if the client was successfully subscribed
    def registerClient(self, json):
        dao = MenuDao()
        orderDao = OrderDao()
        client_firstname = json.get('client_firstname')
        client_lastname = json.get('client_lastname')
        client_email = json.get('client_email')

        if client_firstname is None or client_lastname is None or client_email is None:
            return jsonify(Error="Malformed Request"), 400

        #Primero verificamos si el cliente ya existe.
        client_id = orderDao.getClientID(client_email)

        #Si el cliente no existe, entonces se crea un cliente en la db y se subscribe de una vez
        if client_id is None:
            result = dao.createClientSubscribed(client_firstname, client_lastname, client_email)
        else:
            #Si el cliente existia ya, entonces se subscribe y se le da update a su informacion
            result = dao.subscribeExistentClient(client_firstname, client_lastname, client_id)

        return jsonify(result)

#This method is to unsubscribe a client from the mailing service.
#It returns "Done" if the client was successfully unsubscribed of the mailing service
#Otherwise, it returns an error describing the problem
    def unsubscribeClient(self, json):
        dao = MenuDao()
        orderDao = OrderDao()
        client_email = json.get('client_email')

        if client_email is None or client_email is "":
            return jsonify(Error="Malformed Request"), 400

        # Primero verificamos si el cliente ya existe.
        client_id = orderDao.getClientID(client_email)

        # Si el cliente no existe, entonces se crea un cliente en la db y se subscribe de una vez
        if client_id is None:
            return jsonify(Error="Client Not Found"), 404
        else:
            # Si el cliente existia ya, entonces se subscribe y ya
            result = dao.unsubscribeExistentClient(client_id)
        return jsonify(result)

#This method returns a full list of the clients subscribed to the mailing service
#If there are no clients subscribed, it returns an 404 error
    def getSubscribedClients(self):
        dao = MenuDao()
        result = dao.getSubscribedClients()
        if not result:
            return jsonify("No Subscribed clients"), 404
        mapped_result = []
        for r in result:
            mapped_result.append(mapSubscribedClientsToDict(r))
        return jsonify(mapped_result)
