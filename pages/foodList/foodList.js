var util=require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res_id:0,
    totalPrice:0,
    food_list:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      res_id:options.resId,
      res_name:options.resName,
      res_photo:options.resPhoto
    })
    wx.request({
      url: 'http://localhost:8080/foodList',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{resId:options.resId},
      success:(res)=>{
        for(let i=0;i<res.data.length;i++){
          res.data[i].number=0
        }
        this.setData({
          food_list:res.data
        })
      }
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

  },

  bindMinus: function(e){  
      const index = e.currentTarget.dataset.index;
      let food_list = this.data.food_list;
      let number = food_list[index].number;
      if(number < 1){
        return false;
      }
      number = number - 1;
      food_list[index].number = number;
      this.setData({
        food_list: food_list
      });
      this.getTotalPrice();
  },

  bindAppend: function(e) {
    const index = e.currentTarget.dataset.index;
    let food_list = this.data.food_list;
    let number = food_list[index].number;
    number = number + 1;
    console.log(typeof food_list[0])
    food_list[index].number = number;
    this.setData({
      food_list: food_list
    });
    this.getTotalPrice();
},

getTotalPrice() {
  let food_list = this.data.food_list;
  let total = 0;
  for(let i = 0; i<food_list.length; i++) {
          total += food_list[i].number *food_list[i].foodPrice;
  }
  this.setData({
    food_list: food_list,
    totalPrice: total.toFixed(2)
  });
},

payment(options){
  console.log(this.data.food_list)
  wx.request({
    url: 'http://localhost:8080/payment',
    method:'POST',
    header:{
      'content-type':'application/x-www-form-urlencoded'
    },
    data:{
      res_id:this.data.res_id,
      openid:wx.getStorageSync('openid'),
      order_state:0,
      order_time:util.formatTime(new Date()),
      total_price:this.data.totalPrice,
      food_list:JSON.stringify(this.data.food_list)
    },
    success:(res)=>{
      console.log(res.data)
      if(res.data.data==500){
        wx.showToast({
          title: res.data.msg,
        })
      }else{
        wx.showToast({
          title: res.data.msg,
        })
        // wx.navigateBack({
        //   delta: 1
        //  })
      }
    }
  })
}
})