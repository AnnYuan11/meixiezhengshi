// pages/details/wyxx/wyxx.js
import { Base } from "../../../utils/request/base.js";
var base = new Base();
var util = require('../../../utils/util.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    show1:false,
    show2:true,
    // wlf: 10,
    // money:'请查看是否有可使用红包'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.num!=undefined){
      this.setData({
        num: options.num
      })
    }else{
      this.setData({
        num: 1
      })
    }
    if (options.wlf != undefined) {
      this.setData({
        wlf: options.wlf
      })
    } else {
      this.setData({
        wlf: 12
      })
    }
    if (options.money == "undefined") {
      this.setData({
        money: "请查看是否有可使用红包"
      })
    }
    else{
      this.setData({
        money: options.money
      })
    }
    var dizhis = options.dizhi;
    if(dizhis){
      dizhis = options.dizhi.substring(dizhis.length-10)
    }
    this.setData({
      zdid:options.zdid,
      dizhi: dizhis,
      adaddress: options.adaddress,
      dzid:options.dzid,
      type1:options.type1,
      userCouponInfoId: options.userCouponInfoId,
      // money:options.money
      
    })
    
    this.setData({
      imgUrl: app.globalData.imgUrl
    })
    // 洗鞋背景图片的调用
    this.bgImg();
    this.mapViewTap();
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
    var that=this;
    if (that.data.show1==false){
      wx.reLaunch({
        url: '../../index/index'
      })
    }

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
  // 获取textarea的值
  bindTextAreaBlur: function (e) {
    this.setData({
      remark: e.detail.value
    })
    console.log(e.detail.value)
  },
  wyxx:function(){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this;
    var userId = wx.getStorageSync('userId');//wx.getStorageSync(key)，获取本地缓存
    that.setData({
      userId: userId
    });
    var userId = that.data.userId;
    var id = that.data.dzid;
    console.log(id)
    var yhqid = that.data.userCouponInfoId
    var takeShoeType = that.data.type1;
    var equipmentInfo = that.data.zdid;
    console.log(yhqid)
    if (that.data.remark == undefined || that.data.remark==""){
      that.data.remark=""
    }
    if (equipmentInfo == undefined || equipmentInfo == "") {
      equipmentInfo = ""
    }
    if (takeShoeType == undefined || takeShoeType == "") {
      takeShoeType = ""
    }
    if (id == undefined || id == "") {
      id = ""
    }
    if (yhqid == "undefined" || yhqid == "") {
      yhqid = ""
    }
    var params = {
      url: '/app/order/addWashOrderInfo',
      method: 'POST',
      data: {
        'userInfo.id': userId,
        'userAddressInfo.id':id,
        'userCouponInfo.id':yhqid,
        'remark': that.data.remark,
        'adultShoesNumber':that.data.num,
        'takeShoeType': takeShoeType,
        'equipmentInfo.id': equipmentInfo
      },
      sCallBack: function (data) {
        console.log(data)
        wx.hideLoading()
       if(data.data.errorCode=="0"){
         if (takeShoeType==2){
           that.setData({
             isShow2: true,
           })
         }else{
           that.setData({
             isShow: true,
           })
         }
         that.setData({
          //  isShow: true,
           show1:!that.data.show1,
           show2:!that.data.show2
         })
       }else{
         if (data.data.errorCode == -200){
           wx.showToast({
             title: data.data.errorMsg,
             icon: 'none',
             duration: 1000,
             success: function () {
               setTimeout(function () {
                 //要延时执行的代码
                 wx.redirectTo({
                   url: '../../login/login'
                 })
               }, 2000) //延迟时间
             }
           })
         }else{
           wx.showToast({
             title: "请完善信息",
             icon: 'none',
             duration: 1000
           })
         }
       }
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
// 提交一分钟限制
  // add:function(e){
  //   var that = this;
  //   var date = new Date()
  //   var m = date.getMinutes().toString();//获得当前分钟数
  //   // console.log('提交外面的')
  //   // console.log(m)
  //   // console.log(date.getMinutes())
  //   //开始缓存池中没有分钟数，当前分钟数肯定不等于缓存中的分钟数，当前可以执行
  //   if (m != wx.getStorageSync('m')) {
  //     wx.setStorageSync('m', m)//把分钟数放到缓存
  //     //要做的事情，提交啊，点击啊等等
  //     that.wyxx();
  //   }
  //   else {
  //     wx.showToast({
  //       title: "提交太过频繁，请稍后再试",
  //       icon: 'none',
  //       duration: 1000
  //     })
  //   }
  // },
  // 增加
  jia:function(){
    // var num = wx.getStorageSync('num');//wx.getStorageSync(key)，获取本地缓存
    // console.log(num)
    var num = this.data.num;
    num++;
    if (num > 3&&this.data.type1!="2") {
      wx.showToast({
        title: "最多只能选3双",
        icon: 'none',
        duration: 1000
      })
      return;
    }
    this.setData({
      num: num,
    })
    if(this.data.num==1){
      this.setData({
        wlf:12
      })
    } else if (this.data.num == 2){
      this.setData({
        wlf: 8
      })
    } else if (this.data.num > 3 || this.data.num ==3){
      this.setData({
        wlf: 0
      })
    }
    // console.log(this.data.num)
    //  wx.setStorage({
    //   key: 'num',
    //   data: this.data.num
    // })
  },
 
  // 减
  jian:function(){
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    this.setData({
      num: num,
    })
    if (this.data.num == 1) {
      this.setData({
        wlf: 12
      })
    } else if (this.data.num == 2) {
      this.setData({
        wlf: 8
      })
    } else if (this.data.num > 3 || this.data.num == 3) {
      this.setData({
        wlf: 0
      })
    }
    // wx.setStorage({
    //   key: 'num',
    //   data: this.data.num
    // })
  },
  // 关闭浮层
  hideCovew: function () {
    var that = this;
    that.setData({
      isShow: false,
    })
    if (that.data.show1==true){
      wx.switchTab({
        // url: '../../dingdan/order/order'
         url: '../../index/index'
      })
    }
  },
  hideCovew2: function () {
    var that = this;
    that.setData({
      isShow2: false,
    })
    if (that.data.show1 == true) {
      wx.switchTab({
        // url: '../../dingdan/order/order'
        url: '../../index/index'
      })
    }
  },
  // 洗鞋背景图片
  bgImg:function(){
    var that = this;
    var params = {
      url: '/app/findAllBannerType',
      method: 'GET',
      
      sCallBack: function (data) {
       that.setData({
         img_bg:data.data.result.photo
       })
        
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  // 附近站点
  mapViewTap: function () {
    var that = this;
    setTimeout(() => {
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          console.log(res)
          const latitude = res.latitude
          const longitude = res.longitude
          const speed = res.speed
          const accuracy = res.accuracy
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          })
          that.list();
        },
        fail(er) {
          var params = {
            url: '/app/user/listEquipmentInfoByDistance',
            method: 'POST',
            data: {

            },
            sCallBack: function (data) {
              console.log(data)
              that.setData({
                list: data.data.result,
              })
            },
            eCallBack: function () { }
          }
          base.request(params);
        }
      })
    }, 1000)

  },
  list: function () {
    var that = this;
    var params = {
      url: '/app/user/listEquipmentInfoByDistance',
      method: 'POST',
      data: {
        'myLng': that.data.longitude,
        'myLat': that.data.latitude,
      },
      sCallBack: function (data) {
        console.log(data)
        that.setData({
          list: data.data.result,
          fjzd: data.data.result[0].address
        })
      },
      eCallBack: function () {
      }
    }
    base.request(params);
  },
  fjzd:function(){
    wx.navigateTo({
      url: '/pages/details/fjzd3/fjzd3',
    })
  },
  swidthTo:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})