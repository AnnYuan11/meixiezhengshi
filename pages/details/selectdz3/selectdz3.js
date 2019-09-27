// pages/details/selectdz3/selectdz3.js
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
    that.address();
    console.log(options)
    that.setData({
      num: options.num,
      adaddress: options.adaddress,
      zdid: options.zdid,
      type1: options.type1,
      userCouponInfoId: options.userCouponInfoId,
      money: options.money
    })
    // console.log(that.data.num)
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
    this.onLoad()
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
  // 我的地址
  address: function () {
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var params = {
      url: '/app/user/listUserAddressInfo',
      method: 'POST',
      data: {
        'pageIndex': 1,
        'pageSize': 1000000,
        'userInfo.id': userId
      },
      sCallBack: function (data) {
        console.log(data)
        var list = data.data.result;
        console.log(list.length)
        if (data.data.errorCode == -200) {

          wx.showToast({
            title: data.data.errorMsg,
            icon: 'none',
            duration: 1000,
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../../login/login',
            })
          }, 1500)

        } else {
          if (list.length == 0) {
            wx.redirectTo({
              url: '../dzgl/dzgl',
            })
          } else {
            that.setData({
              list: list,
            })
          }
        }



      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  toxixie: function (e) {
    var that = this;
    console.log(e)
    var dzid = e.currentTarget.dataset.id;
    var province = e.currentTarget.dataset.province;
    var city = e.currentTarget.dataset.city;
    var area = e.currentTarget.dataset.area;
    var address = e.currentTarget.dataset.address;
    var dizhi = province + city + area + address;

    // wx.setStorage({
    //   key: 'dzid',
    //   data: dzid
    // })
    var num = that.data.num;
    var adaddress = that.data.adaddress;
    var dizhi = province + city + area + address;
    var zdid = that.data.zdid
    var type1 = that.data.type1;
    var userCouponInfoId = that.data.userCouponInfoId;
    var money = that.data.money;
    wx.redirectTo({
      url: '../wyxx_smqx/wyxx_smqx?num=' + num + '&dizhi=' + dizhi + '&adaddress=' + adaddress + '&dzid=' + dzid + '&zdid=' + zdid + '&type1=' + type1 + '&userCouponInfoId=' + userCouponInfoId + '&money=' + money,
    })
  },
  // 删除地址
  deleteAddress: function (e) {
    var that = this;
    console.log(e)
    if (e.currentTarget.dataset.default == 1) {
      wx.showToast({
        title: '默认地址不能删除',
        icon: 'none',
        duration: 1000
      })
    } else {
      var params = {
        url: '/app/user/deleteUserAddressInfo',
        method: 'POST',
        data: {
          'id': e.currentTarget.dataset.id
        },
        sCallBack: function (data) {
          console.log(data)
          if (data.data.errorCode == "0") {
            wx.showToast({
              title: '删除成功！',
              icon: 'none',
              duration: 1000,
              success: function () {
                that.onLoad()
              }
            })
          }
        },
        eCallBack: function () {
        }
      }
    }
    base.request(params);
  }
})