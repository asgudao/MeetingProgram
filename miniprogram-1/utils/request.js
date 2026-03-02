// utils/request.js
const request = (options) => {
  // 请求参数处理
  const baseUrl = 'http://localhost:8081'; // 替换为实际的接口基础地址
  
  // 封装请求参数
  const params = {
    url: baseUrl + options.url,
    method: options.method || 'GET',
    data: options.data || {},
    header: options.header || {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // 成功回调
    success: (res) => {
      // 拦截所有后端返回的数据
      const responseData = res.data;
      
      // 当state=1时显示message弹窗
      if (responseData.state === 1 && responseData.message) {
        console.log('拦截器捕获到state=1，message内容：', responseData.message);
        // 使用微信自带弹窗，无图标，可显示较多文字
        wx.showToast({
          title: responseData.message,
          icon: 'none',       // 无图标
          duration: 3000,     // 持续3秒，可根据需要调整
          ellipsis: false     // 允许文字换行显示完整内容
        });
      }
      
      // 将处理后的数据返回给调用处
      if (options.success) {
        options.success(responseData);
      }
    },
    // 失败回调
    fail: (err) => {
      console.error('请求失败：', err);
      if (options.fail) {
        options.fail(err);
      }
    },
    // 完成回调
    complete: (res) => {
      if (options.complete) {
        options.complete(res);
      }
    }
  };
  
  // 发起请求
  wx.request(params);
};

// 导出请求方法
module.exports = request;
    