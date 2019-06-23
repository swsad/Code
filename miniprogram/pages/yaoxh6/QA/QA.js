var util = require('../../../utils.js');

// pages/yaoxh6/QA/QA.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerIcon: "../../../images/price.png",
    questionIcon: "../../../images/price.png",
    supportIcon: "../../../images/support1.png",
    question: "",
    description: ""
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

  complete:function(){
    if(this.data.question.trim() == ''){
      wx.showToast({
        icon: 'none',
        title: '标题不能为空',
      })
      return;
    } else if (this.data.description.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '问题描述不能为空',
      })
      return;
    }

    wx.cloud.callFunction({
      name: 'ask_question',
      data: {
        time: util.getTime(),
        title: this.data.question,
        content: this.data.description
      },
      success: res => {
        wx.switchTab({
          url: "../task/task"
        })
        wx.showToast({
          title: '发布成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [ask_question] 调用失败：', err)
      }
    })
  },

  bindinputQuestion: function(input) {
    this.setData({
      question: input.detail.value
    });
  },

  bindinputDescription: function(input) {
    this.setData({
      description: input.detail.value
    })
  }
})