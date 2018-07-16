var env = "development";
var api = require('./api.config.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 提示 - 繁忙
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 提示 - 成功
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示 - 失败
var showFail = (title, content) => {
  wx.hideToast();
  wx.showModal({
    title: title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

// 请求数据
var requestData = (url, data, fun) => {
  wx.request({
    method: 'POST',
    url: api[url][env],
    data: data,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      console.log(res.errMsg);
      res.statusCode === 200 ? fun(res.data) : fun(res);
    },
    fail: function (res) {
      console.log(res.statusCode, res.errMsg)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  showBusy: showBusy, 
  showSuccess: showSuccess, 
  showFail: showFail, 
  requestData: requestData
}
