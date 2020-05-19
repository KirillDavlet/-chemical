const fullUsers =
        `SELECT U.mail, U.status,U.id, U.login, DU.nameUser,DU.firstName,DU.lastName, DU.phone, DU.positionUser, UR.role
         FROM users U
         JOIN dataUsers DU ON DU.id = U.id
         JOIN UsersRole UR ON UR.id = DU.role`;

module.exports = fullUsers;