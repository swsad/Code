// pages/yaoxh6/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    qNum: "",
    campusArray: ["全部", "东校", "南校", "北校", "珠海", "深圳"],
    campusIndex: 0,
    date: "",
    startDate: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: "Asia/Shanghai" };
    var y = date.toLocaleDateString('default', options);    
    var dateString = y.replace(/\//g, '-');
    this.setData({
      date: dateString,
      startDate: dateString
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      campusIndex: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    console.log(e);
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    var temp = new Object();
    temp[name] = value;
    this.setData(temp);
    console.log(this.data[name])
  },
  formateDate: function(date) {
    var options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: "Asia/Shanghai" };
    var y = date.toLocaleDateString('default', options);
    return y.replace(/\//g, '-');
  }
})