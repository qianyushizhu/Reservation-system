// pages/fenyezileixin/fenyezileixin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shujulist:[],
    type:'',
    params:{
      pageNum : 1, 
     pageSize : 10, 
       typeId : ""
      }
  },
  gopart1(e){
    console.log(e)
    let typeid=e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: "/pages/part1/part1?id="+typeid,
    })
  },
  gosousuo(){
    wx.navigateTo({
      url: "/pages/sousuo/sousuo",
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      wx.setNavigationBarTitle({
        title:options.type
      })
      this.setData({
        params:{
          pageNum : 1, 
          pageSize : 10, 
          typeId:options.id
        }
      })
      this.getClassifyzileiInfo()
  },
  getClassifyzileiInfo(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/typeChild/mobile/all',
      method:'POST',
      data:that.data.params,
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       that.setData({
        shujulist:res.data.data.list
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

  }
})