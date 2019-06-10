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
        code: 28766
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
        console.log(util.deBlocking(res)[0])
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
    var answer = [
      {
        type: 'SCQ',
        choice: [1]
      },
      {
        type: 'MCQ',
        choice: [1, 2]
      },
      {
        type: 'SAQ',
        text: 'Simon'
      }
    ]
    wx.cloud.callFunction({
      name: 'fill_in_questionnaire',
      data: {
        content: JSON.stringify(answer),
        qid: 'cbdb4c165cfb9aa401eb025a422ce8e5'
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
    var questionnaire = [
      {
        type: "SCQ",
        question: {
          description: "Which fruit do you like best?",
          options:
            [
              { id: 1, name: "C语言", isSelected: false },
              { id: 2, name: "Java", isSelected: false },
              { id: 3, name: "C++", isSelected: false }
            ]
        }
      },
      {
        type: "MCQ",
        question: {
          description: "Which fruit do you like?",
          options:
            [
              { id: 1, name: "C语言", isSelected: false },
              { id: 2, name: "Java", isSelected: false },
              { id: 3, name: "C++", isSelected: false }
            ]
        }
      },
      {
        type: "SAQ",
        question: {
          description: "What's your name?"
        }
      }
    ]    
    console.log(questionnaire)
    wx.cloud.callFunction({
      name: 'release_questionnaire',
      data: {
        name: '康乐杯',
        time: '2019/5/1',
        category: 'c1',
        reward: 20,
        position: '体育馆',
        total_amount: 100,
        content: JSON.stringify(questionnaire),
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
        qid: '988c1b1b5cc81d9409667aa3265930fc'
      },
      success: res => {
        console.log(JSON.parse(util.deBlocking(res)[0].content))
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
  downloadFromCloud: function() {
    wx.cloud.downloadFile({
      fileID: 'cloud://test-8a2767.7465-test-8a2767/test.xlsx',
      success: res => {
        // get temp file path
        const tempFilePath = res.tempFilePath
        console.log(res.tempFilePath)
        wx.saveFile({
          tempFilePath: tempFilePath,
          success(res) {
            const savedPath = res.savedFilePath;
            console.log(savedPath)
            wx.openDocument({
              filePath: savedPath,
              fileType: 'xlsx',
              success(res) {
                console.log('打开文档成功')
              },
              fail(res) {
                console.log("失败")
              },
              complete(res) {
                console.log("完成函数")
              }
            })
          }
        })
        
      },
      fail: err => {
        // handle error
      }
    })    
  },
  downToLocal: function() {
    this.getTempUrl()
    .then(this.download)
    .then(res => {
      console.log(res)
      if (res.statusCode == 200) {
        wx.openDocument({
          filePath: res.filePath,
          fileType: 'xlsx',
          success(res) {
            console.log('打开文档成功')
          },
          fail(res) {
            console.log("失败")
          },
          complete(res) {
            console.log("完成函数")
          }
        })
      }
      else {
        throw new Error(res.errMsg);
      }
    })
    .catch(error => {
        console.log(error);
    })
  },
  getTempUrl: function() {
    return wx.cloud.getTempFileURL({
      fileList: [{
        fileID: 'cloud://test-8a2767.7465-test-8a2767/test.xlsx',
        maxAge: 60 * 60, // one hour
      }]
    })
  },
  download: function(res) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url: res.fileList[0].tempFileURL,
        filePath: wx.env.USER_DATA_PATH + '问卷结果.xlsx',
        success: res => {
          resolve(res)
        },
        fail: err => {
          reject(err)
        }
      })
    })
  }, 
  getAnswer() {
    wx.cloud.callFunction({
      name: 'get_answer',
      data: {
        qid: '57896b495cf4c8ae0adcb0cc773f59fe'
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
        console.error('[云函数] [get_answer] 调用失败：', err)
      }
    })
  },

  askQuestion: function() {
    wx.cloud.callFunction({
      name: 'ask_question',
      data: {
        time: '2019/06/07',
        content: '测试？'
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
        console.error('[云函数] [ask_question] 调用失败：', err)
      }
    })
  },

  replyQuestion: function() {
    wx.cloud.callFunction({
      name: 'reply_question',
      data: {
        qid: 'cbdb4c165cfdc3d402de69ae5dd734af',
        time: '2019/06/07',
        title: '测试',
        content: '测试'
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
        console.error('[云函数] [reply_question] 调用失败：', err)
      }
    })
  },

  getQuestion: function() {
    wx.cloud.callFunction({
      name: 'get_question',
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(util.deBlocking(res))
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

  getReply: function() {
    wx.cloud.callFunction({
      name: 'get_reply',
      data: {
        qid: '2d9d2d8c5cfa14850117e89e463bd468'
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(util.deBlocking(res))
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_reply] 调用失败：', err)
      }
    })
  },

  updateLike: function () {
    wx.cloud.callFunction({
      name: 'update_like',
      data: {
        rid: 'dec80a9e5cfa14ef0116065b1fdb7996'
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [update_like] 调用失败：', err)
      }
    })
  },

  getUserPublishQuestionnaire: function() {
    wx.cloud.callFunction({
      name: 'get_user_questionnaire',
      data: {
        self_publish: true,
        self_fill_in: false
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_user_questionnaire] 调用失败：', err)
      }
    })
  },

  getUserFillInQuestionnaire: function () {
    wx.cloud.callFunction({
      name: 'get_user_questionnaire',
      data: {
        self_publish: false,
        self_fill_in: true
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_user_questionnaire] 调用失败：', err)
      }
    })
  },

  getUserAskQuestion: function () {
    wx.cloud.callFunction({
      name: 'get_user_question',
      data: {
        self_ask: true,
        self_answer: false
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_user_question] 调用失败：', err)
      }
    })
  },

  getUserAnswerQuestion: function () {
    wx.cloud.callFunction({
      name: 'get_user_question',
      data: {
        self_ask: false,
        self_answer: true
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [get_user_question] 调用失败：', err)
      }
    })
  }
})