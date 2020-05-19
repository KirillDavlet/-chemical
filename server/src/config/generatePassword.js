/**
 * Функция возврата нового, сгенерированного пароля
 * @param numbGenerate - число символов в пароле
 * @returns {string}
 */
function generatePassword(numbGenerate = 24) {
    let templateLetter = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'];
    let numb = [1,2,3,4,5,6,7,8,9];
    let templateSymb = ['\!','\@','\^','\*'];
    let newPassword = '';
    for(let i =0; i < numbGenerate; i++) {
        let rand = Math.random();
        if(rand < .3) {
            newPassword += Math.ceil(Math.random() * 30) < 15 ?
                templateLetter[Math.ceil(Math.random() * templateLetter.length-1)].toUpperCase() :
                templateLetter[Math.ceil(Math.random() * templateLetter.length-1)]
        } else if(rand > .3 && rand < .7) {
            newPassword += numb[Math.ceil(Math.random() * numb.length - 1)]
        } else {
            newPassword += templateSymb[Math.ceil(Math.random() * templateSymb.length - 1)]
        }
    }
    return newPassword
}

module.exports = generatePassword