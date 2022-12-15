// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'mate',
    form: {
      userId: ''
    }
  },
  bindKeyInput: function(e) {
    this.setData({
      title: "登陆"
    })
  },
  login(event) {
    console.log("登陆：", event.detail.value)
    wx.navigateTo({
      url: `/pages/index/index?userId=${event.detail.value}`
    })
  },
  onLoad(options) {},// 生命周期函数--监听页面加载
  onReady() {},// 生命周期函数--监听页面初次渲染完成
  onShow() {},// 生命周期函数--监听页面显示
  onHide() {},// 生命周期函数--监听页面隐藏
  onUnload() {},// 生命周期函数--监听页面卸载
  onPullDownRefresh() {},// 页面相关事件处理函数--监听用户下拉动作
  onReachBottom() {},// 页面上拉触底事件的处理函数
  onShareAppMessage() {}// 用户点击右上角分享
})