/**
 * 功能描述:JS时间管理
 * User: Guoj
 * Date: 13-7-20
 * Time: 下午7:39
 * To change this template use File | Settings | File Templates.
 */

/**
 * 功能描述:返回当前毫秒时间戳
 * 返回格式:1280977330748
 **/
var timestamp=function(){
    var r_timestamp = new Date().valueOf();
    return r_timestamp;
}

/**
 * 功能描述:获取当前时间
 * 返回格式:(如:2009-06-12 12:00)
 **/
var curentTime=function()
{
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分

    var clock = year + "-";

    if(month < 10)
        clock += "0";

    clock += month + "-";

    if(day < 10)
        clock += "0";

    clock += day + " ";

    if(hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return(clock);
}

/*
* 功能描述:计算出时间间隔天数
* @param:start:开始时间
* @param:endDate:结束时间
* */
var intervalDay=function(startDate,endDate){
    var date1=new Date(startDate);  //开始时间
    //alert("aa");
    var date2=new Date(endDate);    //结束时间
    var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
//计算出相差天数
    var days=Math.floor(date3/(24*3600*1000))
    return days;
}
/**
 * 时间对象的格式化;
 */
Date.prototype.format = function (format) {
    /*
     * eg:format="YYYY-MM-dd hh:mm:ss";
     */
    var  o = {
        "M+"  : this .getMonth() + 1,  // month
        "d+"  : this .getDate(),  // day
        "h+"  : this .getHours(),  // hour
        "m+"  : this .getMinutes(),  // minute
        "s+"  : this .getSeconds(),  // second
        "q+"  :Math.floor(( this .getMonth() + 3) / 3),  // quarter
        "S"  : this .getMilliseconds()
        // millisecond
    }

    if  (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this .getFullYear() +  "" )
            .substr(4 - RegExp.$1.length));
    }

    for  (  var  k  in  o) {
        if  ( new  RegExp( "("  + k +  ")" ).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00"  + o[k]).substr(( ""  + o[k]).length));
        }
    }
    return  format;
}
var getDate=function(str){
	var   d   =   new   Date(Date.parse(str.replace(/-/g,   "/")));   
	return d;
}
/*
* 功能描述:判断闰年
* */
var isLeap=function (y) {
    return ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) ? true : false;
}
var ma = [['1','3','5','7','8','10'],['4','6','9','11']];
/*
* 功能描述:实现加减f：'1'加，'0'减
* @param currentDate:当前日期
* @param f '1'加 '0'减
* */
var dateTrans=function(currentDate,f) {
    var d = currentDate.split('-');
    var l = isLeap(d[0]);
    if(f == '1') {
        if((check(d[1],ma[0]) && (d[2] == '31')) || (check(d[1],ma[1]) && (d[2] == '30')) ||
            (d[1] == '2' && d[2] == '28' && !l) || (d[1] == '2' && d[2] == '29' && l)) {
            return d[0] + '-' + (d[1] * 1 + 1) + '-' + 1;
        } else if(d[1] == '12' && d[2] == '31') {
            return (d[0] * 1 + 1) + '-' + '1-1';
        } else {
            return d[0] + '-' + d[1] + '-' + (d[2] * 1 + 1);
        }
    } else if(f == '0') {
        if(check(d[1] - 1,ma[0]) && (d[2] == '1')) {
            return d[0] + '-' + (d[1] - 1) + '-' + '31';
        } else if(check(d[1] - 1,ma[1]) && (d[2] == '1')) {
            return d[0] + '-' + (d[1] - 1) + '-' + '30';
        } else if(d[1] == '1' && d[2] == '1') {
            return (d[0] - 1) + '-' + '12-31';
        } else if(d[1] == '3' && d[2] == '1' && !l) {
            return d[0] + '-' + '2-28';
        } else if(d[1] == '3' && d[2] == '1' && l) {
            return d[0] + '-' + '2-29';
        } else {
            return d[0] + '-' + d[1] + '-' + (d[2] - 1);
        }
    } else {
        return;
    }
}
//判断数组a是否存在在元素n
function check(n,a) {
    for(var i = 0,len = a.length;i < len;i++) {
        if(a[i] == n) {
            return true;
        }
    }
    return false;
}

function getNowFormatDate()
{
    var day = new Date();
    var Year = 0;
    var Month = 0;
    var Day = 0;
    var CurrentDate = "";
//初始化时间
//Year= day.getYear();//有火狐下2008年显示108的bug
    Year= day.getFullYear();//ie火狐下都可以
    Month= day.getMonth()+1;
    Day = day.getDate();
    CurrentDate += Year + "-";
    if (Month >= 10 )
    {
        CurrentDate += Month + "-";
    }
    else
    {
        CurrentDate += "0" + Month + "-";
    }
    if (Day >= 10 )
    {
        CurrentDate += Day ;
    }
    else
    {
        CurrentDate += "0" + Day ;
    }
    return CurrentDate;
}
/*
* 功能描述:格式化为双月/双日
* */
var doubleMoundDayDate=function(tempDate){
    var dateT=tempDate.split("-")
    tempDate=dateT[0]+"-"
    if(dateT[1].length==1){
        tempDate+="0"+dateT[1]+"-";
    }else{
        tempDate+=dateT[1]+"-";
    }
    // tempDate+=dateT[1]+"-";
    if(dateT[2].length==1){
        tempDate+="0"+dateT[2];
    }else{
        tempDate+=dateT[2];
    }
    return tempDate;
}



/**
 * 计算两日期时间差
 * @param   interval 计算类型：D是按照天、H是按照小时、M是按照分钟、S是按照秒、T是按照毫秒
 * @param  date1 起始日期  格式为年月格式 为2012-06-20
 * @param  date2 结束日期
 * @return
 */
var getExecuteTime=function(interval, date1, date2)
{
    var objInterval = {'D' : 1000 * 60 * 60 * 24, 'H' : 1000 * 60 * 60, 'M' : 1000 * 60, 'S' : 1000, 'T' : 1};
    interval = interval.toUpperCase();
    var dt1 = Date.parse(date1.replace(/-/g, "/"));
    var dt2 = Date.parse(date2.replace(/-/g, "/"));
    try{
        return ((dt2 - dt1) / objInterval[interval]).toFixed(2);//保留两位小数点
    }catch (e){
        return e.message;
    }
    // alert(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
}

/*
* 转化ISO日期类型
* */
var getDateByISODate=function(str,format){
    //console.log("转化时间:"+str)
    //2013-11-29T21:55:43.04Z
    var strArray=str.split(".");
    var newStr=strArray[0].split("T");
    var thisData=newStr[0];
    var thisTime=newStr[1].split(":");
    var year=thisData[0];
    var month=thisData[1];
    var day=thisData[2];
    var h=thisTime[0];
    var m=thisTime[1];
    var s=thisTime[2];
    // var time="2013-11-29T21:49:57.537Z".replace("T"," ").replace("Z"," ")
    return NewDate(String(thisData),thisTime).format(format);
}
function NewDate(thisData,thisTime) {
    thisData = thisData.split('-');
    //alert(thisData)
    var date = new Date();
    date.setUTCFullYear(thisData[0], thisData[1] - 1, thisData[2]);
    date.setUTCHours(thisTime[0], thisTime[1], thisTime[2], 0);
    return date;
}
/**
 * 日期比较
 * 参数为字符串
 * 返回:1=开始时间大 2=开始时间小 3=两时间相等
 * */
var comptime =function (beginTime,endTime) {
    //var beginTime = "2009-09-21 00:00:00";
  //  var endTime = "2009-09-21 00:00:01";
    var beginTimes = beginTime.substring(0, 10).split('-');
    var endTimes = endTime.substring(0, 10).split('-');

    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

  //  alert(beginTime + "aaa" + endTime);
  //  alert(Date.parse(endTime));
  //  alert(Date.parse(beginTime));
    var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
    if (a < 0) {
        return 1;
    } else if (a > 0) {
       return 2;
    } else if (a == 0) {
        return 3;
    } else {
        return 'exception'
    }
}


 