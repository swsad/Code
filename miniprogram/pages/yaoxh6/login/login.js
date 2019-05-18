// miniprogram/pages/yaoxh6/login/login.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    sname: '',
    sid: '',
    major: '',
    collage: '',
    mail: '',
    code: '',
    mailInputColor: "black",
    buttonDisbale: false,
    reg: /^[a-z]+[0-9]?@mail2.sysu.edu.cn$/    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权   
    wx.cloud.callFunction({
      name: 'login',
      data: {},  
      complete: res => {
        //console.log(res);
        var result = res.result;
        if(!result.isNew) {
          app.globalData.type = result.type;
          if(result.type == 0) {
            app.globalData.name = result.info[0].sname;
            app.globalData.collage = result.info[0].collage;
            app.globalData.sid = result.info[0].sid;
            app.globalData.major = result.info[0].major;
            wx.switchTab({
              url: '../mine/mine',
            })            
          }
          else if (result.type){
            console.log('机构');
          }     
        }
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

  }
  ,

  mailDetector: function(e) {
    if (e.detail.value.match(this.data.reg) == null) 
      this.setData({ mailInputColor: "red" }) 
    else 
      this.setData({ mailInputColor: "black" }) 
  },

  sendCode: function() {
    if (this.data.mail.match(this.data.reg) == null) {
      wx.showModal({
        title: "提示",
        content: "请输入正确的中大邮箱",
        showCancel: false
      })
    }
    else {
      this.setData({ buttonDisbale: true });
      wx.cloud.callFunction({
        name: 'send_verification',
        data: {
          receiver: this.data.mail
        },
        complete: res => {
          var msg;
          if(res.result.success) msg = "发送成功";
          else msg = "发送失败，请稍后重试";
          wx.showToast({
            title: msg
          })
        }
      })      
    }
  },
  bindKeyInput: function(e) {
    //console.log(e);
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    var temp = new Object();
    temp[name] = value;
    this.setData(temp);
    //console.log(this.data[name])
  },
  verifyCode: function() {
    return new Promise((resolve, reject) => {
      var data = this.data;
      var mailVer = this.data.mail.match(this.data.reg) != null;
      if (!data.sname || !data.sid || !data.major || !data.collage || !mailVer) {
        return reject("请完整填写正确信息");
      }
      if(!data.buttonDisbale) {
        return reject("请先获取验证码");
      }
      wx.cloud.callFunction({
        name: 'recv_verification',
        data: {
          code: parseInt(data.code, 10)
        },
        complete: res => {
          if (res.result.success) {
            return resolve();
          }
          else {
            return reject("验证码错误");
          }
        }
      })     
    })
  },
  insertInfo: function () {
    return new Promise((resolve, reject) => {
      var data = this.data;
      wx.cloud.callFunction({
        name: 'add_info',
        data: {
          user_type: 0,
          user_info: {
            collage: data.collage,
            major: data.major,
            sid: parseInt(data.sid, 10),
            sname: data.sname
          }
        },
        complete: res => {
          console.log(res);
          if (res.result.success) {
            app.globalData.name = data.sname;
            app.globalData.collage = data.collage;
            app.globalData.sid = data.sid;
            app.globalData.major = data.major;
            wx.showToast({
              title: "注册成功"
            })
            wx.switchTab({
              url: '../mine/mine',
            })
            return resolve();
          }
          else {
            return reject(res.err.tostring());
          }
        }
      })
    })
  },

  doRegister: function() {
    var func1 = this.verifyCode;
    var func2 = this.insertInfo;
    func1()
    .then(func2)
    .catch((err) => {
      wx.showModal({
        title: "提示",
        content: err,
        showCancel: false
      })
    })
  }



      
})

