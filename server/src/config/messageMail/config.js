const transporter = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'golimarartemisdi@gmail.com', // generated ethereal user
        pass: '89089552004qwe' // generated ethereal password
    }
};


module.exports = {
    transporter,
};