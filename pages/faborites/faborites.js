// pages/faborites/faborites.js
var post_data = require('../../data/page_content.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ["评分", "出版日期", "评分人数", "收藏日期"],
    orderIndexArray: ["0", "1", "2", "3"],
    showMoreInfo: false,
  },

  onRequest: function(e){
    console.log("begin request");
    wx.request({
      url: "http://192.168.0.105:8080",
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET',
      success (res){
        console.log("request success")
      }
    })
  },
  
  onMoreInfo: function (e) {
    var id = e.currentTarget.id;
    var currentInfo={}
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
  onCloseMoreInfo: function (e) {
    this.setData({
      showMoreInfo: false,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var postData = post_data.postList;
    for (var idx = 0; idx < postData.length; idx++) {
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
    }

    this.setData({
      postData: postData
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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