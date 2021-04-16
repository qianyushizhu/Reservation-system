// pages/part1/part1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // content:'查看更多',
    // isshow:false,
    part1Info:{},
    tablelist:[],
    tablelist2:[],
    params:{
      type:''
    }
  },
  replaceInfo(e){
    var that=this
    let index=e.currentTarget.dataset.index
    // console.log(e)
      // let item=document.querySelector('#item1')
      // item.innerHTML=content
      let table=that.data.tablelist
      // for(let i=0;i<table.length;i++){
      //     console.log(table[i])
      //     // table[i].ishow=false
      // }
     
     var s = 'tablelist[' + index + '].isshow'
      that.setData({
        // content:that.data.tablelist[index].content
        [s]:true
      })
  },
  gopart2(){
    let id=this.data.params.type
    wx.navigateTo({
      url: "/pages/part2/part2?id="+id,
    })
  },
  uplodefiletable(e){
      console.log(e)
      let path=e.currentTarget.dataset.index.filePath
      var that=this
      wx.downloadFile({
        url: path,
        success(res){
          console.log(res)
          if (res.statusCode === 200) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
           wx.showToast({
             title: '保存成功，请在手机上查看',
           })
              
            
          }
        }
      })
  },
  getpart1info(){
    var that=this
    console.log('233')
    console.log(that.data.params.type)
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/basicInfo/mobile/first/info',
      method:'POST',
      data:{
        type:that.data.params.type
      },
      // 2021-03-02/1614669439718900 2021-03-02/1614669439718900 2021-03-02/1614669477740164
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       that.setData({
        part1Info:res.data.data.basicInfo,
        tablelist:res.data.data.handleMaterial,
        tablelist2:res.data.data.handleProcedure
       })
     
     }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    
    
    this.setData({
     params:{
      type:options.id
     }
    
    })
    this.getpart1info()
    
    console.log(this.data.params.type)
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