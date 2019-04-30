// pages/testCloudFunction/testCloudFunction.js

var util = require('../../utils.js')

Page({

  data: {
    result: '',
    canIUseClipboard: wx.canIUse('setClipboardData'),
  },

  onLoad: function (options) {

  },

  test_login: function () {
    wx.cloud.callFunction({
      name: 'new_login',
      data: {},
      complete: res => {
        console.log(res)
      }
    })
  }
  ,
  test_verification_send: () => {
    wx.cloud.callFunction({
      name: 'send_verification',
      data: {
        receiver: '1254086477@qq.com'
      },
      complete: res => {
        console.log(res)
      }
    })
  }
  ,

  test_verification_recv: () => {
    wx.cloud.callFunction({
      name: 'recv_verification',
      data: {
        code: 77018
      },
      complete: res => {
        console.log(res)
      }
    })
  }
  ,

  test_add_info: () => {
    wx.cloud.callFunction({
      name: 'add_info',
      data: {
        user_type: 0,
        user_info: {
          collage: "数据科学与计算机学院",
          major: "软件工程",
          sid: 16340076,
          sname: "胡嘉鹏"
        }
      },
      complete: res => {
        console.log(res)
      }
    })
  },

  test_update_info: ()=> {
    wx.cloud.callFunction({
      name: 'update_info',
      data: {
        user_type: 0,
        user_info: {
          collage: "数据科学与计算机学院",
          major: "软件工程",
          sid: 16341236,
          sname: "胡嘉鹏"
        }
      },
      complete: res => {
        console.log(res)
      }
    })    
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
      name: 'get_all_questionnaire',
      success: res => {
        console.log(JSON.stringify(util.deBlocking(res)))
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
      name: 'fill_in_questionnaire',
      data: {
        content: 'content',
        qid: '6dc9aa7d-1947-4104-92b9-07e125a0dc30'
      },
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
        console.error('[云函数] [fillInQuestionnaire] 调用失败：', err)
      }
    })
  },

  releaseQuestionnaire() {
    wx.cloud.callFunction({
      name: 'release_questionnaire',
      data: {
        name: '康乐杯',
        time: '2019/5/1',
        category: 'c1',
        reward: 20,
        position: '体育馆',
        total_amount: 100,
        content: '{你的名字:xxx}',
        description: '康乐杯是。。。'
      },
      success: res => {
        console.log(JSON.stringify(res))
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

  getQuestionnaireDetail() {
    wx.cloud.callFunction({
      name: 'get_questionnaire_detail',
      data: {
        qid: '6dec3bfa-8851-4a3c-ac24-ef28ff302600'
      },
      success: res => {
        console.log(JSON.stringify(util.deBlocking(res)))
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
  }
})