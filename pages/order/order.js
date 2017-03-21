//order.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
        order: {
            datetime: '2017-03-13 19:35',
            normalLeavings: 20,
            normalPrice: 55,
            benefitLeavings: 2,
            benefitPrice: 35,
            adultTicketNum: 1,
            childrenTicketNum: 0,
            passenger: '',
            passengerPhone: '',
            ticketType: 0,
            payType: 0  // 0-online 1-offline
        }
    },
    onLoad: function () {
        console.log(app.globalData);
        this.setData({
            'order.startCity': app.globalData.startCity,
            'order.endCity': app.globalData.endCity,
            'order.startStation': app.globalData.startStation,
            'order.endStation': app.globalData.endStation
        })
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
        let that = this;

        util.showWxLoading('处理中...', 1500);
        wx.request({
            url: 'https://localhost:3011/fr/order/pay',
            data: {
                order: that.data.order
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                'Content-Type': 'application/json'
            }, // 设置请求的 header
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
                                util.showSelfToast(that, 1500, '支付失败！');
                            }
                        }
                    })
                }
            },
            complete: function () {
                // complete
            }
        })
        wx.navigateTo({
            url: '../result/result'
        })
    },
    chooseTicketType(e) {
        // 0-normal ticket 1-benefit ticket
        let type = parseInt(e.currentTarget.dataset.ticketType);  // use e.currentTarget instead of e.target
        this.setData({
            'order.ticketType': type
        })
    },
    add(e) {
        let type = parseInt(e.target.dataset.type);  // 0-adult ticket  1-children ticket
        if (type === 0) {
            let num = ++this.data.order.adultTicketNum < 4 ? this.data.order.adultTicketNum : 3;
            this.setData({
                'order.adultTicketNum': num
            })
        } else if (type === 1) {
            let num = ++this.data.order.childrenTicketNum < 4 ? this.data.order.childrenTicketNum : 3;
            this.setData({
                'order.childrenTicketNum': num
            })
        }
    },
    sub(e) {
        let type = parseInt(e.target.dataset.type);
        if (type === 0) {
            let num = --this.data.order.adultTicketNum > 0 ? this.data.order.adultTicketNum : 1;
            this.setData({
                'order.adultTicketNum': num
            })
        } else if (type === 1) {
            let num = --this.data.order.childrenTicketNum >= 0 ? this.data.order.childrenTicketNum : 0;
            this.setData({
                'order.childrenTicketNum': num
            })
        }
    },
    choosePayType(e) {
        let payType = parseInt(e.currentTarget.dataset.payType);
        this.setData({
            'order.payType': payType
        })
    }
})
