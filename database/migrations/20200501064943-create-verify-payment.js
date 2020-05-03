'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('verify_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      txid: {
        type: Sequelize.STRING
      },
      txref: {
        type: Sequelize.STRING
      },
      flwref: {
        type: Sequelize.STRING
      },
      devicefingerprint: {
        type: Sequelize.STRING
      },
      cycle: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      chargedamount: {
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
      chargecode: {
        type: Sequelize.STRING
      },
      chargemessage: {
        type: Sequelize.STRING
      },
      authmodel: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      narration: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      vbvcode: {
        type: Sequelize.STRING
      },
      vbvmessage: {
        type: Sequelize.STRING
      },
      authurl: {
        type: Sequelize.STRING
      },
      acctcode: {
        type: Sequelize.STRING
      },
      acctmessage: {
        type: Sequelize.STRING
      },
      paymenttype: {
        type: Sequelize.STRING
      },
      paymentid: {
        type: Sequelize.STRING
      },
      fraudstatus: {
        type: Sequelize.STRING
      },
      chargetype: {
        type: Sequelize.STRING
      },
      createdday: {
        type: Sequelize.STRING
      },
      createddayname: {
        type: Sequelize.STRING
      },
      createdweek: {
        type: Sequelize.STRING
      },
      createdmonth: {
        type: Sequelize.STRING
      },
      createdmonthname: {
        type: Sequelize.STRING
      },
      createdquarter: {
        type: Sequelize.STRING
      },
      createdyear: {
        type: Sequelize.STRING
      },
      createdyearisleap: {
        type: Sequelize.STRING
      },
      createddayispublicholiday: {
        type: Sequelize.STRING
      },
      createdhour: {
        type: Sequelize.STRING
      },
      createdminute: {
        type: Sequelize.STRING
      },
      createdpmam: {
        type: Sequelize.STRING
      },
      created: {
        type: Sequelize.STRING
      },
      customerid: {
        type: Sequelize.STRING
      },
      custphone: {
        type: Sequelize.STRING
      },
      custnetworkprovider: {
        type: Sequelize.STRING
      },
      custname: {
        type: Sequelize.STRING
      },
      custemail: {
        type: Sequelize.STRING
      },
      custemailprovider: {
        type: Sequelize.STRING
      },
      custcreated: {
        type: Sequelize.STRING
      },
      accountid: {
        type: Sequelize.STRING
      },
      acctbusinessname: {
        type: Sequelize.STRING
      },
      acctcontactperson: {
        type: Sequelize.STRING
      },
      acctcountry: {
        type: Sequelize.STRING
      },
      acctbearsfeeattransactiontime: {
        type: Sequelize.STRING
      },
      acctparent: {
        type: Sequelize.STRING
      },
      acctvpcmerchant: {
        type: Sequelize.STRING
      },
      acctalias: {
        type: Sequelize.STRING
      },
      acctisliveapproved: {
        type: Sequelize.STRING
      },
      orderref: {
        type: Sequelize.STRING
      },
      paymentplan: {
        type: Sequelize.STRING
      },
      paymentpage: {
        type: Sequelize.STRING
      },
      raveref: {
        type: Sequelize.STRING
      },
      meta: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },{
    engine: 'MYISAM', // default: 'InnoDB'
    charset: 'latin1' // default: null
  });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('verify_payments');
  }
};