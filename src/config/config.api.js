export default {
  "host": "0.0.0.0",
  "port": 3306,
  "database": {
    "database": "simple-rest-api",
    "username": "root",
    "password": "1111",
    "host": "localhost",
    "dialect": "mysql",
    "query": {
      "raw": false
    },
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    },
    "logging": false,
    "define": {
      "freezeTableName": true,
      "timestamps": true,
      "charset": "utf8",
      "underscored": true,
      "createdAt": "created_at",
      "updatedAt": "updated_at"
    },
    "timezone": "+09:00"
  }
}
