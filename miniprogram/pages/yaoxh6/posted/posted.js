// miniprogram/pages/yaoxh6/posted/posted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArray = this.data.taskArray
    wx.cloud.callFunction({
      name: 'get_all_questionnaire',
      success: res => {
        var data = res.result.value.data;
        for(let i = 0; i < data.length; i++ ) {
          var item = data[i];
          tempArray.push({
            name: item['name'],
            time: item['time'],
            reward: item['reward'],
            completedAmount: item['completed_amount'],
            totalAmount: item['total_amount']
          })
        }
        this.setData({
          taskArray: tempArray
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getAllQuestionnaire] 调用失败：', err)
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


})