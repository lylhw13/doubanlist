// pages/faborites/faborites.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderArray: ["评分", "出版日期", "评分人数", "收藏日期"],
    orderIndexArray: ["0", "1", "2", "3"],
  },
  onOrderChange: function (e) {
    var pickerId = e.currentTarget.id;
    var itemId = e.detail.value;
    if(this.data.orderIndexArray.slice(0,pickerId).includes(itemId)) {//0 ~ pickerId 对应的是之前的选择元素
      console.log("return");
      return;
    }
    var tmpArray = this.data.orderIndexArray.splice(pickerId, this.data.orderArray.length - pickerId).sort();
    var modifyArray = [itemId]
    for(var i = 0; i<tmpArray.length; i++){
      if(tmpArray[i] !== itemId){
        modifyArray.push(tmpArray[i]);
      }
    }
    this.setData({
      orderIndexArray: this.data.orderIndexArray.concat(modifyArray)
    })
  },

  // onOrderChange: function(e) {
  //   var pickerId = e.currentTarget.id;
  //   var itemId = e.detail.value;
  //   if (pickerId == 0) {
  //     var localArray = [itemId];
  //     for (var value in [0, 1, 2, 3]) {
  //       if (value !== itemId) {
  //         localArray.push(value);
  //       }
  //     }
  //     //console.log(localArray)
  //     this.setData({
  //       orderIndexArray: localArray
  //     })
  //   } else if (pickerId == 1) {
  //     if (itemId !== this.data.orderIndexArray[0]) {
  //       var localArray = [this.data.orderIndexArray[0], itemId];
  //       for (var value in [0, 1, 2, 3]) {
  //         if (!localArray.includes(value)) {
  //           localArray.push(value);
  //         }
  //       }
  //       this.setData({
  //         orderIndexArray: localArray
  //       })
  //     }
  //   } else { //pickerId == 2
  //     if (itemId !== this.data.orderIndexArray[0]) {
  //       var tmp = this.data.orderIndexArray[pickerId];
  //       this.data.orderIndexArray[pickerId] = itemId;
  //       this.data.orderIndexArray[pickerId + 1] = tmp;
  //       this.setData({
  //         orderIndexArray: this.data.orderIndexArray
  //       })
  //     }
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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