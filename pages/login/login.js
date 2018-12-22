//index.js
//获取应用实例
var api = require("../../api/api.js"); //引入apijs
var Request = require("../../utils/Request.js")
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.switchTab({
      url: '../index/index'
    })
  },
  //获取用户信息处理事件
  getUserInfo: function (e) {
    var that = this;
    if (!e.detail.userInfo) {
      wx.openSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function (data) {
                wx.setStorageSync('userInfo', data.userInfo)
                that.bindViewTap()
                // app.wxlogin();
                // console.log(data.userInfo)
              }
            });
          }
        }
      });
    } else {
      wx.login({
        success: function (res) {
          that.setData({
            APPTYPE: '哎呦段子',
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            signature: e.detail.signature,
            userInfo: e.detail.userInfo,
            code: res.code
          })
          var data = {
            APPTYPE: '哎呦段子',
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            signature: e.detail.signature,
            userInfo: e.detail.userInfo,
            code: res.code
          }
          console.log(data)
          Request.request(api.reg, data, 'POST')
            .then(function (res) {
              if (res.statusCode == 200) {
                that.bindViewTap()
              }
              if (res.statusCode == 201) {
                that.bindViewTap()
              }
              // if (res.statusCode == 500) {
              //   that.bindViewTap()
              // }
            })
        }
      })
      // that.bindViewTap()
    }
    // console.log(e.detail.userInfo)
  },
  onLoad: function () {
    var that = this;
    wx.login({
      success: function (res) {
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              that.setData({
                hasUserInfo: false
              })
              that.bindViewTap()
            } else {
              that.setData({
                hasUserInfo: true
              })
            }
          },
          fail: function () {
            // console.log()
          }
        })
      }
    })

  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})