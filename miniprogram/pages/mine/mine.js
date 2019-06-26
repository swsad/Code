// pages/yaoxh6/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyPurseIcon:"../../images/myWallet.png",
    MyCollectionIcon:"../../images/aboutUs.png",
    CallCenterIcon:"../../images/customerService.png",
    PersonalSettingIcon:"../../images/setting.png",
    myAnswerIcon:"../../images/waitToFinish.png",
    questionManageIcon:"../../images/hasFinished.png",
    HasBeenPublishedIcon:"../../images/hasPublished.png",
    name:"Yaoxh6"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  goPosted: function () {
    wx.navigateTo({
      url: '../posted/posted',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  goMyInfo: function () {
    wx.navigateTo({
      url: '../myInfo/myInfo',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  goMyAnsw: function() {
    wx.navigateTo({
      url: '../myAnswer/myAnswer',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })    
  },

  goQuestionManage: function() {
    wx.navigateTo({
      url: '../myQuestion/myQuestion',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})