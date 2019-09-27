// pages/wode/my/my.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
    var phone = wx.getStorageSync('phone');
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    // wx.clearStorageSync()
    console.log(userId)
    if (userId == "" || userId== null) {
      that.setData({
        isshow: true
      })
    } else {
      that.setData({
        isshow: false
      })
    }
    that.setData({
      phone: phone
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
    this.onLoad();
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
  jump:function(){
    wx.switchTab({
      url:'../../dingdan/order/order'
    })
  },
  // 客服电话
  phone:function(){
    wx.makePhoneCall({
      phoneNumber: '029-88222448' //仅为示例，并非真实的电话号码
    })
  },
  exit:function(){
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    var params = {
      url: '/app/user/logout',
      method: 'GET',
      data: {
        'id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        wx.switchTab({
          url: '/pages/index/index'
        })
        wx.clearStorageSync()
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }
  // refresh:function(){
  //   var that = this;
  //   var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
  //   console.log(userId)
  //   var params = {
  //     url: '/app/user/findById',
  //     method: 'POST',
  //     data: {
  //       'id': userId
  //     },
  //     sCallBack: function (data) {
  //       console.log(data)
        
  //     },
  //     eCallBack: function () {
  //     }
  //   }
  //   base.request(params);
  // }
})