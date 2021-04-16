// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      swiperInfo:[],
      serviceTypeInfo:[],
      quickService:[
        {
          img:'../../img/在线办理小程序首页2.0图标/快捷服务1.png'
        },
        {
          img:'../../img/在线办理小程序首页2.0图标/快捷服务2.png'
        }
      ],
      publicService:[],
      legalPersonService:[],
      currentindex:1,
      personalService:[]

  },
  setindex1(){
    this.setData({
      currentindex:1
    })
  },
  setindex2(){
    this.setData({
      currentindex:2
    })
  },
  setindex3(){
    this.setData({
      currentindex:3
    })
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
       let resuit=[
        {
          img:'../../img/在线办理小程序首页2.0图标/快捷服务1.png',
          name:'创新名城建设一号文'
        },
        {
          img:'../../img/在线办理小程序首页2.0图标/快捷服务2.png',
          name:'特色服务'
        }
      ]
       for(let i=0;i<res.data.data.quickService.length;i++){
        resuit[i].id=res.data.data.quickService[i].id
        resuit[i].icon=res.data.data.quickService[i].icon
       }
         console.log(resuit)
       
      that.setData({
        swiperInfo:res.data.data.notice,
        serviceTypeInfo:res.data.data.setMealService,
        quickService:resuit,
        personalService:res.data.data.personalService,
        publicService:res.data.data.publicService,
        legalPersonService:res.data.data.legalPersonService,
        
       })
      console.log(that.data.quickService)
     }
     
     
     
   
   }
  })
 },
  onLoad() {
    this.getHomeInfo()
  },
  
   
   
})
