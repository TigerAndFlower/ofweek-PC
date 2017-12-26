/*
 * 获取url中指定参数的值
 * @param {String} name 指定参数
 * @return {String | Object}
*/
export function getQueryString (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  } else {
    return null
  }
}

/*
* 设置cookie
* @param {String} name 键
* @param {String} value 值
* @param {Number} expiredays 有效天数
*/
export function setCookie (name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + encodeURI(value) + ';path=/' +
      ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

/*
* 获取cookie
* @param {String} name 键
* @return {String} 返回查找到的值
*/
export function getCookie (name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return decodeURI(document.cookie.substring(start, end))
    }
  }
  return ''
}

/*
* 日期格式化，将 Date 转化为指定格式的 String
* @param {String} value 时间
* @param {String} format 格式 例如：'YYYY-MM-DD hh:mm:ss'
* @return {String} 格式化后的日期
*/
export function formatDate (value, format) {
  const d = new Date(value)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let hour = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  let resultStr = format || 'YYYY-MM-DD hh:mm:ss'

  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  resultStr = resultStr.replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('hh', hour)
      .replace('mm', minutes)
      .replace('ss', seconds)
  return resultStr
}
