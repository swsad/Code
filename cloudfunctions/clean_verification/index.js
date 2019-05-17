/*
  此函数为自动调用函数，前端无需调用
*/
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  var result = await db.collection('verification').where({
    send_date: _.lt(db.serverDate({
      offset: -1000 * 60 * 60
    }))
  }).remove();
  console.log("remove useless record:", result.stats.removed);
}