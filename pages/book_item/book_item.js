

var post_data = require('../../data/page_content.js');

// pages/book_item/book_item.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var postData = post_data.postList[0];
    this.setData(
      postData
    )
    this.setData({
      image_path: '/images/pic/' + this.data.image_name + '.jpg'      
    })
    var num = Math.round(parseFloat(this.data.rating_num))
    var full_star = parseInt(num/2);
    var half_star = num%2;
    var star_array = [0,0,0,0,0]
    for(var i = 0; i< full_star; i++){
      star_array[i] = 2;
    }
    if(half_star>0) {
      star_array[full_star] = 1;
    }

    var score_array = JSON.parse("["+this.data.stars_per +"]");

    this.setData({
      star_array: star_array,
      score_array: score_array
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})