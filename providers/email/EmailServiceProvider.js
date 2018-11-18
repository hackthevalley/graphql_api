/*---------------------------------------------
 * EmailServiceProvider.js
 * Provides email services, currently uses
 * AWS SES
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

const AWS = require('aws-sdk');
AWS.config.update({region: process.env.AWS_DEFAULT_REGION});
const SES = new AWS.SES({apiVersion: '2010-12-01'});

// Configurations
const SENDER_EMAIL = "no-reply@system.hackthevalley.io";

/**
 * Provides email services
 * @type {module.EmailServiceProvider}
 */
module.exports = class EmailServiceProvider {

    /**
     * Send a new email using template
     * @param to
     * @param template
     */
    static async sendWithTemplate(to, template) {
        const params = {
            Destination: { /* required */
                CcAddresses: [],
                ToAddresses: [to]
            },
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: template.getHTML()
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: template.getText()
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: template.getSubject()
                }
            },
            Source: SENDER_EMAIL
        };

        await SES.sendEmail(params).promise();

        return true;
    }

};
