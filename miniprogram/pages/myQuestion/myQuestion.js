Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    questionInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'get_user_question',
      data: {
        self_ask: true,
        self_answer: false
      },
      success: res => {
        console.log(res);
        this.setData({
          questionInfo: res.result.value
        })
        if (this.data.questionInfo.length == 0) {
          this.setData({
            isEmpty: true
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_user_question] 调用失败：', err)
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

  showQADetail: function (event) {
    var index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../answerQA/answerQA?id=' + this.data.questionInfo[index].qid + '&title=' + this.data.questionInfo[index].question_title + '&content=' + this.data.questionInfo[index].question_content,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })    
  }  
})