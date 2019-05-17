// pages/yaoxh6/item/item.js
var util = require('../../../utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceIcon: "../../../images/price.png",
    test:"global",
    test2:["hello","world"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    wx.cloud.callFunction({
      name: 'get_questionnaire_detail',
      data: {
        _id: options.id
      },
      success: res => {
        console.log(JSON.stringify(util.deBlocking(res)))
        // wx.showToast({
        //   title: '调用成功',
        // })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [releaseQuestionnaire] 调用失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // fun : function(){
  //   var q = {
  //     test: this.data.test,
  //     test2: this.data.test2
  //   }
  //   wx.cloud.callFunction({
  //     name: 'release_questionnaire',
  //     data: {
  //       content: JSON.stringify(q)
  //     },
  //     success: res => {
  //       // test = JSON.stringify(res)
  //       // this.setData({
  //       //   test : JSON.stringify(res.result.results.data[0].description)
  //       // })
  //       console.log('success')
  //     }
  //   })
  // },

  // fun2 : function(){
  //   wx.cloud.callFunction({
  //     name: 'get_all_questionnaire',
  //     success: res => {
  //       console.log(res)
  //       var last = res.result.results.data[8].content
  //       this.setData({
  //         test: JSON.parse(last).test
  //       })
  //       console.log('success')
  //     }
  //   })
  // }
})