Page({

  /**
   * 页面的初始数据
   */
  data: {
    DateIcon: "../../../images/time.png",
    date: "2019/4/10/16:00",
    AddressIcon: "../../../images/destination.png",
    address: "心理学院楼",
    PriceIcon: "../../../images/price.png",
    price: "25元",
    array:[
      {index:1, name: '眼动仪实验被试招募', time: '2019/4/10/16:00', destination:'心理学院楼',price:'25元'},
      {index:2, name: '手动仪实验被试招募', time: '2018/4/10/16:00', destination:'物理学院楼', price:'30元'}
    ],
    temp : { index: 3, name: 'hello仪实验被试招募', time: '2019/4/10/16:00', destination: '心理学院楼', price: '25元' },
    items: [
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西', checked:'false' },
      { name: 'TUR', value: '法国', checked:'false'},
    ]
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

  addQuestionnaire:function(){
    var tempArray = this.data.array;
    var temp = { index: 4, name: 'hello仪实验被试招募', time: '2019/4/10/16:00', destination: '心理学院楼', price: '25元' };
    tempArray.push(temp);
    this.setData({
      array: tempArray,
    })
  },

  getName:function(input){
    console.log(input);
  },

  deleteSelf:function(input){
    var tempIndex = input.currentTarget.dataset.id;
    var tempArray = this.data.array;
    tempArray.splice(tempIndex,1);
    this.setData({
      array: tempArray,
    });
  },

  indicate:function(input){
    console.log(this.data.date);
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
})