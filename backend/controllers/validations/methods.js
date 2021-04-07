const nodemailer = require("nodemailer");

async function sendMail(token) {
  var output;
  if (token.tempPassword) {
    output = `<h2>congratulation</h2>
  
  <div>congratulation  your account is created click to links for validate</br>
  your temporary password : ${token.tempPassword} </br> 
  go to <a>${
    process.env.CLIENT_URL + "seller/signin"
  }</a> to change your password
  
  </div>
  `;
  } else {
    output = `<h2>congratulation</h2>
   
   <div>congratulation  your account is created click to links for validate
   <a href=${
     process.env.CLIENT_URL + "buyer/account/validate/" + token
   }>Validate Your Account</a>
   </div>
   `;
  }
  //   const sendTo = validate.email
  const sendTo = "me.karbal@gmail.com";
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "lupin support <noreplay@lupin.com>",
      to: sendTo,
      subject: "verified ✔",
      text: "verified account ",
      html: output,
    });
  } catch (error) {
    console.log(error);
  }
}

function randomPassword(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// console.log(randomPassword(5));

module.exports = { sendMail, randomPassword };
