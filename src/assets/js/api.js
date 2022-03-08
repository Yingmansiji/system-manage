// 该文件作用：封装axios、定义项目接口

import axios from "axios";
import Qs from "qs";
import store from "@/store";
import { ElMessage, ElLoading } from "element-plus";

let loadingInstance = null;

let origin = window.location.origin; // 多环境打包--从url中获取【协议域名端口】
let baseUrl = "";

if (window.location.hostname === "localhost") {
  baseUrl = "http://127.0.0.1:5005"; // 【本地开发】 用
} else {
  baseUrl = origin; // 打包【测试/生产】 用
}

// axios请求 公共配置
axios.defaults.baseURL = baseUrl;
axios.defaults.timeout = 30 * 1000; // 超时时间设置为：30秒

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 如：配置请求头，设置token,设置loading等
    loadingInstance = ElLoading.service({
      text: "加载中...",
      background: "rgba(0,0,0,0.1)",
    });
    return config;
  },
  // 对请求错误做些什么
  (error) => {
    ElMessage.error("请求出错，请刷新重试！");
    return Promise.reject(error);
  }
);

// 响应拦截
axios.interceptors.response.use(
  // 2xx 范围内的任何状态代码都会触发此函数
  (response) => {
    // 接收到响应数据并成功后的一些共有的处理，关闭loading等
    // ......
    // 关闭loading
    loadingInstance.close();
    if (response.status === 200) {
      // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
      // 处理响应数据
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 任何 非2xx 范围的状态代码都会触发此功能
  (error) => {
    // 关闭loading
    loadingInstance.close();
    // 异常响应的处理开始
    // 具体要处理多少种状态码，需和后端沟通一致，这里仅作示例
    if (error && error.response) {
      // 根据响应码处理
      switch (
        error.response.status // 注意：error.response.status的类型是number
      ) {
        case 400:
          ElMessage.error("这是个错误请求");
          break;
        case 401:
          // 401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息
          // 401通常可以用于捕获302重定向操作，因为3xx的状态码前端捕获不到，但401可以被捕获
          // 注意这里需要后端配合，将响应的重定向状态码302重置为401，
          ElMessage.error("需要用户进行身份认证");
          // 这里捕获到重定向响应，就跳转到相应页面(如：登录页)
          // window.top.location.href = baseUrl + '/boss/a';
          break;
        case 404:
          ElMessage.error("请求的资源不存在");
          break;
        case 500:
          ElMessage.error("服务端出错");
          break;
        default:
          ElMessage.error(`连接出错${error.response.status}`);
          break;
      }
    } else {
      if (error.message.indexOf("timeout") !== -1) {
        // 超时处理
        ElMessage.error("请求超时，请重试~");
      } else {
        ElMessage.error(`未知错误：${error}`);
      }
    }
    // 抛出请求的错误信息
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * url--请求的url地址
 * params--请求时携带的参数，对象形式，如：{id:1, name:'nok'}
 */
function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**
 * 封装post方法
 * url--请求的url地址
 * params--请求时携带的参数
 */
function post(url, params, header) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { headers: header })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

/**示例
 * */
// get
export function a() {
  return get(``);
}

// get params
export function b(params) {
  return get(``, params);
}

// post json
export function c(params) {
  return post(``, params, { "Content-Type": "application/json" });
}

// post formData
export function d(params) {
  return post(``, params, { "Content-Type": "multipart/form-data" });
}

/***
 * 公共接口
 *
 * */

// 验证登录
export function isLogin() {
  return get(``);
}

// 获取城市信息
export function getCity() {
  return get(``);
}

export function getMenu() {
  return post(`/menu`,{resourceId:0,type:"menu"},{ "Content-Type": "application/json", token: store.state["ETH-TOKEN"] })
  /*return post(
    `/bg/adm/resource/current/have_list`,
    {
      resourceId: 0,
      type: "menu",
    },
    { "Content-Type": "application/json", token: store.state["ETH-TOKEN"] }
  );*/
}

export function login(params) {
  return post(`/login`, params, {
    "Content-Type": "application/json","lllllll":"ooo"
  });
}
