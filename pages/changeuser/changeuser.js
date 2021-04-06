// pages/changeuser/changeuser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yijianissuccess:false,
    
      name:null,
      phone:null,
      company:null
      
      // headImg:[]
    
     
      

  },
  getinfo1(e){
    
    this.setData({
     
        name:e.detail.value
     
      
    })
    
  },
  getinfo2(e){
    this.setData({
      phone:e.detail.value
    })
  },
  getinfo3(e){
    this.setData({
      company:e.detail.value
    })
  },
  changeuplodeinfo(){
    let that=this
    // this.setData({
    //   params:{
    //     // headImg:wx.getStorageSync('path'),
    //   name:wx.getStorageSync('userInfo2').name,
    //   phone:wx.getStorageSync('userInfo2').phone,
    //   company:wx.getStorageSync('userInfo2').company
    //   }
    // })
    // console.log(this.data.params)
    
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/sysUser/login/user?name='+that.data.name+'&phone='+that.data.phone+'&company='+that.data.company, 
      method:'PUT',
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       console.log('success')
       console.log(res)

       wx.navigateBack({
        delta: 1,
      })
      wx.showToast({
        title: '修改成功',
      })
     }
    })
  },

  chengepload_img(){
    var that=this
    wx.chooseImage({
    success(res){
      let tempFilePaths=res.tempFilePaths
      
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        url: 'http://8.140.181.9:8816/reservation/upload/image',
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
          // let data=res1.data.data
          // let baes=data.data.readFileSync(data.data,"base64")
          // console.log(baes)
         

          // console.log(data)
          wx.setStorageSync('path', [data.data])
          console.log('success')
          that.setData({
            yijianissuccess :true,
            headImg:[data.data]
          })
        }
      })
    }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    let name1=wx.getStorageSync('userInfo2').name
    let phone1=wx.getStorageSync('userInfo2').phone
    let company1=wx.getStorageSync('userInfo2').company
    console.log(name1)
    this.setData({
      name:name1,
      phone:phone1,
      company:company1
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