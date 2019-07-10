'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "participant_team" on table "participant"
 * changeColumn "team_manager" on table "team"
 * changeColumn "team_category" on table "team"
 *
 **/

var info = {
    "revision": 2,
    "name": "database_20190708_fk",
    "created": "2019-07-08T22:30:44.262Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "participant",
            "participant_team",
            {
                "type": Sequelize.STRING(128),
                "field": "participant_team",
                "references": {
                    "model": "team",
                    "key": "team_id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "team",
            "team_manager",
            {
                "type": Sequelize.STRING(128),
                "field": "team_manager",
                "references": {
                    "model": "participant",
                    "key": "participant_id"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "team",
            "team_category",
            {
                "type": Sequelize.STRING(128),
                "field": "team_category",
                "references": {
                    "model": "category",
                    "key": "category_id"
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
