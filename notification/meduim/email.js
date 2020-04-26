
const nodemailer = require('nodemailer');
const templates = {
  verification : require('../templates/email/body/auth/verification'),
  signup : require('../templates/email/body/auth/signup'),
  resetpassword : require('../templates/email/body/auth/resetpassword')
}
const sgMail = require("@sendgrid/mail")
sgMail.setApiKey("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");
const transporter = nodemailer.createTransport({
        //name : 'outlook.office365.com',
        host: 'smtp.office365.com', // Office 365 server
        port: 587,     // secure SMTP
        secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
        auth: {
            user: "noreply@tailorgang.io",
            pass: "Flex@life"
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

let $x = 1;

module.exports = class Email{

  static send({to, subject, html}){
    const mailOptions = {
      from: 'Tailorgang noreply@tailorgang.io', // sender address
      to, // list of receivers
      subject, // Subject line
      html// plain text body
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (err, info) {
         if(err) return reject(err)
         resolve(info)
      });
    })
  }

  static SendGridsend({to, subject, html}){
    return sgMail.send({
      to,
      from: 'Tailorgang noreply@tailorgang.io',
      subject,
      //text: ,
      html,
    });
  }



  static get auth(){
    return {
      resetpassword(user, token){
        return Email.send({to : user.email, html : templates.resetpassword(user, token), subject : 'Reset Your Tailorgang Password'})
      },
      signup(user){
        //return Email.send({to : user.email, html : templates.signup(user), subject : 'Welcome to tailorgang'})
      },
      verifycode(user){
        //return Email.send({to : user.email, html : templates.verification(user), subject : 'Confirm your email adress'})
      },
    }
  }

}
