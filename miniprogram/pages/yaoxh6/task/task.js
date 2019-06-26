var util = require('../../../utils.js')

// pages/yaoxh6/task/task.js
var Orders = {
  ORDER_TIME: '最新发布',
  ORDER_REWARD: '最多报酬',
  ORDER_COUNT: '最多回答'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isEmptyQN: false,
      isEmptyQA: false,
      inputShowed:false,
      inputVal:"",
      DateIcon:"../../../images/time.png",
      date:"2019/4/10/16:00",
      AddressIcon:"../../../images/destination.png",
      address:"心理学院楼",
      PriceIcon:"../../../images/price.png",
      price:"25元",
      AnswerCountIcon: "../../../images/reply_count.png",
      areaArray: ['东校', '南校','珠海','深圳','北校'],
      areaIndex: 0,
      typeArray: ['问卷', '问题'],
      typeIndex: 0,
      QNorderArray: [Orders.ORDER_TIME, Orders.ORDER_REWARD],
      QNorderIndex: 0,
      QAorderArray: [Orders.ORDER_TIME, Orders.ORDER_COUNT],
      QAorderIndex: 0,
      QNs_data: [],
      QNs_show: [],
      QAs_data: [],
      QNs_show: []
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
          QNs_data: res.result.value.data
        })
        this.updateQN()
        this.updateEmptyQN()
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
        this.setData({
          QAs_data: util.deBlocking(res)
        })
        this.updateQA()
        this.updateEmptyQA()
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
    this.onShow();
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
    this.updateQN()
    this.updateEmpty()
  },
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  bindQAorderChange: function (e) {
    this.setData({
      QAorderIndex: e.detail.value
    })
    this.sortQA()
  },
  bindQNorderChange: function (e) {
    this.setData({
      QNorderIndex: e.detail.value
    })
    this.sortQN()
  },
  sortQN: function () {
    var tempArray = this.data.QNs_show
    switch (this.data.QNorderArray[this.data.QNorderIndex]) {
      case Orders.ORDER_TIME:
        tempArray.sort(function (q1, q2) {
          return -q1.publish_time.localeCompare(q2.publish_time)
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
      QNs_show: tempArray
    })
  },
  sortQA: function () {
    var tempArray = this.data.QAs_show
    switch (this.data.QAorderArray[this.data.QAorderIndex]) {
      case Orders.ORDER_TIME:
        tempArray.sort(function (q1, q2) {
          return -q1.time.localeCompare(q2.time)
        })
        break
      case Orders.ORDER_COUNT:
        tempArray.sort(function (q1, q2) {
          return q1.reply_count < q2.reply_count
        })
        break
      default:
    }
    this.setData({
      QAs_show: tempArray
    })
  },
  goDetail: function (content) {
    var tempIndex = content.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../item/item?id=' + this.data.QNs_show[tempIndex]._id + '&title=' + this.data.QNs_show[tempIndex].name + '&reward=' + this.data.QNs_show[tempIndex].reward + '&description=' + this.data.QNs_show[tempIndex].description,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goQADetail: function (content) {
    var tempIndex = content.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../answerQA/answerQA?id=' + this.data.QAs_show[tempIndex]._id + '&title=' + this.data.QAs_show[tempIndex].title + '&content=' + this.data.QAs_show[tempIndex].content,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  searchQN: function () {
    var currTime = util.getTime()
    var tempArray = []
    for (var i = 0; i < this.data.QNs_data.length; ++i) {
      if (this.data.QNs_data[i].name.indexOf(this.data.inputVal) >= 0 && currTime < this.data.QNs_data[i].deadline && (this.data.QNs_data[i].position == "全部" || this.data.QNs_data[i].position == this.data.areaArray[this.data.areaIndex]) && this.data.QNs_data[i].completed_amount < this.data.QNs_data[i].total_amount) {
        tempArray.push(this.data.QNs_data[i])
      }
    }
    this.setData({
      QNs_show: tempArray
    })
  },
  searchQA: function () {
    var tempArray = []
    for (var i = 0; i < this.data.QAs_data.length; ++i) {
      if (this.data.QAs_data[i].title.indexOf(this.data.inputVal) >= 0) {
        tempArray.push(this.data.QAs_data[i])
      }
    }
    this.setData({
      QAs_show: tempArray
    })
  },
  search : function () {
    this.searchQN()
    this.searchQA()
    this.updateEmpty()
  },
  updateQN: function() {
    this.searchQN()
    this.sortQN()
  },
  updateQA: function() {
    this.searchQA()
    this.sortQA()
  },
  updateEmptyQN: function () {
    if (this.data.QNs_show.length == 0) {
      this.setData({
        isEmptyQN: true
      })
    } else {
      this.setData({
        isEmptyQN: false
      })
    }
  },
  updateEmptyQA: function () {
    if (this.data.QAs_show.length == 0) {
      this.setData({
        isEmptyQA: true
      })
    } else {
      this.setData({
        isEmptyQA: false
      })
    }
  },
  updateEmpty: function() {
    this.updateEmptyQN()
    this.updateEmptyQA()
  }
})