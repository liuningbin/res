//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    wx.checkSession({
      success: (res) => {
        console.log(res,'登录未过期')
        wx.showToast({
          title: '登录未过期',
        })
      },fail:(res)=>{
        console.log(res,'登录过期了')
        wx.showModal({
          title: '提示',
          content: '你的登录信息过期了，请重新登录',
        })
        this.login()
      }
    });
  },

  login(){
    wx.login({
      success: res => {
        console.log("res.code"+res.code)
        if(res.code){
          wx.request({
            url: 'http://localhost:8080/useLogin',
            method:'POST',
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data:{code:res.code},
            success: function(res){
              wx.setStorageSync('openid', res.data.openid);
            },
          });
        }

        //获取微信运动步数
        wx.getSetting({
          success:(res)=>{1
            if(res.authSetting['scope.werun']){
              wx.getWeRunData({
                success: (result) => {
                  const encryptedData = res.encryptedData;
                  console.log(this.result.encryptedData);
                },
              })
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})