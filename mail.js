const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require("path");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                address: process.env.EMAIL,
                name: "Sakshi"
            }
        }
    }

    /**
     * 
     * @param { string } name
     */

    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    /**
     * @param { string } email
     */

    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    /**
     * @param { string } receiver
     */

    setTo(receiver) {
        let receivers = this.mailOptions.to || [];
        receivers.push(receiver);
        this.mailOptions.to = receivers;
    }

    setCC(cc) {
        let ccs = this.mailOptions.cc || [];
        ccs.push(cc);
        this.mailOptions.cc = ccs;
    }

    setBCC(bcc) {
        let bccs = this.mailOptions.bcc || [];
        bccs.push(bcc);
        this.mailOptions.bcc = bccs;
    }

    setAttachments(attachment) {
        let attachments = this.mailOptions.attachments || [];
        attachments.push(attachment);
        this.mailOptions.attachments = attachments;
    }

    /**
     * @param { string } subject
     */

    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    /**
     * @param { string } text
     */

    setText(text) {
        this.mailOptions.text = text;
    }

    /**
     * @param { string } html
     */

    setHTML(html) {
        /**
         * @type {string}
         */
        this.mailOptions.html = html;
    }

    /**
     * @return {void}
     */
    send() {
        transporter.sendMail(this.mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: '+info.response)
            }
        })
    }
}


function sendMail() {

    let htmlData = fs.readFileSync(path.join(__dirname, 'mail.html'), 'utf-8')
    const mail = new Mail();
    mail.setTo(process.env.TOEMAIL);
    mail.setSubject("subject");
    mail.setText("text");
    mail.setHTML(htmlData)

    // mail.setCC(process.env.CC)
    // mail.setBCC(process.env.BCC)

    mail.setAttachments({
        filename: 'sample-img.jpg',
        path: './images/sample-img.jpg',
        cid: 'sample-img.jpg',
        contentType: 'image/jpg',
        contentDisposition:'inline'
    })


    mail.send();
}

// sendMail()
module.exports = Mail;