
const app = getApp()
let searchKey = '' //搜索词
Page({
  data: {
    isNeedSaoMa: app.globalData.isNeedSaoMa,
    banner: [{
        picUrl: '/image/1.jpg'
      },
      {
        picUrl: '/image/2.jpg'
      }, {
        picUrl: '/image/3.jpg'
      }
    ]
  },
  //页面可见
  onShow() {
    this.getTopBanner(); //请求顶部轮播图
    searchKey = '' //每次返回首页时，清空搜索词
    wx.showLoading({
      title: '加载中',
    })
  },
  //轮播图点击事件
  goFood() {
    wx.navigateTo({
      url: this.checkFoodPage()
    })
  },
  //去点餐
  diancan() {
    if (app.globalData.isNeedSaoMa) { //需要扫桌码才可以点菜
      wx.scanCode({
        success: res => {
          console.log('扫码结果', res.result)
          app.globalData.address = res.result
          wx.navigateTo({
            url: this.checkFoodPage()
          })
        }
      })
    } else { //不扫码就可以直接点餐
      wx.navigateTo({
        url: this.checkFoodPage()
      })
    }
  },
  //菜品浏览
  goToFood() {
    wx.navigateTo({
      url: this.checkFoodPage()
    })
  },
  //饭店电话
  goToPhone() {
    wx.makePhoneCall({
      phoneNumber: '15277687538' 
    })
  },


  //去排号页
  paihao() {
    wx.navigateTo({
      url: '/pages/paihao/paihao',
    })
  },
  //获取用户输入的搜索词
  getSearchKey(e) {
    searchKey = e.detail.value
  },
  //搜索点击事件
  goSearch() {
    wx.navigateTo({
      url: this.checkFoodPage() + '?searchKey=' + searchKey,
    })
  },
  //选择去food还是food2
  checkFoodPage() {
    if (app.globalData.isNeedFenLei) {
      return '/pages/food2/food2'
    } else {
      return '/pages/food/food'
    }
  },
  //获取首页顶部轮播图
  getTopBanner() {
    wx.cloud.database().collection("lunbotu")
      .get()
      .then(res => {
        console.log("首页banner成功", res.data)
        if (res.data && res.data.length > 0) {
          //如果后台配置轮播图就用后台的，没有的话就用默认的
          this.setData({
            banner: res.data
          })
          wx.hideLoading()
        }
      }).catch(res => {
        console.log("首页banner失败", res)
      })
  }
})