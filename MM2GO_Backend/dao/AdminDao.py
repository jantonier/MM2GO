import psycopg2
from passlib.hash import pbkdf2_sha256
from config.dbconfig import pg_config

class AdminDao:

    conn = psycopg2.connect(
        host=pg_config['host'],
        port=pg_config['port'],
        user=pg_config['user'],
        password=pg_config['password'],
        database=pg_config['database']
    )


    def getAllAdministrators(self):
        cursor = self.conn.cursor()
        query = "select administrator_id, administrator_firstname, administrator_lastname, administrator_email, " \
                "role from administrator"
        try:
            cursor.execute(query,)
        except psycopg2.Error as e:
            return
        result = []
        for row in cursor:
            result.append(row)
        return result

    def getAdministratorIDByEmail(self, email):
        cursor = self.conn.cursor()
        query = "select administrator_id from administrator where administrator_email = %s"
        try:
            cursor.execute(query, (email, ))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        if result is None:
            return result
        administrator_id = result[0]
        self.conn.commit()
        return administrator_id

    def getAdminRoleByEmail(self, administrator_email):
        cursor = self.conn.cursor()
        query = "select role from administrator where administrator_email = %s"
        try:
            cursor.execute(query, (administrator_email,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        if result is None:
            return result
        role = result[0]
        self.conn.commit()
        return role

    def addAdministrator(self, administrator_firstname, administrator_lastname, email, password, role):
        cursor = self.conn.cursor()
        hashedPassword = pbkdf2_sha256.hash(password)
        query = "insert into administrator (administrator_firstname, administrator_lastname, administrator_email, administrator_password, role) " \
                "values (%s, %s, %s, %s, %s)"
        try:
            cursor.execute(query, (administrator_firstname, administrator_lastname, email, hashedPassword, role, ))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"


    def deleteAdministratorByID(self, administrator_id):
        cursor = self.conn.cursor()
        query = "delete from administrator where administrator_id = %s"
        try:
            cursor.execute(query, (administrator_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"



    def confirmPasswordByAdminID(self, administrator_id, password):
        cursor = self.conn.cursor()
        query = "select administrator_password from administrator where administrator_id = %s"
        try:
            cursor.execute(query, (administrator_id,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        hashedPassword = result[0]
        response = pbkdf2_sha256.verify(password, hashedPassword)
        self.conn.commit()
        return response

    def getAdminPasswordByEmail(self, email):
        cursor = self.conn.cursor()
        query = "select administrator_password from administrator where administrator_email = %s"
        try:
            cursor.execute(query, (email,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        hashedPassword = result[0]
        self.conn.commit()
        return hashedPassword

    def getAdminEmailInformation(self, email):
        cursor = self.conn.cursor()
        query = "select administrator_firstname, administrator_lastname, administrator_email from administrator where administrator_email = %s"
        try:
            cursor.execute(query, (email,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        #info = result[0]
        self.conn.commit()
        return result

    def getAdminIdByPassword(self, password):
        cursor = self.conn.cursor()
        query = "select administrator_id from administrator where administrator_password = %s"
        try:
            cursor.execute(query, (password,))
        except psycopg2.Error as e:
            return
        result = cursor.fetchone()
        # info = result[0]
        self.conn.commit()
        return result

    def editAdministratorPasswordByID(self, administrator_id, newPassword):
        cursor = self.conn.cursor()
        hashedPassword = pbkdf2_sha256.hash(newPassword)
        query = "update administrator set administrator_password = %s where administrator_id = %s"
        try:
            cursor.execute(query, (hashedPassword, administrator_id,))
        except psycopg2.Error as e:
            return
        self.conn.commit()
        return "Done"