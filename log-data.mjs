import Database from 'better-sqlite3';

class DatabaseService {
  buildDatabase() {
    if (!this.db) {
      this.db = new Database('./db/temps.db', { verbose: console.log });
    }
  }

  logTempData(foodTemp, bbqTemp) {
    this.buildDatabase();
    const insertStatement = this.db.prepare(`INSERT INTO temps (food, bbq, timestamp) values (@foodTemp, @bbqTemp, datetime('now','localtime'))`);
    insertStatement.run({ foodTemp, bbqTemp });
  }

  getLast24Hours() {
    this.buildDatabase();
    const select24 = this.db.prepare("select * from temps where timestamp >= date('now', '-1 days') AND timestamp < date('now')").all();
    return select24;
  }
}

export default new DatabaseService();
