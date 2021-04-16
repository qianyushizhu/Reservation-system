// pages/mine/mine.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    rejectNum: '1',// 被驳回
    userInfo: {
        phone: "18874902961",
        headImg: "https://gejia-test.oss-cn-hangzhou.aliyuncs.com/gejia-test/2021-02-28/16145014813008721.jpg",
        company: "革佳",
        name: "晏福祥"
    },
    phone: '',
    headImg:'',
    name: '',
    company: '',
      
    toBeAddedNum: 1,// 待补充
    inReviewNum: 0 // 审核中
},
  
    //  console.log(e)
    //  const {userInfo} =e.detail
    //  wx.setStorageSync("userInfo",userInfo)
    getUserProfile(e) {
      var that=this
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          that.goLogin()
          this.setData({
            // userInfo: res.userInfo,
            
          })
        }
      })
    
  },
  goYiJian(){
    wx.navigateTo({
      url:"/pages/yijian/yijian"
    })
  },
  goHeip(){
    wx.navigateTo({
      url:"/pages/help/help"
    })
  },
  gochangeuser(){
    wx.navigateTo({
      url:"/pages/changeuser/changeuser"
    })
  },
  goapplication(){
    wx.navigateTo({
      url:"/pages/myapplication/myapplication"
    })
  },
  onLoad: function (options) {
     
      
   
  },
  onShow(){
    let phone1= wx.getStorageSync('userInfo2').phone
    console.log(phone1)
    let headImg1= wx.getStorageSync('userInfo2').headImg
    let name1= wx.getStorageSync('userInfo2').name
    let company1= wx.getStorageSync('userInfo2').company
    console.log('233')
  this.setData({
    phone: phone1,
  headImg: headImg1,
  name: name1,
  company: company1
  })
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
  goAboutUs(){
    // console.log(1)
    wx.navigateTo({
      url:"/pages/aboutus/aboutus"
    })
  },
    goLogin(){
    var that=this
    wx.login({
          success (res) {
            // console.log(res.code)
            if (res.code) {
              // console.log(res.code)
              //发起网络请求
              wx.request({
                          url: 'http://8.140.181.9:8816/reservation/sysUser/wxLogin',
                          data: res.code,
                          method:"post",
                          header:{
                            "Content-Type":"application/json"
                          },
                          
                          success(res){
                            if(res.data.code==0){
                              wx.setStorageSync('accessToken', res.data.data.accessToken)
                              wx.setStorageSync('openid', res.data.data.openid)
                              wx.setStorageSync('refreshToken', res.data.data.refreshToken)
                              wx.setStorageSync('sessionKey', res.data.data.sessionKey)
                              that.getUser()
                            }
                          }
                        })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
  }
})