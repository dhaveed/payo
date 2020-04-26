'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('initiate_payment', {
      pid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },      
      statusCode: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      txRef: {
        type: Sequelize.STRING
      },
      orderRef: {
        type: Sequelize.STRING
      },
      flwRef: {
        type: Sequelize.STRING
      },
      redirectUrl: {
        type: Sequelize.STRING
      },
      device_fingerprint: {
        type: Sequelize.STRING
      },
      settlement_token: {
        type: Sequelize.STRING
      },
      cycle: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      charged_amount: {
        type: Sequelize.STRING
      },
      appfee: {
        type: Sequelize.STRING
      },
      merchantfee: {
        type: Sequelize.STRING
      },
      merchantbearsfee: {
        type: Sequelize.STRING
      },
      chargeResponseCode: {
        type: Sequelize.STRING
      },
      chargeResponseMessage: {
        type: Sequelize.STRING
      },
      authModelUsed: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      IP: {
        type: Sequelize.STRING
      },
      narration: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      vbvrespmessage: {
        type: Sequelize.STRING
      },
      authurl: {
        type: Sequelize.STRING
      },
      vbvrespcode: {
        type: Sequelize.STRING
      },
      acctvalrespmsg: {
        type: Sequelize.STRING
      },
      acctvalrespcode: {
        type: Sequelize.STRING
      },
      paymentType: {
        type: Sequelize.STRING
      },
      paymentId: {
        type: Sequelize.STRING
      },
      fraud_status: {
        type: Sequelize.STRING
      },
      charge_type: {
        type: Sequelize.STRING
      },
      is_live: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.STRING
      },
      updatedAt: {
        type: Sequelize.STRING
      },
      deletedAt: {
        type: Sequelize.STRING
      },
      customerId: {
        type: Sequelize.STRING
      },
      AccountId: {
        type: Sequelize.STRING
      },
      customercandosubsequentnoauth: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    },{
    engine: 'MYISAM', // default: 'InnoDB'
    charset: 'latin1' // default: null
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('initiate_payment');
  }
};