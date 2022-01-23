def mapClientToDict(row):
    result = {}
    result['client_id'] = str(row[0])
    result['client_name'] = row[1]
    result['client_lastname'] = row[2]
    result['client_email'] = row[3]
    return result

def mapComboToDict(row):
    result = {}
    result['combo_id'] = str(row[0])
    result['combo_name'] = row[1]
    result['num_of_sides'] = str(row[2])
    result['combo_price'] = str(row[3])
    result['photo_url'] = row[4]
    result['is_active'] = str(row[5])
    result['num_of_free_toppings'] = str(row[6])
    result['num_of_paid_toppings'] = str(row[7])
    result['num_of_drinks'] = str(row[8])
    result['description'] = row[9]
    return result

def mapItemToDict(row):
    result = {}
    result['item_id'] = str(row[0])
    result['item_name'] = row[1]
    result['item_type'] = row[2]
    result['item_price'] = str(row[3])
    result['photo_url'] = row[4]
    result['is_active'] = str(row[5])
    return result

def mapOrderToDict(row):
    result = {}
    result['item_id'] = str(row[0])
    result['item_name'] = row[1]
    result['item_type'] = row[2]
    result['item_price'] = str(row[3])
    result['photo_url'] = row[4]
    result['is_active'] = str(row[5])
    return result

def mapStationToDict(row):
    result = {}
    result['station_id'] = str(row[0])
    result['station_name'] = row[1]
    result['is_active'] = str(row[2])
    return result

def mapAdministratorToDict(row):
    result = {}
    result['administrator_id'] = str(row[0])
    result['administrator_firstname'] = row[1]
    result['administrator_lastname'] = row[2]
    result['administrator_email'] = row[3]
    result['role'] = row[4]
    return result

def mapOrdersViewToDict(row,combosAndItems):
    result = {}
    result['order_id'] = row[0]
    result['client_firstname'] = row[1]
    result['client_lastname'] = row[2]
    result['phone_number'] = str(row[3])
    result['building'] = row[4]
    result['room'] = str(row[5])
    result['payment_method'] = row[6]
    result['order_price'] = str(row[7])
    result['ext'] = str(row[8])
    result['order'] = combosAndItems
    return result

def mapCombosToDict(row, sides, ingredients):
    result = {}
    result['combo_name'] = row[0]
    result['sides'] = sides
    result['drink'] = row[2]
    result['combo_price'] = str(row[3])
    result['ingredients'] = ingredients
    result['special_instructions'] = row[5]
    return result

def mapItemsToDict(row):
    result = {}
    result['item_name'] = row[0]
    result['item_price'] = str(row[1])
    return result

def mapCombosAndItemsToDict(combos, items):
    result = {}
    result['combos'] = combos
    result['items'] = items
    return result

def mapComboNameToDict(row, sales):
    result = {}
    result['combo_name'] = row[0]
    result['total_profit'] = str(sales)
    return result

def mapReportComboToDict(row, combo):
    result = {}
    result['date'] = row[2]
    result['most_selled_combo'] = combo
    return result

def mapNoneComboToDict(date):
    result = {}
    result['date'] = date
    result['most_selled_combo'] = {'combo_name' : None, 'total_profit' : 0}
    return result

def mapSaleToDict(row):
    result = {}
    result['number_of_orders'] = str(row[1])
    result['sales_total'] = str(row[2])
    return result

def mapSaleToDict2(row):
    result = {}
    result['sales_total'] = str(row[2])
    return result

def mapSalesReportToDict(row, sale):
    result = {}
    result['date'] = row[0]
    result['sales'] = sale
    return result

def mapHoursToDict(row):
    result = {}
    result['operating_hours_from'] = row[0]
    result['operating_hours_to'] = row[1]
    return result

def mapTaxToDict(row):
    result = {}
    result['tax'] = str(row[0])
    return result

def mapDeliveryFeeToDict(row):
    result = {}
    result['delivery_fee'] = str(row[0])
    return result

def mapAdminInfoToDict(row):
    result = {}
    result['Name'] = row[0] + " " + row[1]
    result['Email'] = row[2]
    return result

def mapGeneralDataToDict(row):
    result = {}
    result['operating_hours_from'] = row[0]
    result['operating_hours_to'] = row[1]
    result['tax'] = str(row[2])
    result['delivery_fee'] = str(row[3])
    return result

def mapClientInformationToDict(row):
    result = {}
    result['Name'] = row[0] + " " + row[1]
    result['Email'] = row[2]
    return result

def mapBuildingToDict(row):
    result = {}
    result['building_name'] = row[0]
    return result

def mapMenuBuildingToDict(row):
    result = {}
    result['text'] = row[0]
    result['value'] = row[0]
    return result

def mapLoginToDict(role, access_token):
    result = {}
    result['role'] = role
    result['access_token'] = access_token
    return result

def mapAdminRegistrationToDict(email):
    result = {}
    result['Name'] = ""
    result['Email'] = str(email)
    return result

def mapEmailComboToDict(combo_name, ingredients, sides, drink, special_instructions):
    result = {}
    result['Combo'] = combo_name
    if ingredients is not "":
        result['Ingredientes'] = ingredients
    if sides is not "":
        result['Acompañantes'] = sides
    if drink is not "":
        result['Bebida'] = drink
    if special_instructions is not "":
        result["Nota"] = special_instructions
    return result

def mapSubscribedClientsToDict(row):
    result = {}
    result['client_fullname'] = row[0] + " " + row[1]
    result["client_email"] = row[2]
    return result

def mapDateToDict(row):
    result = {}
    result['date'] = str(row)
    return result