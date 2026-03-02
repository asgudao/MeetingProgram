const request = require("../../utils/request");
const app = getApp();
// pages/check/check.js
Page({
  data: {
    rows: [],
    counts: [],
    meetingId: 0,
    password:'',
    threshold: 5
  },
  /* 输入框同步 */
  onThresholdInput(e) {
    const val = Number(e.detail.value) || 0;
    this.setData({ threshold: val });
    this.updateCells();    // 实时刷新颜色
  },
  onLoad(options) {
    const password = app.globalData.userInfo.password;
    const meetingId = app.globalData.userInfo.id;
    this.setData({ meetingId,password });
    this.generateRows(); // 在页面加载时生成rows数组
    this.fetchData(); // 初始加载数据
  },

  generateRows() {
    let rows = [];
    for (let i = 1; i <= 12; i++) {
      rows.push({
        section: `${i}`, // 行标题
        cells: Array.from({ length: 7 }, () => ({ content: "", backgroundColor: "" })) // 每个单元格初始值为空字符串，背景颜色为空
      });
    }
    this.setData({ rows }); // 更新页面数据
  },

  
  updateCells() {
    const { rows, counts, threshold } = this.data;
    rows.forEach((row, rIdx) => {
      row.cells.forEach((cell, cIdx) => {
        if (counts[rIdx] && counts[rIdx][cIdx] !== undefined) {
          cell.content = counts[rIdx][cIdx];
          cell.backgroundColor = cell.content <= threshold ? 'green' : 'red';
        }
      });
    });
    this.setData({ rows });
  },

  fetchData() {
    const meetingId = this.data.meetingId;
    request({
      url: `/user/detail/${meetingId}`,
      method: 'POST',
      success: res => {
        console.log(res.data);
        this.setData({ counts: res.data.counts || [] });
        this.updateCells(); // 更新单元格数据
        wx.stopPullDownRefresh(); // 停止下拉刷新动画
      },
      fail: () => {
        console.error("请求失败");
        wx.showToast({
          title: '加载失败，请重试',
          icon: 'none'
        });
        wx.stopPullDownRefresh(); // 停止下拉刷新动画
      }
    });
  },

  handleTap(event) {
    const { rowIndex, cellIndex } = event.currentTarget.dataset;
    console.log(`点击了第 ${rowIndex + 1} 行，第 ${cellIndex + 1} 列的单元格`);
  },

  /**
   * 监听用户下拉刷新操作
   */
  onPullDownRefresh() {
    console.log("下拉刷新触发");
    this.fetchData(); // 重新请求数据
  },

  onReady() { },
  onShow() { },
  onHide() { },
  onUnload() { },
  onReachBottom() { },
  onShareAppMessage() { },
});