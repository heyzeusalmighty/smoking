import Database from 'better-sqlite3';

class DatabaseService {
  buildDatabase() {
    if (!this.db) {
      this.db = new Database('./db/temps.db');
    }
  }

  logTempData(foodTemp, bbqTemp) {
    this.buildDatabase();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const insertStatement = this.db.prepare(`INSERT INTO temps (food, bbq, timestamp) values (@foodTemp, @bbqTemp, @timestamp)`);
    insertStatement.run({ foodTemp, bbqTemp, timestamp });
    return { timestamp };
  }

  getLast24Hours() {
    this.buildDatabase();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const yesterday = timestamp - (24 * 3600);
    const select24 = this.db.prepare('SELECT * FROM temps WHERE timestamp >= @yesterday AND timestamp < @timestamp');
    const rows = select24.all({ yesterday, timestamp });
    return rows;
  }

  clearOutDatabase() {
    this.buildDatabase();
    const yesterday = Math.round(new Date().getTime() / 1000) - (24 * 3600);
    const deleteStatement = this.db.prepare('DELETE FROM temps where timestamp <= @yesterday');
    deleteStatement.run({ yesterday });
  }
}

export default new DatabaseService();
