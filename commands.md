Sequelize Commands

	sequelize model:create --name initiate_payment_response --attributes id:string,status:string,message:string,txRef:string,orderRef:string,flwRef:string,redirectUrl:string,device_fingerprint:string,settlement_token:string,cycle:string,amount:string,charged_amount:string,appfee:string,merchantfee:string,merchantbearsfee:string,chargeResponseCode:string,chargeResponseMessage:string,authModelUsed:string,currency:string,IP:string,narration:string,status:string,vbvrespmessage:string,authurl:string,vbvrespcode:string,acctvalrespmsg:string,acctvalrespcode:string,paymentType:string,paymentId:string,fraud_status:string,charge_type:string,is_live:string,createdAt:string,updatedAt:string,deletedAt:string,customerId:string,AccountId:string,customercandosubsequentnoauth:string


	sequelize model:create --name customers_in_payment_response --attributes customer:string,id:string,phone:string,fullName:string,customertoken:string,email:string,createdAt:string,updatedAt:string,deletedAt:string,AccountId:string


	sequelize model:create --name business_settings --attributes user_id:Number,api_key:string,secrete_key:string,enc_key:string


