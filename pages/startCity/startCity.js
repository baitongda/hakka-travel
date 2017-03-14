//startCity.js
//获取应用实例
var app = getApp()
Page({
  data: {
 		chosenCity: '',
 		chosenStation: '',
 		chosenCityIndex: -1,
    endCity: '',
    startCityList: [
    	{ name: '北京' },
    	{ name: '上海' },
    	{ name: '广州' },
    	{ name: '深圳' },
    	{ name: '北京' },
    	{ name: '上海' },
    	{ name: '广州' },
    	{ name: '深圳' }
 		],
    queryParam: '',
		startStation: {
				chosenIndex: -1,
	    	stationTitle: '选择上车地点',
	    	stationList: [
	    		{ name: '北理工公交站（往正门方向）'},
	    		{ name: '北理工公交站（往正门方向）'},
	    		{ name: '北理工公交站（往正门方向）'}
		    ]
	  }
  },
  onLoad() {
    console.log('onLoad')
    var that = this;
    // wx.getStorage({
    //   key: 'endCity',
    //   success: function(res){
    //     // success res = {data: key对应的内容}
    //     if(res.data) {
    //       that.endCity = res.data;
    //     }
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // }),
    // that.setData({
    //   queryParam: that.data.endCity? 'endCity=' + that.data.endCity: 'allStart=1'
    // }) 
    // get all start point
    // wx.request({
    //   url: 'http://loaclhost:8080/fr/city/list?' + that.data.queryParam,
    //   header: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    //   method: 'GET',
    //   success: function(res) {
    //     console.log(res.data);
    //   }
    // })
  },
  check() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  chooseCity(event) {
  	var index = event.target.dataset.index;
		this.setData({
			chosenCity: this.data.startCityList[index].name,
			chosenCityIndex: index
		});
    // 通过storage跨页面传数据
    wx.setStorage({
      key: 'startCity',
      data: this.data.chosenCity
    })
  },
  chooseStation(event) {
  	var index = event.target.dataset.index;
  	this.setData({
      // chosenStation: this.data.startStation.stationList[index].name,
  		'startStation.chosenIndex': index
  	});
    wx.setStorage({
      key: 'startStation',
      data: this.data.chosenStation
    })
  }
})
