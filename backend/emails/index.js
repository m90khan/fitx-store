const { emailSender } = require('@keystonejs/email');
require('dotenv').config();

const { createTransport, getTestMessageUrl } = require('nodemailer');


function makeANiceEmail(text) {
  return `
    <div className="email" style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Sando Store!</h2>
      <p>${text}</p>
      <p style="     
      font-size: 10px;
    ">&copy; 2021 | Sando Store </p>
    </div>
  `;
}
const sendEmail = async ( rendererProps) => {

  const { followUrl , subject, text ,    recipientEmail   } =   rendererProps 

  const transport = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
   
 
  const info = await transport.sendMail({
    to: recipientEmail,
    from: 'sando@examplesando.app',
    subject: subject,
    html: makeANiceEmail(text),
    // html: makeANiceEmail(`Your Password Reset Token is here!
    // <a href="https://localhost:3000/login?token=${forgotPasswordUrl}"> 
    // ${forgotPasswordUrl} Click Here to reset</a>
    // `),
  })
  // <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
 
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
 
 };

module.exports = {
  sendEmail,
};






// export interface MailResponse {
//   accepted?: (string)[] | null;
//   rejected?: (null)[] | null;
//   envelopeTime: number;
//   messageTime: number;
//   messageSize: number;
//   response: string;
//   envelope: Envelope;
//   messageId: string;
// }
// export interface Envelope {
//   from: string;
//   to?: (string)[] | null;
// }


 