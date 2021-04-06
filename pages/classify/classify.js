// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infolist:[],
    currentindex:0,
   params:{
   pageNum : 1, 
  pageSize : 10, 
    type : "公共资源"
   }
  },
  gofenyezileixin(e){
      // console.log(e)
      let name=e.currentTarget.dataset.item.name
      let id=e.currentTarget.dataset.item.id
      wx.navigateTo({
        url: "/pages/fenyezileixin/fenyezileixin?id="+id+'&type='+name,
        
      })
  },
  setindex0(){
    this.setData({
      currentindex:0,
      params:{
        pageNum : 1, 
        pageSize : 10, 
          type : "公共资源"
      }
    })
  },
  setindex1(){
    this.setData({
      currentindex:1,
      params:{
        pageNum : 1, 
        pageSize : 10, 
          type : "政务热线"
      }
    })
  },
  watch:{
    'params':function(newvalue){
      // console.log(newvalue)
      this.getClassifyInfo()
    }
  },
  setindex2(){
    this.setData({
      currentindex:2,
      params:{
        pageNum : 1, 
        pageSize : 10, 
          type : "便民服务"
      }
    })
  },
  getClassifyInfo(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/type/mobile/all',
      method:'POST',
      data:that.data.params,
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       that.setData({
        infolist:res.data.data.list
       })
     
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getClassifyInfo()
    getApp().setWatcher(this)
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