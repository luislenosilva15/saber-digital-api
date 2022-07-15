const nodemailer = require('nodemailer')

const user = "luizleno15@gmail.com"
const pass = "L20113011@"


async function SendEmail(codePassword, email) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: { user, pass }
    })

    const response = transporter.sendMail({
        from: user,
        to: email,
        subject: 'Ola seja bem vindo',
        text: "seu codigo é " + codePassword
    }).then(info => {
        return info
    }).catch(error => {
        return error
    }
    )

    return response
}

module.exports = SendEmail;