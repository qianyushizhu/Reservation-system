// pages/yijian/yijian.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textvalue:'',
    seletList:[],
    selectItem:[],
    selectId:[],
    index:0,
    isshow:false,
    issuccess:false,
    imgPaths:[]
  },
  getyijian(){
    var that=this
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/opinionType/select',
      method:'GET',
      header:{
       "Content-Type":"application/json",
       authorization:wx.getStorageSync('accessToken')
     },
     success(res){
       
       console.log(res)
       
       that.setData({
        seletList:res.data.data
        
       })
     
        that.getId()
      
       
       
     }
    })
  },
  
  bindTextAreaBlur(e){
      // console.log(e.detail.value)
      this.setData({
        textvalue:e.detail.value
      })
      // console.log(e.detail.value)

  },
  // getphone(e){
  //   console.log(e)
  // },
  uplodeinfo(){
    let that=this
    // this.getphone()
    console.log(that.data.imgPaths)
    // wx.showLoading({
    //   title: '上传中',
    // })
    wx.request({
      url: 'http://8.140.181.9:8816/reservation/opinion',
      method:'POST',
      data:{
        content:that.data.textvalue,
        imgPaths:that.data.imgPaths,
        phone:'17751335552',
        typeId:that.data.selectId[that.data.index]
      },
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
      // wx.hideLoading({
      //   success: (res) => {
      //    console.log(res)
      //   },
      // })
      wx.showToast({
        title: '感谢您的反馈，已成功提交',
      })
 
     }
    })
  },
  uplodefire(){

  },
  upload_img(){
    var that=this
  wx.chooseImage({
    success(res){
      let tempFilePaths=res.tempFilePaths
      wx.uploadFile({
        filePath: tempFilePaths[0],
        name: 'file',
        url: 'http://8.140.181.9:8816/reservation/upload/image',
        header:{
          "Content-Type":"applciation/json",
          authorization:wx.getStorageSync('accessToken')
        },


        formData:{
          "user":"test"
        },
        success(res1){
          let data=JSON.parse(res1.data)
          console.log(data)
          console.log('success')
          that.setData({
            issuccess:true,
            imgPaths:[data.data]
          })
        }
      })
    }
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(this.data.selectItem)
    this.setData({
      index: e.detail.value,
      isshow:true
    })
    
  },
  onLoad: function (options) {
    this.getyijian()
  },
  getId(){
    let that=this
    for (let index = 0; index < that.data.seletList.length; index++) {
      that.data.selectItem.push(that.data.seletList[index].name)
      that.data.selectId.push(that.data.seletList[index].id)
      
    }
  
    that.setData({
      selectItem:that.data.selectItem
    })
    console.log(that.data.selectItem,that.data.selectId)
  },
  onReady: function () {
   
  },
})
