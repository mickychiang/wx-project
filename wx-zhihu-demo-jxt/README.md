从一个详细的demo入门小程序

Easy Mock


https://juejin.im/post/5b1cc7c5f265da6e225cedbf
https://developers.weixin.qq.com/miniprogram/dev/api/systeminfo.html#wxgetsysteminfoobject

tabBar
如果小程序是一个多 tab 应用（客户端窗口的底部或顶部有 tab 栏可以切换页面），可以通过 tabBar 配置项指定 tab 栏的表现，以及 tab 切换时显示的对应页面。

Tip：
当设置 position 为 top 时，将不会显示 icon
tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。

属性说明：
/Users/jiangxintong/Desktop/屏幕快照 2018-06-22 上午9.34.47.png

其中 list 接受一个数组，数组中的每个项都是一个对象，其属性值如下：
/Users/jiangxintong/Desktop/屏幕快照 2018-06-22 上午9.35.34.png







