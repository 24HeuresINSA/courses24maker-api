'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Participant', [
      {
        participant_id: '2beaeedb-f6cc-49ff-91ff-86254e44e0bd',
        participant_name: 'Paul',
        participant_surname: 'Dupont',
        participant_birthdate: '2000-10-24',
        participant_team: '6eea732e-d4d7-4417-8ea6-0750b2e2c9fc',
        participant_student: 0,
        participant_medical_certificate: null,
        participant_medical_certificate_valid: 0,
        participant_medical_certificate_file: 'fichier.jpg',
        participant_payment: 0,
        participant_tee_shirt_size: 'S',
        participant_comment: 'Test',
        participant_message: '',
        participant_telephone: '0612345678',
        participant_email: 'paul.dupont@test.com'
      }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Participant', null, {});
  }
};
