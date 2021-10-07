//------------------------------------------------------------------
//MARK: Local Database Storage
//------------------------------------------------------------------
import * as SQLite from "expo-sqlite";

const queries = {
  create: "CREATE TABLE IF NOT EXISTS",
  insert: "INSERT INTO",
  notNull: "NOT NULL",
  int: "INTEGER",
  primary: "PRIMARY KEY",
  text: "TEXT",
  real: "REAL",
  values: "VALUES",
};

const databaseName = "places.db";

//Creating a new database
const db = SQLite.openDatabase(databaseName);

//Initializing new SQL database with rules
export const initSQLite = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places 
        (
          id INTEGER PRIMARY KEY NOT NULL, 
          title TEXT NOT NULL, 
          image TEXT NOT NULL, 
          address TEXT NOT NULL, 
          lat REAL NOT NULL, 
          lng REAL NOT NULL
        );`,
        [],
        //Success
        () => resolve(),
        //Error
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

//Insert data into Database
export const insertDB = ({ title, image, address, lat, lng }) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places 
        (
          title, 
          image, 
          address, 
          lat, 
          lng
        ) VALUES (?, ?, ?, ?, ?);`, //Use "?"" to avoid security breach on db, pass values on [] param next.
        [title, image, address, lat, lng],
        //Success
        (_, result) => resolve(result),
        //Error
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};

//Fetch data from Database
export const fetchDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        //Success
        (_, result) => resolve(result),
        //Error
        (_, error) => reject(error)
      );
    });
  });

  return promise;
};
