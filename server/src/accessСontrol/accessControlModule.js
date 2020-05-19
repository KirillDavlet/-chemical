const moduleLinks = require('./../data/usersListLinks');

function testModuleLinks (role,name) {
    for(let i in moduleLinks.roleLinks) {
        if(i.toLowerCase() === role.toLowerCase()) {
            const result = moduleLinks.roleLinks[i].find(el => el.name == name) !== undefined ? true : false
            return result
        }
    }
}

module.exports = testModuleLinks;