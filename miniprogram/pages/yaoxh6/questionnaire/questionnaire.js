var util = require('../../../utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canBePublished:false,
    price: "1",
    qNum: "100",
    campusArray: ["全部", "东校", "南校", "北校", "珠海", "深圳"],
    campusIndex: 0,
    endDate: "",
    startDate: "",
    startTime: "",
    maxEndDate: "", 
    titleContent: '',
    descriptionContent: '',
    addIconPath1:'../../../images/plus.png',
    deletePath: '../../../images/minus.png',
    deletePath1: '../../../images/delete.png',
    typeArray: ['单选', '多选', '问答'],
    newIndex: 0,
    addIconPath: "../../../images/addIcon.png",
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
      endDate: this.data.startTime.substring(0, 10)
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

  deleteOneOfSCQ:function(input){
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    //console.log(tempSonIndex);
    var tempArray = this.data.questionnaireArray;
    //console.log(tempArray[tempFatherIndex].content.options[tempSonIndex]);
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex,1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  deleteOneOfMCQ:function(input){
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
    // console.log('tempFatherIndex: ' + tempFatherIndex);
    // console.log('tempSonIndex: ' + tempSonIndex);
    var tempArray = this.data.questionnaireArray;
    // console.log(tempArray[tempFatherIndex].content.options[tempSonIndex]);
    tempArray[tempFatherIndex].content.options.splice(tempSonIndex, 1);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addSCQ:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempSCQ = { "id": 1, "name": "", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempSCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempMCQ = { "id": 1, "name": "", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempMCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  showQ:function(){
    this.setData({
      canBePublished: true,
    })

    if(this.data.descriptionContent == '' || this.data.titleContent == '' || this.data.price == '' || this.data.qNum == ''){
      this.setData({
        canBePublished : false,
      })
    }

    if(this.data.questionnaireArray.length == 0){
      this.setData({
        canBePublished: false,
      })
    }

    for(var i = 0;i<this.data.questionnaireArray.length;i++){
      if(this.data.questionnaireArray[i].content.description == ''){
        this.setData({
          canBePublished: false,
        })
      }
      else if (this.data.questionnaireArray[i].type == 'SCQ' || this.data.questionnaireArray[i].type == 'MCQ'){
        for(var j = 0;j<this.data.questionnaireArray[i].content.options.length;j++){
          if(this.data.questionnaireArray[i].content.options[j].name == ''){
            this.setData({
              canBePublished: false,
            })
          }
        }
      }
    }

    if (this.data.canBePublished == false){
      // wx.showToast({
      //   title: '输入不能为空',
      // })
      // return;
    }
    //console.log(this.data.questionnaireArray);
    //console.log("test" + this.data.descriptionContent)
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
        deadline: this.data.date,
        category: 'c1',
        reward: this.data.price,
        position: position,
        total_amount: this.data.qNum,
        content: JSON.stringify(this.data.questionnaireArray),
        description: this.data.descriptionContent
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        wx.switchTab({
          url: "../task/task"
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
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
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

  bindblurOneOfMCQ:function(input){
    var tempFatherIndex = this.data.currentFatherIndex;
    var tempSonIndex = input.target.dataset.id;
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
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    tempArray[tempIndex].content.answer = input.detail.value;
    // console.log(tempArray[tempIndex].content);
    this.setData({
      questionnaireArray: tempArray,
    });
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
    //console.log(e);
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    var temp = new Object();
    temp[name] = value;
    this.setData(temp);
    //console.log(this.data[name])
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