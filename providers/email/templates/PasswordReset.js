/*---------------------------------------------
 * PasswordReset.js
 * Password reset email template.
 *
 * Author(s): Jun Zheng (me at jackzh dot com)
 ---------------------------------------------*/

const Template = require('./Template');

module.exports = class PasswordReset extends Template {

    getSubject() {
        return "Reset HTV Password";
    }

    getHTML() {
        return `\
To reset your HTV password, use the following verification code:<br/><br/>
<div style="font-size: 20px; letter-spacing: 3px; font-family: monospace;">${this.params.code}</div><br/><br/>
Above code will expire after 5 minutes.<br/><br/>
Yours,<br/>
Hack the Valley Team.
<pre>
          |____|
          |_**_|
          __||__
       []/______\\[]
]--    | \\______/ |
  |    |   /__\\   |
  ∟----(--/____\\  )
</pre>
`;
    }

    getText() {
        return this.getHTML();
    }

};
