import SQLite from 'react-native-sqlite-storage'

export class BaseManager {


    constructor() {
        this.sqlite = SQLite;
        this.sqlite.DEBUG(true);
        this.sqlite.enablePromise(true);
        this.sqlite.openDatabase({
            name: "BooksDB4r8",
            location: "default"
        }).then((db) => {
            this.dbInstance = db;
        })
    }

    createTable(table) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                " CREATE TABLE IF NOT EXISTS Book (" +
                "id INTEGER PRIMARY KEY NOT NULL," +
                "title TEXT," + "content TEXT," + "imageurl TEXT," + "size TEXT," + "gender TEXT," + "currentPage INTEGER );"
            ).then((val) => {
                resolve(true)
            }).catch((err) => {
                reject(false)
            })
        });
    }

    addTable(book) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "INSERT INTO Book (title,content,imageurl,size,gender,currentPage) VALUES (?,?,?,?,?,?)", [book.title, book.content, book.imageurl, book.size, book.gender, book.currentPage]
            ).then((val) => {

                resolve(true);
            }).catch((err) => {
                reject(err);
            })

        });
    }
    updateData(title,currentPage) {

        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                `UPDATE Book SET currentPage = ${currentPage} WHERE title = "${title}"`
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })

        });
    }
    deleteData(title) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                `DELETE FROM Book WHERE title = "${title}"`
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(err);
            })

        });
    }
    getTable() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "SELECT * FROM Book"
            ).then(([values]) => {
                var array = [];
                for (let index = 0; index < values.rows.length; index++) {
                    const element = values.rows.item(index);
                    array.push(element);
                }
                resolve(array);
            }).catch((err) => {
                reject(false);
            })

        });
    }
    getBookByTitle(title) {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                `SELECT * FROM Book WHERE title = "${title}"`
            ).then((value) => {
                resolve(value[0].rows.raw());
            }).catch((err) => {
                reject(err);
            })

        });
    }
    dropTable() {
        return new Promise((resolve, reject) => {
            this.dbInstance.executeSql(
                "DELETE FROM  Employee"
            ).then((val) => {
                resolve(true);
            }).catch((err) => {
                reject(false);
            })

        });
    }



}