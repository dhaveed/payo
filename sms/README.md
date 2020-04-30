# Twilio SMS Client
A simple twilio sms client for Node.js

## Routes
### POST /sms
```javascript
Content-Type: application/json

{
  "recipient" : "+61xxxxxxxxx",
  "message": "Hello, this is a message sent to one person!"
}
```

### POST /smsCopilot
```javascript
Content-Type: application/json

{
  "recipient" : "+61xxxxxxxxx",
  "message": "Hello, this is a message sent to one person!"
}
```

### POST /sendGroupSMS
```javascript
Content-Type: application/json

{
  "recipients" : ["+61xxxxxxxx1","+61xxxxxxxx2","+61xxxxxxxx3","+61xxxxxxxx4","+61xxxxxxxx5"],
  "message": "Hello, this is a group message"
}
```

### POST /receiveSMS
Use this endpoint as a `webhook` and configure in: https://www.twilio.com/console/phone-numbers/incoming
1. Choose a number
2. Under Messaging, select Configure with Webhooks, TwiML Bins, Functions, Studio or Proxy
3. Specify the public url in "A mesage comes in" text box. Select HTTP POST

Example console.log output:
```javascript
{ ToCountry: 'AU',
  ToState: '',
  SmsMessageSid: 'SMdb07337513b4f2d7933eda58eaffd0d6',
  NumMedia: '0',
  ToCity: '',
  FromZip: '',
  SmsSid: 'SMdb07337513b4f2d7933eda58eaffd0d6',
  FromState: '',
  SmsStatus: 'received',
  FromCity: '',
  Body: 'Hi John',
  FromCountry: 'AU',
  To: '+61448032193',
  ToZip: '',
  NumSegments: '1',
  MessageSid: 'SMdb07337513b4f2d7933eda58eaffd0d6',
  AccountSid: 'AC22458b497113eec0a935a684af68ab28',
  From: '+61439204670',
  ApiVersion: '2010-04-01' }
```

## References
### Bulk SMS
- https://www.twilio.com/blog/2017/12/send-bulk-sms-twilio-node-js.html
### Receiving Two-way SMS Messages
- https://support.twilio.com/hc/en-us/articles/235288367-Receiving-two-way-SMS-messages-with-Twilio
### How to receive sms in Node.js with Twilio
- https://www.twilio.com/blog/2016/08/how-to-receive-an-sms-in-node-js-with-twilio-and-hyperdev.html