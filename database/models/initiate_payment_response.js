'use strict';
module.exports = (sequelize, DataTypes) => {
  const initiate_payment_response = sequelize.define('initiate_payment', {
    pid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id: DataTypes.STRING,
    statusCode: DataTypes.STRING,
    status: DataTypes.STRING,
    message: DataTypes.STRING,
    txRef: DataTypes.STRING,
    orderRef: DataTypes.STRING,
    flwRef: DataTypes.STRING,
    redirectUrl: DataTypes.STRING,
    device_fingerprint: DataTypes.STRING,
    settlement_token: DataTypes.STRING,
    cycle: DataTypes.STRING,
    amount: DataTypes.STRING,
    charged_amount: DataTypes.STRING,
    appfee: DataTypes.STRING,
    merchantfee: DataTypes.STRING,
    merchantbearsfee: DataTypes.STRING,
    chargeResponseCode: DataTypes.STRING,
    chargeResponseMessage: DataTypes.STRING,
    authModelUsed: DataTypes.STRING,
    currency: DataTypes.STRING,
    IP: DataTypes.STRING,
    narration: DataTypes.STRING,
    status: DataTypes.STRING,
    vbvrespmessage: DataTypes.STRING,
    authurl: DataTypes.STRING,
    vbvrespcode: DataTypes.STRING,
    acctvalrespmsg: DataTypes.STRING,
    acctvalrespcode: DataTypes.STRING,
    paymentType: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    fraud_status: DataTypes.STRING,
    charge_type: DataTypes.STRING,
    is_live: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
    customerId: DataTypes.STRING,
    AccountId: DataTypes.STRING,
    customercandosubsequentnoauth: DataTypes.STRING
  }, {});
  initiate_payment_response.associate = function(models) {
    // associations can be defined here
  };
  return initiate_payment_response;
};