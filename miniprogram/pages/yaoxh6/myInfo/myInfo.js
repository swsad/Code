// miniprogram/pages/yaoxh6/myinfo/myInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personInfo: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      在登入之后服务器会返回个人信息，保存下来，在这里不用继续请求
    */
    var tempArray = this.data.personInfo;
    tempArray.push({
      infoName: '我的姓名',
      infoValue: '胡嘉鹏'
    })

    tempArray.push({
      infoName: '我的学号',
      infoValue: '16340076'
    })

    tempArray.push({
      infoName: '我的邮箱',
      infoValue: '1254086477@qq.com'
    })

    this.setData({
      personInfo: tempArray
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

  updateInfo: function() {
    
  }
})