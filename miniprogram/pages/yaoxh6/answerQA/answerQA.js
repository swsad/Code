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
    current: 0,
    max: 100,
    imgPath: []
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
    this.updateReview()
    wx.stopPullDownRefresh();
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
      current: tempComment.length
    });
  },
  addComment:function(){
    console.log(this.data.comment);
    if(this.data.comment == ''){
      wx.showToast({
        title: '输入不能为空',
      })
      return;
    }
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
        this.setData({
          current: 0
        })
        const data = this.data.answerData
        data.push({
          time: util.getTime(),
          content: this.data.comment,
          like_count: 0,
          self_liked: false
        })
        this.setData({
          answerData: data
        })
        this.setData({
          comment: ""
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
        var tempPath = []
        for (var i = 0; i < answerData.length; ++i) {
          var x = answerData[i].self_liked
          if (x) {
            tempPath.push("../../../images/support2.png") 
          } else {
            tempPath.push("../../../images/support1.png") 
          }
        }
        this.setData({
          imgPath: tempPath
        })
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
  },
  onLikeClick: function(event) {
    // console.log('[index]: ', event.currentTarget.dataset['index'])
    const index = event.currentTarget.dataset['index']
    const temp = this.data.answerData
    const isSelfLiked = temp[index].self_liked
    const tempPath = this.data.imgPath
    if (tempPath[index] == "../../../images/support1.png") {
      tempPath[index] = "../../../images/support2.png"
    } else {
      tempPath[index] = "../../../images/support1.png"
    }
    this.setData({
      imgPath: tempPath
    })
    if (isSelfLiked == true) {
      temp[index].like_count -= 1
      temp[index].self_liked = false
    }
    else {
      temp[index].like_count += 1
      temp[index].self_liked = true
    }
    this.setData({
      answerData: temp
    })
    // console.log('[data]: ', this.data.answerData)
    wx.cloud.callFunction({
      name: 'update_like',
      data: {
        rid: this.data.answerData[index]._id
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
        console.error('[云函数] [update_like] 调用失败：', err)
      }
    })
  }
})