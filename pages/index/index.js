let datas=require('../../data/data.js');
console.log(datas);
const app = getApp()

Page({
  data: {
    res_list:[],
    latitude:{},
    longitude:{}
  },

  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '新海科技集团有限公司高新区',
    })

    this.setData({
      res_list:datas.list_data,
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
          success:function(res){
            console.log(res)
          }
        })

        console.log(res.latitude)
        console.log(res.longitude)
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
