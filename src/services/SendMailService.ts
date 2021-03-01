import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

class SendMailService {
    private client: Transporter;

    constructor() {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        });
    }

    async execute(to: string, subject: string, variables: any, path: string) {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const mailTempalteParse = handlebars.compile(templateFileContent);
        const html = mailTempalteParse(variables);

        const message = await this.client.sendMail({
            to,
            subject,
            html: html,
            from: "NPS <no-reply@example.com>"
        });
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}

export default new SendMailService();
