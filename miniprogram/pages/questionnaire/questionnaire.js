var util = require('../../utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: "",
    qNum: "",
    campusArray: ["全部", "东校", "南校", "北校", "珠海", "深圳"],
    campusIndex: 0,
    endDate: "",
    startDate: "",
    startTime: "",
    maxEndDate: "", 
    titleContent: '',
    descriptionContent: '',
    addIconPath1:'../../images/plus.png',
    deletePath: '../../images/minus.png',
    deletePath1: '../../images/delete.png',
    typeArray: ['单选', '多选', '问答'],
    newIndex: 0,
    addIconPath: "../../images/addIcon.png",
    currentFatherIndex : 0,
    questionnaireArray : [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      startTime: util.getTime(),
    })
    this.setData({
      startDate: this.data.startTime.substring(0, 10),
    })
    var currDate = new Date()
    var year = currDate.getFullYear() + 1
    var month = currDate.getMonth() + 1
    var day = currDate.getDate()
    this.setData({
      endDate: [year, month, day].map(this.formatNumber).join('-')
    })
    this.updateMaxEndDate()
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

  bindTypeChange:function(e){
    this.setData({
      newIndex: e.detail.value
    });
    console.log(e.detail.value);
    var tempArray = this.data.questionnaireArray;
    if(this.data.newIndex == 0){
      var temp0 = {
        "type": "SCQ",
        "content": {
          "description": "",
          "options":
            [
              { "id": 1, "name": "", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 1){
      var temp0 = {
        "type": "MCQ",
        "content": {
          "description": "",
          "options":
            [
              { "id": 1, "name": "", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 2){
      var temp0 = {
        "type": "SAQ",
        "content": {
          "description": "",
          "answer": ""
        }
      };
      tempArray.push(temp0);
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteSCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteMCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteSAQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    console.log(tempIndex);
    var tempArray = this.data.questionnaireArray;
    tempArray.splice(tempIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  getTempFatherIndex:function(input){
    var tempFatherIndex = input.currentTarget.dataset.id;
    console.log('currentFatherIndex: ' + tempFatherIndex);
    this.setData({
      currentFatherIndex: tempFatherIndex,
    });
  },

  deleteOneOfSCQ: function (input) {
    var tempFatherIndex = input.target.dataset.id;
    var tempSonIndex = input.target.dataset.id2;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex,1);
    for (var i = 0; i < tempArray[tempFatherIndex].content.options.length; ++i) {
      tempArray[tempFatherIndex].content.options[i].id = i+1
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteOneOfMCQ: function (input) {
    var tempFatherIndex = input.target.dataset.id;
    var tempSonIndex = input.target.dataset.id2;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex, 1);
    for (var i = 0; i < tempArray[tempFatherIndex].content.options.length; ++i) {
      tempArray[tempFatherIndex].content.options[i].id = i + 1
    }
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addSCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempID = tempArray[tempIndex].content.options.length + 1
    var tempSCQ = { "id": tempID, "name": "", "isSelected": false };
    tempArray[tempIndex].content.options.push(tempSCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempID = tempArray[tempIndex].content.options.length + 1
    var tempMCQ = { "id": tempID, "name": "", "isSelected": false };
    tempArray[tempIndex].content.options.push(tempMCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  showQ:function(){
    console.log(this.data);
    if (this.data.titleContent.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '标题不能为空',
      })
      return
    } else if (this.data.descriptionContent.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '问卷详情不能为空',
      })
      return
    } else if (this.data.price.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '问卷报酬不能为空',
      })
      return
    } else if (this.data.price.trim() == '0') {
      wx.showToast({
        icon: 'none',
        title: '问卷报酬不能为0',
      })
      return
    } else if (this.data.qNum.trim() == '') {
      wx.showToast({
        icon: 'none',
        title: '问卷数量不能为空',
      })
      return
    } else if (this.data.qNum.trim() == '0') {
      wx.showToast({
        icon: 'none',
        title: '问卷数量不能为0',
      })
      return
    } else if (this.data.questionnaireArray.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '问卷内容不能为空',
      })
      return
    }

    var canBePublished = true
    for(var i = 0;i<this.data.questionnaireArray.length;i++){
      if(this.data.questionnaireArray[i].content.description.trim() == ''){
        canBePublished = false
      }
      else if (this.data.questionnaireArray[i].type == 'SCQ' || this.data.questionnaireArray[i].type == 'MCQ'){
        for(var j = 0;j<this.data.questionnaireArray[i].content.options.length;j++){
          if(this.data.questionnaireArray[i].content.options[j].name.trim() == ''){
            canBePublished = false
          }
        }
      }
    }

    if (canBePublished == false) {
      wx.showToast({
        icon: 'none',
        title: '问卷内容不能留空',
      })
      return
    }
    var position = this.data.campusArray[this.data.campusIndex];

    // publish time
    this.setData({
      startTime: util.getTime()
    })
    
    wx.cloud.callFunction({
      name: 'release_questionnaire',
      data: {
        name: this.data.titleContent,
        publish_time: this.data.startTime,
        deadline: this.data.endDate + "-23-59-59",
        category: 'c1',
        reward: this.data.price,
        position: position,
        total_amount: this.data.qNum,
        content: JSON.stringify(this.data.questionnaireArray),
        description: this.data.descriptionContent
      },
      success: res => {
        if (!res.result.success) {
          wx.showToast({
            icon: 'none',
            title: '余额不足',
          })
          return
        }
        wx.switchTab({
          url: "../task/task"
        })
        wx.showToast({
          title: '发布成功',
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

  bindblurTitle: function (input) {
    this.setData({
      titleContent: input.detail.value
    });
  },

  bindblurDescription: function (input) {
    this.setData({
      descriptionContent: input.detail.value
    });
  },

  bindblurSCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurOneOfSCQ:function(input){
    var tempFatherIndex = input.target.dataset.id;
    var tempSonIndex = input.target.dataset.id2;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options[tempSonIndex].name = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurMCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurOneOfMCQ: function (input) {
    var tempFatherIndex = input.target.dataset.id;
    var tempSonIndex = input.target.dataset.id2;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempFatherIndex].content.options[tempSonIndex].name = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurSAQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.description = input.detail.value;
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  bindblurAnswerOfSAQ:function(input){
    // var tempIndex = input.currentTarget.dataset.id;
    // var tempArray = this.data.questionnaireArray;
    // tempArray[tempIndex].content.answer = input.detail.value;
    // console.log(tempArray[tempIndex].content);
    // this.setData({
    //   questionnaireArray: tempArray,
    // });
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    // 截止日期最迟为一年后
    this.setData({
      endDate: e.detail.value
    })
    this.updateMaxEndDate()
  },
  bindPickerChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      campusIndex: e.detail.value
    })
  },
  bindKeyInput: function (e) {
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    var temp = new Object();
    temp[name] = value;
    this.setData(temp);
  },  
  updateMaxEndDate: function () {
    var currDate = new Date()
    var year = currDate.getFullYear() + 10
    var month = currDate.getMonth() + 1
    var day = currDate.getDate()
    this.setData({
      maxEndDate: [year, month, day].map(this.formatNumber).join('-')
    })
  },
  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
})