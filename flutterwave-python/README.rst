******************
Flutterwave Python
******************

Python Bindings for the Flutterwave Payment APIs.

==================
Installation
==================

To install the flutterwave python package, run the command below::

    pip install --upgrade flutterwave

or::

    easy_install --upgrade flutterwave

See http://www.pip-installer.org/en/latest/index.html for instructions
on installing pip. If you are on a system with easy_install but not
pip, you can use easy_install instead.

To install from source, clone this repo, then run from directory::

    python setup.py install

Linux users may require missing python headers for the crypto library, run this to install::

    sudo apt-get update; sudo apt-get install python-dev -y

=================
API Services
=================
- Charge Accounts
- Charge Cards
- Disburse to Accounts
- Account Number Lookup
- Card BIN Lookup
- Card Balance Enquiry
- Foreign Bank Account Transfers (ACH)
- BVN Validation
- IP Check

===================
Getting Started
===================

To debit an account, in two steps: first, tokenize the account, then charge the account using the returned token::

    from flutterwave import Flutterwave
    flw = Flutterwave("<api_key>", "<merchant_key>", {"debug": True})

    payload = {
        "token": "FZeDswE6ju0ONCL3864",    # Token returned from account tokenization request
        "amount": "100",                   # Amount to debit from account
        "narration": "payment for coffee", # Description for this payment
        "country": "NG"                    # country of debit source
    }

    r = flw.account.charge(payload)
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



Tokens are valid means of charging an account or card subsequently. 
Find more examples `here <https://github.com/Flutterwave/flutterwave-python/tree/master/examples>`_ .

Sign up at http://flutterwave.com for API keys.

============
Setup
============

Optional Setup Paremeters

    =========  ====================================================================
    Parameter  Description
    =========  ====================================================================
    env        (staging, production) sets the library to development or live
    baseUrl    sets the base url used internally
    debug      enables request and response logging to console.
    =========  ====================================================================

After development, the go-live process requires live keys and an optional argument

    flw = Flutterwave("<api_key_live>", "<merchant_key_live>", {"env":"production"})

============
Testing
============

Flutterwave-Python is written in python version 2.7 and can be tested by running the command below from the package folder::

    python -m unittest discover