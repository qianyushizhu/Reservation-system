// pages/part2/part2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // isshangchuan:false,
    part2idlist:[],
    part2tablelist:[],
    params:{
      type:''
    },
    imgPaths:[],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getpart2info(){
    var that=this
    // console.log('233')
    // console.log(that.data.params.type)
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/basicInfo/mobile/first/info',
      method:'POST',
      data:{
        type:that.data.params.type
      },
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       that.setData({
        part2idlist:res.data.data.handleMaterial.id,
        part2tablelist:res.data.data.handleMaterial
        
       })
     
     }
    })
  },
  shangchuanpicture(e){
    let index=e.currentTarget.dataset.index
    console.log(e)
      var that=this
    wx.chooseImage({
      success(res){
        let tempFilePaths=res.tempFilePaths
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'file',
          url: 'http://8.140.181.9:8816/reservation/upload/file',
          header:{
            "Content-Type":"application/json",
            authorization:wx.getStorageSync('accessToken')
          },
          formData:{
            "user":"test"
          },
          success(res1){
            let data=JSON.parse(res1.data)
            console.log(data)
            console.log('success')
            console.log(index)
            let imgPaths=that.data.imgPaths
            imgPaths.push(data.data)
            var s = 'part2tablelist[' + index + '].isshangchuan'
            that.setData({
              [s]:true,
              imgPaths:imgPaths
            })
            console.log(that.data.imgPaths)
            // for(let i=0;i<that.data.part2tablelist.length;i++){
            //   console.log(that.data.part2tablelist[i])
            // }
          }
        })
      }
      })
   
  },
  userprocedure(){
    let ids=[]
    for(let i=0;i<this.data.part2tablelist.length;i++){
      this.data.part2tablelist[i]
      ids.push(this.data.part2tablelist[i].id)
    }
    console.log(ids)
    var that=this
    // console.log('233')
    // console.log(that.data.params.type)
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/userProcedure',
      method:'POST',
      data:{
        materialIds:ids,
        materialPaths:that.data.imgPaths,
        type:that.data.params.type
      },
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
      if(res.data.code!==0){
        wx.showToast({
          title: '提交失败',
        })
      }
     
     }
    })
  },
  gopart3(){
    if(this.data.imgPaths.length!==this.data.part2tablelist.length){
      wx.showToast({
        title: '请补充完整',
      })
    }else{
      this.userprocedure()
      wx.showModal({
        title: '上传成功',
        content: '请耐心等待，我们会加速处理！',
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      })
      
    
    }
  
      // console.log(this.data.imgPaths)
  },
  onLoad: function (options) {
      this.setData({
        params:{
          type:options.id
        }
      })
      this.getpart2info()
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