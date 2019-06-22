var util = require('../../../utils.js');

// miniprogram/pages/yaoxh6/myWallet/myWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    walletInfo: [],
    money: ''
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
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          var item = data[i];
          var price = parseFloat(item['reward']);
          total = total + price;
          tempArray.push({
            infoName: item['name'],
            infoValue: price.toFixed(2),
          })
        }
        this.setData({
          walletInfo: tempArray,
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
    wx.cloud.callFunction({
      name: 'get_user_questionnaire',
      data: {
        self_publish: true
      },
      success: res => {
        var data = res.result.value;
        for (let i = 0; i < data.length; i++) {
          var item = data[i];
          var price = parseFloat(item['reward']) * parseFloat(item['total_amount']);
          tempArray.push({
            infoName: item['name'],
            infoValue: "-" + price.toFixed(2),
          })
        }
        this.setData({
          walletInfo: tempArray,
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
    wx.cloud.callFunction({
      name: 'get_balance',
      success: res => {
        this.setData({
          moneyNum: parseFloat(res.result.balance).toFixed(2)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getAllQuestionnaire] 调用失败：', err)
      }
    }),
    wx.cloud.callFunction({
      name: 'get_balance_record',
      success: res => {
        var data = res.result.records.data
        for (let i = 0; i < data.length; i++) {
          var item = data[i];
          var price = parseFloat(item['amount'])
          var name = "【充值】"
          if (price < 0) {
            name = "【提现】"
          }
          tempArray.push({
            infoName: name,
            infoValue: price.toFixed(2),
          })
        }
        this.setData({
          walletInfo: tempArray,
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
  bindInputMoney: function(input) {
    this.setData({
      money: input.detail.value
    });
  },
  recharge: function () {
    if (this.data.money.trim() == '' ) {
      wx.showToast({
        icon: 'none',
        title: '金额不能为空',
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'update_balance',
      data: {
        amount: parseInt(this.data.money),
        time: util.getTime()
      },
      success: res => {
        console.log(res)
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
  withdraw: function () {
    if (this.data.money.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '金额不能为空',
      })
      return;
    }
    wx.cloud.callFunction({
      name: 'update_balance',
      data: {
        amount: parseInt("-" + this.data.money),
        time: util.getTime()
      },
      success: res => {
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [getAllQuestionnaire] 调用失败：', err)
      }
    })
  }
})