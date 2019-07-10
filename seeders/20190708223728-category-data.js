'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Category', [
      {
        category_id: '207233ec-4460-46bc-8bd1-676d00f15244',
        category_label: 'Course à pied SOLO',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'CAP',
        category_nb_total: 0,
        category_price_regular: 20,
        category_price_va: 15
      },
      {
        category_id: 'f64988f7-0132-43b6-92ad-27bd34b9da1b',
        category_label: 'Course à pied EQUIPE',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'CAP',
        category_nb_total: 0,
        category_price_regular: 15,
        category_price_va: 10
      },
      {
        category_id: 'f1a10289-1fba-40ef-a6e4-a061605174b7',
        category_label: 'Course à pied LOISIR',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'CAP',
        category_nb_total: 0,
        category_price_regular: 12,
        category_price_va: 8
      },
      {
        category_id: '3589e5b1-435f-494c-b7fd-1430333358ec',
        category_label: 'Course à vélo SOLO',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'VEL',
        category_nb_total: 0,
        category_price_regular: 20,
        category_price_va: 15
      },
      {
        category_id: '834fb8da-2891-427f-81bd-dbe80eeb36bb',
        category_label: 'Course à vélo EQUIPE',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'VEL',
        category_nb_total: 0,
        category_price_regular: 15,
        category_price_va: 10
      },
      {
        category_id: 'c11ffef4-89e8-4ea7-955f-594cb958233d',
        category_label: 'Course à vélo LOISIR',
        category_description: '',
        category_nb_max: 100,
        category_full: 0,
        category_type: 'VEL',
        category_nb_total: 0,
        category_price_regular: 12,
        category_price_va: 8
      },
      {
        category_id: '7a513cfc-17dd-466f-9184-64c9feb7baae',
        category_label: 'Triathlon SOLO',
        category_description: '',
        category_nb_max: 36,
        category_full: 0,
        category_type: 'TRI',
        category_nb_total: 0,
        category_price_regular: 25,
        category_price_va: 20
      },
      {
        category_id: '76894bf7-bde3-41ee-b9c2-1a6fbdc4b2b1',
        category_label: 'Triathlon EQUIPE',
        category_description: '',
        category_nb_max: 36,
        category_full: 0,
        category_type: 'TRI',
        category_nb_total: 0,
        category_price_regular: 20,
        category_price_va: 15
      },
      {
        category_id: '43aabaf0-2992-4363-b2fc-38abbbc6ca4f',
        category_label: 'Triathlon LOISIR',
        category_description: '',
        category_nb_max: 36,
        category_full: 0,
        category_type: 'TRI',
        category_nb_total: 0,
        category_price_regular: 15,
        category_price_va: 10
      },
      {
        category_id: 'c062b153-a1b0-478c-ad75-d9b1629c76da',
        category_label: 'FOLKLO',
        category_description: '',
        category_nb_max: 36,
        category_full: 0,
        category_type: 'FOL',
        category_nb_total: 0,
        category_price_regular: 0,
        category_price_va: 0
      }], {});
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Category', null, {});
  }
};
