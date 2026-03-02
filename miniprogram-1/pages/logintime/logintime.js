
// 引入封装的请求拦截器
const request = require('../../utils/request.js');
// 获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
  },
  
  // 处理输入变化
  onInputChange: function (e) {
    const inputStr = e.detail.value;
    const inputNum = inputStr === '' ? '' : Number(inputStr);
    
    this.setData({
      inputValue: inputNum
    });

    if (inputStr.length === 8 && !isNaN(inputNum)) {
      console.log('8位数字输入完成:', inputNum);
    } else if (inputStr.length === 8) {
      console.log('输入包含非数字字符');
    }
  },

  // 使用输入的数字值
  goTimeChoose: function () {
    const { inputValue } = this.data;

    if (inputValue === '') {
      wx.showToast({ title: '请输入数字', icon: 'none', duration: 2000 });
      return;
    }

    if (isNaN(inputValue)) {
      wx.showToast({ title: '输入不是有效的数字', icon: 'none', duration: 2000 });
      return;
    }

    // 发送登录请求
    request({
      url: '/user/login',
      method: 'POST',
      data: {
        password: inputValue.toString()
      },
      success: (res) => {
        console.log('登录请求成功', res);
        
        // 假设state=0为登录成功状态（根据实际后端定义调整）
        if (res.state === 0) {
          // 将返回数据存入全局变量
          app.globalData.userInfo = res.data; // 存储后端返回的data字段
          app.globalData.loginState = true;   // 记录登录状态
          
          console.log('已将用户数据存入全局变量:', app.globalData.userInfo);
          
          // 跳转到时间选择页面
          wx.navigateTo({
            url: '/pages/timechoose/timechoose'
          });
        }
      },
      fail: (err) => {
        console.error('登录请求失败', err);
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none', duration: 2000 });
      }
    });
  },



  addTimeChoose:function(){
    request({
      url:'/user/add',
      method:'POST',
      success:(res)=>{
        console.log('登录请求成功', res);
        // 假设state=0为登录成功状态（根据实际后端定义调整）
        if (res.state === 0) {
          // 将返回数据存入全局变量
          app.globalData.userInfo = res.data; // 存储后端返回的data字段
          app.globalData.loginState = true;   // 记录登录状态
          
          console.log('已将用户数据存入全局变量:', app.globalData.userInfo);
          
          // 跳转到时间选择页面
          wx.navigateTo({
            url: '/pages/timechoose/timechoose'
          });
        }
      }
    })
  },
  checkTimeChoose:function(){
    const { inputValue } = this.data;

    if (inputValue === '') {
      wx.showToast({ title: '请输入数字', icon: 'none', duration: 2000 });
      return;
    }

    if (isNaN(inputValue)) {
      wx.showToast({ title: '输入不是有效的数字', icon: 'none', duration: 2000 });
      return;
    }

    // 发送登录请求
    request({
      url: '/user/login',
      method: 'POST',
      data: {
        password: inputValue.toString()
      },
      success: (res) => {
        console.log('登录请求成功', res);
        
        // 假设state=0为登录成功状态（根据实际后端定义调整）
        if (res.state === 0) {
          // 将返回数据存入全局变量
          app.globalData.userInfo = res.data; // 存储后端返回的data字段
          app.globalData.loginState = true;   // 记录登录状态
          
          console.log('已将用户数据存入全局变量:', app.globalData.userInfo);
          
          // 跳转到时间选择页面
          wx.navigateTo({
            url: '/pages/check/check'
          });
        }
      },
      fail: (err) => {
        console.error('查询请求失败', err);
        wx.showToast({ title: '网络错误，请稍后重试', icon: 'none', duration: 2000 });
      }
    });
  },
  // 生命周期函数等其他代码保持不变
  onLoad(options) {},
  onReady() {},
  onShow() {},
  onHide() {},
  onUnload() {},
  onPullDownRefresh() {},
  onReachBottom() {},
  onShareAppMessage() {}
})
    