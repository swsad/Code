var util = require('../../../utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerIcon: "../../../images/anonymous.png",
    questionIcon: "../../../images/anonymous.png",
    supportIcon: "../../../images/support1.png",
    answerData:'',
    question: '',
    description: '',
    qid: '',
    comment:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      question: options.title,
      description: options.content,
      qid: options.id
    })
    this.updateReview()
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
  commentBindBlur:function(input){
    var tempComment = input.detail.value;
    this.setData({
      comment: tempComment,
    });
  },
  addComment:function(){
    console.log(this.data.comment);
    wx.cloud.callFunction({
      name: 'reply_question',
      data: {
        qid: this.data.qid,
        time: util.getTime(),
        content: this.data.comment
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [reply_question] 调用失败：', err)
      }
    })
  },
  updateReview: function () {
    wx.cloud.callFunction({
      name: 'get_reply',
      data: {
        qid: this.data.qid
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        var answerData = util.deBlocking(res)
        console.log(answerData)
        this.setData({
          answerData: answerData
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_reply] 调用失败：', err)
      }
    })
  }
})