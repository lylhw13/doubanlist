// pages/result/result.js
var post_data = require('../../data/page_content.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ["评分", "日期", "评价人数", "自定义"],
    orderIndexArray: ["0", "1", "2", "3"],
    showMoreInfo: false
  },
  onOrderChange: function (e) {
    var pickerId = e.currentTarget.id;
    var itemId = e.detail.value;
    if (this.data.orderIndexArray.slice(0, pickerId).includes(itemId)) {//0 ~ pickerId 对应的是之前的选择元素
      console.log("return");
      return;
    }
    var tmpArray = this.data.orderIndexArray.splice(pickerId, this.data.orderArray.length - pickerId).sort();
    var modifyArray = [itemId]
    for (var i = 0; i < tmpArray.length; i++) {
      if (tmpArray[i] !== itemId) {
        modifyArray.push(tmpArray[i]);
      }
    }
    this.setData({
      orderIndexArray: this.data.orderIndexArray.concat(modifyArray)
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
<<<<<<< HEAD
    wx.request({
      url: 'http://localhost',
      
    })
  },
=======
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
>>>>>>> 5fc08f3ac706db724938ad3cc65e566bcd79b3ce

      var tagsArray = postData[idx].tags.split(',');
      postData[idx].tagsArray = tagsArray;
    }
    
    this.setData({
      postData: postData
    })
  },
  
  onMoreInfo: function(e) {
    this.setData({
      showMoreInfo: true,
      moreInfoIndex: e.currentTarget.id,
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