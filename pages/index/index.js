const app = getApp()

Page({
  data: {
    res_list:[]
  },

  onLoad: function () {
    wx.request({
      url: 'http://localhost:8080/resList',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      success: (res)=>{
        console.log(res.data)
        this.setData({
          res_list:res.data
        })
      },
    })

    wx.getSetting({
      success:(res)=>{
        if(!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success:(res)=>{
              wx.getLocation({
                scope:'gcj02',
                success:(res)=>{
              wx.request({
                url: 'http://localhost:8080/location',
                method:'POST',
                header:{
                  'content-type':'application/x-www-form-urlencoded'
                },
                data:{
                  openid:wx.getStorageSync('openid'),
                  latitude:res.latitude,
                  longitude:res.longitude
                },
                success:(res)=>{
                  wx.setStorageSync('location', res.data.result.address)
                    var add=JSON.stringify(wx.getStorageSync('location'));
                    wx.setNavigationBarTitle({
                      title:add
                    })
                },
              })
                },
              })
            }
          })
        }else{
          var add=JSON.stringify(wx.getStorageSync('location'));
          wx.setNavigationBarTitle({
            title:add
          })
        }
      }
    })
  }
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
