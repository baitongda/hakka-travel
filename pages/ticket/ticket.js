//ticket.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({
    data: {
        ticketList: [
            {
                totalPrice: 35,
                totalTicket: 1,
                date: '2017-03-20 星期一',
                startCity: '珠海',
                endCity: '广州',
                departTime: '17:45',
                startStation: '北理工公交站(往正门方向)',
                endStation: '珠江新城地铁口',
                guidePhone: '13798989898',
                status: '待支付',
                payType: '上车支付'
            },
            {
                totalPrice: 35,
                totalTicket: 1,
                date: '2017-03-20 星期一',
                startCity: '珠海',
                endCity: '广州',
                departTime: '17:45',
                startStation: '北理工公交站(往正门方向)',
                endStation: '珠江新城地铁口',
                guidePhone: '13798989898',
                status: '待支付',
                payType: '上车支付'
            },
            {
                totalPrice: 35,
                totalTicket: 1,
                date: '2017-03-20 星期一',
                startCity: '珠海',
                endCity: '广州',
                departTime: '17:45',
                startStation: '北理工公交站(往正门方向)',
                endStation: '珠江新城地铁口',
                guidePhone: '13798989898',
                status: '待支付',
                payType: '上车支付'
            }]
    },
    onLoad: function () {
        let that = this;
        // util.showWxLoading();

        // 获取所有未使用订单
        // wx.request({
        // 	url: 'https://localhost:3011/fr/order/list?',
        // 	method: 'GET',
        // 	success: function(res) {
        // 		if(res.data.statusCode == 20011011) {
        // 			let data = res.data.data;
        // 			let arr = [];
        // 			data.forEach((item) => {
        // 				console.log(item);
        // 				let obj = {
        // 					totalPrice: item.total_price,
        //  		totalTicket: item.total_ticket,
        //  		date: '2017-03-20 星期一',
        //  		startCity: item.start_city,
        //  		endCity: item.end_city,
        //  		departTime: item.depart_time,
        //  		startStation: item.start_station,
        //  		endStation: item.end_station,
        //  		guidePhone: item.guid_phone,
        //  		status: item.status
        // 				};
        // 				arr.push(obj);
        // 			})
        // 			that.setData({
        // 				ticketList: arr
        // 			})
        // 		}
        // 	}
        // })
    },
    refund(e) {
        let orderId = e.currentTarget.dataset.orderId;
        wx.showModal({
            title: '退票',
            content: '确定取消该车票？',
            success: function (res) {
                if (res.confirm) {
                    console.log('confirm --------');
                    util.showWxLoading('退票中...', 1000);
                    wx.request({
                        url: 'https://localhost:3011/fr/order/refund',
                        method: 'POST',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            orderId: orderId
                        },
                        success: function (res) {
                            if (res.data.statusCode == 20011011) {
                                util.showWxLoading('已退票！', 1500, 'success');
                            }
                        }
                    })
                }
            }
        })
    },
    checkTicket(e) {
        let orderId = e.currentTarget.dataset.orderId;
        wx.navigateTo({
            url: '../checkTicket/checkTicket?orderId=' + orderId
        })
    },
    goPay(e) {
        let orderId = e.currentTarget.dataset.orderId;
        util.showWxLoading('处理中...', 1500);
        wx.request({
            url: 'https://localhost:3011/fr/order/pay',
            header: {
                'Content-Type': 'application/json'
            },
            data: {},
            method: 'POST',
            success: function (res) {
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data;
                    paymentObj = {
                        timeStamp: data.timeStamp,
                        nonceStr: data.nonceSte,
                        package: data.package,
                        paySign: data.paySign
                    }

					util.showWxLoading('正在支付', 1000);
                    wx.requestPayment({
                        timeStamp: paymentObj.timeStamp,
                        nonceStr: paymentObj.nonceStr,
                        package: paymentObj.package,
                        signType: 'MD5',
                        paySign: paymentObj.paySign,
                        success: function (res) {
                            // success
                            util.showWxLoading('支付成功！', 1500, 'success');
                        },
                        fail: function (res) {
                            if (res.errMsg == 'requestPayment:fail cancel') {
                                util.showWxLoading('已取消支付！', 1500, 'success');
                            } else {
                            	util.showSelfToast(that, 1500, '支付失败！')
                                // that.setData({
                                //     'toast.showToast': true,
                                //     'toast.content': '支付失败！'
                                // });
                                // setTimeout(() => {
                                //     that.setData({
                                //         'toast.showLoading': false
                                //     })
                                // }, 1500)
                            }
                        }
                    })
                }
            }
        })
    }
})
