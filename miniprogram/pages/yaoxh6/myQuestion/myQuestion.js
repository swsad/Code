// miniprogram/pages/yaoxh6/myQuestion/myQuestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArray = this.data.questionInfo;
    var getInfo = [
      {
        infoName: '今天吃了什么的问答哈哈哈哈哈哈啊哈哈哈哈哈哈啊哈哈哈哈啊哈哈哈',
        qid: 'xxx'
      },
      {
        infoName: '遇到渣女你们是怎么处理的',
        qid: 'xxx'
      },
      {
        infoName: '选乔帮主还是选水军',
        qid: 'xxx'
      },
      {
        infoName: '端午有约的吗？',
        qid: 'xxx'
      }
    ]
    for (var i = 0; i < getInfo.length; i++) {
      tempArray.push({
        infoName: getInfo[i]['infoName'],
        qid: getInfo[i]['qid']
      })
    }

    this.setData({
      questionInfo: tempArray
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
  }  
})