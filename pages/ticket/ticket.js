//ticket.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({
    data: {
        ticketList: []
    },
    onLoad: function () {
        let that = this;
         util.showWxLoading();

        // 获取所有未使用订单
        wx.request({
            url: 'https://localhost:3011/fr/order/unuseOrder?',
            method: 'GET',
            success: function (res) {
                console.log(res);
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data; 
                    let arr = [];
                    data.forEach((item) => {
                        console.log(item);
                        let obj = {
                            totalPrice: item.total_price,
                            totalTicket: item.total_ticket,
                            date: item.schedule_date,
                            startCity: item.start_city,
                            endCity: item.end_city,
                            departTime: item.depart_time,
                            startStation: item.start_station,
                            endStation: item.end_station,
                            guidePhone: item.guid_phone,
                            status: item.status
                        };
                        arr.push(obj);
                    });
                    that.setData({
                        ticketList: arr
                    })
                }
            },
            complete: function() {
                util.hideWxLoading();
            }
        })
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
                            util.showWxLoading('支付成功！', 1500, 'success');
                        },
                        fail: function (res) {
                            if (res.errMsg == 'requestPayment:fail cancel') {
                                util.showWxLoading('已取消支付！', 1500, 'success');
                            } else {
                                util.showSelfToast(that, 1500, '支付失败！')
                            }
                        }
                    })
                }
            }
        })
    }
})
