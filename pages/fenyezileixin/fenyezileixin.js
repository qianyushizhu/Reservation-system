import{getServiceType_servers,getServiceDept_servers,getclassify_servers}from '../../utils/servers/servers'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serviceTypeItemLIst:[],
    serviceTypeItemId:[],
    serviceTypeLIst:[],
    serviceDeptItemLIst:[],
    serviceDeptItemId:[],
    serviceDeptLIst:[],
    // openlist:[
    //   '我i的基督教',
    //   '我弟纠纷解决',
    //   'ii的名称'
    // ],
 
    
    shujulist:[],
    type:'',
    params:{
      pageNum : 1, 
     pageSize : 10, 
       typeId : ""
      },
      isshow1:false,
      isshow2:false,
      isshow3:false,
      index1:null,
      index2:null,
      index3:null
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
  bindPickerChange1: function (e) {
    var _this=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.selectItem)
    this.setData({
      index1: e.detail.value,
      isshow1:true
    })
    getclassify_servers({
      "pageNum" : 1, // 页码 *
      "pageSize" : 10, // 页大小 *
      "serviceTypeId" : _this.data.serviceTypeItemId[_this.data.index1], 
      
      "typeId" : _this.data.params.typeId
    }).then(res=>{
      console.log(res)
      if(res.data.code==0){
        _this.setData({
          shujulist:res.data.data.list
        })
      }
    })
    
  },
  bindPickerChange2: function (e) {
    var _this=this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.selectItem)
    this.setData({
      index2: e.detail.value,
      isshow2:true
    })
    getclassify_servers({
      "pageNum" : 1, // 页码 *
      "pageSize" : 10, // 页大小 *
      "serviceTypeId" : _this.data.serviceTypeItemId[_this.data.index2], 
      
      "typeId" : _this.data.params.typeId
    }).then(res=>{
      console.log(res)
      if(res.data.code==0){
        _this.setData({
          shujulist:res.data.data.list
        })
      }
    })
  },
  // bindPickerChange3: function (e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   console.log(this.data.selectItem)
  //   this.setData({
  //     index3: e.detail.value,
  //     isshow3:true
  //   })
    
  // },
  onLoad: function (options) {
    var _this=this
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
      getServiceType_servers().then(res=>{
        console.log(res)
        
        if(res.data.code==0){
          let list=[]
          let item=[]
          for(let i=0;i<res.data.data.length;i++){
            list.push(res.data.data[i].name)
            item.push(res.data.data[i].id)
          }
          _this.setData({
            serviceTypeLIst:res.data.data,
            serviceTypeItemLIst:list,
            serviceTypeItemId:item
          })
        }
      })
      getServiceDept_servers().then(res=>{
        console.log(res)
        
        if(res.data.code==0){
          let list=[]
          let item=[]
          for(let i=0;i<res.data.data.length;i++){
            list.push(res.data.data[i].name)
            item.push(res.data.data[i].id)
          }
          _this.setData({
            serviceDeptLIst:res.data.data,
            serviceDeptItemLIst:list,
            serviceDeptItemId:item
          })
        }
      })
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