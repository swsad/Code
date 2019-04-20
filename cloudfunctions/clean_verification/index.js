/*
  此函数为自动调用函数，前端无需调用
*/
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var stats = await db.collection('verification').where({
    send_date: _.lt(db.serverDate() - 1000 * 60 * 5)
  }).remove();
  console.log("remove useless record:", stats.removed);
}