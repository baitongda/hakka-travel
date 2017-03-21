//schedule.js
//获取应用实例
const dateUtil = require('../../utils/date.js');
const util = require('../../utils/util.js');
const app = getApp();
Page({
    data: {
        scheduleList: []
    },

    onLoad: function () {
        // 获取所有车次信息
        let that = this;
        let globalData = app.globalData;

        that.setData({
            curDate: dateUtil.formatDate(globalData.curDate).dateWithWeek,
            scheduleDate: globalData.curDate,
            startCity: globalData.startCity,
            endCity: globalData.endCity,
            startStation: globalData.startStation,
            nextDate: globalData.nextDate
        });
        util.showWxLoading();
        wx.request({
            url: 'https://localhost:3011/fr/schedule/list?startCity=' + that.data.startCity + '&endCity=' + that.data.endCity +
            '&scheduleDate=' + that.data.scheduleDate + '&stationName=北理工公交站' /*+ that.data.startStation*/ + '&nextDate=' + that.data.nextDate,
            method: 'GET',
            success: function (res) {
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data;
                    let arr = [];
                    data.forEach((item) => {
                        let obj = {
                            time: item.depart_time,
                            startStation: item.start_station,
                            endStation: item.end_station,
                            benefitTicket: item.benefit_ticket,
                            normalTicket: item.normal_ticket
                        };
                        arr.push(obj);
                    });
                    that.setData({
                        scheduleList: arr
                    })
                }
            },
            complete: function () {
                util.hideWxLoading();
            }
        })
    },
    booking() {
        wx.navigateTo({
            url: '../order/order?scheduleId='
        })
    },
    preDate() {
        // 判断当前日期是否为今天
        if (dateUtil.isToday(app.globalData.curDate)) {
            return false;
        }

        let that = this;
        that.data.scheduleList = [];
        app.globalData.curDate -= 86400000; // Decrease one day
        app.globalData.nextDate -= 86400000;

        // 前一天是否为今天
        if(dateUtil.isToday(app.globalData.curDate)) {
            app.globalData.curDate = dateUtil.getToday().getTime
        }

        that.setData({
            curDate: dateUtil.formatDate(app.globalData.curDate).dateWithWeek
        });

        util.showWxLoading();
        wx.request({
            url: 'https://localhost:3011/fr/schedule/list?startCity=' + that.data.startCity + '&endCity=' + that.data.endCity +
            '&scheduleDate=' + that.data.scheduleDate + '&stationName=' + that.data.startStation + '&nextDate=' + that.data.nextDate,
            method: 'GET',
            success: function (res) {
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data;
                    let arr = [];
                    data.forEach((item) => {
                        let obj = {
                            time: item.depart_time,
                            startStation: item.start_station,
                            endStation: item.end_station,
                            benefitTicket: item.benefit_ticket,
                            normalTicket: item.normal_ticket
                        };
                        arr.push(obj);
                    });
                    that.setData({
                        scheduleList: arr
                    })
                }
            },
            complete: function () {
                util.hideWxLoading();
            }
        })
    },
    nextDate() {

        let that = this;
        that.data.scheduleList = [];
        app.globalData.curDate += 86400000; // add one day
        app.globalData.nextDate += 86400000;

        that.setData({
            curDate: dateUtil.formatDate(app.globalData.curDate).dateWithWeek
        });

        util.showWxLoading();
        wx.request({
            url: 'https://localhost:3011/fr/schedule/list?startCity=' + that.data.startCity + '&endCity=' + that.data.endCity +
            '&scheduleDate=' + that.data.scheduleDate + '&stationName=' + that.data.startStation + '&nextDate=' + that.data.nextDate,
            method: 'GET',
            success: function (res) {
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data;
                    let arr = [];
                    data.forEach((item) => {
                        let obj = {
                            time: item.depart_time,
                            startStation: item.start_station,
                            endStation: item.end_station,
                            benefitTicket: item.benefit_ticket,
                            normalTicket: item.normal_ticket
                        };
                        arr.push(obj);
                    });
                    that.setData({
                        scheduleList: arr
                    })
                }
            },
            complete: function () {
                util.hideWxLoading();
            }
        })
    }
});
