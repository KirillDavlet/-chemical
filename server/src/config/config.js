const port = 8082;
const settingsDb = {
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "chimical",
    password: "pass"
}

const supportDb = {
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "pass",
    database: "supportsystemchimical"
};

const messageUser = {
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    password: "pass",
    database: 'messageuser'
}

const dataBaseSettings = (data) => {
    return {
        connectionLimit: 5,
        host: "localhost",
        user: "root",
        password: "pass",
        database: data.nameDB
    }
}



module.exports = {
    port:port,
    dataBase: settingsDb,
    supportDb:supportDb,
    messageUser:messageUser,
    dataBaseSet: dataBaseSettings
};