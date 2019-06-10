// miniprogram/pages/yaoxh6/myWallet/myWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    walletInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArray = this.data.walletInfo;
    var total = 0;
    wx.cloud.callFunction({
      name: 'get_user_questionnaire',
      data: {
        self_fill_in: true
      },
      success: res=> {
        var data = res.result.value;
        for (let i = 0; i < data.length; i++) {
          var item = data[i];
          var price = parseFloat(item['reward']);
          total = total + price;
          tempArray.push({
            infoName: item['name'],
            infoValue: price.toFixed(2),
            // qid: item['_id'],
            // name: item['name'],
            // time: item['time'],
            // reward: item['reward'],
            // completedAmount: item['completed_amount'],
            // totalAmount: item['total_amount']
          })
        }
        this.setData({
          walletInfo: tempArray,
          moneyNum: total.toFixed(2)
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
    // var getInfo = [
    //   { 
    //     infoName: '今天吃了什么的问卷',
    //     infoValue: '1'
    //   },
    //   {
    //     infoName: '留学状况调查',
    //     infoValue: '3'
    //   },
    //   {
    //     infoName: '考试时间安排',
    //     infoValue: '0.01'
    //   },
    //   {
    //     infoName: '端午出游时间安排',
    //     infoValue: '2'
    //   },
    //   {
    //     infoName: '你是甜党还是咸党',
    //     infoValue: '1'
    //   },                  
    // ]
    // var total = 0;
    // for(var i = 0; i < getInfo.length; i++) {
    //   total = total + parseFloat(getInfo[i]['infoValue']);
    //   tempArray.push({
    //     infoName: getInfo[i]['infoName'],
    //     infoValue: parseFloat(getInfo[i]['infoValue']).toFixed(2)
    //   })
    // }

    // this.setData({
    //   walletInfo: tempArray,
    //   moneyNum: total.toFixed(2)
    // })
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

  }
})