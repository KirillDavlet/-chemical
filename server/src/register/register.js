const searchUser = (dataDb) => {
    return  `SELECT * FROM users WHERE login = '${dataDb.login}' OR mail = '${dataDb.mail}'`
}; //шаблон запроса проверки
const newUser = (dataDb) => {
    return `INSERT INTO  users (login,pass,mail) VALUES ('${dataDb.login}','${dataDb.pass}','${dataDb.mail}')`
}; //шаблон добавления нового пользователя

const newDataUser = (idUser,dataDb) => {
    return `INSERT INTO dataUsers (id,firstName,lastName,nameUser,phone,positionUser,role) 
                            VALUES ('${idUser}','${dataDb.firstName}','${dataDb.lastName}','${dataDb.name}','${dataDb.phone}','${dataDb.position}','2')`
};// фцнкция возвращает запрос к бд

function RegisterUser(data,db,send,array) {
    db.execute(searchUser(data))
        .then(res => {
            if (res[0].length > 0) {
                if (res[0][0].login.toLowerCase() === data.login) array.push({
                    status:false,
                    info:'login'
                })
                if (res[0][0].mail.toLowerCase() === data.mail) array.push({
                    status:false,
                    info:'mail'
                })
            }
            else {
                console.log(newUser(data))
                return db.execute(newUser(data))
            }
        }) // проверка на пользователя, если есть выполняем запрос к бд
        .then(res => {
            if(res){
                array.push({status:true});
                return db.execute(newDataUser(res[0].insertId,data))
            }
        })
        .then((res)=> {
                return send.send(array)

        })
        .catch(err=> array.push({status:400,info:'ошибка'}))
}

module.exports = RegisterUser;