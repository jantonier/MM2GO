from flask import Flask, flash, redirect, render_template, request, session, abort, jsonify
import os
from handler.MenuHandler import MenuHandler
from handler.DashboardHandler import DashboardHandler
from handler.OrderHandler import OrderHandler
from handler.AdminHandler import AdminHandler
from flask_cors import CORS
from datetime import datetime
from pytz import timezone
from flask_jwt_extended import (JWTManager, jwt_required, create_access_token, get_jwt_identity)

dateFormat = "%Y-%m-%d"
timeFormat = "%H:%M"
application = app = Flask(__name__)

app.secret_key = os.urandom(12)
application.config['JWT_SECRET_KEY'] = os.urandom(12)
jwt = JWTManager(application)
CORS(application)

#This is just a test route used to verify if the server is running and the server's time
@app.route('/')
def home():
    now_PR = datetime.now(timezone('America/Puerto_Rico'))
    return 'Welcome to MM2GO API, local time is: ' + now_PR.strftime(timeFormat)

#*********************************************************************************************
#*****************************       MENU        *********************************************
#*********************************************************************************************

#Route to obtain all the active stations for the menu
@app.route('/menu/stations', methods=['GET']) #Done
def getAllMenuStations():
    return MenuHandler().getAllActiveStations()

#Route to obtain all the active combos for the station specified in the route
@app.route('/menu/<int:station_id>/combo', methods=['GET']) #Done
def getActiveComboMenu(station_id):
    return MenuHandler().getActiveCombo(station_id)

#Route to obtain all the free toppings that applies for a combo depending on the food station
@app.route('/menu/<int:station_id>/combo/freetoppings', methods=['GET']) #Done
def getComboFreeToppings(station_id):
    return MenuHandler().getActiveFreeToppings(station_id)

#Route to obtain all the non-free toppings that applies for a combo depending on the food station
@app.route('/menu/<int:station_id>/combo/paidtoppings', methods=['GET']) #Done
def getComboPaidToppings(station_id):
    return MenuHandler().getActivePaidToppings(station_id)

#Route to obtain all the sides that applies for a combo depending on the food station
@app.route('/menu/<int:station_id>/combo/sides', methods=['GET']) #Done
def getComboSides(station_id):
    return MenuHandler().getComboSides(station_id)

#Route to obtain all the drinks that applies for a combo depending on the food station
@app.route('/menu/<int:station_id>/combo/drinks', methods=['GET']) #Done
def getComboDrinks(station_id):
    return MenuHandler().getActiveComboDrinks(station_id)

#Route to obtain all the individual items that are associated to the specified food station
@app.route('/menu/<int:station_id>/individual', methods=['GET']) #Done
def getActiveIndividualItems(station_id):
    return MenuHandler().getActiveIndividualItems(station_id)

#Route to obtain the range of hours where the ordering system is accepting orders
@app.route('/menu/operatinghours', methods=['GET'])
def getOperatingHours():
    return DashboardHandler().getOperatingHours()

#Route to obtain the tax to be applied to all orders
@app.route('/menu/tax', methods=['GET'])
def getTax():
    return DashboardHandler().getTax()

#Route to obtain the delivery fee to be applied to all orders
@app.route('/menu/deliveryfee', methods=['GET'])
def getDeliveryFee():
    return DashboardHandler().getDeliveryFee()

#Route to receive all the data corresponding to one order. It is the most important route of the system because
#it is the only way to place orders in the system
@app.route('/menu/checkout', methods=['POST']) #Modificar combos
def checkout():
    now_PR = datetime.now(timezone('America/Puerto_Rico'))
    return OrderHandler().checkout(request.json, now_PR.strftime(timeFormat))


#*********************************************************************************************
#******************************       GENERAL       ******************************************
#*********************************************************************************************

#To register a new client to the email service
@app.route('/registerclient', methods=['POST']) #Done
def registerClient():
    return MenuHandler().registerClient(request.json)

#Route to unsubscribe a client from the mail service
@app.route('/unsubscribeclient', methods=['POST']) #Done
def unsubscribeClient():
    return MenuHandler().unsubscribeClient(request.json)

#Route to get the buildings available to do the deliveries
@app.route('/menu/buildings', methods=['GET'])
# @jwt_required
def getMenuBuildings():
        return DashboardHandler().getMenuBuildings()

#Route to see all the subscribers of the mailing service
@app.route('/dashboard/subscribers', methods=['GET'])
# @jwt_required
def getSubscribedClients():
        return MenuHandler().getSubscribedClients()

#Route to manage all the buildings from the dashboard
@app.route('/dashboard/buildings', methods=['GET','POST','DELETE'])
# @jwt_required
def editBuildings():
    if request.method == 'GET':
        return DashboardHandler().getBuildings()
    if request.method == 'POST':
        return DashboardHandler().addBuilding(request.json)
    if request.method == 'DELETE':
        return DashboardHandler().deleteBuilding(request.json)




#*********************************************************************************************
#*****************************       DASHBOARD       *****************************************
#*********************************************************************************************

#All the dashboard routes are programmed to require a valid token to do the function assigned to it.
#Some of them are currently commented just because the front-end has not implemented it yet

#Route to login an administrator to the system
@app.route('/dashboard/login', methods=['POST'])
def login():
    return AdminHandler().login(request.json)

#Route to send an email with a password resetting link and a token to change the password
@app.route('/forgotpassword', methods=['POST']) #Done
def forgotPassword():
    return AdminHandler().forgotPassword(request.json)

#Route to do the password change
@app.route('/dashboard/resetpassword', methods=['PUT']) #Done
@jwt_required
def passwordRecovery():
    identity = get_jwt_identity()
    return AdminHandler().passwordRecovery(request.json, identity)

#Route to send an email with a registration link to register an administrator
@app.route('/dashboard/registeradmin', methods=['POST']) #Done
#@jwt_required
def registerAdmin():
    return AdminHandler().registerAdmin(request.json)

#Route to manage all the combos associated to the station specified in the route
@app.route('/dashboard/menuediting/<int:station_id>/combo', methods=['GET', 'POST', 'PUT', 'DELETE'])
# @jwt_required
def comboMenuEditing(station_id):
    if request.method == 'GET':
        return DashboardHandler().getDashboardComboMenuByStationID(station_id) #Done
    if request.method == 'POST':
        return DashboardHandler().addComboByStationID(station_id, request.json)
    if request.method == 'PUT':
        return DashboardHandler().editComboByComboID(request.json)
    if request.method == 'DELETE':
        return DashboardHandler().deleteComboByComboID(request.json)

#Route to toggle the visibility of a combo
@app.route('/dashboard/menuediting/visibility/combo', methods=['PUT'])
#@jwt_required
def editComboVisibility():
    return DashboardHandler().editComboVisibility(request.json)

#Route to manage all the individual items associated to the station specified in the route
@app.route('/dashboard/menuediting/<int:station_id>/individual', methods=['GET', 'POST', 'PUT', 'DELETE'])
#@jwt_required
def individualMenuEditingByStationID(station_id):
    if request.method == 'GET':
        return DashboardHandler().menuEditingIndividual(station_id)
    if request.method == 'POST':
        return DashboardHandler().addItemByStationID(station_id, request.json) #Anade un NUEVO item a una estacion
    if request.method == 'PUT':
        return DashboardHandler().editItemByItemID(request.json)
    if request.method == 'DELETE':
        return DashboardHandler().removeItemFromStationByItemID(station_id, request.json)  #Este debe de eliminar el tem de la estacion pero no el item como tal.

#Route to toggle the visibility of an item
@app.route('/dashboard/menuediting/visibility/individual', methods=['PUT'])
#@jwt_required
def editItemVisibility():
    return DashboardHandler().editItemVisibility(request.json)

#Route to manage all existent items. These are items that are present in other food stations but not in the station specified in the route
@app.route('/dashboard/menuediting/<int:station_id>/existent', methods=['GET','POST','DELETE'])
#@jwt_required
def ExistentItemByStationID(station_id):
    if request.method == 'GET':
        return DashboardHandler().getExistentItemsInOtherStations(station_id)
    if request.method == 'POST':
        return DashboardHandler().addExistentItemByStationID(station_id, request.json) #Anade un item EXISTENTE a una estacion
    if request.method == 'DELETE':
        return DashboardHandler().deleteItem(request.json) #Borra por completo un item


#Route to manage all the food stations
@app.route('/dashboard/menuediting/stations', methods=['GET','POST','PUT','DELETE'])
#@jwt_required
def stations():
    if request.method == 'GET':
        return DashboardHandler().getAllStations()
    if request.method == 'POST':
        return DashboardHandler().addStation(request.json)
    if request.method == 'PUT':
        return DashboardHandler().editStationByStationID(request.json) #Asi es que se va a obtener el id?
    if request.method == 'DELETE':
        return DashboardHandler().deleteStationByStationID(request.json)

#Route to send the daily promotional email to all the subscribers
@app.route('/dashboard/email', methods=['POST'])
#@jwt_required
def sendEmail():
    return DashboardHandler().sendPromotionalEmail(request.json)

#Route to provide all the information pertinent to the graphics sale report
@app.route('/dashboard/reports/charts', methods=['POST'])
#@jwt_required
def reportInChart():
    return DashboardHandler().getchartReportByDateRange(request.json)

#Route to provide all the information pertinent to the written sale report
@app.route('/dashboard/reports/writtenreport', methods=['POST'])
#@jwt_required
def reportWritten():
    return DashboardHandler().getWrittenReportByDateRange(request.json)

#Route to manage all the administrators
@app.route('/dashboard/administrator', methods=['GET', 'POST','DELETE'])
# @jwt_required
def administratorsediting():
    identity = get_jwt_identity()
    if request.method == 'GET':
        return AdminHandler().getAllAdministrators()
    if request.method == 'POST':
        return AdminHandler().addAdministrator(request.json) #Solo se pueden anadir administradores (no head)
    if request.method == 'DELETE':
        return AdminHandler().deleteAdministratorByID(request.json) #Solo se pueden anadir administradores (no head)

#Route to see the information of all the orders of the date
@app.route('/dashboard/orders', methods=['GET','DELETE'])
#@jwt_required
def getTodaysOrders():
    if request.method == 'GET':
        return OrderHandler().getTodaysOrdersByDate()
    if request.method == 'DELETE':
        return OrderHandler().deleteOrderByID(request.json)

#Route to manage the operating hours of the ordering system
@app.route('/dashboard/operatinghours', methods=['GET','PUT'])
#@jwt_required
def editOperatingHours():
    if request.method == 'GET':
        return DashboardHandler().getOperatingHours()
    if request.method == 'PUT':
        return DashboardHandler().editOperatingHours(request.json)

#Route to manage the tax to be applied to the orders
@app.route('/dashboard/tax', methods=['GET','PUT'])
def editTax():
    if request.method == 'GET':
        return DashboardHandler().getTax()
    if request.method == 'PUT':
        return DashboardHandler().editTax(request.json)

#Route to manage the delivery fee of the orders
@app.route('/dashboard/deliveryfee', methods=['GET','PUT'])
#@jwt_required
def editDeliveryFee():
    if request.method == 'GET':
        return DashboardHandler().getDeliveryFee()
    if request.method == 'PUT':
        return DashboardHandler().editDeliveryFee(request.json)

#Route to manage all the general data in one place
@app.route('/dashboard/general', methods=['GET','PUT'])
#@jwt_required
def editGeneralData():
    if request.method == 'GET':
        return DashboardHandler().getGeneralData()
    if request.method == 'PUT':
        return DashboardHandler().editGeneralData(request.json)






#This route is used only for tokens testing purposes
@app.route('/logintest', methods = ['GET'])
@jwt_required
def test():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    application.run(debug=True)
