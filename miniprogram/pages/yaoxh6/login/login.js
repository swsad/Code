// miniprogram/pages/yaoxh6/login/login.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权   
    wx.cloud.callFunction({
      name: 'login',
      data: {},  
      complete: res => {
        console.log(res);
        var result = res.result;
        if(!result.isNew && result.type != -1) {
          app.globalData.type = result.type;
          if(result.type == 0) {
            app.globalData.name = result.info[0].sname;
            app.globalData.collage = result.info[0].collage;
            app.globalData.sid = result.info[0].sid;
            app.globalData.major = result.info[0].major;
            // wx.switchTab({
            //   url: '../mine/mine',
            // })            
          }
          else {
            console.log('机构');
          }         
        }
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

  }
})