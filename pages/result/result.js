//result.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({
    onLoad: function () {
        var that = this
    },
    goPay() {
        let that = this;
        let paymentObj = {};
        util.showWxLoading('处理中...', 1500);
        wx.request({
            url: 'https://',
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
                    };

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
            }
        })
    },
    orderDetail() {
        wx.navigateTo({
            url: '../detail/detail'
        })
    }
});
