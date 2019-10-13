'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "participant_team" from table "participant"
 * removeColumn "team_category" from table "team"
 * removeColumn "team_manager" from table "team"
 * addColumn "team_manager_id" to table "team"
 * addColumn "team_category_id" to table "team"
 * addColumn "participant_team_id" to table "participant"
 *
 **/

var info = {
    "revision": 3,
    "name": "database_20190709",
    "created": "2019-07-09T14:09:03.783Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["participant", "participant_team"]
    },
    {
        fn: "removeColumn",
        params: ["team", "team_category"]
    },
    {
        fn: "removeColumn",
        params: ["team", "team_manager"]
    },
    {
        fn: "addColumn",
        params: [
            "team",
            "team_manager_id",
            {
                "type": Sequelize.STRING(128),
                "field": "team_manager_id",
                "references": {
                    "model": "participant",
                    "key": "participant_id",
                    "as": "dd"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "team",
            "team_category_id",
            {
                "type": Sequelize.STRING(128),
                "field": "team_category_id",
                "references": {
                    "model": "category",
                    "key": "category_id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "participant",
            "participant_team_id",
            {
                "type": Sequelize.STRING(128),
                "field": "participant_team_id",
                "references": {
                    "model": "team",
                    "key": "team_id"
                },
                "allowNull": true
            }
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
