var util = require('../../utils.js');

// miniprogram/pages/yaoxh6/myWallet/myWallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isEmpty: false,
    MoneyIcon: "../../images/price2.png",
    walletInfo: [],
    money: ''
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
    var tempArray = [];
    wx.cloud.callFunction({
      name: 'get_balance',
      success: res => {
        this.setData({
          moneyNum: parseInt(res.result.balance)
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
          var price = parseInt(item['amount'])
          var time = item['time']
          var name = ""
          if (item.title == "充值") {
            name = "【充值】"
          } else if (item.title == "提现") {
            name = "【提现】"
          } else {
            name = item.title
          }
          tempArray.push({
            infoName: name,
            infoValue: price,
            time: time,
          })
        }
        tempArray.sort(function (r1, r2) {
          return -r1.time.localeCompare(r2.time)
        })
        this.setData({
          walletInfo: tempArray
        })
        if (this.data.walletInfo.length == 0) {
          this.setData({
            isEmpty: true
          })
        } else {
          this.setData({
            isEmpty: false
          })
        }
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
    } else if (this.data.money.trim() == "0") {
      wx.showToast({
        icon: 'none',
        title: '金额不能为0',
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
        this.onShow()
        wx.showToast({
          title: '充值成功',
        })
        this.setData({
          money: ""
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
  withdraw: function () {
    if (this.data.money.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '金额不能为空',
      })
      return;
    } else if (this.data.money.trim() == "0") {
      wx.showToast({
        icon: 'none',
        title: '金额不能为0',
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
        if (!res.result.success) {
          wx.showToast({
            icon: 'none',
            title: '余额不足',
          })
          return
        }
        this.onShow()
        wx.showToast({
          title: '提现成功',
        })
        this.setData({
          money: ""
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
  }
})