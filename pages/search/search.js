Page({
  data: {
    focus: false,
    inputValue: '',
    //searchRange : ["书名","标签","作者","出版社"],
    searchRange: [
      { id: 0, checked: true, tag: "书名"},
      { id: 1, checked: false, tag: "标签" },
      { id: 2, checked: false, tag: "作者" },
      { id: 3, checked: false, tag: "出版社" },
      // { id: 4, checked: false, tag: "ISBN" },      
    ],
    scoreArray: [[0,1, 2, 3, 4, 5, 6, 7, 8, 9], [0,1, 2, 3, 4, 5, 6, 7, 8, 9]],
    scoreIndexArray:[[6,0],[9,9]],
    dateArray:[2000,2020],
    peopleArray: [1000, 2000],
    adv_item_content: [{ title: '评分:', floor: 6.0, ceil: 9.9, state: false }, 
    { title: '日期:', floor: 2000, ceil: 2019, state:true }, 
    { title: '评价人数:', floor: 1000, ceil: 2000, state:true}]
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      inputValue: e.detail.value
    })
  },
  onChangeItemState: function(e) {
    var index = e.currentTarget.id
    this.data.adv_item_content[index].state = !this.data.adv_item_content[index].state
    this.setData({
      adv_item_content: this.data.adv_item_content
    })
  },

  bindScoreChange: function(e) {
    var idx = e.currentTarget.id;
    this.data.scoreIndexArray[idx] = e.detail.value;
    this.setData({
        scoreIndexArray: this.data.scoreIndexArray
    })
  },

  bindDateChange: function (e) {
    var idx = e.currentTarget.id;
    this.data.dateArray[idx] = e.detail.value;
    this.setData({
      dateArray: this.data.dateArray
    })
  },

  onTapTags: function(e) {
    var index = e.currentTarget.id;
    this.data.searchRange[index].checked = !this.data.searchRange[index].checked
    this.setData({
      searchRange : this.data.searchRange
    })
  },
  onSearch: function(e) {
    console.log('here')
    wx.request({
      url: 'https://149.28.213.189:443',
      success:function(res) {
        console.log('success');
      },
      fail: function (res) {
        console.log('fail');
      },
      complete: function (res) {
        console.log('complete');
      }
    })
  }
})
