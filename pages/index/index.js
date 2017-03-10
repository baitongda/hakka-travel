//index.js
//获取应用实例
var app = getApp()
Page({
  onLoad: function(options) {
      // 监听页面加载 只调用一次
  },
  onReady: function() {
      // 监听页面初次渲染完成 (初始化数据)
  },
  onShow: function() {
      // 监听页面显示，每次打开都会调用
  }, 
  onHide: function() {
      // 监听页面隐藏 当navigateTo或底部tab切换时调用
  },
  onUnload: function() {
      // 监听页面卸载 当redirectTo或navigateBack的时候调用
  },
  onPullDownRefresh: function() {
      // 监听用户下拉动作 需要在config的window选项中开启enablePullDownRefresh。
  },
  onReachBottom: function() {
      // 下拉触底
  },
  onShareAppMessage: function() {
      // 用户点击右上角分享 此事件需要 return 一个 Object，用于自定义分享内容
      console.log('click share button..')
      return {
        title: '客家旅运',
        path: '/page/index/index'
      }
  },
  data: {   
    // initial data
    motto: 'Hello World',
    userInfo: {},
    imgUrls: [
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      '../../images/lb1.jpg','../../images/lb2.jpg','../../images/lb3.jpg',
    ],
    indicatorDors: true,
    autoPlay: true,
    markers: [{
      //iconPath: "/resources/others.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      //iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
