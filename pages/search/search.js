Page({
  data: {
    focus: false,
    inputValue: '',
    searchRange: [
      { id: 0, checked: true, tag: "书名"},
      { id: 1, checked: false, tag: "标签" },
      { id: 2, checked: false, tag: "作者" },
      { id: 3, checked: false, tag: "出版社" },
      // { id: 4, checked: false, tag: "ISBN" },      
    ],
    adv_item_content: [
      { title: '评分:', label:'rating', state: false, input: ['6.0', '9.9'], inputHolder: ['最低分', '最高分'], maxLength:3, type: 'digit'}, 
      { title: '日期:', label:'date', state: false, input:['2000', '2019'], inputHolder:['最早时间','最晚时间'], maxLength:4, type:'number' }, 
      { title: '评价人数:', label:'people', state: false, input: ['1000', '2000'], inputHolder: ['最少人数', '最多人数'], maxLength:9, type: 'number'}
      ]
  },

  bindButtonTap: function () {
    this.setData({
      focus: true
    })
  },
  bindAdvInput: function (e) {
    var itemId = parseInt(e.currentTarget.id/2);
    var inputId = e.currentTarget.id%2;
    var flag = true;
    if(itemId === 0) {
      if(e.detail.value > 10) {
        wx.showToast({
          title: 'the number must be less than 10',
          icon: 'none',
        })
        flag = false;
      }
    }
    if(flag) {
      this.data.adv_item_content[itemId].input[inputId] = e.detail.value
    }
    this.setData({
      adv_item_content: this.data.adv_item_content
    })
  },

  onChangeItemState: function(e) {
    var index = e.currentTarget.id
    this.data.adv_item_content[index].state = !this.data.adv_item_content[index].state
    this.setData({
      adv_item_content: this.data.adv_item_content
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
    //check the input value
    console.log('onSearch')
    var paras = '?searchRange=';
    var searchInfo=[]
    for(var i=0; i<this.data.searchRange.length; i++) {
      if(this.data.searchRange[i].checked) {
        //parasArray.push(('searchRange[]=' + this.data.searchRange[i].tag));
        searchInfo.push(this.data.searchRange[i].tag);
      }
    }

    if (searchInfo.length === 0) {
      wx.showToast({
        title: 'please set the search range',
        icon: 'none'
      });
      return;
    }

    paras += JSON.stringify(searchInfo)

    var advInfo = []
    for(var i=0; i< this.data.adv_item_content.length; i++) {
      var item = this.data.adv_item_content[i]
      if(item.state) {
        var para = {}
        para[item.label] = item.input
        advInfo.push(para)
      }
    }
    
    if(advInfo.length != 0) {
      paras += ('&advInfo=' + JSON.stringify(advInfo))
    }

    console.log(paras)
    wx.navigateTo({
      url: '../result/result' + paras,
    });
  },

  writeLocalDate: function(){

  },

  onLoad: function() {
    console.log('onLoad')
    var storageData = wx.getStorageSync('data')
    if(storageData.length!=0) {
      this.setData({
        ...storageData
      })
    }
  },

  onReady: function () {
    console.log('onReady')
  },

  onShow: function () {
    console.log('onShow')
  },

  onHide: function () {
    console.log('onHide')
    wx.setStorageSync("data", this.data)
  },

  onUnload: function () {
    console.log('onUnload')
  },
});