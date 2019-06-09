var util = require('../../../utils.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    answerIcon: "../../../images/anonymous.png",
    questionIcon: "../../../images/anonymous.png",
    supportIcon: "../../../images/support1.png",
    answerData:{
      questionPic: "../../../images/anonymous.png",
      questionContent: "由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。",
      answerArray:[
        {
          answerPic: "../../../images/anonymous.png",
          answerContent: "鸡你太美",
          answerDate:"2018.05.18 14:24",
        }
      ]
    },
    comment:'',
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
  commentBindBlur:function(input){
    var tempComment = input.detail.value;
    this.setData({
      comment: tempComment,
    });
  },
  addComment:function(){
    console.log(this.data.comment);
    if(this.data.comment == ''){
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
    }
    else{
      var tempAnserPic = '../../../images/price.png';
      var tempAnswerContent = this.data.comment;
      var tempAnswerDate = util.formatTime(new Date());
      var tempAnswer = { "answerPic": tempAnserPic, 'answerContent': tempAnswerContent, 'answerDate':tempAnswerDate};
      var tempAnswerData = this.data.answerData;
      tempAnswerData.answerArray.push(tempAnswer);
      this.setData({
        answerData : tempAnswerData,
      });
    }
  },
})