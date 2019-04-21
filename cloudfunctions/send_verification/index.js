/*
  功能：发送验证码到认证邮箱，服务端不判断是否合法
  传入参数：
  receiver：string 认证邮箱
  返回情况:
  {
    success: bool
    error: object 系统内部错误
  }
*/


var nodemailer = require("nodemailer")
const cloud = require('wx-server-sdk')

cloud.init()
const LOWERBOUNDCODE = 10000;
const UPPERBOUNDCODE = 99999;

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()

  const code = Math.floor(Math.random() * (UPPERBOUNDCODE - LOWERBOUNDCODE + 1) + LOWERBOUNDCODE);

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

  try{
    var exist_info = await db.collection('verification').where({
      uid: wxContext.OPENID
    }).get();
    if(exist_info.data.length == 0) {
      var addResult = await db.collection('verification').add({
        data: {
          email: event.receiver,
          send_date: Date(),
          uid: wxContext.OPENID,
          ver_code: code
        }
      });
    }
    else {
      // 更新验证码和发送时间
      await db.collection('verification').where({
        uid: wxContext.OPENID
      }).update({
        data: {
          ver_code: code,
          send_date: Date()
        }
      })
    }
    console.log("Start to sendemail")
    // 开始发送邮件
    var mailOptions = {
      from: 'swsad_github_2019@163.com', // 发件地址
      to: event.receiver, // 收件列表
      subject: '招财猫中大学生验证', // 标题
      // text和html两者只支持一种
      // text: 'Hello world ?', // 标题
      html: "helloword" + code // html 内容
    };    
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: ' + info.response);
    return {
      success: true,
    }
  } catch(err) {
    return {
      success: false,
      error: err
    }
  }
}