// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      helpList:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getHelpInfo()
  },
  getHelpInfo(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/helpCenter/mobile/all',
      method:'GET',
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       that.setData({
        helpList:res.data.data
       })
     
     }
    })
  },
  goinfo(e){
    // console.log("e>>>", e);
    const id = e.currentTarget.dataset.shopid;
    wx.navigateTo({
      url:'/pages/helpinfo/helpinfo?id='+id
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