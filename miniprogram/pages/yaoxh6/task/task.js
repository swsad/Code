var util = require('../../../utils.js')

// pages/yaoxh6/task/task.js
var Orders = {
  ORDER_TIME: '最新发布',
  ORDER_REWARD: '最多报酬'
}

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
      typeArray: ['问卷', '问答'],
      typeIndex: 0,
      orderArray: [Orders.ORDER_TIME, Orders.ORDER_REWARD],
      orderIndex: 0,
      taskArray: [],
      questionnairesArray: [],
      QAsArray: [],
      searchArray: []
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
    // everytime update data
    wx.cloud.callFunction({
      name: 'get_all_questionnaire',
      success: res => {
        this.setData({
          questionnairesArray: res.result.value.data
        })
        this.sortQN()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.log('[云函数][getAllQuestionnaire] 调用失败：', err)
      }
    })
    wx.cloud.callFunction({
      name: 'get_question',
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        this.setData({
          QAsArray: util.deBlocking(res)
        })
        this.sortQA()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_question] 调用失败：', err)
      }
    })
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
    this.search()
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    this.search()
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    this.search()
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
  bindOrderChange: function (e) {
    this.setData({
      orderIndex: e.detail.value
    })
    this.sortQN()
    this.sortQA()
  },
  sortQN: function () {
    var tempArray = this.data.questionnairesArray
    switch (this.data.orderArray[this.data.orderIndex]) {
      case Orders.ORDER_TIME:
        tempArray.sort(function (q1, q2) {
          return q1.publish_time < q2.publish_time
        })
        break
      case Orders.ORDER_REWARD:
        tempArray.sort(function (q1, q2) {
          return q1.reward < q2.reward
        })
        break
      default:
    }
    this.setData({
      questionnairesArray: tempArray
    })
  },
  sortQA: function () {
    var tempArray = this.data.QAsArray
    switch (this.data.orderArray[this.data.orderIndex]) {
      case Orders.ORDER_TIME:
        tempArray.sort(function (q1, q2) {
          return q1.time < q2.time
        })
        break
      default:
    }
    this.setData({
      QAsArray: tempArray
    })
  },
  goDetail: function (content) {
    var tempIndex = content.currentTarget.dataset.id;
    console.log(this.data.questionnairesArray[tempIndex])
    wx.navigateTo({
      url: '../item/item?id=' + this.data.questionnairesArray[tempIndex]._id + '&title=' + this.data.questionnairesArray[tempIndex].name,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goQADetail: function (content) {
    var tempIndex = content.currentTarget.dataset.id;
    console.log(this.data.QAsArray[tempIndex]._id)
    wx.navigateTo({
      url: '../answerQA/answerQA?id=' + this.data.QAsArray[tempIndex]._id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  search : function () {
    var tempArray = []
    for (var i = 0; i < this.data.taskArray.length; ++i) {
      if (this.data.taskArray[i].name.indexOf(this.data.inputVal) >= 0) {
        tempArray.push(this.data.taskArray[i])
      }
    }
    this.setData({
      questionnairesArray: tempArray
    })
  }
})