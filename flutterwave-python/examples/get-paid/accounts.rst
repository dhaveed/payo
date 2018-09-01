******************
Account
******************

::

    #
    # # TOKENIZE ACCOUNT
    #
    from flutterwave import Flutterwave
    flw = Flutterwave("<api_key>", "<merchant_key>", {"debug": True})

    debitAccount =  "0690000000" # Account number to tokenize
    countryCode = "NG"           # Country code (NG)

    r = flw.account.tokenize(debitAccount, countryCode)
    print "{}".format(r.text)

    # RESPONSE
    # {
    #     "data": {
    #         "transactionReference":"FLW00293078",
    #         "responseMessage":"Successful, pending OTP validation",
    #         "responseCode":"00"
    #     },
    #     "status":"success"
    # }




    #
    # # VALIDATE TOKENIZE ACCOUNT
    #
    from flutterwave import Flutterwave
    flw = Flutterwave("<api_key>", "<merchant_key>", {"debug": True})

    payload = {
        "amount": "100",                # Amount to debit from account (1000.00)
        "ref": "FLW00293078",           # Transaction reference from the tokenize request
        "otp": "12345",                 # OTP to verify tokenize request
        "accountNumber": "0690000000",  # Account number requesting token
        "narration": "sample purchase", # Transaction description
        "country": "NG"                 # Country code (NG)
    }

    r = flw.account.validate(payload)
    print "{}".format(r.text)

    # Response
    # {
    #     "data":{
    #         "transactionreference":"FLW00293079",
    #         "responseMessage":"Approved or Completed Successfully",
    #         "accountToken":"xKeI4NDR9K0aI4J1089",
    #         "responseCode":"00"
    #     },
    #     "status":"success"
    # }




    #
    # # CHARGE ACCOUNT
    #
    from flutterwave import Flutterwave
    flw = Flutterwave("<api_key>", "<merchant_key>", {"debug": True})

    payload = {
        "token": "xKeI4NDR9K0aI4J1089",    # Token returned from account tokenization request
        "amount": "100",                   # Amount to debit from account
        "narration": "payment for coffee", # Description for this payment
        "country": "NG"     			   # country of debit source
    }

    r = flw.account.charge(debitAccount, country)
    print "{}".format(r.text)

    # Response
    # {
    #   {
    #       "transactionreference":"FLW00292801",
    #       "responseMessage":"Approved or Completed Successfully",
    #       "responseCode":"00"
    #   },
    #   "status":"success"
    # }




    #
    # # ACCOUNT LOOKUP
    #
    from flutterwave import Flutterwave
    flw = Flutterwave("<api_key>", "<merchant_key>", {"debug": True})

    payload = {
        "destbankcode": "044",             # Destination Bank code for the account number
        "recipientaccount": "0690000000",  # Account number
        "country": "NG"     			   # Country code (NGN)
    }

    r = flw.account.lookup(payload)
    print "{}".format(r.text)

    # Response
    # {
    #     "data":{
    #         "responsecode":"00",
    #         "accountnumber":"0690000000",
    #         "accountname":"JOHN GREY",
    #         "responsemessage":"Approved Or Completed Successfully",
    #         "uniquereference":"FLWT00297717"
    #     },
    #     "status":"success"
    # }

