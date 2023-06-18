{

    "type": "array",
    "items": [
      {
        "type": "object",
        "properties": {
          "startDate": {
            "type": "string"
          },
          "endDate": {
            "type": "string"
          },
          "_id": {
            "type": "string"
          },
          "users": {
            "type": "array",
            "items": [
              {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "object",
                    "properties": {
                      "firstName": {
                        "type": "string"
                      },
                      "lastName": {
                        "type": "string"
                      }
                    },
                    "required": [
                      "firstName",
                      "lastName"
                    ]
                  },
                  "goals": {
                    "type": "array",
                    "items": [
                      {
                        "type": "object",
                        "properties": {
                          "goal_id": {
                            "type": "string"
                          },
                          "goalMain": {
                            "type": "string"
                          },
                          "subTasks": {
                            "type": "array",
                            "items": [
                              {
                                "type": "string"
                              },
                              {
                                "type": "string"
                              }
                            ]
                          }
                        },
                        "required": [
                          "goal_id",
                          "goalMain",
                          "subTasks"
                        ]
                      },
                
                    ]
                  }
                },
               
        },
        "required": [
          "startDate",
          "endDate",
          "_id",
          "owners"
        ]
      }
    ]
  }