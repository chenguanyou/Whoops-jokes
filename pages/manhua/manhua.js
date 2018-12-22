let wxparse = require("../../wxParse/wxParse.js");
var api = require("../../api/api.js"); //引入apijs
var Request = require("../../utils/Request.js")
const app = getApp()
var num = 1

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    var data = {
      num: num,
      url: "http://heibaimanhua.com/weimanhua/mh"
    }
    Request.request(api.mh, data, 'GET')
      .then(function (res) {
        that.setData({
          list: res.data
        })
        console.log(res)
        wx.hideLoading();
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
    var that = this
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
    // wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad()
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    if (num < 10) {
      num += 1
    }
    if (num == 10){
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })

      return false
    }
    var data = {
      num: num,
      url: "http://heibaimanhua.com/weimanhua/mh"
    }
    Request.request(api.mh + '?num=' + num, data, 'GET')
      .then(function (res) {
        var data = that.data.list.concat(res.data)
        that.setData({
          list: data
        })
        wx.hideLoading();
      })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '不开心，就看哎呦段子，看完让您心情爽到爆！',
      path: 'pages/login/login',
      imageUrl: '../../images/login.jpg'
    }
  },
  // 搞笑漫画
  gaoxiao:function(){
    wx.navigateTo({
      url: './gaoxiao/gaoxiao',
    })
  },
  // 奇趣漫画
  qiqu:function(){
    wx.navigateTo({
      url: './qiqu/qiqu',
    })
  },
  //kongbu
  kongbu: function () {
    wx.navigateTo({
      url: './kongbu/kongbu',
    })
  },
  //gushi
  gushi: function () {
    wx.navigateTo({
      url: './gushi/gushi',
    })
  },
  // chatu
  chatu:function(){
    wx.navigateTo({
      url: './chatu/chatu',
    })
  },
  // fankui
  fankui:function(){
    // wx.navigateTo({
    // url: './fankui/fankui',
    // })
    wx.showToast({
      title: '意见反馈已关闭, 如有任何问题请联系我的电子邮箱：aiyou@shujian.org',
      icon:'none',
      duration:5000,

    })
  }
})