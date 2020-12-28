// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */


  data: {
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

  pay:function(e){
    console.log(e.currentTarget.dataset.text)
    wx.showActionSheet({
      itemList: ['确定充值'],
      success:function(res){
        if(res.tapIndex==0){
          console.log("确定充值")
          wx.request({
            url: 'http://localhost:8080/pay',
            method:'POST',
            header:{
              'content-type':'application/x-www-form-urlencoded'
            },
            data:{
              openid:wx.getStorageSync('openid'),
              money:e.currentTarget.dataset.text
            },
            success:(res)=>{
              wx.showToast({
                title: '充值成功',
              })
            }
          })
        }
      },
      fail:function(res){
        console.log("取消充值")
      }
    })
  }
})