// pages/details/fxyj/fxyj.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
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
    var that = this;
    that.list();
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
  list: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    console.log(userId)
    var params = {
      url: '/app/order/listCommissionOrderInfo',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      method: 'POST',
      sCallBack: function (data) {
        console.log(data)

        that.setData({
          list: data.data.result,
        })

      },
      eCallBack: function () {
      }
    }
    base.request(params);
  }
})