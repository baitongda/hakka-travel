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
    },
    toast: {
      content: '请选择到达城市及下车地点',
      iconUrl: '../../../images/warning.png',
      showToast: false
    }
  },
  onLoad: function () {

    let startCity = app.globalData.startCity;
    this.data.queryParam = startCity != '请选择出发地点'? 'startCity=' + startCity: 'allStart=1';
    
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
    // city and station have been selected
    let that = this;
    if(that.data.chosenCity == '' || that.data.chosenStation == '') {
      that.setData({
        'toast.showToast': true
      });
      setTimeout(() => {
        that.setData({
          'toast.showToast': false
        })
      }, 1000);
      return;
    }

    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  chooseCity: function(event) {
  	let index = event.target.dataset.index;
  	this.setData({
  		chosenCity: this.data.endCityList[index].name,
  		chosenCityIndex: index
  	});
    app.globalData.endCity = this.data.chosenCity;
  },
  chooseStation: function(event) {
  	let index = event.target.dataset.index;
  	this.setData({
      chosenStation: this.data.endStation.stationList[index].name,
  		'endStation.chosenIndex': index
  	});
   app.globalData.endStation = this.data.chosenStation;
  }
})
