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
    userInfo: {}
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
  }
})
