const systemMessageInfo = (theme, description) => {
    return `<h2>${theme}</h2><p>${description}</p>`
};

const passReset = (data) => {
    console.log(data)
    return `<h1>Системное сообщение</h1>
            <h2>НА сервере обнаружена уязвимость и в качестве первоначальнойобработки, мы сбросили все пароли пользователей</h2>
            <P>ваш логин ${data.login}</P>
            <p>ваш новый пароль для входа в систему : ${data.pass}</p>`
}


module.exports = {
    systemMessageInfo,
    passReset,
}