define({ "api": [
  {
    "group": "AUTHENTICATION",
    "type": "POST",
    "url": "/authentication/login",
    "title": "Login and get the jwt",
    "description": "<p>Login the api to get the jwt</p>",
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>The jwt to use as a header bearer to request this api</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p><code>Mandatory</code> The user (name of the team or admin)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p><code>Mandatory</code> The password of the team or of the admin account</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_BAD_REQUEST",
            "description": "<p>Your request is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_PASSWORD_WRONG",
            "description": "<p>Bad password</p>"
          },
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST",
            "description": "<p>The team does not exist</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/authentication.js",
    "groupTitle": "AUTHENTICATION",
    "name": "PostAuthenticationLogin"
  },
  {
    "group": "AUTHENTICATION",
    "type": "POST",
    "url": "/authentication/register",
    "title": "Register a new user",
    "description": "<p>Create a new user for the api that is to say a new team with a manager</p>",
    "success": {
      "fields": {
        "Sucess 201": [
          {
            "group": "Sucess 201",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": "<p>The jwt of the team to use as a header bearer to request this api</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "team",
            "description": "<p>The information of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_name",
            "description": "<p><code>Mandatory</code> The name of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_password",
            "description": "<p><code>Mandatory</code> The password of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.category_id",
            "description": "<p><code>Mandatory</code> The uuid of the category associated to the team to create</p>"
          },
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "team_manager",
            "description": "<p>The information of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_name",
            "description": "<p><code>Mandatory</code> The name of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_surname",
            "description": "<p><code>Mandatory</code> The surname of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "Date",
            "optional": false,
            "field": "team_manager.participant_birthdate",
            "description": "<p><code>Mandatory</code> The birthdate of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_telephone",
            "description": "<p><code>Mandatory</code> The telephone of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_email",
            "description": "<p><code>Mandatory</code> The email of the manager of the team to create</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "TEAM_ALREADY_EXISTS",
            "description": "<p>The team with the same name already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_CHECK_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_POST_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/authentication.js",
    "groupTitle": "AUTHENTICATION",
    "name": "PostAuthenticationRegister"
  },
  {
    "group": "CATEGORY",
    "type": "GET",
    "url": "/categories",
    "title": "Get all categories",
    "description": "<p>Retrieve all categories recorded</p>",
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "categories",
            "description": "<p>The array with all categories</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_id",
            "description": "<p>The uuid of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_label",
            "description": "<p>The label of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_description",
            "description": "<p>The description of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_nb_max",
            "description": "<p>The max number of participant that can be in a team of that category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "categories.category_full",
            "description": "<p>If the category is full (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_type",
            "description": "<p>The type of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_nb_total",
            "description": "<p>The total number of participant of that category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_price_regular",
            "description": "<p>The regular price of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_price_student",
            "description": "<p>The student price of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the category raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the category raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CATEGORIES_NOT_FOUND",
            "description": "<p>No category has been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_GET_CATEGORIES",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "CATEGORY",
    "name": "GetCategories",
    "parameter": {
      "fields": {
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    }
  },
  {
    "group": "CATEGORY",
    "type": "GET",
    "url": "/categories/:id",
    "title": "Get a category",
    "description": "<p>Get a category</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the category to retrieve</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "category",
            "description": "<p>The information about the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_id",
            "description": "<p>The uuid of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_label",
            "description": "<p>The label of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_description",
            "description": "<p>The description of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_nb_max",
            "description": "<p>The max number of participant that can be in a team of that category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "categories.category_full",
            "description": "<p>If the category is full (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_type",
            "description": "<p>The type of the category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_nb_total",
            "description": "<p>The total number of participant of that category of the race</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_price_regular",
            "description": "<p>The regular price of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "categories.category_price_student",
            "description": "<p>The student price of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the category raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the category raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CATEGORY_NOT_FOUND",
            "description": "<p>The category has not been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_GET_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "CATEGORY",
    "name": "GetCategoriesId"
  },
  {
    "group": "CATEGORY",
    "type": "GET",
    "url": "/categories/:id",
    "title": "Delete a category",
    "description": "<p>Delete a category</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the category to delete</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 204": [
          {
            "group": "Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No Content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "CATEGORY_NOT_FOUND",
            "description": "<p>The category has not been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_DELETE_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "CATEGORY",
    "name": "GetCategoriesId"
  },
  {
    "group": "CATEGORY",
    "type": "POST",
    "url": "/categories",
    "title": "Create a category",
    "description": "<p>Create a category</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "category",
            "description": "<p>The category object to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_label",
            "description": "<p><code>Mandatory</code> The label of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_description",
            "description": "<p>The description of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_nb_max",
            "description": "<p><code>Mandatory</code> The max number of participant that can be in a team of that category of the race</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "category.category_full",
            "description": "<p>If the category is full (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>The type of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_nb_total",
            "description": "<p>The total number of participant of that category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_price_regular",
            "description": "<p><code>Mandatory</code> The regular price of the category</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_price_student",
            "description": "<p><code>Mandatory</code> The student price of the category</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 201": [
          {
            "group": "Sucess 201",
            "type": "String",
            "optional": false,
            "field": "category_id",
            "description": "<p>The uuid of the category created</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "CATEGORY_ALREADY_EXISTS",
            "description": "<p>The category with the same label already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_POST_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "CATEGORY",
    "name": "PostCategories"
  },
  {
    "group": "CATEGORY",
    "type": "PUT",
    "url": "/categories/:id",
    "title": "Update a category",
    "description": "<p>Update a category</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the category to update</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "category",
            "description": "<p>The category object to update</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_label",
            "description": "<p>The label of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_description",
            "description": "<p>The description of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_nb_max",
            "description": "<p>The max number of participant that can be in a team of that category of the race</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "category.category_full",
            "description": "<p>If the category is full (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_type",
            "description": "<p>The type of the category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_nb_total",
            "description": "<p>The total number of participant of that category of the race</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_price_regular",
            "description": "<p>The regular price of the category</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "category.category_price_student",
            "description": "<p>The student price of the category</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 204": [
          {
            "group": "Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No Content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "CATEGORY_NOT_FOUND",
            "description": "<p>The category has not been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_PUT_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "CATEGORY",
    "name": "PutCategoriesId"
  },
  {
    "group": "PARTICIPANT",
    "type": "DELETE",
    "url": "/participants/:id",
    "title": "Delete a participant",
    "description": "<p>Delete a participant</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the participant to delete</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 204": [
          {
            "group": "Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANT_NOT_FOUND",
            "description": "<p>The participant has not be found in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_DELETE_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "DeleteParticipantsId"
  },
  {
    "group": "PARTICIPANT",
    "type": "GET",
    "url": "/participants",
    "title": "Get all participants",
    "description": "<p>Retrieve all participants registered</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "team",
            "defaultValue": "false",
            "description": "<p>If you want include the associated team in the response</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "participants",
            "description": "<p>The array with all participants</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_birthdate",
            "description": "<p>The birthdate of the participant (YYYY-MM-DD)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_email",
            "description": "<p>The email of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participants.participant_team",
            "description": "<p>The team object associated to the participant (If team query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_id",
            "description": "<p>The uuid of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_name",
            "description": "<p>The name of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_valid",
            "description": "<p>If the team is valid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participants.participant_team.team_category",
            "description": "<p>The category object associated to the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_category.category_id",
            "description": "<p>The uuid of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_category.category_label",
            "description": "<p>The label of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the participant raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the participant raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANTS_NOT_FOUND",
            "description": "<p>No participant has been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "GetParticipants"
  },
  {
    "group": "PARTICIPANT",
    "type": "GET",
    "url": "/participants/:id",
    "title": "Get a participant",
    "description": "<p>Retrieve a particular participant</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> id The uuid of the participant to retrieve</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participant",
            "description": "<p>The participant retrieved</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_birthdate",
            "description": "<p>The birthdate of the participant (YYYY-MM-DD)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_email",
            "description": "<p>The email of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participant.participant_team",
            "description": "<p>The team object associated to the participant (If team query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team.team_id",
            "description": "<p>The uuid of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team.team_name",
            "description": "<p>The name of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team.team_valid",
            "description": "<p>If the team is valid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participant.participant_team.team_category",
            "description": "<p>The category object associated to the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team.team_category.category_id",
            "description": "<p>The uuid of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team.team_category.category_label",
            "description": "<p>The label of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the participant raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the participant raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANT_NOT_FOUND",
            "description": "<p>No participant has been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "GetParticipantsId"
  },
  {
    "group": "PARTICIPANT",
    "type": "GET",
    "url": "/participants/medical-certificate/:id",
    "title": "Get a the medical certificate of a participant",
    "description": "<p>Retrieve the medical certificate file Base64 encoded of a participant</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code>The uuid of the participant for which you want retrieve the medical certificate</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participant_medical_certificate",
            "description": "<p>The medical certificate file Base64 encoded</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANT_NOT_FOUND",
            "description": "<p>No participant has been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "GetParticipantsMedicalCertificateId"
  },
  {
    "group": "PARTICIPANT",
    "type": "GET",
    "url": "/participants/team/:id",
    "title": "Get all participants of a team",
    "description": "<p>Retrieve all participants registered in a particular team</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The uuid of the team for which you want retrieve the participants</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "team",
            "defaultValue": "false",
            "description": "<p>If you want include the associated team in the response</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "participants",
            "description": "<p>The array with all participants</p>"
          }
        ],
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_birthdate",
            "description": "<p>The birthdate of the participant (YYYY-MM-DD)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "participants.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_email",
            "description": "<p>The email of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participants.participant_team",
            "description": "<p>The team object associated to the participant (If team query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_id",
            "description": "<p>The uuid of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_name",
            "description": "<p>The name of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_valid",
            "description": "<p>If the team is valid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "participants.participant_team.team_category",
            "description": "<p>The category object associated to the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_category.category_id",
            "description": "<p>The uuid of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "participants.participant_team.team_category.category_label",
            "description": "<p>The label of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the participant raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the participant raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANTS_NOT_FOUND",
            "description": "<p>No participant has been found for this team</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "GetParticipantsTeamId"
  },
  {
    "group": "PARTICIPANT",
    "type": "POST",
    "url": "/participants/",
    "title": "Create a participant",
    "description": "<p>Create or register a participant</p>",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "The",
            "description": "<p>participant you want to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_name",
            "description": "<p><code>Mandatory</code> The name of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_surname",
            "description": "<p><code>Mandatory</code> The surname of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_birthdate",
            "description": "<p><code>Mandatory</code> The birthdate of the participant (YYYY-MM-DD)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_medical_certificate",
            "description": "<p>The certificate file in the .jpg, .png or .pdf extension and base64 encoded</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_telephone",
            "description": "<p><code>Mandatory</code> The phone number of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_email",
            "description": "<p><code>Mandatory</code> The email of the participant</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 201": [
          {
            "group": "Sucess 201",
            "type": "String",
            "optional": false,
            "field": "participant_id",
            "description": "<p>The uuid of the participant created</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "PARTICIPANT_ALREADY_EXISTS",
            "description": "<p>A participant with the same name, surname and birthdate already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_POST_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "PostParticipants"
  },
  {
    "group": "PARTICIPANT",
    "type": "PUT",
    "url": "/participants/:id",
    "title": "Update a participant",
    "description": "<p>Update some information about a participant</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the participant to update</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "The",
            "description": "<p>participant object with the information to update</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_birthdate",
            "description": "<p>The birthdate of the participant (YYYY-MM-DD)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_medical_certificate",
            "description": "<p>The certificate file in the .jpg, .png or .pdf extension and base64 encoded</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Body",
            "type": "Boolean",
            "optional": false,
            "field": "participant.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "participant.participant_email",
            "description": "<p>The email of the participant</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 204) (Sucess 204": [
          {
            "group": "Sucess 204) (Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "PARTICIPANT_NOT_FOUND",
            "description": "<p>The participant has not be found in the database</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_PUT_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/participant.js",
    "groupTitle": "PARTICIPANT",
    "name": "PutParticipantsId"
  },
  {
    "group": "TEAM",
    "type": "DELETE",
    "url": "/teams/:id",
    "title": "Delete a team",
    "description": "<p>Delete a particular team</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the team to delete</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 204": [
          {
            "group": "Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No content</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "TEAM_NOT_FOUND",
            "description": "<p>The team has not been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_DELETE_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/team.js",
    "groupTitle": "TEAM",
    "name": "DeleteTeamsId"
  },
  {
    "group": "TEAM",
    "type": "GET",
    "url": "/teams",
    "title": "Get all teams registered",
    "description": "<p>Retrieve all teams registered</p>",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "paticipants",
            "defaultValue": "false",
            "description": "<p>If you want include all the associated participants in the response</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "category",
            "defaultValue": "true",
            "description": "<p>If you want include the associated category in the response</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "manager",
            "defaultValue": "true",
            "description": "<p>If you want include the participant that manage the team in the response</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "teams",
            "description": "<p>The array with all participants</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_id",
            "description": "<p>The uuid of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager_id",
            "description": "<p>The uuid of the participant managing the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_name",
            "description": "<p>The name of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_category_id",
            "description": "<p>The uuid of the category associated</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "teams.team_valid",
            "description": "<p>If the team is valid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "teams.team_manager",
            "description": "<p>The participant object associated to the team (If <code>manager</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_manager.participant_email",
            "description": "<p>The mail of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "teams.team_category",
            "description": "<p>The category object associated to the team (If <code>category</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_category.category_id",
            "description": "<p>The uuid of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_category.category_label",
            "description": "<p>The label of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "teams.team_participants",
            "description": "<p>The participant object array associated to the team (If <code>participants</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "teams.team_participants.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "teams.team_participants.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "teams.team_participants.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "teams.team_participants.participant_email",
            "description": "<p>The email of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the team raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the team raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "TEAMS_NOT_FOUND",
            "description": "<p>No team has been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_GET_ALL",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/team.js",
    "groupTitle": "TEAM",
    "name": "GetTeams"
  },
  {
    "group": "TEAM",
    "type": "GET",
    "url": "/teams/:id",
    "title": "Get a team",
    "description": "<p>Get a particular team</p>",
    "parameter": {
      "fields": {
        "Path": [
          {
            "group": "Path",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p><code>Mandatory</code> The uuid of the team to retrieve</p>"
          }
        ],
        "Query": [
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "paticipants",
            "defaultValue": "false",
            "description": "<p>If you want include all the associated participants in the response</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "category",
            "defaultValue": "true",
            "description": "<p>If you want include the associated category in the response</p>"
          },
          {
            "group": "Query",
            "type": "Boolean",
            "optional": false,
            "field": "manager",
            "defaultValue": "true",
            "description": "<p>If you want include the participant that manage the team in the response</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Sucess 200": [
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "team",
            "description": "<p>The team retrieved</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_id",
            "description": "<p>The uuid of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager_id",
            "description": "<p>The uuid of the participant managing the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_name",
            "description": "<p>The name of the team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_category_id",
            "description": "<p>The uuid of the category associated</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "team.team_valid",
            "description": "<p>If the team is valid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "team.team_manager",
            "description": "<p>The participant object associated to the team (If <code>manager</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_manager.participant_email",
            "description": "<p>The mail of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object",
            "optional": false,
            "field": "team.team_category",
            "description": "<p>The category object associated to the team (If <code>category</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_category.category_id",
            "description": "<p>The uuid of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_category.category_label",
            "description": "<p>The label of the category</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Object[]",
            "optional": false,
            "field": "team.team_participants",
            "description": "<p>The participant object array associated to the team (If <code>participants</code> query param <code>true</code>)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_id",
            "description": "<p>The uuid of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_name",
            "description": "<p>The name of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_surname",
            "description": "<p>The surname of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_team_id",
            "description": "<p>The uuid of the associate team</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "team.team_participants.participant_student",
            "description": "<p>If the participant is a student (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "team.team_participants.participant_medical_certificate_valid",
            "description": "<p>If the participant has uploaded a valid certificate (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_medical_certificate_file",
            "description": "<p>The path file of the medical certificate</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Boolean",
            "optional": false,
            "field": "team.team_participants.participant_payment",
            "description": "<p>If the participant has already paid (1) or not (0)</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_tee_shirt_size",
            "description": "<p>The size for the tee shirt of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_comment",
            "description": "<p>The comment the participant can send</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_message",
            "description": "<p>The message send by the admin to the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_telephone",
            "description": "<p>The phone number of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "String",
            "optional": false,
            "field": "team.team_participants.participant_email",
            "description": "<p>The email of the participant</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "cratedAt",
            "description": "<p>The creation date of the team raw</p>"
          },
          {
            "group": "Sucess 200",
            "type": "Date",
            "optional": false,
            "field": "updatedAt",
            "description": "<p>The last date update of the team raw</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "TEAM_NOT_FOUND",
            "description": "<p>The team has not been found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_GET_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/team.js",
    "groupTitle": "TEAM",
    "name": "GetTeamsId"
  },
  {
    "group": "TEAM",
    "type": "POST",
    "url": "/teams",
    "title": "Create a team",
    "description": "<p>Create a new team with a manager</p>",
    "success": {
      "fields": {
        "Sucess 201": [
          {
            "group": "Sucess 201",
            "type": "String",
            "optional": false,
            "field": "team_id",
            "description": "<p>The uuid of the team created</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "team",
            "description": "<p>The information of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_name",
            "description": "<p><code>Mandatory</code> The name of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_password",
            "description": "<p><code>Mandatory</code> The password of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.category_id",
            "description": "<p><code>Mandatory</code> The uuid of the category associated to the team to create</p>"
          },
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "team_manager",
            "description": "<p>The information of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_name",
            "description": "<p><code>Mandatory</code> The name of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_surname",
            "description": "<p><code>Mandatory</code> The surname of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "Date",
            "optional": false,
            "field": "team_manager.participant_birthdate",
            "description": "<p><code>Mandatory</code> The birthdate of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_telephone",
            "description": "<p><code>Mandatory</code> The telephone of the manager of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team_manager.participant_email",
            "description": "<p><code>Mandatory</code> The email of the manager of the team to create</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "409",
            "optional": false,
            "field": "TEAM_ALREADY_EXISTS",
            "description": "<p>The team with the same name already exists</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_CHECK_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_POST_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/team.js",
    "groupTitle": "TEAM",
    "name": "PostTeams"
  },
  {
    "group": "TEAM",
    "type": "PUT",
    "url": "/teams/:id",
    "title": "Update a team",
    "description": "<p>Update a team</p>",
    "success": {
      "fields": {
        "Sucess 204": [
          {
            "group": "Sucess 204",
            "optional": false,
            "field": "-",
            "description": "<p>No Content</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Object",
            "optional": false,
            "field": "team",
            "description": "<p>The information of the team to create</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_name",
            "description": "<p>The name of the team to update</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.team_password",
            "description": "<p>The password of the team to update</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.category_id",
            "description": "<p>The uuid of the category associated to the team to update</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "team.manager_id",
            "description": "<p>The uuid of the participant manager of the team</p>"
          }
        ],
        "Headers": [
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p><code>application/json</code></p>"
          },
          {
            "group": "Headers",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p><code>Bearer</code> <em>jwt</em></p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "PARTICIPANT_ERROR_BAD_REQUEST_PUT_TEAM",
            "description": "<p>The manager cannot be associated to that team</p>"
          },
          {
            "group": "Error 4xx",
            "type": "400",
            "optional": false,
            "field": "GENERIC_ERROR_REQUEST_FORMAT_ERROR",
            "description": "<p>Your request (body or query param) is wrong</p>"
          },
          {
            "group": "Error 4xx",
            "type": "404",
            "optional": false,
            "field": "TEAM_NOT_FOUND",
            "description": "<p>The team does not exist</p>"
          },
          {
            "group": "Error 4xx",
            "type": "401",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_UNAUTHORIZED",
            "description": "<p>You must be authenticated</p>"
          },
          {
            "group": "Error 4xx",
            "type": "403",
            "optional": false,
            "field": "AUTHENTICATION_ERROR_FORBIDDEN",
            "description": "<p>Your rights do not allow you to access to this endoint</p>"
          }
        ],
        "Error 5xx": [
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_CHECK_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "TEAM_ERROR_INTERNAL_PUT_TEAM",
            "description": "<p>An internal error occurs</p>"
          },
          {
            "group": "Error 5xx",
            "type": "500",
            "optional": false,
            "field": "PARTICIPANT_ERROR_INTERNAL_NEW_PUT_TEAM",
            "description": "<p>An internal error occurs</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/team.js",
    "groupTitle": "TEAM",
    "name": "PutTeamsId"
  }
] });
