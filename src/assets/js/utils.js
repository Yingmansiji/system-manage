// 该文件作用：定义项目常用的方法

/**
 * 1. 判断数据类型
 *
 */

export function getType(par) {
  var toString = Object.prototype.toString;
  var map = {
    "[object String]": "string",
    "[object Number]": "number",
    "[object Boolean]": "boolean",
    "[object Undefined]": "undefined",
    "[object Null]": "null",

    "[object Array]": "array",
    "[object Object]": "object",
    "[object Function]": "function",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
  };
  return map[toString.call(par)];
}

/**
 * 2. 倒计时n秒
 *
 */
export function countDown(n, fn) {
  var timer = setInterval(function () {
    n--;
    console.log(n);
    fn(n);
    if (n <= 0) {
      clearInterval(timer);
    }
  }, 1000);
}

/**
 * 3. 生成时间戳
 * time： 时间字符串（例如： '2020-03-09'）
 */
export function timeStamp(time) {
  let stamp = Date.parse(new Date(time));
  console.log(stamp);
  return stamp;
}

/*
 * 4. 数值小于零，补零
 * num： 时间字符串（例如： '2020-03-09'）
 */
export function addZero(num) {
  if (0 <= parseInt(num) && parseInt(num) < 10) {
    return "0" + num;
  }
  return num;
}

/**
 * 去重
 * */
export function resetDepartArray(list) {
  let ids = [];
  let newList = list.reduce((acc, cur) => {
    ids[cur.key] ? "" : (ids[cur.key] = true && acc.push(cur));
    return acc;
  }, []);
  return newList;
}

export function setTitle(title) {
  if (window && window.document) {
    document.title = title;
  }
}

function getTheSearchParam(param, source, separation, compartment) {
  let value = "";
  separation = separation || "=";
  compartment = compartment || "&";
  if (separation === compartment) {
    return "";
  }
  for (let item of source.split(compartment)) {
    if (item.split(separation)[0] == param) {
      value = item.split(separation)[1];
    }
  }
  return value;
}

export function getCookie(name) {
  let TOKEN = "";
  if (document.cookie) {
    TOKEN = getTheSearchParam(
      name,
      document.cookie.replace(/\s*/g, ""),
      "=",
      ";"
    );

    if (TOKEN) {
      console.log(`有TOKEN: ${TOKEN}`);
      return TOKEN;
    } else {
      console.log(`无TOKEN`);
    }
  } else {
    console.log("无cookie");
  }
  return "";
}

export function setCookie(name, value, expired) {
  if (isClient()) {
    expired = new Date(expired);
    document.cookie = `${name}=${escape(value)};domain=${
      document.domain
    };expires=${expired}`;
  }
}

export function isClient() {
  if (window && window.document) {
    return true;
  }
  return false;
}
