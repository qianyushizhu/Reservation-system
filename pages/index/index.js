// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      swiperInfo:[],
      serviceTypeInfo:[]
  },
  goswiperinfo(){
    wx.navigateTo({
      url: "/pages/swiper/swiper",
    })
  },
  gofenye(e){
    console.log(e)
    let name=e.currentTarget.dataset.name
      let id=e.currentTarget.dataset.id
      wx.navigateTo({
        url: "/pages/fenyezileixin/fenyezileixin?id="+id+'&type='+name,
      })
  },
 getHomeInfo(){
   var that=this
  wx.request({
    url: 'http://8.140.181.9:8816/reservation/serviceType/mobile/home',
    method:'GET',
    
    header:{
     "Content-Type":"application/json",
     authorization:wx.getStorageSync('accessToken')
   },
   success(res){
      console.log(res)
     if(res.data.code == 0){
      that.setData({
        swiperInfo:res.data.data.notice,
        serviceTypeInfo:res.data.data.serviceType
       })
     }
     else{
       
     }
     
     
   
   }
  })
 },
  onLoad() {
    this.getHomeInfo()
  },
  
   
   
})
