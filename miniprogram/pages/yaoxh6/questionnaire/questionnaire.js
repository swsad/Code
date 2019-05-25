var util = require('../../../utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleContent: '',
    descriptionContent: '',
    addIconPath1:'../../../images/addIcon1.png',
    deletePath: '../../../images/delete.png',
    deletePath1: '../../../images/cancel.png',
    typeArray: ['单选', '多选', '问答'],
    newIndex: 0,
    addIconPath: "../../../images/addIcon.png",
    currentFatherIndex : 0,
    questionnaireArray : [
      {
        "type": "SCQ",
        "content": {
          "description": "Which fruit do you like best?",
          "options":
            [
              { "id": 1, "name": "Lua", "isSelected": false },
              { "id": 2, "name": "Java", "isSelected": true },
              { "id": 3, "name": "C++", "isSelected": false }
            ]
        }
      },
      {
        "type": "MCQ",
        "content": {
          "description": "Which fruit do you like?",
          "options":
            [
              { "id": 1, "name": "OK", "isSelected": true },
              { "id": 2, "name": "Java", "isSelected": false },
              { "id": 3, "name": "C++", "isSelected": true }
            ]
        }
      },
      {
        "type": "SAQ",
        "content": {
          "description": "What's your name?",
          "answer":"i dont know"
        }
      }
    ],
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
          "description": "Which fruit do you like best?",
          "options":
            [
              { "id": 1, "name": "Lua", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 1){
      var temp0 = {
        "type": "MCQ",
        "content": {
          "description": "Which fruit do you like best?",
          "options":
            [
              { "id": 1, "name": "Lua", "isSelected": false },
            ]
        }
      };
      tempArray.push(temp0);
    }
    else if (this.data.newIndex == 2){
      var temp0 = {
        "type": "SAQ",
        "content": {
          "description": "Which fruit do you like best?",
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
    var tempSCQ = { "id": 1, "name": "Lua", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempSCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  addMCQ: function (input) {
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.questionnaireArray;
    var tempMCQ = { "id": 1, "name": "Lua", "isSelected": false };
    console.log(tempIndex);
    tempArray[tempIndex].content.options.push(tempMCQ);
    this.setData({
      questionnaireArray: tempArray,
    });
  },

  showQ:function(){
    // console.log(this.data.questionnaireArray);
    wx.cloud.callFunction({
      name: 'release_questionnaire',
      data: {
        name: this.data.titleContent,
        time: util.questionnaireDate(new Date()),
        category: 'c1',
        reward: 20,
        position: '待定',
        total_amount: 100,
        content: JSON.stringify(this.data.questionnaireArray),
        description: this.data.descriptionContent
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
})