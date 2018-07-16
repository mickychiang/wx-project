// pages/home/home.js
var util = require('../../utils/util.js');

// 获取应用实例
const app = getApp();
var page = 1;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    logged: false,
    // hidden: false,
    scrollTop: 0,
    scrollHeight: 0,
    // allPages: "", // 总页数
    // currentPage: 1, // 当前页数  默认是1
    // isActive: 1,
    lineStyle: "left: 0rpx;",
    currentIndex: 0, //当前tab位置 默认为0
    focusList: [], //关注
    recommendList: [], //推荐
    hotList: [], //热榜
    isLoading: false,
    loadMore: "加载更多"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getUserInfo();
    this.getFocusList();
    this.getRecommendList();
    this.getHotList();
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
    console.log("页面下拉");
    // if (!this.data.isShow && !this.data.isShowQues) {
      // wx.showNavigationBarLoading();
      // switch (+this.data.currentIndex) {
      //   case 0: this.getFocusList(true); break;
      //   case 1: this.getRecommendList(true); break;
      //   case 2: this.getHotList(true); break;
      //   default: break;
      // }
    // }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉");
    // if (!this.data.isShow && !this.data.isShowQues) {
      // switch (+this.data.currentIndex) {
      //   case 0: this.getMoreFocusList(); break;
      //   case 1: this.getMoreRecList(); break;
      //   case 2: this.getMoreHotList(); break;
      //   default: break;
      // }
    // }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  onPageScroll: function () {
    // Do something when page scroll
  },

  onTabItemTap(item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },

  // ****** 自定义函数 ******
  // 获取用户信息
  getUserInfo: function () {
    console.log('获取用户信息');
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender // 性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        that.setData({
          userInfo: userInfo,
          logged: true
        })
        console.log('请求用户信息，存储用户信息')
        wx.setStorage({
          key: 'userInfo',
          data: that.data.userInfo
        });
        // // 存储最后一次点击tab的index
        // wx.setStorage({
        //   key: 'lastIndex',
        //   data: that.data.isActive
        // });
      },
      fail: function (res) {
        that.getSetting();
      }
    })
  },

  // 获取用户权限
  getSetting: function () {
    console.log('获取用户权限')
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              that.login()
            },
            error() { }
          })
        } else {
          that.data.logged ? that.getUserInfo() : that.login();
        }
      }
    })
  },

  // 用户登录
  login: function () {
    console.log('用户登录');
    if (this.data.logged) return
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          that.setData({
            userInfo: result,
            logged: true
          });
          console.log('首次登录，存储用户信息')
          wx.setStorage({
            key: 'userInfo',
            data: that.data.userInfo
          });
        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              // util.showSuccess('登录成功')
              that.setData({
                userInfo: result.data.data,
                logged: true,
              });
              console.log('非首次登录，存储用户信息')
              wx.setStorage({
                key: 'userInfo',
                data: that.data.userInfo
              });
            },
            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
  },

  // 获取关注列表
  getFocusList(isRefresh) {
    var that = this;
    util.requestData('homeFocusAPI', {}, (res) => {
      if (res.errMsg) {
        util.showFail(res.errMsg);
      } else {
        if (isRefresh) {
          console.log('刷新关注列表数据');
          that.setData({
            focusList: res.data.concat(that.data.focusList)
          })
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          util.showSuccess(res.data.length + '条新内容');
        } else {
          console.log('请求关注列表数据');
          that.setData({
            focusList: res.data
          });
        }
      }
    });
  },


  // 获取推荐列表
  getRecommendList(flag) {
    var that = this;
    util.requestData('homeRecommendAPI', {}, (res) => {
      if (res.errMsg) {
        util.showFail(res.errMsg);
      } else {
        // if (!flag) {
          console.log('setData')
          that.setData({
            recommendList: res.data
          })
        // }
        console.log('请求推荐列表数据');
        // if (flag) {
        //   that.setData({
        //     recList: res.list.concat(that.data.recList)
        //   })
        //   console.log('刷新推荐列表数据');
        //   wx.stopPullDownRefresh();
        //   wx.hideNavigationBarLoading();
        //   util.showSuccess(res.list.length + '条新内容');
        // }
      }
    })
  },
  // 获取热门列表
  getHotList(flag) {
    var that = this;
    util.requestData('homeHotAPI', {}, (res) => {
      if (res.errMsg) {
        util.showFail(res.errMsg);
      } else {
        // if (!flag) {
          console.log('setData')
          that.setData({
            hotList: res.data
          })
        // }
        console.log('请求热门列表数据');
        // if (flag) {
        //   that.setData({
        //     hotList: res.list.concat(that.data.hotList)
        //   })
        //   console.log('刷新热门列表数据');
        //   wx.stopPullDownRefresh();
        //   wx.hideNavigationBarLoading();
        //   util.showSuccess(res.list.length + '条新内容');
        // }
      }
    })
  },

  // 加载更多关注列表
  getMoreFocusList() {
    var that = this;
    this.setData({
      isLoading: true,
      loadMore: '正在加载'
    })
    util.requestData('homeFocusAPI', {}, (res) => {
      !res.errMsg ? that.setData({ focusList: that.data.focusList.concat(res.data) })
        : util.showFail(res.errMsg);
      console.log('请求更多关注列表数据');
      this.setData({
        isLoading: false,
        loadMore: '加载更多'
      })
    })
  },


  // 跳转至 搜索页面
  navSearch: function () {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  // 跳转至 提问页面
  navQuestion: function () {
    wx.navigateTo({
      url: '../question/question'
    });
  },

  // 更改当前tabIndex
  changeTabIndex: function(e) {
    let index = parseInt(e.target.dataset.index);
    this.setData({
      currentIndex: index
    });
  },

  // 更改lineStyle位置
  // current 改变时会触发 change 事件，event.detail = {current: current, source: source}
  changeTabLineFrame: function(e) {
    // console.log(e.detail.current);
    const p = 33.3
    this.setData({
      lineStyle: `left: ${p * e.detail.current}%`
    })
  },
  
  /**
   * 滚动时触发
   * event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
   */
  scroll: function (event) {
    // console.log(event.detail.scrollTop);
    this.setData({
      scrollTop: event.detail.scrollTop
    })
  },

  /**
   * 滚动到底部/右边，会触发 scrolltolower 事件
   */
  bindDownLoad: function () {
    console.log("页面上拉");
    // if (!this.data.isShow && !this.data.isShowQues) {
      if (!this.data.isLoading) {
      switch (+this.data.currentIndex) {
        case 0: this.getMoreFocusList(); break;
        case 1: this.getMoreRecList(); break;
        case 2: this.getMoreHotList(); break;
        default: break;
      }
      }
    // }


    // var that = this;
    // //当前页是最后一页
    // if (that.data.currentPage === that.data.allPages) {
    //   console.log("已经到底");
    //   that.setData({
    //     loadMoreData: '已经到底'
    //   })
    //   return;
    // }
    // setTimeout(function () {
    //   console.log('上拉加载更多');
    //   var currentPage = that.data.currentPage;
    //   currentPage = currentPage + 1;
    //   that.setData({
    //     currentPage: currentPage,
    //     hideBottom: false
    //   })
    //   that.getPage();
    // }, 300);
    // // requestArticles(that);
  },

  /**
   * 滚动到顶部/左边，会触发 scrolltoupper 事件
   */
  refresh: function (event) {
    // page = 1;
    // this.setData({
    //   articles: [{
    //     id: '4',
    //     title: '复仇者联盟3钢铁侠',
    //     desc: '我也不知道写什么，',
    //     avatarUrl: '/assets/icons/icon-search.png',
    //     status: {
    //       user: 'tony',
    //       time: '2小时',
    //       text: '赞了文章'
    //     }
    //   }, {
    //     id: '2',
    //     title: '知乎关于清理违法有害信息的公告',
    //     desc: '知乎小管家：为进一步落实网站管理主体责任，根据《网络安全法》、《知乎协议》和《知乎..',
    //     descImage: '/assets/images/zh.png',
    //     status: {
    //       user: '小红拖拉机',
    //       time: '4天前',
    //       text: '赞了文章',
    //       avatarUrl: '/assets/icons/icon-message.png'
    //     }
    //   }],
    //   scrollTop: 0,
    //   hidden: true
    // });
    // requestArticles(this)
  },
  
})