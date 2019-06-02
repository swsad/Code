// miniprogram/pages/yaoxh6/posted/posted.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempArray = this.data.taskArray
    wx.cloud.callFunction({
      name: 'get_all_questionnaire',
      success: res => {
        var data = res.result.value.data;
        for(let i = 0; i < data.length; i++ ) {
          var item = data[i];
          tempArray.push({
            qid: item['_id'],
            name: item['name'],
            time: item['time'],
            reward: item['reward'],
            completedAmount: item['completed_amount'],
            totalAmount: item['total_amount']
          })
        }
        this.setData({
          taskArray: tempArray
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

  downLoadDetail: function(event) {
    wx.showLoading({
      title: '加载中',
    })    
    //console.log(event);
    var qid = event.currentTarget.dataset.qid;
    var name = event.currentTarget.dataset.name;
    this.setData({
      targetQName: name
    })
    this.getAnswer(qid)
      .then(this.getTempUrl)
      .then(this.download)
      .then(res => {
        console.log(res)
        wx.hideLoading();
        if (res.statusCode == 200) {
          wx.openDocument({
            filePath: res.filePath,
            fileType: 'xlsx',
            // success(res) {
            //   //console.log('打开文档成功')
            // },
            // fail(res) {
            //   //console.log("失败")
            // }
          })
        }
        else {
          throw new Error(res.errMsg);
        }
      })
      .catch(error => {
        wx.hideLoading()
        console.log(error);
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
      })
  },
  getTempUrl: function (res) {
    //console.log("getTempUrl", res);
    return new Promise((resolve, reject) => {
      if (res.result.success == false) {
        return reject(res.result.error);
      }
      wx.cloud.getTempFileURL({
        fileList: [{
          fileID: res.result.fileID,
          maxAge: 60 * 60, // one hour
        }],
        success: res => {
          return resolve(res);
        },
        fail: res => {
          return reject(res.errMsg);
        }
      })
    })
  },
  download: function (res) {
    //console.log("download", res);
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: res.fileList[0].tempFileURL,
        filePath: wx.env.USER_DATA_PATH + this.data['targetQName'] + '问卷结果.xlsx',
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  },
  getAnswer(qid) {
    //console.log("getAnswer " + qid);
    return wx.cloud.callFunction({
      name: 'get_answer',
      data: {
        qid: qid
      }
    })
  }  

})