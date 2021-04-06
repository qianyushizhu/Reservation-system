// pages/part3/part3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    params:{
      type:''
    },
    part3list:[],
    allobj:{}
  },
  buzhengtongzhishu(){
      let path=this.data.allobj.supplementNotice
      console.log(path)
      wx.downloadFile({
        url: path,
        success: function (res) {
          console.log(res)
          var filePath = res.tempFilePath
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log(res)
              console.log('打开文档成功')
            }
          })
        }
      
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getliucheng(){
   console.log(this.data.params.type)
      var that=this
      wx.request({
        url: 'http://8.140.181.9:8816/reservation/userProcedure/user/result',
        method:'POST',
        data:that.data.params,
        header:{
         "Content-Type":"application/json",
         authorization:wx.getStorageSync('accessToken')
       },
       success(res){
        
          console.log(res)
         that.setData({
          part3list:res.data.data.userProcedures,
          allobj:res.data.data
         })
       
       }
      })
    
  },
  onLoad: function (options) {
    console.log(options)
    this.setData({
      params:{
        type:options.type
      }
      
    })
    this.getliucheng()
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