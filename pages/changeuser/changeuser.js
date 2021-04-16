// pages/changeuser/changeuser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    yijianissuccess:false,
    
      name:null,
      phone:null,
      company:null,
      
      headImg:[]
    
     
      

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
  preview(e){
    
    var _this=this
  
    let src=e.currentTarget.dataset.src
    
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: _this.data.headImg// 需要预览的图片http链接列表
    })


  },
  findindex(arr,obj) {
    let i = arr.length;
    while (i--) {
     if (arr[i] === obj) {
      return i;
     }
    }
    return false;
  },
  deleted(e){
    var that=this
    // console.log(e.currentTarget.dataset.imgsrc)
    let currentimg=e.currentTarget.dataset.src
    let images=that.data.headImg
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          console.log('点击确定了');
          images.splice(that.findindex(images,currentimg), 1);
        } else if (res.cancel) {
          console.log('点击取消了');
          return false;
        }
        that.setData({
          headImg:images,
          yijianissuccess:false
        });
      }
    })

  },
  checkphone(){
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    let phone = this.data.phone;
    if(!reg_tel.test(phone)){ 
      wx.showToast({
        title: '手机号格式不对',
        icon:'none'
      })
    } 
  },
  changeuplodeinfo(){
    let that=this
    var reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    let phone = this.data.phone;
    if(!reg_tel.test(phone)){ 
      wx.showToast({
        title: '手机号格式不对',
        icon:'none'
      })
    } else{
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
         let list =wx.getStorageSync('userInfo2')
         console.log(list)
         list.phone = that.data.phone
         wx.setStorage({
           data: list,
           key: 'userInfo2',
         })
        //  that.getUser()
         wx.showToast({
          title: '修改成功',
        })
         wx.switchTab({
           url: "/pages/mine/mine"
         })
        //  wx.navigateTo({
        //    url: '/pages/mine/mine',
        //  })
        // wx.navigateBack({
        //   delta: 1,
        // })
         
        
       }
      })
    }
    
    
  },
 getUser(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/sysUser/personal/center',
      method:'GET',
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
      wx.setStorageSync("userInfo2",res.data.data.userInfo)
       console.log(res)
       that.setData({
          inReviewNum:res.data.data.inReviewNum,
          toBeAddedNum:res.data.data.toBeAddedNum,
          rejectNum:res.data.data.rejectNum,
          userInfo:res.data.data.userInfo,
          islogin:true
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