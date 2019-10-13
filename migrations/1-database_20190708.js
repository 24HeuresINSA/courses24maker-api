'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "category", deps: []
 * createTable "participant", deps: []
 * createTable "team", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "database_20190708",
    "created": "2019-07-08T22:29:44.923Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "category",
            {
                "category_id": {
                    "type": Sequelize.STRING(128),
                    "field": "category_id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "category_label": {
                    "type": Sequelize.STRING(45),
                    "field": "category_label",
                    "allowNull": false
                },
                "category_description": {
                    "type": Sequelize.STRING(512),
                    "field": "category_description",
                    "allowNull": false
                },
                "category_nb_max": {
                    "type": Sequelize.INTEGER(11),
                    "field": "category_nb_max",
                    "allowNull": true
                },
                "category_full": {
                    "type": Sequelize.INTEGER(4),
                    "field": "category_full",
                    "defaultValue": "0",
                    "allowNull": true
                },
                "category_type": {
                    "type": Sequelize.STRING(15),
                    "field": "category_type",
                    "allowNull": true
                },
                "category_nb_total": {
                    "type": Sequelize.INTEGER(11),
                    "field": "category_nb_total",
                    "allowNull": true
                },
                "category_price_regular": {
                    "type": Sequelize.FLOAT,
                    "field": "category_price_regular",
                    "allowNull": true
                },
                "category_price_student": {
                    "type": Sequelize.FLOAT,
                    "field": "category_price_student",
                    "allowNull": true
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "participant",
            {
                "participant_id": {
                    "type": Sequelize.STRING(128),
                    "field": "participant_id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "participant_name": {
                    "type": Sequelize.STRING(45),
                    "field": "participant_name",
                    "allowNull": false
                },
                "participant_surname": {
                    "type": Sequelize.STRING(45),
                    "field": "participant_surname",
                    "allowNull": false
                },
                "participant_birthdate": {
                    "type": Sequelize.DATEONLY,
                    "field": "participant_birthdate",
                    "allowNull": false
                },
                "participant_team": {
                    "type": Sequelize.STRING(128),
                    "field": "participant_team",
                    "allowNull": true
                },
                "participant_student": {
                    "type": Sequelize.INTEGER(4),
                    "field": "participant_student",
                    "defaultValue": "0",
                    "allowNull": true
                },
                "participant_medical_certificate": {
                    "type": Sequelize.BLOB,
                    "field": "participant_medical_certificate",
                    "allowNull": true
                },
                "participant_medical_certificate_valid": {
                    "type": Sequelize.INTEGER(4),
                    "field": "participant_medical_certificate_valid",
                    "defaultValue": "0",
                    "allowNull": true
                },
                "participant_medical_certificate_file": {
                    "type": Sequelize.STRING(128),
                    "field": "participant_medical_certificate_file",
                    "allowNull": true
                },
                "participant_payment": {
                    "type": Sequelize.INTEGER(4),
                    "field": "participant_payment",
                    "defaultValue": "0",
                    "allowNull": true
                },
                "participant_tee_shirt_size": {
                    "type": Sequelize.STRING(2),
                    "field": "participant_tee_shirt_size",
                    "allowNull": true
                },
                "participant_comment": {
                    "type": Sequelize.STRING(512),
                    "field": "participant_comment",
                    "allowNull": true
                },
                "participant_message": {
                    "type": Sequelize.STRING(512),
                    "field": "participant_message",
                    "allowNull": true
                },
                "participant_telephone": {
                    "type": Sequelize.STRING(15),
                    "field": "participant_telephone",
                    "allowNull": true
                },
                "participant_email": {
                    "type": Sequelize.STRING(128),
                    "field": "participant_email",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": true
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "team",
            {
                "team_id": {
                    "type": Sequelize.STRING(128),
                    "field": "team_id",
                    "primaryKey": true,
                    "allowNull": false
                },
                "team_manager": {
                    "type": Sequelize.STRING(128),
                    "field": "team_manager",
                    "allowNull": true
                },
                "team_name": {
                    "type": Sequelize.STRING(45),
                    "field": "team_name",
                    "allowNull": true
                },
                "team_password": {
                    "type": Sequelize.STRING(512),
                    "field": "team_password",
                    "allowNull": true
                },
                "team_category": {
                    "type": Sequelize.STRING(128),
                    "field": "team_category",
                    "allowNull": true
                },
                "team_valid": {
                    "type": Sequelize.INTEGER(4),
                    "field": "team_valid",
                    "defaultValue": "0",
                    "allowNull": true
                },
                "team_salt": {
                    "type": Sequelize.STRING(512),
                    "field": "team_salt",
                    "allowNull": true
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": true
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": true
                }
            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
