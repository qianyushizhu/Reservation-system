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
    index:null,
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
  findindex(arr,obj) {
    let i = arr.length;
    while (i--) {
     if (arr[i] === obj) {
      return i;
     }
    }
    return false;
  },
  deleteImg(e){
    var that=this
    // console.log(e.currentTarget.dataset.imgsrc)
    let currentimg=e.currentTarget.dataset.src
    let images=that.data.imgPaths
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
          imgPaths:images,
          issuccess:false
        });
      }
    })

  },
  preview(e){
    var _this=this
    let src=e.currentTarget.dataset.src
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: _this.data.imgPaths// 需要预览的图片http链接列表
    })
  },
  bindTextAreaBlur(e){
      
      this.setData({
        textvalue:e.detail.value
      })
      

  },
  
  uplodeinfo(){
    let that=this
    console.log(this.data.textvalue,this.data.imgPaths.length,this.data.selectId[this.data.index])
    if(this.data.textvalue==''|| this.data.imgPaths.length==0 || this.data.selectId[this.data.index]==null){
      wx.showToast({
        title: '请补充完整',
      })
    }else{
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
        
        wx.showToast({
          title: '感谢您的反馈，已成功提交'
        })
   
       }
      })
    }
    
    
   
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
