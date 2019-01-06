// pages/result/result.js
var post_data = require('../../data/page_content.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ["评分", "日期", "评价人数"],
    orderIndexArray: ["0", "1", "2"],
    backupOrderIndexArray: ["0", "1", "2"],
    showMoreInfo: false,
    pickerChanged: false
  },
  onOrderChange: function (e) {    
    var pickerId = e.currentTarget.id;
    var itemId = e.detail.value;
    if (this.data.orderIndexArray.slice(0, pickerId).includes(itemId)) {//0 ~ pickerId 对应的是之前的选择元素
      console.log("return");
      return;
    }
    var orderIndexArray = this.data.orderIndexArray.slice()//copy by value
    var tmpArray = orderIndexArray.splice(pickerId, this.data.orderArray.length - pickerId).sort();
    orderIndexArray.push(itemId)
    //var modifyArray = [itemId]
    for (var i = 0; i < tmpArray.length; i++) {
      if (tmpArray[i] !== itemId) {
        orderIndexArray.push(tmpArray[i]);
      }
    }

    var pickerChanged = (orderIndexArray.toString() !== this.data.backupOrderIndexArray.toString())

    this.setData({
      orderIndexArray: orderIndexArray,
      pickerChanged: pickerChanged
    })
  },

  onRefresh: function(e) {
    //only update the backupOrder by refresh

    //reload from url
    this.setData({
      backupOrderIndexArray: this.data.orderIndexArray,
      pickerChanged: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("result onLoad")
    var searchRange = JSON.parse(options.searchRange)
    var advInfo = []
    if('advInfo' in options) {
      advInfo = JSON.parse(options.advInfo)
    }
    //Todo generate the html
    /*wx.request({
      url: 'https://149.28.213.189:443',
      success: function (res) {
        console.log('success');
      },
      fail: function (res) {
        console.log('fail');
      },
      complete: function (res) {
        console.log('complete');
      }
    });*/
    var postData = post_data.postList;
    for(var idx=0;idx<postData.length;idx++){
      //var postData = post_data.postList[0];
      postData[idx].image_path = '/images/pic/' + postData[idx].image_name + '.jpg';

      var num = Math.round(parseFloat(postData[idx].rating_num))
      var full_star = parseInt(num / 2);
      var half_star = num % 2;
      var star_array = [0, 0, 0, 0, 0]
      for (var i = 0; i < full_star; i++) {
        star_array[i] = 2;
      }
      if (half_star > 0) {
        star_array[full_star] = 1;
      }

      var score_array = JSON.parse("[" + postData[idx].stars_per + "]");
      postData[idx].star_array = star_array;
      postData[idx].score_array = score_array;
      postData[idx].idx = idx;

      var tagsArray = postData[idx].tags.split(',');
      postData[idx].tagsArray = tagsArray;


      /*var infoArray = []
      var more_infos = postData[idx].info.split('\n');
      for (var i = 0; i < more_infos.length; i++) {
        var info = more_infos[i];
        if (info.length != 0) {
          var index = info.indexOf(':')
          //var tmp = {}
          //tmp[info.substring(0, index + 1)] = info.substring(index + 1)
          var tmp = []
          tmp.push(info.substring(0, index + 1));
          tmp.push(info.substring(index + 1));
          infoArray.push(tmp)
        };
      }
      postData[idx].infoArray = infoArray*/
    }
    
    this.setData({
      postData: postData
    })
  },
  
  onMoreInfo: function(e) {
    var id = e.currentTarget.id;
    var currentInfo = {}
    currentInfo['title'] = this.data.postData[id].title;
    var infoArray = []
    var more_infos = this.data.postData[id].info.split('\n');
    for (var i = 0; i < more_infos.length; i++) {
      var info = more_infos[i];
      if (info.length != 0) {
        var index = info.indexOf(':')
        infoArray.push([info.substring(0, index + 1), info.substring(index + 1)])
      };
    };
    infoArray.push(['标签:', this.data.postData[id].tags])
    currentInfo['infoArray'] = infoArray
    this.setData({
      showMoreInfo: true,
      currentInfo: currentInfo
    })
  },
  onCloseMoreInfo: function(e) {
    this.setData({
      showMoreInfo: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log("result onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log("result onShow")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log("result onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log("result onUnload")

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})