//station.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
  	startIndex: -1,
  	endIndex: -1,
  	startStationList: [],
  	endStationList: []
  },

  onLoad: function () {
    let that = this;
    let queryParam = 'startCity=' + app.globalData.startCity + '&endCity=' + app.globalData.endCity;
    // 加载站点列表
    util.showWxLoading();
    wx.request({
    	url: 'https://localhost:3011/fr/station/list?' + queryParam,
    	method: 'GET',
    	success: function(res) {
    		if(res.data.statusCode == 20011011) {
    			let data = res.data.data;
    			let startArr = [], endArr = [];
    			data.forEach((item) => {
    				if(item.station_type == 0) {  // startStation
    					startArr.push(item);
    				}else if(item.station_type == 1) { // endStation
    					endArr.push(item);
    				}
    			})
    			that.setData({
    				startStationList: startArr,
    				endStationList: endArr
    			})
    		}
    	},
    	complete: function() {
    		util.hideWxLoading();
    	}
    })
  },
  chooseStartStation(e) {
  	let chosenIndex = e.currentTarget.dataset.startIndex;
  	this.setData({
  		startIndex: chosenIndex
  	});
    app.globalData.startStation = this.data.startStationList[chosenIndex].station_name;
  },
  chooseEndStation(e) {
  	let chosenIndex = e.currentTarget.dataset.endIndex;
  	this.setData({
  		endIndex: chosenIndex
  	});
    app.globalData.endStation = this.data.endStationList[chosenIndex].startion_name;
  },
  check() {
    if(this.data.startIndex === -1 || this.data.endIndex === -1) {
        util.showSelfToast(this, 1000, '请选择出发/到达站点');
        return;
    }
  	wx.navigateTo({
  		url: '../schedule/schedule'
  	})
  }
})
