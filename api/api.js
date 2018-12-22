// var api = "http://127.0.0.1:8000"

// var api = "http://192.168.8.101:8001"

var api = "https://www.wabijia.com"

var reg = api + "/reg/" //注册

var wz = api + "/wz/" // 获取文字段子api

var image = api + "/images/" // 获取片

var bqb = api + "/dt_images/" // 获取表情包

var mh = api + "/mh/" //获取漫画

module.exports = {
  reg: reg,
  wz: wz,
  image: image,
  bqb: bqb,
  mh: mh
}