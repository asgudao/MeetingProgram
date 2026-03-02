// pages/timechoose/timechoose.js
// 引入封装的请求拦截器
const request = require('../../utils/request.js');
// 获取应用实例
const app = getApp();




Page({
  /**
   * 页面的初始数据
   */
  data: {
    rows: [], // 初始化rows数组
    counts: [],
    status:1,
    password:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.generateRows(); // 在页面加载时生成rows数组
    const password=app.globalData.userInfo.password;
    let counts = [];
    for (let i = 0; i < 12; i++) {
      counts[i] = [];
      for (let j = 0; j < 7; j++) {
        counts[i][j] = 0;
      }
    }
    this.setData({
      counts,
      password
    });
  },

  /**
   * 动态生成12行7列的数组
   */
  generateRows() {
    let rows = [];
    for (let i = 1; i <= 12; i++) {
      rows.push({
        section: `${i}`, // 行标题
        cells: Array.from({
          length: 7
        }, () => ({
          content: '',
          backgroundColor: 'transparent'
        })) // 每个单元格初始背景为透明
      });
    }
    this.setData({
      rows
    }); // 更新页面数据
  },
  statusChange(event) {
    const newStatus = Number(event.detail.value); // 获取新的状态值
    const status=newStatus;
    this.setData({
      status: newStatus // 更新状态
    });
  
    // 重置 rows 和 counts
    this.generateRows(); // 重新生成 rows 数组
    let counts = [];
    if(status===0){
      for (let i = 0; i < 12; i++) {
        counts[i] = [];
        for (let j = 0; j < 7; j++) {
          counts[i][j] = 1;
        }
      }
    }else if(status===1){
      for (let i = 0; i < 12; i++) {
        counts[i] = [];
        for (let j = 0; j < 7; j++) {
          counts[i][j] = 0;
        }
      }
    }
    this.setData({
      status,
      counts // 更新 counts 数组
    });
  },
  /**
   * 点击单元格的事件处理函数
   */
  handleTap(event) {
    const {
      rowIndex,
      cellIndex
    } = event.currentTarget.dataset; // 获取点击的单元格的行索引和列索引
    const rows = this.data.rows;
    const counts = this.data.counts;
    const status = this.data.status;
    // 找到被点击的单元格并修改背景颜色
    const cell = rows[rowIndex].cells[cellIndex];
    if (cell.backgroundColor === 'transparent'&&status===0) {
      cell.backgroundColor = 'green'; // 点击后变绿
      counts[rowIndex][cellIndex] -= 1;
    } else if (cell.backgroundColor === 'green'&&status===0) {
      cell.backgroundColor = 'transparent'; // 再次点击变透明
      counts[rowIndex][cellIndex] += 1;
    }else if (cell.backgroundColor === 'transparent'&&status===1) {
      cell.backgroundColor = 'red'; 
      counts[rowIndex][cellIndex] += 1;
    }else if (cell.backgroundColor === 'red'&&status===1) {
      cell.backgroundColor = 'transparent'; // 再次点击变透明
      counts[rowIndex][cellIndex] -= 1;
    }

    this.setData({
      rows, // 更新数据
      counts
    });
  },

  
  GoCheck: function () {
    const meeting={
      id:app.globalData.userInfo.id,
      password:app.globalData.userInfo.password,
      counts:this.data.counts
    }
    request({
      url: '/user/update',
      data:JSON.stringify(meeting),
      method:'POST',
      header:{'Content-Type':'application/json'},
      success:res=>{
      }

    })
    console.log(JSON.stringify(meeting));
    wx.navigateTo({
      url: '/pages/check/check'
    });
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
});