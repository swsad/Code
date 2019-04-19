// pages/testCloudFunction/testCloudFunction.js

Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
  },

  onLoad: function (options) {

  },

  sendEmail() {
    wx.cloud.callFunction({
      name: 'sendEmail',
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
        console.error('[云函数] [sendEmail] 调用失败：', err)
      }
    })
  },

  getAllQuestionnaire() {
    wx.cloud.callFunction({
      name: 'getAllQuestionnaire',
      success: res => {
        console.log(JSON.stringify(res))
        wx.showToast({
          title: '调用成功',
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

  fillInQuestionnaire() {
    wx.cloud.callFunction({
      name: 'fillInQuestionnaire',
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
        console.error('[云函数] [fillInQuestionnaire] 调用失败：', err)
      }
    })
  },

  releaseQuestionnaire() {
    wx.cloud.callFunction({
      name: 'releaseQuestionnaire',
      data: {
        content: ' '
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '调用成功',
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [releaseQuestionnaire] 调用失败：', err)
      }
    })
  },

})