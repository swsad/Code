// pages/yaoxh6/task/task.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputShowed:false,
      inputVal:"",
      DateIcon:"../../../images/time.png",
      date:"2019/4/10/16:00",
      AddressIcon:"../../../images/destination.png",
      address:"心理学院楼",
      PriceIcon:"../../../images/price.png",
      price:"25元",
      areaArray: ['东校', '南校','珠海','深圳','北校'],
      areaIndex: 0,
      typeArray: ['全部', '问卷', '被试', '问卷'],
      typeIndex: 0,
      timeArray: ['时间顺序', '时间逆序', '佣金顺序', '佣金逆序'],
      timeIndex: 0,
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

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  bindAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value
    })
  },
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
  },
  goDetail : function(){
    wx.navigateTo({
      url: '../item/item',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})