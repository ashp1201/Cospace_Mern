import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

import ENV from '../config.js'


//https://ethereal.email/create

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'genesis.hagenes@ethereal.email',
        pass: 'rBx19hasBhywjYYBHc'
    }
});

let MailGenerator = new Mailgen({
    theme :"default",
    product :{
        name:"Mailgen",
        link:'https://mailgen.js/'
    }
})


/*POST:http://localhost:8080/api/registerMail
*@param:{
    "fullName" : "ashok purohit",
    "userEmail":"ashokp1201@gmail.com",
    "text":"",
    "subject":"",
}
*/
export const registerMail = async (req,res)=>{
    const { fullName,userEmail,text,subject}=req.body;

    var email= {
        body :{
            name:fullName,
            intro:text || "welcome to Database World",
            outro :"Need help ,Comme and solve it"
        }
    }
    var emailBody =MailGenerator.generate(email);

    let message ={
        from :ENV.EMAIL,
        to:userEmail,
        subject:subject || "Signup Sucessfully",
        html:emailBody,
    }

    //send email
    transporter.sendMail(message)
    .then(()=>{
        return res.status(200).send({msg:"You should Receive an Email from us."})
    })
    .catch(error => res.status(500).send({error:error.message}))
}

