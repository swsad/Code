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
    question:''
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
    console.log(this.data.question);
    if(this.data.question == ''){
      wx.showToast({
        title: '输入不能为空',
        icon:'none'
      })
    }
    // wx.cloud.callFunction({
    //   name: 'release_questionnaire',
    //   data: {
    //     name: '',
    //     time: util.questionnaireDate(new Date()),
    //     category: 'c2',
    //     reward: 20,
    //     position: '',
    //     total_amount: 100,
    //     content: JSON.stringify(this.data.questionnaireArray),
    //     description: this.data.descriptionContent
    //   },
    //   success: res => {
    //     wx.showToast({
    //       title: '调用成功',
    //     })
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '调用失败',
    //     })
    //     console.error('[云函数] [releaseQuestionnaire] 调用失败：', err)
    //   }
    // })
  },

  bindblur:function(input){
    this.setData({
      question: input.detail.value
    });
  }
})