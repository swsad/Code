var nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
  service: 'smtp.163.com',
  host: "smtp.163.com",
  port: 465, // SMTP 端口
  secureConnection: true, // 使用 SSL
  auth: {
    user: 'swsad_github_2019@163.com',
    // 这里密码不是qq密码，是你设置的smtp密码
    pass: 'swsad2019'
  }
});

// setup e-mail data with unicode symbols
var mailOptions = {
  from: 'swsad_github_2019@163.com', // 发件地址
  to: '1074323055@qq.com', // 收件列表
  subject: 'Hello sir', // 标题
  // text和html两者只支持一种
  text: 'Hello world ?', // 标题
  html: '<b>Hello world ?</b>' // html 内容
};

// 云函数入口函数
exports.main = async (event, context) => {
  console.log("Start to sendemail")
  // 开始发送邮件
  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: ' + info.response);
  return info
}