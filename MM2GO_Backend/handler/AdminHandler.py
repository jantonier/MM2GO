import datetime

from flask import jsonify
from dao.AdminDao import AdminDao
from dictionaryMapping import *
from handler.EmailHandler import EmailHandler


from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

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

class AdminHandler:

    def getAllAdministrators(self):
        dao = AdminDao()
        result = dao.getAllAdministrators()
        if not result:
            return jsonify(None)
        mapped_result = []
        for r in result:
            mapped_result.append(mapAdministratorToDict(r))
        return jsonify(mapped_result)

#This method receives the parameters email and password to check if they match and grant access to the administrative dashboard
#It provides the frontend with a valid token that contain as its identity the email
    def login(self, json):
        dao = AdminDao()
        email = json.get('administrator_email')
        password = json.get('administrator_password')
        if email is None or password is None:
            return jsonify(Error="Malformed Request"), 400
        #verificamos si el admin existe
        administrator_id = dao.getAdministratorIDByEmail(email)

        if administrator_id is None:
            return jsonify(Error="Email not registered as administrator"), 404

        role = dao.getAdminRoleByEmail(email)

        passConfirmed = dao.confirmPasswordByAdminID(administrator_id, password)

        if passConfirmed:
            expires = datetime.timedelta(hours=3)
            access_token = create_access_token(identity=email, expires_delta=expires)
        else:
            return jsonify(Error="Incorrect Password"), 401

        result = mapLoginToDict(role, access_token)

        return jsonify(result), 200





    def addAdministrator(self, json):
        dao = AdminDao()
        #Hay que verificar por medio del token si el administrador loggeado es el head para poder hacer esta funcion
        administrator_firstname = json.get('administrator_firstname')
        administrator_lastname = json.get('administrator_lastname')
        email = json.get('administrator_email')
        password = json.get('administrator_password')
        #el password se supone que venga hashed y tengo que ecriptarlo aqui, verificarlo, encriptarlo con otro metodo de encriptacion y zumbarlo pa' la db
        role = 'administrator'

        if administrator_firstname is None or administrator_lastname is None or email is None or password is None:
            return jsonify(Error="Malformed Request"), 400
        if not self.password_check(password):
            return jsonify(Error="Password does not meet the requirements"), 400

        admin = dao.getAdministratorIDByEmail(email)
        if admin is not None:
            return jsonify(Error="Administrator already registered"), 409
        result = dao.addAdministrator(administrator_firstname, administrator_lastname, email, password, role)

        return jsonify(result)

    def deleteAdministratorByID(self, json):
        administrator_id = json.get('administrator_id')
        if administrator_id is None:
            return jsonify(Error="Malformed Request"), 400
        dao = AdminDao()
        result = dao.deleteAdministratorByID(administrator_id)
        if result is not "Done":
            return jsonify(Error="Administrator Not Found"), 404
        return jsonify("Administrator successfully removed"), 200


    def forgotPassword(self, json):
        email = json.get('administrator_email')
        if email is None:
            return jsonify(Error="Malformed request"), 400
        dao = AdminDao()
        adminPassword = dao.getAdminPasswordByEmail(email)
        if adminPassword is None:
            return jsonify(Error="Email is not registered as an administrator"), 404
        access_token = create_access_token(identity=adminPassword)
        adminInfo = dao.getAdminEmailInformation(email)
        mapped_adminInfo = []
        mapped_adminInfo.append(mapAdminInfoToDict(adminInfo))
        emailHandler = EmailHandler()
        subject = "Solicitud para cambiar password"
        html = "Saludos, hemos recibido su solicitud para cambiar su contraseña. " \
               "<br>Si usted no hizo esta solicitud, haga caso omiso a este mensaje. " \
               "<br>Para cambiar su contraseña, favor de presionar el siguiente enlace:" \
               "<br>http://www.mm2go.com.s3-website-us-east-1.amazonaws.com/pages/password-reset.html?"+access_token
        result = emailHandler.sendEmail(subject, mapped_adminInfo, html)
        return jsonify(result)

    def passwordRecovery(self, json, identity):
        dao = AdminDao()
        newPassword = json.get('administrator_password')
        administrator_id = dao.getAdminIdByPassword(identity)
        if administrator_id is None or newPassword is None:
            return jsonify(Error="Malformed Request"), 400
        if not self.password_check(newPassword):
            return jsonify(Error="Malformed Request"), 400
        result = dao.editAdministratorPasswordByID(administrator_id, newPassword)
        if result is not "Done":
            return jsonify(Error="Error changing password"), 400
        return jsonify("Password successfully changed"), 200



    def registerAdmin(self, json):
        email = json.get('administrator_email')
        if email is None or email is "":
            return jsonify(Error="Malformed request"), 400
        dao = AdminDao()
        admin = dao.getAdministratorIDByEmail(email)
        if admin is not None:
            return jsonify(Error="Administrator already registered"), 409
        access_token = create_access_token(identity=email)
        subject = "Solicitud para crear cuenta de administrador"
        html = "Saludos, hemos recibido su solicitud. " \
               "<br>Si usted no hizo esta solicitud, haga caso omiso a este mensaje. " \
               "<br>favor de presionar el siguiente enlace:" \
               "<br>http://www.mm2go.com.s3-website-us-east-1.amazonaws.com/pages/registration.html?" + access_token
        mapped_adminInfo = []
        emailHandler = EmailHandler()
        mapped_adminInfo.append(mapAdminRegistrationToDict(email))
        result = emailHandler.sendEmail(subject, mapped_adminInfo, html)
        return jsonify(result)


    def password_check(self, passwd):

        SpecialSym = ['$','@','#','%','^','!','&','*','(',')',',','.','/',';','[',']','-','=','{','}','|','_','+','`','~']
        val = True

        if len(passwd) < 8:
            print('length should be at least 6')
            val = False

        if len(passwd) > 16:
            print('length should be not be greater than 16')
            val = False

        if not any(char.isdigit() for char in passwd):
            print('Password should have at least one numeral')
            val = False

        if not any(char.isupper() for char in passwd):
            print('Password should have at least one uppercase letter')
            val = False

        if not any(char.islower() for char in passwd):
            print('Password should have at least one lowercase letter')
            val = False

        if not any(char in SpecialSym for char in passwd):
            print('Password should have at least one of the symbols $@#')
            val = False
        if val:
            return val




