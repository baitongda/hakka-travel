//endCity.js
//获取应用实例
var app = getApp()
Page({
  data: {
  	chosenCity: '',
  	chosenStation: '',
  	chosenCityIndex: -1,
  	startCity: '',
    endCityList: [
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
    endStation: {
    	chosenIndex: -1,
    	stationTitle: '选择下车地点',
    	stationList: [
	    	{ name: '北理工公交站（往正门方向）'},
	    	{ name: '北理工公交站（往正门方向）'},
	    	{ name: '北理工公交站（往正门方向）'}
	    ]
    }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    // wx.getStorage({
    //   key: 'startCity',
    //   success: function(res){
    //     // success res = {data: key对应的内容}
    //     if(res.data) {
    //       that.startCity = res.data;
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
    //   queryParam: that.data.startCity? 'startCity=' + that.data.startCity: 'allEnd=1'
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
  check: function() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  chooseCity: function(event) {
  	var index = event.target.dataset.index;
  	this.setData({
  		chosenCity: this.data.endCityList[index],
  		chosenCityIndex: index
  	})
  },
  chooseStation: function(event) {
  	var index = event.target.dataset.index;
  	this.setData({
  		'endStation.chosenIndex': index
  	})
  }
})
