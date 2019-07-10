'use strict';

const service_authentication = require('../services/service-authentication');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Team', [
      {
        team_id: '6eea732e-d4d7-4417-8ea6-0750b2e2c9fc',
        team_manager: '2beaeedb-f6cc-49ff-91ff-86254e44e0bd',
        team_name: 'Test',
        team_password: service_authentication.hashPassword('test', 'sel'),
        team_category: '207233ec-4460-46bc-8bd1-676d00f15244',
        team_valid: 0,
        team_salt: 'sel'
      }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Team', null, {});
  }
};
