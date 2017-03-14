//order.js
//获取应用实例
var app = getApp()
Page({
  data: {
   	order: {
   		datetime: '2017-03-13 19:35',
   		startCity: '珠海',
   		endCity: '深圳',
   		startStation: '北理工正门',
   		endStation: '深大北门',
   		normalLeavings: 20,
   		normalPrice: 55,
   		benefitLeavings: 2,
   		benefitPrice: 35,
   		adultTicketNum: 1,
   		childrenTicketNum: 0,
   		passenger: '',
   		passengerPhone: ''
   	}
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
  },
  bindInputPassenger(e) {
    this.setData({
      'order.passenger': e.detail.value
    })
  },
  bindInputPassengerPhone(e) {
    this.setData({
      'order.passengerPhone': e.detail.value
    })
  },
  goPay() {
  	
  }
})
