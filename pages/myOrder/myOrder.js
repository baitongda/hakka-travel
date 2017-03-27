//myOrder.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
        orderList: []
    },
    onLoad: function (options) {
        var that = this
        wx.request({  
            url: 'https://localhost:3011/fr/order/list',
            method: 'GET',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }, 
            success: function(res) {
                if(res.data.statusCode == 20011011) {
                    that.data.orderList = res.data.data;
                }
            }
        })
    }
});
