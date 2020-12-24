// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  getUserInfo(){
    wx.getSetting({
      success:(res)=>{
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:(res)=>{
              this.setData({
                userInfo:res.userInfo,
              })
            }
          });
          this.setData({
            isShow:true
          })
        }
      }
    })
  },

  handleGetUserInfo(res){
    // console.log(res);
    if(res.detail.rawData){
      console.log(res.detail.rawData)
      this.getUserInfo();
    }
  },

  closed:function(){
    wx.showToast({
      title: '功能暂未开放',
    })
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

  }
})