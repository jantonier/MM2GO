from mailjet_rest import Client
from config.dbconfig import email_config

class EmailHandler():

    def sendEmail(self, subject, emailsList, html):
        api_key = email_config['api_key']
        api_secret = email_config['api_secret']
        mailjet = Client(auth=(api_key, api_secret), version='v3.1')
        data = {
            'Messages': [
                {
                    "From": {
                        "Email": email_config['sender_email'],
                        "Name": email_config['sender_name']
                    },
                    "To": emailsList,
                    "Subject": subject,
                    "TextPart": "",
                    "HTMLPart": html,
                    "CustomID": "AppGettingStartedTest"
                }
            ]
        }
        result = mailjet.send.create(data=data)
        return "result"

