// pages/mind/mind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    indicatorDots: false, //swiper 是否显示面板指示点
    circular: true, //swiper 是否采用衔接滑动
    autoplay: true, //swiper 是否自动切换
    interval: 5000, //swiper 自动切换时间间隔
    duration: 200, //swiper 滑动动画时长
    vertical: false, //swiper 滑动方向是否为纵向
    // discussList: [], //讨论组
    // discussList: ['a', 'b', 'c', 'd'], //讨论组
    focusList: [],
    //推荐关注
    recFocusList: [
      {
        userId: '447856',
        nickName: '火箭少女',
        avatar: '',
        imgUrl: '',
        intro: '创造101'
      },
      {
        userId: '447856',
        nickName: '火箭少女',
        avatar: '',
        imgUrl: '',
        intro: '创造101'
      },
      {
        userId: '447856',
        nickName: '火箭少女',
        avatar: '',
        imgUrl: '',
        intro: '创造101'
      },
      {
        userId: '447856',
        nickName: '火箭少女',
        avatar: '',
        imgUrl: '',
        intro: '创造101'
      },
    ],
    discussList: [
      {
        id: 157896,
        categoryId: '13',
        category: '讨论组',
        title: "a",
        description: 'aaaaaaaaaaaaaaaaaaa这是一个描述很长的讨论组 希望大家活跃活跃呀',
        image: '',
      },
      {
        id: 365485,
        categoryId: '13',
        category: '讨论组',
        title: "b",
        description: 'bbbbbb',
        image: '',
      },
      {
        id: 235489,
        categoryId: '11',
        category: '追星',
        title: "c",
        description: 'cccccc',
        image: '',
      },
      {
        id: 635411,
        categoryId: '11',
        category: '追星',
        title: "d",
        description: 'ddddddsdberberberbergerg',
        image: '',
      }, 
      {
        id: 123855,
        categoryId: '15',
        category: '实验室',
        title: "e",
        description: 'eeeeeeergerbherbernernernernernerner',
        image: '',
      }], //讨论组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // ******* 自定义函数 *******
  /**
   * scroll-view 滚动时触发
   */
  onScroll: function (event) {
    console.log('onScroll');
    this.setData({
      scrollTop: event.detail.scrollTop
    });
  },

  /**
   * banner讨论循环滚动 点击触发
   */
  onSelectedRecBanner: function (event) {
    // var that = this;
    // var index = event.target.dataset.index;
    // console.log(index);
    console.log(event);
    console.log(event.currentTarget.dataset.index);
    console.log(event.currentTarget.dataset.item);
    // this.data.showIndex[index] = !this.data.showIndex[index];
    // this.setData({
    //   showIndex: this.data.showIndex
    // })
  },

  /**
   * 推荐关注 点击触发 进去详情页
   */
  onSelectedRecFocus: function (event) {
    // console.log(event);
    // console.log(event.currentTarget.dataset.index);
    // console.log(event.currentTarget.dataset.item);
  },

  /**
   * 推荐关注 点击button触发
   */
  onFocusTap: function (event) {
    var that = this,
    index = event.target.dataset.index;
    console.log(index);
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 2000
    });
    this.data.focusList[index] = !this.data.focusList[index];
    this.setData({
      focusList: this.data.focusList
    });
  },

  onFocusAllTap: function () {
    var that = this;
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 2000
    })
    // setTimeout(function () {
    //   that.getRecFocusList();
    // }, 2000);
  },

})