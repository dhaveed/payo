from flutterwave import Flutterwave
import time
import unittest
import json
import pprint

class TestCards(unittest.TestCase):

    global flw
    global validateOption
    global authModel
    global cardNumber
    global cvv
    global expiryMonth
    global expiryYear
    global bvn
    global amount
    global currency
    global customerID
    global narration
    global responseUrl
    global otp
    global otpTransactionIdentifier
    global cardToken
    global transactionRef
    global authorizeID
    global country
    global pin
    global ref


    flw = Flutterwave("tk_NabYp2XjZ6G9WwdFruzK", "tk_tdyrSMQo8a", {"debug": True})

    ref = "{}{}".format("cust", time.time())[0:18]
    validateOption = "SMS"
    authModel = "BVN"
    cardNumber = "4842508225502547"
    cvv = "136"
    expiryMonth = "10"
    expiryYear = "18"
    bvn = "12345678901"
    amount = "100"
    currency = "NGN"
    customerID = ref
    narration = "sample card purchase"
    responseUrl = "http://127.0.0.1/your_callback_url"
    otp = "12345"
    country = "NG"
    pin = "1234"


    def test1CardTokenize(self):
        print "\n---------###-- Flutterwave Card Tokenize --###------------"
        data = {
            "validateOption": validateOption,
            "authModel": authModel,
            "cardNumber": cardNumber,
            "cvv": cvv,
            "expiryMonth": expiryMonth,
            "expiryYear": expiryYear,
            "bvn": bvn,
            "country": country
        }

        r = flw.card.tokenize(data)
        d = json.loads(r.text)

        global otpTransactionIdentifier
        otpTransactionIdentifier = d["data"]["otptransactionidentifier"]
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)

    
    def test2CardValidate(self):
        print "\n---------###-- Flutterwave Card Validate Tokenize --###------------"
        data = {
            "otp": otp,
            "otpTransactionIdentifier": otpTransactionIdentifier,
            "country": country
        }

        r = flw.card.validate(data)
        d = json.loads(r.text)

        global cardToken
        cardToken = d["data"]["responsetoken"]
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test3CardCharge(self):
        print "\n---------###-- Flutterwave Card Charge --###------------"
        data = {
            "amount": amount,
            "authModel": authModel,
            "cardNumber": cardNumber,
            "cvv": cvv,
            "expiryMonth": expiryMonth,
            "expiryYear": expiryYear,
            "bvn": bvn,
            "currency": currency,
            "customerID": customerID,
            "narration": narration,
            "responseUrl": responseUrl,
            "currency": currency,
            "country": country
        }

        r = flw.card.charge(data)
        d = json.loads(r.text)

        global otpTransactionIdentifier
        otpTransactionIdentifier = d["data"]["otptransactionidentifier"]
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)

    
    def test4CardValidate(self):
        print "\n---------###-- Flutterwave Card Validate Charge --###------------"
        data = {
            "otp": otp,
            "otpTransactionIdentifier": otpTransactionIdentifier,
            "country": country
        }

        r = flw.card.validate(data)
        d = json.loads(r.text)
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test5ChargeWithToken(self):
        print "\n---------###-- Flutterwave Card Charge with Token --###------------"
        data = {
            "amount": amount,
            "cardToken": cardToken,
            "customerID": customerID,
            "narration": narration,
            "currency": currency,
            "country": country
        }

        r = flw.card.chargeWithToken(data)
        d = json.loads(r.text)

        global transactionRef
        transactionRef = d["data"]["transactionreference"]
        
        self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test6VerifyCharge(self):
        print "\n---------###-- Flutterwave Verify Card Charge --###------------"

        r = flw.card.verifyCharge(transactionRef, country)
        d = json.loads(r.text)
        
        self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test7CardPreauth(self):
        print "\n---------###-- Flutterwave Card Preauth 1 --###------------"
        data = {
            "amount": amount,
            "currency": currency,
            "cardToken": cardToken,
            "country": country
        }

        r = flw.card.preauth(data)
        d = json.loads(r.text)

        global authorizeID
        global transactionRef
        authorizeID = d["data"]["authorizeId"]
        transactionRef = d["data"]["transactionreference"]
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test8CardCapture(self):
        print "\n---------###-- Flutterwave Card Capture 1 --###------------"
        data = {
            "amount": amount,
            "currency": currency,
            "transactionRef": transactionRef,
            "authorizeID": authorizeID,
            "country": country
        }

        r = flw.card.capture(data)
        d = json.loads(r.text)
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test9CardPreauth(self):
        print "\n---------###-- Flutterwave Card Preauth 2 --###------------"
        data = {
            "amount": amount,
            "currency": currency,
            "cardToken": cardToken,
            "country": country
        }

        r = flw.card.preauth(data)
        d = json.loads(r.text)

        global authorizeID
        global transactionRef
        otpTransactionIdentifier = d["data"]["authorizeId"]
        otpTransactionIdentifier = d["data"]["transactionreference"]
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test91CardVoid(self):
        print "\n---------###-- Flutterwave Card Void 2 --###------------"
        data = {
            "amount": amount,
            "currency": currency,
            "transactionRef": transactionRef,
            "authorizeID": authorizeID,
            "country": country
        }

        r = flw.card.void(data)
        d = json.loads(r.text)
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)

    def test92CardRefund(self):
        print "\n---------###-- Flutterwave Card Refund --###------------"
        data = {
            "amount": amount,
            "currency": currency,
            "transactionRef": transactionRef,
            "authorizeID": authorizeID,
            "country": country
        }

        r = flw.card.refund(data)
        d = json.loads(r.text)
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)

    
    def test93CardBalanceEnquiry(self):
        print "\n---------###-- Flutterwave Card Balance Enquiry --###------------"
        data = {
            "cardNumber": cardNumber,
            "cvv": cvv,
            "expiryMonth": expiryMonth,
            "expiryYear": expiryYear,
            "pin": pin,
            "transactionRef": ref,
            "country": country
        }

        r = flw.card.balanceEnquiry(data)
        d = json.loads(r.text)

        global otpTransactionIdentifier
        otpTransactionIdentifier = d["data"]["otpref"]
        global transactionRef
        transactionRef = d['data']['transactionref']
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)


    def test94CardRefund(self):
        print "\n---------###-- Flutterwave Validate Card Balance Enquiry --###------------"
        data = {
            "otp": otp,
            "otpTransactionIdentifier": otpTransactionIdentifier,
            "transactionRef": transactionRef,
            "country": country
        }

        r = flw.card.validateBalanceEnquiry(data)
        d = json.loads(r.text)
        
        # self.assertEqual(d["data"]["responsecode"], "00")
        print "{}".format(r.text)        


if __name__ == '__main__':
    unittest.main()