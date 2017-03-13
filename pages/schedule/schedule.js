//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  	curDate: '2017-03-13 星期一',
    scheduleList: [
    	{
    		time: '10:10',
    		startStation: '北理工正门',
    		endStation: '深大南门',
    		benefitTicket: '优惠票35元可预订',
    		normalTicket: '正价票55元可预订'
    	},
    	{
    		time: '10:10',
    		startStation: '北理工正门',
    		endStation: '深大南门',
    		benefitTicket: '优惠票35元可预订',
    		normalTicket: '正价票55元可预订'
    	},
    	{
    		time: '10:10',
    		startStation: '北理工正门',
    		endStation: '深大南门',
    		benefitTicket: '优惠票35元可预订',
    		normalTicket: '正价票55元可预订'
    	},
    ]
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    
  },
  booking() {
  	wx.navigateTo({
			url: '../order/order',
			success: function(res){
				// success
			},
			fail: function() {
				// fail
			},
			complete: function() {
				// complete
			}
		})
  }
})
