const express = require("express");
const app = express();
const nodemailer = require("nodemailer")
const fs = require('fs')
require('dotenv').config()
const Mail = require('./mail');
const path = require("path");


app.use(express.json());


app.get('/sendmail', (req, res) => {
    res.send("Working with nodemailer")

    const mail = new Mail();
    mail.setTo(process.env.TOEMAIL);
    mail.setText("Hello from Shyama")
    mail.setSubject("Subject hai ye")
    mail.send()
    
});


//sending email with taking data from user(frontend)
app.post('/mail', async (req, res) => {
    // console.log(req.body);
    let { receiver_id, subject, text, username } = req.body;

    let htmlData = fs.readFileSync(path.join(__dirname, 'mail.html'), 'utf-8')
    // console.log(htmlData)
    htmlData = htmlData.replace('username', username)

    const mail = new Mail();
    mail.setTo(receiver_id);
    mail.setSubject(subject);
    mail.setText(text);
    mail.setHTML(htmlData);

    mail.setCC(process.env.CC)
    mail.setBCC(process.env.BCC)
 
    mail.send();
    res.send('Email sent!')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})