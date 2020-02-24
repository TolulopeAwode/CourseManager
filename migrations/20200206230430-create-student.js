'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MatricNo: {
        type: Sequelize.STRING
      },
      Surname: {
        type: Sequelize.STRING
      },
      FirstName: {
        type: Sequelize.STRING
      },
      Gender: {
        type: Sequelize.STRING
      },
      EmailAddress: {
        type: Sequelize.STRING
      },
      PhoneNo: {
        type: Sequelize.STRING
      },
      LGA: {
        type: Sequelize.STRING
      },
      StateofOrigin: {
        type: Sequelize.STRING
      },
      Avatar: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      DOB: {
        type: Sequelize.DATE
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Students');
  }
};