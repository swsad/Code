// miniprogram/pages/yaoxh6/myAnswer/myAnswer.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArray = this.data.answerInfo;
    var getInfo = [
      {
        answerText: '螺蛳粉，可带劲了啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
        questionTex: '今天吃了什么的问答',
        qid: 'xxx'
      },
      {
        answerText: '送飞机票',
        questionTex: '遇到渣女你们是怎么处理的',
        qid: 'xxx'
      },
      {
        answerText: '乔帮主+1',
        questionTex: '选乔帮主还是选水军',
        qid: 'xxx'
      },
      {
        answerText: '没有，约起？',
        questionTex: '端午有约的吗？',
        qid: 'xxx'
      }
    ]
    for (var i = 0; i < getInfo.length; i++) {
      tempArray.push({
        answerText: getInfo[i]['answerText'],
        questionTex: getInfo[i]['questionTex'],
        qid: getInfo[i]['qid']
      })
    }

    this.setData({
      answerInfo: tempArray
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
    var qid = event.currentTarget.dataset.qid;
    console.log("接下来跳转到", qid);
    wx.cloud.callFunction({
      name: 'get_reply',
      data: {
        qid: qid,
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
        console.error('[云函数] [get_reply] 调用失败：', err)
      }
    })
  }

})