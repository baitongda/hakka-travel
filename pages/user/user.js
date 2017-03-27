//user.js
//获取应用实例
var app = getApp()
Page({
	data: {
		avatarUrl: '../../images/warning.png'
	},
	onLoad: function () {
		
	},
	myOrder() {
		wx.navigateTo({
			url: '../myOrder/myOrder'
		})
	},
	myCoupon() {
		wx.navigateTo({
			url: '.../myCoupon/myCoupon'
		})
	},
	notice() {
		wx.navigateTo({
			url: '../notice/notice'
		})
	}
})
