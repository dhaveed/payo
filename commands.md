Sequelize Commands

	sequelize model:create --name initiate_payment_response --attributes id:string,status:string,message:string,txRef:string,orderRef:string,flwRef:string,redirectUrl:string,device_fingerprint:string,settlement_token:string,cycle:string,amount:string,charged_amount:string,appfee:string,merchantfee:string,merchantbearsfee:string,chargeResponseCode:string,chargeResponseMessage:string,authModelUsed:string,currency:string,IP:string,narration:string,status:string,vbvrespmessage:string,authurl:string,vbvrespcode:string,acctvalrespmsg:string,acctvalrespcode:string,paymentType:string,paymentId:string,fraud_status:string,charge_type:string,is_live:string,createdAt:string,updatedAt:string,deletedAt:string,customerId:string,AccountId:string,customercandosubsequentnoauth:string


	sequelize model:create --name customers_in_payment_response --attributes customer:string,id:string,phone:string,fullName:string,customertoken:string,email:string,createdAt:string,updatedAt:string,deletedAt:string,AccountId:string


	sequelize model:create --name business_settings --attributes user_id:Number,api_key:string,secrete_key:string,enc_key:string

	sequelize model:create --name transaction_response --attributes transaction_reference:string,responsecode:string,responsetoken:string,responsemessage:string

	sequelize model:create --name customer_from_response --attributes customer:string,id:string,phone:string,fullName:string,customertoken:string,email:string,createdAt:string,updatedAt:string,deletedAt:string,AccountId:string

	sequelize model:create --name verify_payment --attributes status:string,message:string,txid:string,txref:string,flwref:string,devicefingerprint:string,cycle:string,amount:string,currency:string,chargedamount:string,appfee:string,merchantfee:string,merchantbearsfee:string,chargecode:string,chargemessage:string,authmodel:string,ip:string,narration:string,status:string,vbvcode:string,vbvmessage:string,authurl:string,acctcode:string,acctmessage:string,paymenttype:string,paymentid:string,fraudstatus:string,chargetype:string,createdday:string,createddayname:string,createdweek:string,createdmonth:string,createdmonthname:string,createdquarter:string,createdyear:string,createdyearisleap:string,createddayispublicholiday:string,createdhour:string,createdminute:string,createdpmam:string,created:string,customerid:string,custphone:string,custnetworkprovider:string,custname:string,custemail:string,custemailprovider:string,custcreated:string,accountid:string,acctbusinessname:string,acctcontactperson:string,acctcountry:string,acctbearsfeeattransactiontime:string,acctparent:string,acctvpcmerchant:string,acctalias:string,acctisliveapproved:string,orderref:string,paymentplan:string,paymentpage:string,raveref:string,meta:string


	sequelize model:create --name card --attributes vpaymentid:integer,expirymonth:string,expiryyear:string,cardBIN:string,last4digits:string,brand:string,card_tokens:integer,type:string,life_time_token:string


	sequelize model:create --name ussd --attributes status:string,message:string,amount:string,type:string,redirect:string,note:string,transaction_date:string,transaction_reference:string,flw_reference:string,redirect_url:string,payment_code:string,type_data:string,meta_data:string,response_code:string,response_message:string