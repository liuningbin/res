const app = getApp()

Page({
  data: {
    res_list:[],
    address:{}
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
            success(){
              wx.startLocationUpdate() 
            }
          })
        }
      }
    })

    wx.getLocation({
      scope:'gcj02',
      success:(res)=>{
        var latitude=res.latitude;
        var longitude=res.longitude;

        wx.request({
          url:'https://apis.map.qq.com/ws/geocoder/v1/',
          type:'get',
          data:{
            location:latitude+','+longitude,
            key:'AWWBZ-H3CWX-M454Z-TJAFJ-24UHK-IXBRL',
          },
          success:(res)=>{
            console.log(res.data.result.address)
            this.setData({
              address:res.data.result.address,
            })
            var add=JSON.stringify(this.data.address);
            wx.setNavigationBarTitle({
              title:add
            })
          }
        })
        console.log(res.latitude)
        console.log(res.longitude)
      },
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
