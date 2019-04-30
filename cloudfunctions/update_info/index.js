/*
 功能：修改用户基本信息
 接受参数：
 user_type: num 表示用户类型
 user_info: object  用户或组织需要修改的信息

 返回情况：
 {
   success: bool
   error: object  （假定前端传来的字段都是有效的）系统内部错误
 }
*/
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  console.log("[参数]: ", event)

  
}