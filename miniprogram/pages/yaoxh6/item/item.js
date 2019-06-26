// pages/yaoxh6/item/item.js
var util = require('../../../utils.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceIcon: "../../../images/price.png",
    currentFatherIndex: 0,
    title: "title",
    description: "description",
    reward: '',
    qid: '',
    questionnaireArray: [
    ],
    isValid : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      title: options.title,
      description: options.description,
      reward: options.reward,
      qid: options.id
    })
    wx.cloud.callFunction({
      name: 'get_questionnaire_detail',
      data: {
        qid: options.id
      },
      success: res => {
        var json = util.deBlocking(res)
        var content = json[0].content
        // console.log(JSON.parse(content))
        
        // wx.showToast({
        //   title: '调用成功',
        // })
        this.setData({
          questionnaireArray: JSON.parse(content),
        });
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
  goBack : function(){
    console.log('to task page')
    wx.switchTab({
      url: '../task/task',
    })
  },

  getTempFatherIndex: function (input) {
    var tempFatherIndex = input.currentTarget.dataset.id;
    //console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },
  
  radioChangeSCQ:function(input){
    var tempFatherIndex = input.target.dataset.id
    var tempArray = this.data.questionnaireArray;

    for (var i in tempArray[tempFatherIndex].content.options){
      if (tempArray[tempFatherIndex].content.options[i].id == input.detail.value){
        tempArray[tempFatherIndex].content.options[i].isSelected = true;
      }
      else {
        tempArray[tempFatherIndex].content.options[i].isSelected = false;
      }
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  checkboxChangeMCQ:function(input){
    // console.log(input.detail.value);
    var tempFatherIndex = input.target.dataset.id
    var tempArray = this.data.questionnaireArray;
    console.log(input.detail.value)

    for (var i in tempArray[tempFatherIndex].content.options) {
      tempArray[tempFatherIndex].content.options[i].isSelected = false;
    }
    for (var id in input.detail.value) {
      var i = parseInt(input.detail.value[id]) - 1
      tempArray[tempFatherIndex].content.options[i].isSelected = true;
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurAnswerOfSAQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.answer = input.detail.value;
    // console.log(tempArray[tempIndex].content);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  complete :function(){
    this.setData({
      isValid: false,
    })
    
    var isValidSCQMCQ = true;
    var isValidSAQ = true;
    for(var i = 0;i<this.data.questionnaireArray.length;i++){
      console.log(this.data.questionnaireArray[i].content)
      if (this.data.questionnaireArray[i].type == 'SCQ' || this.data.questionnaireArray[i].type == 'MCQ') {
        for (var j = 0; j < this.data.questionnaireArray[i].content.options.length; j++) {
          if (this.data.questionnaireArray[i].content.options[j].isSelected == true) {
            break;
          }
          else if (j == this.data.questionnaireArray[i].content.options.length - 1 && this.data.questionnaireArray[i].content.options[j].isSelected == false){
            isValidSCQMCQ = false;
          }
        }
      }
      else if (this.data.questionnaireArray[i].type == 'SAQ'){
        if (this.data.questionnaireArray[i].content.answer.trim() == ''){
          isValidSAQ = false;
        }
      }
    }

    if(isValidSCQMCQ && isValidSAQ){
      this.setData({
        isValid: true,
      })
    }

    if (this.data.isValid == false) {
      wx.showToast({
        icon: 'none',
        title: '问卷内容不能留空',
      })
      return
    }
    wx.cloud.callFunction({
      name: 'fill_in_questionnaire',
      data: {
        content: JSON.stringify(this.data.questionnaireArray),
        qid: this.data.qid,
        time: util.getTime()
      },
      success: res => {
        // console.log(JSON.stringify(res))
        // console.log("here")
        console.log(res);
        if (!res.result.success) {
          if (res.result.error == "发布者不能填写问卷哦~") {
            wx.showToast({
              icon: 'none',
              title: '不能填写自己的问卷',
            })
          } else if (res.result.error == '该问卷已被填完') {
            wx.showToast({
              icon: 'none',
              title: '问卷已填完',
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '不能重复填写问卷',
            })
          }
          return
        }
        wx.switchTab({
          url: "../task/task"
        })
        wx.showToast({
          // icon: icon,
          title: "填写成功",
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
})