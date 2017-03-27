//endCity.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({
    data: {
        chosenCity: '',
        chosenStation: '',
        chosenCityIndex: -1,
        startCity: '',
        endCityList: [],
        queryParam: '',
        endStation: {
            chosenIndex: -1,
            stationTitle: '选择下车地点',
            stationList: []
        }
    },
    onLoad: function () {
        let that = this;
        that.setData({
            currentCity: app.globalData.currentCity
        });

        let startCity = app.globalData.startCity;
        this.data.queryParam = startCity != '请选择出发地点' ? 'startCity=' + startCity : 'allStart=1';

        util.showWxLoading();
        // get all start point
        wx.request({
            url: 'https://localhost:3011/fr/city/list?' + that.data.queryParam,
            method: 'GET',
            success: function (res) {
                console.log(res.data);
                if (res.data.statusCode == 20011011) {
                    let data = res.data.data;
                    let arr = [];
                    data.forEach((item) => {
                        let obj = {};
                        obj.name = item.end_city;
                        obj.busCityId = item.bus_city_id;
                        arr.push(obj);
                    });
                    that.setData({
                        endCityList: arr
                    })
                }
            },
            complete: function() {
                util.hideWxLoading();
            }
        })
    },
    check: function () {
        wx.navigateBack({
            delta: 1
        })
    },
    chooseCity: function (event) {
        let that = this;
        let index = event.target.dataset.index;
        this.setData({
            chosenCity: that.data.endCityList[index].name,
            chosenCityIndex: index
        });
        app.globalData.endCity = that.data.chosenCity;
    },
    chooseStation: function (event) {
        let index = event.target.dataset.index;
        this.setData({
            chosenStation: this.data.endStation.stationList[index].name,
            'endStation.chosenIndex': index
        });
        app.globalData.endStation = this.data.chosenStation;
    }
});
