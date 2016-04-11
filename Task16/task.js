/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	function trim(str){
		return str.replace(/^\s+|\s+$/gm,"");
	}
	var city = trim(document.getElementById('aqi-city-input').value);
	var value = trim(document.getElementById('aqi-value-input').value);
	if(!city.match(/^[A-Za-z\u4e00-\u9fa5]+$/g)){
		alert("城市名字必须为中英文字符！");
		return;
	}
	if(!value.match(/^\d+$/g)){
		alert("空气质量指数必须为整数");
		return;
	}
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var con = '';
	for(var cities in aqiData){
		con += '<tr><td>'+cities+'</td><td>'+aqiData[cities]+'</td><td><button>删除</button></td>';
	}
	if(con.length){
		con = '<tr><td>城市</td><td>空气质量</td><td>操作</td>'+con;
	}
	var table = document.getElementById('aqi-table');
	table.innerHTML = con;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var btn = event.target;
  var city = btn.parentNode.parentNode.getElementsByTagName('td')[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById('add-btn').addEventListener("click", addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById('aqi-table');
  table.addEventListener("click",function(event){
    if(event.target.nodeName.toLowerCase()=="button"){
    	delBtnHandle.call(null,event);
    }
  })

}

init();