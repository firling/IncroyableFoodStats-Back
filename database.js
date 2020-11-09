const mysql = require('mysql');

/**
 * @lends Database
 */
const Database = {
  db: null,

  /**
   *
   * @param url optional
   * @returns {Promise.<T>}
   */
  connect () {
    return this.db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'incroyable_food_stats'
    })
  }
};

module.exports = Database;