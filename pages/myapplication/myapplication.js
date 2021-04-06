// pages/myapplication/myapplication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      applicationLIst:[]
  },
  gopart4(e){
    console.log(e)
    let id=e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: "/pages/part3/part3?id="+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getmyapplication()
  },
  getmyapplication(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/procedureStatus/user/apply',
      method:'GET',
      
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
        console.log(res)
       if(res.data.code == 0){
        that.setData({
          applicationLIst:res.data.data
         })
       }
      
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

  }
})