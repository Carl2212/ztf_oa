var common = common || {};
common['loginPage'] = "index.html";
// property name + 'Html'
common['jsonToHtml'] = function(json, labelId, childNode) {
	for (var prop in json) {
		var jqObject = $('#' + labelId).find(childNode + '[id="' + prop
				+ 'Html"]');
		if (jqObject.size() == 1) {

			if (jqObject.attr('dateFormat')) {

				var dateFormat = jqObject.attr('dateFormat');
				// alert(dateFormat);
				/*
				 * var creationDate = { "date" : 17, "day" : 5, "hours" : 0,
				 * "minutes" : 0, "month" : 1, "nanos" : 0, "seconds" : 0,
				 * "time" : 1329408000000, "timezoneOffset" : -480, "year" : 112 };
				 */
				if (dateFormat == 'dd/mm/yyyy') {
					if (null == json[prop]) {
						jqObject.html('--');
					} else {
						var dd = json[prop]['date'];
						var mm = json[prop]['month'] - (-1);
						var yy = json[prop]['year'] - (-1900);
						dd = dd < 10 ? '0' + dd : dd;
						mm = mm < 10 ? '0' + mm : mm;
						// alert(dd+'/'+mm+'/'+yy);
						jqObject.html(dd + '/' + mm + '/' + yy);
					}
				} else if (dateFormat = 'dd/mm/yyyy hh:mi:ss') {
					if (null == json[prop]) {
						jqObject.html('--');
					} else {
						var dd = json[prop]['date'];
						var mm = json[prop]['month'] - (-1);
						var yy = json[prop]['year'] - (-1900);
						var hh = json[prop]['hours'];
						var mi = json[prop]['minutes'];
						var ss = json[prop]['seconds'];
						dd = dd < 10 ? '0' + dd : dd;
						mm = mm < 10 ? '0' + mm : mm;
						hh = hh < 10 ? '0' + hh : hh;
						mi = mi < 10 ? '0' + mi : mi;
						ss = ss < 10 ? '0' + ss : ss;
						jqObject.html(dd + '/' + mm + '/' + yy + ' ' + hh + ':'
								+ mi + ':' + ss);
					}

				} else {
					jqObject.html(json[prop]);
				}
			} else if (jqObject.attr('numberFormat')) {
				var numberFormat = jqObject.attr('numberFormat');
				if (numberFormat == "#0.00") {
					if (null == json[prop]) {
						jqObject.html('0.00');
					} else {
						jqObject.html(common.formatNumber(json[prop],
								"###,###,###,##0.00"));
					}
				}
				if (numberFormat == "$#0.00") {
					if (null == json[prop]) {
						jqObject.html('$0.00');
					} else {
						jqObject.html('$' + common.formatNumber(json[prop],
								"###,###,###,##0.00"));
					}
				}
			} else {
				jqObject.html(json[prop]);
			}
		}
	}
};

common['formatDate'] = function(jsonDate) {
	if (null == jsonDate) {
		return '--';
	}
	var dd = jsonDate['date'];
	var mm = jsonDate['month'] - (-1);
	var yy = jsonDate['year'] - (-1900);
	dd = dd < 10 ? '0' + dd : dd;
	mm = mm < 10 ? '0' + mm : mm;
	return dd + '/' + mm + '/' + yy;
};

common['formatTime'] = function(jsonDate) {
	if (null == jsonDate) {
		return '--';
	}
	var dd = jsonDate['date'];
	var mm = jsonDate['month'] - (-1);
	var yy = jsonDate['year'] - (-1900);
	dd = dd < 10 ? '0' + dd : dd;
	mm = mm < 10 ? '0' + mm : mm;
	var hh = jsonDate['hours'];
	var mi = jsonDate['minutes'];
	var ss = jsonDate['seconds'];
	hh = hh < 10 ? '0' + hh : hh;
	mi = mi < 10 ? '0' + mi : mi;
	ss = ss < 10 ? '0' + ss : ss;
	return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + mi + ':' + ss;
};

common['formToJsonForCommon'] = function(form, isPropname, isObject) {
	var propName = (isPropname?'propname':'name');
	var txt = '';
	// input text
	var jqObject = isObject ? form : $('#' + form);
	jqObject.find('input[type="text"]').each(function() {
		if ($(this).attr(propName)) {
			txt += '"' + $(this).attr(propName) + '":"'
					+ serialize($(this).val()) + '",';
		}
	});
	// 2..hidden
	jqObject.find('input[type="hidden"]').each(function() {
		if ($(this).attr(propName)) {
			txt += '"' + $(this).attr(propName) + '":"'
					+ serialize($(this).val()) + '",';
		}
	});
	// 3..password
	jqObject.find('input[type="password"]').each(function() {
		if ($(this).attr(propName)) {
			txt += '"' + $(this).attr(propName) + '":"'
					+ serialize($(this).val()) + '",';
		}
	});

	// checkbox
	var chknames = '';
	jqObject.find('input[type="checkbox"]')
			.each(function() {
				var thiz = $(this);
				if (thiz.attr(propName)) {
					if (thiz.attr('checked')) {
						if (chknames.toUpperCase().indexOf(thiz.attr(propName)
								.toUpperCase()) >= 0) {
							var reg = new RegExp('"' + thiz.attr(propName) + '":'
									+ '"(.+?)",', 'i');
							txt = txt.replace(reg, '"' + thiz.attr(propName) + '":'
									+ '"$1,' + thiz.val() + '",');
						} else {
							chknames += thiz.attr(propName) + ',';

							txt += '"' + thiz.attr(propName) + '":"' + thiz.val() + '",';
						}
					}
				}
				// alert(chknames);
		});

	// radio
	jqObject.find('input[type="radio"]').each(function() {
		var thiz = $(this);
		if (thiz.attr(propName)) {
			if (thiz.attr('checked')) {
				txt += '"' + thiz.attr(propName) + '":"'
						+ serialize(thiz.val()) + '",';
			}
		}
	});
	// textArea
	jqObject.find('textArea').each(function() {
		if ($(this).attr(propName)) {
			txt += '"' + $(this).attr(propName) + '":"'
					+ serialize($(this).val().replace(/\n/g, "<br>")) + '",';
		}
	});
	// select
	jqObject.find('select').each(function() {
		if ($(this).attr(propName)) {
			var value = '';
			value = $(this).find("option:selected").val();
			txt += '"' + $(this).attr(propName) + '":"' + serialize(value)
					+ '",';
		}
	});
	// file
	txt = txt.replace(/,$/, '');

	return txt;
};
common['formToJson'] = function(form) {
	var txt = common.formToJsonForCommon(form);
	var objTest = '{' + txt + '}';
	return objTest;
};

// new method formToJson <input propname=''/>
common['formToJsonByPropName'] = function(form) {
	var txt = common.formToJsonForCommon(form, true);
	var objTest = '{' + txt + '}';
	return objTest;
};

common['multiFormToJson'] = function(form) {
	var txt = '';
	for (var i = 0;i < form.length; i++) {
		var _formid = form[i];
		txt += common.formToJsonForCommon(_formid)+',';

	}
	var objTest = '{' + txt + '}';
	return objTest;
};
common['tableToJsonArrByTr'] = function(table) {// tbody
	var jsonArr = [];
	$("#" + table + " tbody tr").each(function() {
		var txt = '';
		txt = common.formToJsonForCommon($(this), false, true);
		var objTest = '{' + txt + '}';
		jsonArr.push(objTest);
	});

	return jsonArr;
};
common['tableToJsonArrByTrByPropName'] = function(table) {// tbody
	var jsonArr = [];
	$("#" + table + " tbody tr").each(function() {
		var txt = '';
		txt = common.formToJsonForCommon($(this), true, true);
		var objTest = '{' + txt + '}';
		jsonArr.push(objTest);
	});
	return jsonArr;
};
common['objElementToJsonByPropName'] = function(obj) {
	var txt = '';
	txt = common.formToJsonForCommon(obj, true, true);
	var objTest = '{' + txt + '}';
	return objTest;
};
common['objElementToJson'] = function(obj) {
	var txt = '';
	txt = common.formToJsonForCommon(obj, false, true);
	var objTest = '{' + txt + '}';
	return objTest;
};

function serialize(text) {
	if (null == text)
		text = '';
	text = text.replace(/(\\)/g, "\\\\");
	text = text.replace(/(")/g, "\\\"");
	text = text.replace(/(')/g, "\\\'");
	return text;
}

// JSON 2 FORM
common['jsonToForm'] = function(json, formid, isPropname) {
	var propName = (isPropname?'propname':'name');
	for (var prop in json) {
		$('*['+propName+'="' + prop + '"]', '#' + formid).each(function() {
			var thiz = $(this);
			var tag = thiz.prop('tagName');
			var type = thiz.attr('type');
			// alert(prop+'-'+tag+'-'+type+'-');
				if (tag == 'SELECT') {
					if (json[prop] instanceof Array) {
						for (var i in json[prop]) {
							thiz.find('option').each(function() {
								var cthiz = $(this);
								if (cthiz.attr('value') == json[prop][i]) {
									cthiz.attr('selected', true);
								}
							});
						}
					} else {
						thiz.find('option').each(function() {
							var cthiz = $(this);if (cthiz.attr('value') == json[prop]) {
								cthiz.attr('selected', true);
							}
						});
					}
				}
				if (tag == 'INPUT'
						&& (type == 'text' || type == 'password' || type == 'hidden')) {
					if (thiz.attr('dateFormat')) {
						var dateFormat = thiz.attr('dateFormat');
						 // var creationDate = { "date" : 17, "day" : 5, "hours" :
						 // 0, "minutes" : 0, "month" : 1, "nanos" : 0, "seconds" :
						 // 0, "time" : 1329408000000, "timezoneOffset" : -480,
						 // "year" : 112 };
						if (dateFormat == 'dd/mm/yyyy') {
							if (json[prop] == null) {
								thiz.val('');
							} else {
								var dd = json[prop]['date'];
								var mm = json[prop]['month'] - (-1);
								var yy = json[prop]['year'] - (-1900);
								dd = dd < 10 ? '0' + dd : dd;
								mm = mm < 10 ? '0' + mm : mm;
								thiz.val(dd + '/' + mm + '/' + yy);
							}
						} else if (dateFormat = 'dd/mm/yyyy hh:mi:ss') {
							if (null == json[prop]) {
								thiz.val('');
							} else {
								var dd = json[prop]['date'];
								var mm = json[prop]['month'] - (-1);
								var yy = json[prop]['year'] - (-1900);
								var hh = json[prop]['hours'];
								var mi = json[prop]['minutes'];
								var ss = json[prop]['seconds'];
								dd = dd < 10 ? '0' + dd : dd;
								mm = mm < 10 ? '0' + mm : mm;
								hh = hh < 10 ? '0' + hh : hh;
								mi = mi < 10 ? '0' + mi : mi;
								ss = ss < 10 ? '0' + ss : ss;
								thiz.val(dd + '/' + mm + '/' + yy + ' ' + hh
										+ ':' + mi + ':' + ss);
							}
						} else {
							thiz.val(json[prop]);
						}
					} else {
						thiz.val(json[prop]);
					}
				}
				if (tag == 'TEXTAREA') {
					var v = json[prop];
					if (null == v) {
						v = '';
					} else {
						v = v.replace(/<br>/g, "\n");
					}

					thiz.val(v);
				}
				if (tag == 'INPUT' && (type == 'radio' || type == 'checkbox')) {
					if (json[prop] instanceof Array) {
						for (var i in json[prop]) {
							if (thiz.val() == json[prop][i]) {
								thiz.attr('checked', true);
							}
						}
					} else {
						if (thiz.val() == json[prop]) {
							thiz.attr('checked', true);
						}
					}
				}
			});
	}
};
// new JSON 2 FORM
common['jsonToFormByPropName'] = function(json, formid) {
	common.jsonToForm(json,formid,true);
};

common['getRequest'] = function() {
	var url = location.search;
	// 获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for (var i = 0;i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
		}
	}
	return theRequest;
};

/**
 * round number Usage round(123.4567, 3); round(123.4567, 2); round(123.4567,
 * 1); round(8765.4567, 0); round(8765.4567, -1); round(8765.4567, -2)
 * 
 * @param num
 * @param decimal
 *            specify precision of round
 */
common['round'] = function(num, decimal) {
	num = Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
	return num;
};

/**
 * format number Usage formatNumber(12345.999,'#,##0.00');
 * formatNumber(12345.999,'#,##0.##'); formatNumber(123,'000000');
 * 
 * @param num
 * @param pattern
 */
common['formatNumber'] = function(num, pattern) {
	if(pattern == "###,###,##0.00" || pattern == "###,###,###,##0.00"){
		pattern = "###,###,###,###,##0.00";
	}
	var strarr = num ? num.toString().split('.') : ['0'];
	var fmtarr = pattern ? pattern.split('.') : [''];
	var retstr = '';
	// deal integer part
	var str = strarr[0];
	var fmt = fmtarr[0];
	var i = str.length - 1;
	var comma = false;
	for (var f = fmt.length - 1;f >= 0; f--) {
		switch (fmt.substr(f, 1)) {
			case '#' :
				if (i >= 0)
					retstr = str.substr(i--, 1) + retstr;
				break;
			case '0' :
				if (i >= 0)
					retstr = str.substr(i--, 1) + retstr;
				else
					retstr = '0' + retstr;
				break;
			case ',' :
				comma = true;
				retstr = ',' + retstr;
				break;
		}
	}
	if (i >= 0) {
		if (comma) {
			var l = str.length;
			for (;i >= 0; i--) {
				retstr = str.substr(i, 1) + retstr;
				if (i > 0 && ((l - i) % 3) == 0)
					retstr = ',' + retstr;
			}
		} else
			retstr = str.substr(0, i + 1) + retstr;
	}

	retstr = retstr + '.';
	// deal decimal fraction
	str = strarr.length > 1 ? strarr[1] : '';
	fmt = fmtarr.length > 1 ? fmtarr[1] : '';
	i = 0;
	for (var f = 0;f < fmt.length; f++) {
		switch (fmt.substr(f, 1)) {
			case '#' :
				if (i < str.length)
					retstr += str.substr(i++, 1);
				break;
			case '0' :
				if (i < str.length)
					retstr += str.substr(i++, 1);
				else
					retstr += '0';
				break;
		}
	}
	retstr = retstr.replace(/^,+/, '').replace(/\.$/, '');
	if (num < 0) {
		retstr = retstr.replace(/^-,/, '-');
		retstr = retstr.replace(/^-+/, '(') + ')';
	}
	return retstr;
};

// 经过formatNumber之后再返回成数字的方法//
String.prototype.replaceAll = function(str1, str2) {
	return this.replace(new RegExp(str1, "gm"), str2);// 发送时间
};
common['strFormatNumber'] = function(str, num) {
	str = str.replaceAll(",", "");
	if (str.indexOf("(") >= 0) {
		str = str.replace("(", "");
		str = str.replace(")", "");
		str = '-' + str;
	}
	return parseFloat(str).toFixed(num);
};

common['trim'] = function(str) {
	return (rtrim(ltrim(str)));
};

// delete the left space
function ltrim(str) {
	if (str.length == 0)
		return (str);
	else {
		var idx = 0;
		while (str.charAt(idx).search(/\s/) == 0)
			idx++;
		return (str.substr(idx));
	}
}

// delete the right space
function rtrim(str) {
	if (str.length == 0)
		return (str);
	else {
		var idx = str.length - 1;
		while (str.charAt(idx).search(/\s/) == 0)
			idx--;
		return (str.substring(0, idx + 1));
	}
}

common['checkDate'] = function(elementId) {
	var reg = /^\d{1,2}\/\d{1,2}\/\d{4}$/;

	var theDate = $("#" + elementId).val();
	//alert("T:"+reg.test(theDate));
	if(!reg.test(theDate)){
		$.messager.alert('Prompt Message', "Sorry! The date: "+theDate+" is invalid!", 'info', function() {
		});
		return false;
	}else{
		var da = theDate.split("/");
		var y = da[2];
		var m = da[1];
		var d = da[0];
		if (m < 1 || m > 12) {
			$.messager.alert('Prompt Message', "the month is not correct!",
					'info', function() {
					});
			return false;
		} else if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10
				|| m == 12) {
			if (d < 1 || d > 31) {
				$.messager.alert('Prompt Message', "the day is not correct!",
						'info', function() {
						});
				return false;
			}

		} else if (m == 4 || m == 6 || m == 9 || m == 11) {
			if (d < 1 || d > 30) {
				$.messager.alert('Prompt Message', "the day is not correct!",
						'info', function() {
						});
				return false;
			}
		} else {
			if ((y % 4) == 0 && (y % 100) != 0 || (y % 400) == 0) {
				if (d < 1 || d > 29) {
					$.messager.alert('Prompt Message',
							"the day is not correct!", 'info', function() {
							});
					return false;
				}
			} else {
				if (d < 1 || d > 28) {
					$.messager.alert('Prompt Message',
							"the day is not correct!", 'info', function() {
							});
					return false;
				}
			}
		}
		return true;
	}
};

common['compareDate'] = function (eltId1, eltId2) {
	if(checkCompareDate (eltId1, eltId2)==0){
		var date1 = $("#" + eltId1).val();
		var date2 = $("#" + eltId2).val();
		var errInfo = "The date("+eltId1+") : "+ date1 +" should be earlier than the date("+eltId2+") : "+date2+" !";
		$.messager.alert('Prompt', errInfo, 'info', function() {
			return false;
		});
		return false;
	}
	return true;
};

common['compareDateAndAlert'] = function (eltId1, eltId2) {
	if(checkCompareDate (eltId1, eltId2)==0){
		var date1 = $("#" + eltId1).val();
		var date2 = $("#" + eltId2).val();
		var dateName1 = $("#" + eltId1).attr("dateName");
		var dateName2 = $("#" + eltId2).attr("dateName");
		var errInfo = "The date("+dateName2+") : "+ date2 +" should be later than the date("+dateName1+") : "+date1+" !";
		$.messager.alert('Prompt', errInfo, 'info', function() {
			return false;
		});
		return false;
	}
	return true;
};

function checkCompareDate (eltId1, eltId2){
	var date1 = $("#" + eltId1).val();
	var date2 = $("#" + eltId2).val();
	if(common.trim(date1) != ''){
		if(!common.checkDate(eltId1)) return -1;
	}
	if(common.trim(date2) != ''){
		if(!common.checkDate(eltId2)) return -1;
	}
	if (common.trim(date1) == '' || common.trim(date2) == '') return true;
	//if (common.checkDate(eltId1) && common.checkDate(eltId2)) {
	else{
		var arr1 = date1.split("/");
		var arr2 = date2.split("/");
		var startDate = new Date(Number(arr1[2]), Number(arr1[1]) -1, Number(arr1[0]));
		var endDate = new Date(Number(arr2[2]), Number(arr2[1]) - 1, Number(arr2[0]));
		if (startDate > endDate) {
			return 0;
		}
		return 1;
	}
	return 0;
}

// show school Info
common['showSchoolInfo'] = function(schoolCode) {
	var url = "../../school/schoolInformationAction.do";
	var data = {
		method : "getSchoolInfo",
		schoolCode : schoolCode
	};
	var callback = function(result) {

		var locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert('Error Message',
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			//System error.
			$.messager.alert('Error Message', result['result'], 'error');
		} else if (result['state'] == 'success') {
			if (locale == 'en') {
				var divHtml = '<div id="showSchoolInfo" roller="true" style="display: none;z-index: 99;position: fixed;top: 10%;left:10%;width:60%;background-color: white;padding:20px;">'
						+ '<div class="title_page">School Detail Information</div>'
						+ '	<div style="height: 270px;overflow: auto;border: solid #87b3fc 0px; ">'
						+ '	<table id="schoolInfo" class="table_simple"  width="100%">'
						+ '		<tr>'
						+ '			<th>Code:</th>'
						+ '			<td id="schoolCodeHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>Name:</th>'
						+ '			<td id="schoolNameHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>Level:</th>'
						+ '			<td id="schoolLevelNameHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>Type:</th>'
						+ '			<td id="estateSchoolHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>District:</th>'
						+ '			<td id="districtCodeHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>Address:</th>'
						+ '			<td id="schoolAddressHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '	</table>'
						+ '<input name="close" class="button_blue" value="Close" type="button" onclick="closeDiv(\'showSchoolInfo\')"/>'
						+ '	</div>'
						+ '</div>';
				$("body").append(divHtml);
			} else {
				var divHtml = '<div id="showSchoolInfo"  roller="true" style="display: none;z-index: 99;position: fixed;top: 10%;left:10%;width:60%;background-color: white;padding:20px;">'
						+ '<div class="title_second">學校詳細資料</div>'
						+ '	<div style="height: 270px;overflow: auto;border: solid #87b3fc 0px; ">'
						+ '	<table id="schoolInfo" class="table_simple"  width="100%">'
						+ '		<tr>'
						+ '			<th>學校編號:</th>'
						+ '			<td id="schoolCodeHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>學校名稱:</th>'
						+ '			<td id="schoolNameHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>學校類別:</th>'
						+ '			<td id="schoolLevelNameHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>資助類別:</th>'
						+ '			<td id="estateSchoolHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>地區:</th>'
						+ '			<td id="districtCodeHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '		<tr>'
						+ '			<th>地址:</th>'
						+ '			<td id="schoolAddressHtmlbyDiv"></td>'
						+ '		</tr>'
						+ '	</table>'
						+ ' <input name="close" class="button_blue" value="關閉" type="button" onclick="closeDiv(\'showSchoolInfo\')"/>'
						+ ' </div>'
						+ '</div>';
				$("body").append(divHtml);
			}
			var data = result['result']['school'];
			if (null == data) {
				return;
			}
			var _school = data[0];
			var _schoolLevel = data[1];
			var _districtCode = data[2];
			var _schoolAddressList = data[3];
			if(locale == 'en'){
				if (_school['estateSchool'] == "Y") {
					_school['estateSchool'] = "Estate";
				} else {
					_school['estateSchool'] = "Non-Estate";
				}
			} else {
				if (_school['estateSchool'] == "Y") {
					_school['estateSchool'] = "屋村學校";
				} else {
					_school['estateSchool'] = "非屋村學校";
				}
			}
			/*
			 * var schoolAddress = _school['locationRoom'] + " " +
			 * _school['locationFloor'] + " " + _school['locationBlock'] + " " +
			 * _school['locationBuilding'] + " " + _school['locationEstate'] + " " +
			 * _school['locationStreet'] + " " + _school['locationDistrict'] + " " +
			 * _school['locationArea'];
			 */
			var schoolAddress = "";
			for (var int = 0;int < _schoolAddressList.length; int++) {
				var element = _schoolAddressList[int];
				if (schoolAddress != "") {
					schoolAddress += "<br/>";
				}
				if (locale == 'en') {
					schoolAddress += "<b>Address "
							+ element.seq
							+ "</b><br/>"
							+ element.address
							+ " <img src='" + _$smartStaticPath +"/img/search.png' style='cursor: pointer;' width='20px' height='20px' onclick = 'showPopupStaticMap(\""
							+ element.mapUrl + "\",\"en\")'>";
					
				} else {
					schoolAddress += "<b>地址 "
							+ element.seq
							+ "</b><br/>"
							+ element.caddress
							+ " <img src='" + _$smartStaticPath +"/img/search.png' style='cursor: pointer;' width='20px' height='20px' onclick = 'showPopupStaticMap(\""
							+ element.mapUrl + "\",\"tc\")'>";
				}
			}
			if (locale == 'en') {
				$("#schoolCodeHtmlbyDiv").html(_school['schoolCode']);
				$("#schoolNameHtmlbyDiv").html(_school['schoolName']);
				$("#schoolLevelNameHtmlbyDiv").html(_schoolLevel['nameEn']);
				$("#estateSchoolHtmlbyDiv").html(_school['estateSchool']);
				$("#districtCodeHtmlbyDiv").html(_districtCode['nameEn']);
				$("#schoolAddressHtmlbyDiv").html(schoolAddress);
			} else {
				$("#schoolCodeHtmlbyDiv").html(_school['schoolCode']);
				$("#schoolNameHtmlbyDiv").html(_school['schoolCname']);
				$("#schoolLevelNameHtmlbyDiv").html(_schoolLevel['name']);
				$("#estateSchoolHtmlbyDiv").html(_school['estateSchool']);
				$("#districtCodeHtmlbyDiv").html(_districtCode['name']);
				$("#schoolAddressHtmlbyDiv").html(schoolAddress);
			}

			openDiv("showSchoolInfo");
		}
	};
	$.post(url, data, callback, 'json');
};
common['showSchoolContactInfo'] = function(schoolCode) {
	var url = "../../school/schoolInformationAction.do";
	var data = {
		method : "getSchoolInfo",
		schoolCode : schoolCode
	};
	var callback = function(result) {

		var locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert('Error Message',
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			//System error.
			$.messager.alert('Error Message', result['result'], 'error');
		} else if (result['state'] == 'success') {
			var divHtml = '<div id="showSchoolInfo" roller="true" style="display: none;z-index: 99;position: fixed;top: 25%;left:10%;width:40%;background-color: white;padding:20px;">'
					+ '	<div class="title_second">School Contact Info</div>'
					+ '	<table id="schoolInfo" class="table_simple"  width="90%">'
					+ '		<tr>'
					+ '			<th>Name:</th>'
					+ '			<td id="schoolNameHtmlbyDiv"></td>'
					+ '		</tr>'
					+ '		<tr>'
					+ '			<th>Estate/Non-Estate/DSS:</th>'
					+ '			<td id="schoolTypeHtmlbyDiv"></td>'
					+ '		</tr>'
					+ '		<tr>'
					+ '			<th>Contact Person:</th>'
					+ '			<td id="contactPersonHtmlbyDiv"></td>'
					+ '		</tr>'
					+ '		<tr>'
					+ '			<th>Tel:</th>'
					+ '			<td id="officeTelHtmlbyDiv"></td>'
					+ '		</tr>'
					+ '		<tr>'
					+ '			<th>Fax:</th>'
					+ '			<td id="officeFaxHtmlbyDiv"></td>'
					+ '		</tr>'
					+ '	</table>'
					+ '	<p>'
					+ '		&nbsp;&nbsp;<input name="close" class="button_blue" value="Close" type="button" onclick="closeDiv(\'showSchoolInfo\')"/>'
					+ '	</p>' + '</div>';
			$("body").append(divHtml);
			var data = result['result']['school'];
			if (null == data) {
				return;
			}
			var _school = data[0];

			if (_school['financialType'] == "DSS") {
				_school['estateSchool'] = "DSS";
			} else if (_school['estateSchool'] == "Y") {
				_school['estateSchool'] = "Estate";
			} else {
				_school['estateSchool'] = "Non-Estate";
			}

			$("#schoolNameHtmlbyDiv").html(_school['schoolName']);
			$("#schoolTypeHtmlbyDiv").html(_school['estateSchool']);
			$("#contactPersonHtmlbyDiv").html(_school['contactPerson']);
			$("#officeTelHtmlbyDiv").html(_school['officeTel']);
			$("#officeFaxHtmlbyDiv").html(_school['officeFax']);
			openDiv("showSchoolInfo");
		}
	};
	$.post(url, data, callback, 'json');
};
common['showRemark'] = function(taskId) {
	var url = "../workflowAction.do";
	var data = {
		method : "showRemark",
		taskId : taskId
	};
	var callback = function(result) {
		var locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert('Error Message',
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			// System error.
			$.messager.alert('Error Message', result['result'], 'error');
		} else if (result['state'] == 'success') {
			var rejectRemark = result['result']['rejectRemark'];
			if (rejectRemark != null && rejectRemark != '') {
				$.messager.show( {
					title : 'Your Application is Rejected',
					msg : 'Reject reason:' + rejectRemark,
					width : 400,
					height : 300,
					timeout : 0,
					showType : 'slide'
				});
				$('body')
						.append('<div style="position:fixed;bottom:0px;right:0px;"><input type="button" onclick="common.showRemark('
								+ taskId
								+ ')" value="Show" class="formee-button"></div>');
			}
		}
	};
	$.post(url, data, callback, 'json');
};
function closeDiv(divId) {
	$("#" + divId).hide().remove();
}

function openDiv(divId) {
	$("#" + divId).show();
}
function hideDiv(divId){
	$("#" + divId).hide();		
}	
function buildUrlWithWorkFlowParameter(url){
	var req = common.getRequest();
	var rs = '';
	var taskId='';
	if(url == null || url == ''){
		rs = '';
	}else{
		rs = url;
	}
	if(url.indexOf('?')>0){
		if(req['taskId']!=null && req['taskId']!=""){
			taskId=req['taskId'];
		}
		rs += '&taskId='+taskId;
	}else{
		rs += '?taskId='+taskId;
	}
	return rs;
	
}

//workFlowButton
function initFlowButton(jsonString,methodName){
    $.blockUI();
    var jn=JSON.stringify(jsonString);
    var request = common.getRequest();
    var taskId='';
    if(request['taskId']!=null && request['taskId']!=""){
    	taskId=request['taskId'];
	}
    var url = "../../smartWorkFlow.do";
		var data = {
				method : 'getFlowTransitions',
				jsonString : jn,
				methodName : methodName,
				taskId:taskId
	};
	var callback = function(result) {
		locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					result['result'], 'error');
		} else if (result['state'] == 'success') {
				var htmlButton = $("#div_button").html();
				var newButton ="";
				var transitions = result['transitions'];
				//alert(transitions)
				var methodName = result['methodName'];
				var _div=document.getElementById("div_button");
				for(var i=0;i<transitions.length;i++) {
					//转成json字符串格式
					//var transition_data = JSON.stringify(transitions[i]); 
//					newButton+='<input type="button" value="'+transitions[i].transitionName
//					+'" onclick='+methodName+'(\''+transitions[i].value+'\') i18nKeyBtn="confirm.html.button.confirm" class="HK_btn21" ></input>';
					var votebutton = document.createElement("input");    
				    votebutton.type = "button";  
				    votebutton.name="workflow_"+transitions[i].transitionName;
				    if(locale=='en')
				    	votebutton.value = GLOBAL_I18N_EN['_LABELS'][transitions[i].transitionName]; 
				    else
				    	votebutton.value = GLOBAL_I18N_ZH['_LABELS'][transitions[i].transitionName]; 
				    votebutton.setAttribute("class","button_blue");//formee-button
				    votebutton.setAttribute("onclick",methodName+"('"+transitions[i].value+"','"+transitions[i].isReject+"')");
				    _div.appendChild(votebutton);  
				    var en= document.createTextNode(" "); 
				    _div.appendChild(en);
				}
				//alert(newButton);
				//document.getElementById("div_button").appendChild(newButton);
				//$("#div_button").html(htmlButton+newButton);
		}
		$.unblockUI();
	};
	$.post(url, data, callback, 'json');
 }


//workFlowButton
function initFlowRadio(jsonString){
    $.blockUI();
    var jn=JSON.stringify(jsonString);
    var url = "../../smartWorkFlow.do";
		var data = {
				method : 'getFlowTransitions',
				jsonString : jn
				//methodName : methodName
	};
	var callback = function(result) {
		locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					result['result'], 'error');
		} else if (result['state'] == 'success') {
				var htmlButton = $("#div_button").html();
				var newButton ="";
				var transitions = result['transitions'];
				//alert(transitions)
				//var methodName = result['methodName'];
				var _div=document.getElementById("div_button");
				for(var i=0;i<transitions.length;i++) {
					newButton+='<input type="radio" name="flowRadio" value='+transitions[i].value
					+'>'+transitions[i].transitionName+'</input>';
					//var votebutton = document.createElement("input");    
				   // votebutton.setAttribute("type","radio");
				   // votebutton.name = transitions[i].transitionName;
				    //votebutton.value=transitions[i].value; 
				    //votebutton.innerHTML=transitions[i].transitionName; 
				   // votebutton.setAttribute("innerHTML",transitions[i].transitionName);
				   // votebutton.value = transitions[i].value; 
				    //votebutton.setAttribute("value",transitions[i].value);
				   // _div.appendChild(newButton);                            
				 
				}
				//alert(newButton);
				//document.getElementById("div_button").appendChild(newButton);
				$("#div_button").html(htmlButton+newButton);
		}
		$.unblockUI();
	};
	$.post(url, data, callback, 'json');
 }
 
 function initWorkFlowLog(sheetId){
	 getWorkflowLog(sheetId, initComment);
 }
 //workFlowLog
function getWorkflowLog(sheetId, func){
    $.blockUI();
   // var jn=JSON.stringify(jsonString);
    var url = "../../intray/workflowAction.do";
		var data = {
				method : 'getWorkflowLog',
				sheetId : sheetId
	};
	var callback = function(result) {
		locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			$.messager.alert(
					GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
					result['result'], 'error');
		} else if (result['state'] == 'success') {
				var workflowLogs = result['result']['workflowLog'];
				func(workflowLogs);
		}
		$.unblockUI();
	};
	$.post(url, data, callback, 'json');
 }
function initComment(commentList){
	/* 	toUser	
	operateTime;  //对应操作的时间
	content;  //处理意见
	userField1;  //user post */
	var commentIcon = '<div id="commentDivIconDiv" style="text-align: right;cursor: pointer;">'
		+'		<span onclick="openDiv(\'commentDiv\')">'
		+'			<img src="../../img/comment_icon.png" width="20px" height="20px" align="top"/>Comments(<label name="commentsNum">0</label>)'
		+'		</span>'
		+'	</div>';
	var titlePage='<div id="workflow_comment" style="font-size:18px;color:#417588;font-weight:bold;"></div>';
	if($(".title_page").length==0){
		$("#mainContent").prepend(titlePage);
		$("#workflow_comment").append(commentIcon);
	}else{
		$(".title_page").append(commentIcon);
	}
	var commentHtml = '<div id="commentDiv" roller="true"'
		+'style="display: none; z-index: 99; position: absolute; top: 55px; right: 10px; width: 50%;height:300px; background-color: white; padding: 5px;overflow: auto;">'
		+'<table id="commentThread" style="width: 100%;font-size:12px;font-weight: normal;" class="table_simple">'
		+'	<thead>'
		+'		<tr>'
		+'			<th>Comments(<label name="commentsNum">0</label>):</th>'
		+'		</tr>'
		+'	</thead>'
		+'	<tbody>'
		
		+'	</tbody>'
		+'	<tfoot>'
		+'		<tr>'
		+'			<td align="center"><input type="button" onclick="hideDiv(\'commentDiv\')" value="Close" class="button_blue"> </td>'
		+'		</tr>'
		+'	</tfoot>'
		+'</table>'
		+'</div>';		
	$("#commentDivIconDiv").append(commentHtml);
	if(commentList!=null){
		$("label[name=commentsNum]").html(commentList.length);
		var commentTrHtml = "";
		for(var i=0;i<commentList.length;i++){
			commentTrHtml += "<tr>"
				+ "<td>By <span style='text-decoration: underline;'>"+commentList[i].userField1+"</span>, at "+common.formatTime(commentList[i].operateTime)+"<br>"+commentList[i].content+"</td>"
				+ "</tr>";
		}		
		$("#commentThread tbody").append(commentTrHtml);
	}else{
		$("label[name=commentsNum]").html(0);
	}		
}

common['formatHMS'] = function(jsonDate) {
	if (null == jsonDate) {
		return '--';
	}
	var hh = jsonDate['hours'];
	var mi = jsonDate['minutes'];
	var ss = jsonDate['seconds'];
	hh = hh < 10 ? '0' + hh : hh;
	mi = mi < 10 ? '0' + mi : mi;
	ss = ss < 10 ? '0' + ss : ss;
	return hh + ':' + mi + ':' + ss;
};

common['textareaShow'] = function(obj) {
	return obj.replace(/<br>/g, "\n");
};
common['textearaFormat'] = function(obj) {
	return obj.replace(/\n/g, "<br>");
};

common['formToString'] = function(form) {
	var f = $('#' + form);
	var formHead = f.find("th");
	var array = new Array();
	var index = 0;
	formHead.each(function() {
		// alert($(this).attr("name"));
			array[index] = $(this).attr("name");
			index++;
		});
	var str = '[';

	// input text
	f.find('tr').each(function() {
		var array2 = new Array();
		var index2 = 0;
		$(this).find('input').each(function() {
			var str = $(this).val();
			array2[index2] = serialize(str);
			index2++;
		});
		if (array2.length != 0) {
			str += "{";
			// str += array[i] + ":" + $(this).find('input');
			var inputIndex = $(this).find('td');
			for (var i = 0;i < array.length; i++) {
				str += '"' + array[i] + '":"' + array2[i] + '"';
				inputIndex = inputIndex.next('td');
				if (i != array.length - 1)
					str += ",";
				else if (i == array.length - 1)
					str += "}";

			}
			if ($(this) != f.find('tr').last()) {
				str += ",";
			}
		}
	});
	if (str.length > 1)
		str = str.substring(0, str.length - 1);
	str += "]";
	return str;
};

common['tableToJsonArray'] = function(tableId) {
	var f = $('#' + tableId);
	var formHead = f.find("th");
	var array = new Array();
	var index = 0;
	formHead.each(function() {
		if ($(this).attr("name") != null && $(this).attr("name") != '') {
			array[index] = $(this).attr("name");
			index++;
		}
	});
	var str = '[';

	// input text
	f.find('tr').each(function() {
		var array2 = new Array();
		var index2 = 0;
		if ($(this).attr("code") != null && $(this).attr("code") != '') {
			$(this).find("input[toArray='Y']").each(function() {
				var str = $(this).attr("value");
				array2[index2] = serialize(str);
				index2++;
			});
			if (array2.length != 0) {
				str += "{";
				for (var i = 0;i < array.length; i++) {
					str += '"' + array[i] + '":"' + array2[i] + '"';
					if (i != array.length - 1)
						str += ",";
					else if (i == array.length - 1)
						str += "}";
				}
				if ($(this) != f.find('tr').last()) {
					str += ",";
				}
			}
		}
	});
	if (str.length > 1)
		str = str.substring(0, str.length - 1);
	str += "]";
	return str;
};

common['jsonArrayToForm'] = function(jsonArray, formId) {
	var allName = new Array();
	$("#" + formId).find("th").each(function() {
		allName.push($(this).attr("name"));
	});

	var allInput = $("#" + formId).find("input[toArray='Y']");
	var index = 0;
	for (var i = 0;i < jsonArray.length; i++) {
		var json = jsonArray[i];
		for (var j in allName) {
			var name = allName[j];
			var val = json[name];
			$(allInput[index]).attr("value", val);
			index++;
		}
	}
};

common['jsonArrayToFormByProp'] = function(jsonArray, formId, code) {
	var allName = new Array();
	$("#" + formId).find("th").each(function() {
		allName.push($(this).attr("name"));
	});

	var allCode = new Array();
	$("#" + formId).find("tr").each(function() {
		var itemCode = $(this).attr(code);
		if (itemCode != null && itemCode != '') {
		} else {
			allCode.push(itemCode);
		}
	});
	for (var i = 0;i < allCode.length; i++) {
		var inputs = $("tr[" + code + "='" + allCode[i] + "']")
				.find("input[toArray='Y']");
		for (var j = 0;j < jsonArray.length; j++) {
			if (allCode[i] == jsonArray[j]['itemCode']) {
				for (var k = 0;k < allName.length; k++) {
					$(inputs[k]).attr("value", jsonArray[j][allName[k]]);
				}
				allCode.pop(allCode[i]);
				jsonArray.pop(jsonArray[j]);
			}
		}
	}
};
// document
// .write('<script type="text/javascript"
// src="http://www.map.gov.hk/static/gihs_interface.js"></script>');
common['fillSchoolInfo'] = function(school, schoolAddress, schoolShareItems,
		tableName, childName) {
	if(school!=null){
		common.jsonToHtml(school, tableName, childName);
		if (Number(school.aidedPortion) < 100) {
			$("#schoolShareHtml").html("Yes");
		}else{
			$("#schoolShareHtml").html("No");
		}
		switch(school.schoolLevel){
		case "PRI" : $("#schoolLevelHtml").html("Primary"); break;
		case "SEC" : $("#schoolLevelHtml").html("Secondary"); break;
		case "SPE" : $("#schoolLevelHtml").html("Special"); break;
		}
		var schoolNameHtml = "<a href='javascript:common.showSchoolContactInfo(\""
				+ school.schoolCode + "\")'>" + school.schoolName + "</a>";
		$("#schoolNameHtml").html(schoolNameHtml);
	}
	
	if (schoolAddress != null) {
		var schoolAddressHtml = "";
		for (var int = 0;int < schoolAddress.length; int++) {
			var element = schoolAddress[int];
			if (schoolAddressHtml != "") {
				schoolAddressHtml += "<br/>";
			}
			schoolAddressHtml += "<b>Address "
					+ (int + 1)
					+ "</b><br/>"
					+ element.address
					+ " <img src='../../img/search.png' style='cursor:pointer;' width='20px' height='20px' onclick = 'showPopupStaticMap(\""
					+ element.mapUrl + "\",\"en\")'>";
		}
		$('#schoolAddressHtml').html(schoolAddressHtml);
	}

	if (schoolShareItems != null) {
		var shareItemHtml = "<b>No Applicatible</b>";
		if (schoolShareItems.length > 0) {
			shareItemHtml = "<b>Yes</b> <label>(You need to create a separate WO for any School item which consists of a different school share %))</label>"
					+ "<br/><div><ul>";
			for (var int = 0;int < schoolShareItems.length; int++) {
				var element = schoolShareItems[int];
				shareItemHtml += "<li>School Item " + element.itemNo + " - "
						+ (100-element.aidedPortion) + "%</li>";
			}
			shareItemHtml += "</ul></div>";
		}
		$('#schoolShareItemHtml').html(shareItemHtml);
	}
};

common['generateButtons'] = function(taskId, workflowName, divId) {
	if (taskId == undefined || taskId == null) {
		$.messager
				.alert(
						'Prompt Message',
						'Error! To auto generate buttons you must pass the parameter taskId!',
						'info');
		return;
	}
	var url = "../../intray/workflowAction.do";
	var data = {
		method : "getNextWfFunction",
		workflowName : workflowName,
		actionType : 'submit',
		taskId : _$taskId
	};
	var callback = function(result) {
		var locale = result['locale'] == 'ch' ? 'ch' : 'en';
		if (result['state'] == 'nologin') {
			loginWin();
		} else if (result['state'] == 'failure') {
			var i18nKey = result['result'];
			$.messager.alert('Error Message',
					(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
		} else if (result['state'] == 'error') {
			// System error.
			$.messager.alert('Error Message', result['result'], 'error');
		} else if (result['state'] == 'success') {
			var smtWfFunction = result['result']['smtWfFunction'];
			var saveAsDraftWfFunction = result['result']['saveAsDraftWfFunction'];
			var smtTask = result['result']['smtTask'];
			var forwardBtnLabel = 'Submit';
			if (smtWfFunction != null) {
				if (smtWfFunction['buttonLabel'] != null
						&& smtWfFunction['buttonLabel'] != '')
					forwardBtnLabel = smtWfFunction['buttonLabel'];
			}
			if (smtTask == null) {
				$('#' + divId).html('');
				if (saveAsDraftWfFunction != null) {
					var draftBtnLabel = 'Save As Draft';
					if (saveAsDraftWfFunction['buttonLabel'] != null
							&& saveAsDraftWfFunction['buttonLabel'] != '') {
						draftBtnLabel = saveAsDraftWfFunction['buttonLabel'];
					}
					$('#' + divId)
							.append('<input type="button" class="formee-button" value="'
									+ draftBtnLabel
									+ '" onclick="do_submit(\'draft\')" />');
				}
				$('#' + divId)
						.append(' <input type="button" class="formee-button" value="Submit" onclick="do_submit(\'submit\')" />')
						.append(' <input type="button" class="formee-button" value="Cancel" onclick="do_cancel()" />');
			} else {
				$('#' + divId).html('');
				if (smtTask['creator'] != smtTask['actor']) {
					forwardBtnLabel = 'Approve';
				}
				$('#' + divId)
						.append('<input type="button" class="formee-button" value="'
								+ forwardBtnLabel
								+ '" onclick="do_submit(\'submit\')" />');
				if (smtTask['creator'] != smtTask['actor']) {
					$('#' + divId)
							.append(' <input type="button" class="formee-button" value="Reject" onclick="do_reject(\'reject\')" />');
				}
				$('#' + divId)
						.append(' <input type="button" class="formee-button" value="Cancel" onclick="do_cancel()" />');
			}
		}
	};
	$.post(url, data, callback, 'json');
};

//图片格式 .jpg/.jpeg/.bmp/.png/.gif
//fileType like ".pdf/.xml/.jpg"...
common['check_file'] = function (elementId, fileTypes) {
	var file_name = $('#'+elementId).val();
	if (file_name == "") {
		$.messager.alert('Prompt Message',
				"Please choose a file to upload!",
				'info', function () {
					return false;
				});	
		return false;
	} else {
		var point = file_name.lastIndexOf("."); //获取字符串从右到左第一个出现.的位置
		var type = file_name.substr(point);     //截取字符串.号之后的字符
		type = type.toLowerCase();
		var fileTypeArray = fileTypes.split("/");
		for(var i=0, len=fileTypeArray.length; i<len; i++){
			var fileType = fileTypeArray[i];
			fileType = fileType.toLowerCase();
			if (type != fileType && i==len-1) {
				$.messager.alert('Prompt Message',
						"Sorry! Only support import "+fileTypes+" file!",
						'info', function () {
							return false;
						});	
				return false;
			}else if(type==fileType){
				return true;
			}
		}
	}
};

common['commCallback'] = function (result) {
	var flag = false;
	var locale = result['locale'] == 'ch' ? 'ch' : 'en';
	if (result['state'] == 'nologin') {
		loginWin();
	}else if (result['state'] == 'noright') {
		var i18nKey = result['result'];
		$.messager.alert(
				GLOBAL_I18N['_MESSAGES']['_ERROR.MESSAGE'][locale],
				i18nKey, 'error', function(){
					window.history.back();
				});
	}else if (result['state'] == 'failure') {
		var i18nKey = result['result'];
		$.messager.alert('Error Message',
				(GLOBAL_I18N['_MESSAGES'][i18nKey][locale]), 'error');
	} else if (result['state'] == 'error') {
		//System error.
		$.messager.alert('Error Message', result['result'], 'error');
	} else if (result['state'] == 'success') {
		flag = true;
	}
	return flag;
};

common['exportFile'] = function(s){
	var form = $("<form></form>");
	var url = s.url;
	form.attr('action', url);
	form.attr('method', 'post');
	var data = s.data;
	if (data) {
		for (var i in data) {
			if (data[i] instanceof Array) {
				for (var j in data[i]) {
					var elt = jQuery('<input type="hidden" name="' + i + '"/>');
					elt.val(data[i][j]);
					elt.appendTo(form);
				}
			} else {
				var elt = jQuery('<input type="hidden" name="' + i + '"/>');
				elt.val(data[i]);
				elt.appendTo(form);
			}
		}
	}
	form.appendTo("body");
	form.css('display', 'none');
	form.submit();
	setTimeout("$('#btnPrintPdf').removeAttr('disabled');", 1500);
	/*
	var form = $("<form></form>");
	form.attr('action', '../../rpt/erFullReportAction.do');
	form.attr('method', 'post');
	inputMethod = $("<input type='hidden' name='method' value='exportPdf' />");
	inputContent = $("<input type='hidden' name='htmlCode' />");
	//获取需要导出pdf的html代码
	inputContent.attr('value', $('#pdfContent').html());
	inputFileName = $("<input type='hidden' name='fileName' value='ER-Report' />");
	form.append(inputMethod);
	form.append(inputContent);
	form.append(inputFileName);
	form.appendTo("body");
	form.css('display', 'none');
	form.submit();
	setTimeout("$('#btnPrintPdf').removeAttr('disabled');", 1500);
	*/
};

common['showDistrictCodeDiv'] = function(divId, map){
	var HKHtml = "";
	var KLNHtml = "";
	var NTHtml = "";
	for(var key in map){
		if(key=="HK"){
			var listDistrict = map[key];
			HKHtml += "<input type='checkbox' value='All' id='checkAll' onclick=common.checkAllDistrictCode('"+divId+"')>All<br />"
			       + common.getRegionDistrictHtml(listDistrict);
		}else if(key=="KLN"){
			var listDistrict = map[key];
			KLNHtml += common.getRegionDistrictHtml(listDistrict);
		}else if(key=="NT"){
			var listDistrict = map[key];
			NTHtml += common.getRegionDistrictHtml(listDistrict);
		}
	}
	var districtHtml = "<div style='width:25%; float: left'>"+HKHtml+"</div>"
					 + "<div style='width:25%; float: left'>"+KLNHtml+"</div>"
					 + "<div style='width:25%; float: left'>"+NTHtml+"</div>";
	 $("#"+divId).html(districtHtml);
};

common['getRegionDistrictHtml'] = function(listDistrict){
	var html = "";
	if(listDistrict!=null && listDistrict!=""){
		for(var i=0, len=listDistrict.length; i<len; i++){
			html += "<input type='checkbox' value='"+listDistrict[i]['value']+"'>"+listDistrict[i]['nameEn']+"<br />";
		}
	}
	return html;
};

common['checkAllDistrictCode'] = function(divId){
	var val = $("#checkAll").attr("checked");
	if(val=="checked"){
		$("#"+divId).find("input[type='checkbox']").each(function(){
			$(this).attr("checked", "checked");
		});
	}else{
		$("#"+divId).find("input[type='checkbox']").each(function(){
			$(this).removeAttr("checked");
		});
	}
};

common['getCheckedDistrictCode'] = function(divId){
	var checkedDistrictCode = new Array();
	$("#"+divId).find("input[type='checkbox']:checked").each(function(){
		if($(this).val()!="All"){
			checkedDistrictCode.push($(this).val());
		}
	});
	return checkedDistrictCode;
};

common['showSchoolMrApplicationInfo'] = function(divId, school, mrApplication, listAddress){
	var addressHtml = "";
	if(listAddress!=null && listAddress.length>0){
		for(var i=1, len=listAddress.length; i<=len; i++){
			addressHtml += "<tr>"
						+ "<td colspan='2'>"+i+"."+listAddress[i-1]['address']+"</td>"
						+ "</tr>";
		}
	}
	var html = "<table class='table_simple' style='width:100%'>"
			 + "<tr>"
			 + "<th style='width:40%'>School Code:</th>"
			 + "<td style='width:60%'>"+school['schoolCode']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>School Name:</th>"
			 + "<td>"+school['schoolName']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>School Level:</th>"
			 + "<td>"+school['schoolLevel']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>District:</th>"
			 + "<td>"+school['districtName']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>Address:</th>"
			 + "<td></td>"
			 + "</tr>"
			 + addressHtml
			 + "<tr>"
			 + "<th>Name of Contact Person:</th>"
			 + "<td>"+mrApplication['schoolContactPersons']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>Tel:</th>"
			 + "<td>"+mrApplication['schoolContactTel']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>Fax:</th>"
			 + "<td>"+mrApplication['schoolContactFax']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>Email:</th>"
			 + "<td>"+mrApplication['schoolContactEmail']+"</td>"
			 + "</tr>"
			 + "<tr>"
			 + "<th>Non-aided portion involved:</th>"
			 + "<td>"+mrApplication['nonAided']+"</td>"
			 + "</tr>";
	if(school['financialType']=="Aided" && school['estateSchool']=='Y'){
		html  += "<tr>"
			  + "<th>Estate:</th>"
			  + "<td>"+mrApplication['hdEstate']+"</td>"
			  + "</tr>"
			  + "<tr>"
		 	  + "<th>HD Regin:</th>"
			  + "<td>"+mrApplication['hdRegion']+"</td>"
			  + "</tr>"
			  + "<tr>"
			  + "<th>Accessed by MS/EMM:</th>"
			  + "<td>"+mrApplication['hdAssessedBy']+"</td>"
			  + "</tr>"
			  + "<tr>"
			  + "<th>Accessment Date:</th>"
			  + "<td>"+common.formatDate(mrApplication['hdAssessmentDate'])+"</td>"
			  + "</tr>";
	}
 		html += "</table>";
 	$("#"+divId).html(html); 
};
common['showMrVettingStatus'] = function(vettingStatus){
	var status = "";
	switch (vettingStatus) {
		case 10 :
			status = "Draft";
			break;
		case 20 :
			status = "1st Screening Completed";
			break;
		case 30 :
			status = "Marked for MR Estimation";
			break;
		case 40 :
			status = "Estimation Completed";
			break;
		case 50 :
			status = "2nd Screening";
			break;
		case 60 :
			status = "Pending CSDO's Approval";
			break;
		case 70 :
			status = "Pending EO's Approval";
			break;
		case 80 :
			status = "Awaiting to Print Letter";
			break;
		case 90 :
			status = "Approve Letter Issued";
			break;
		case 100 :
			status = "Completed";
			break;
		default:
			status = "";
	}
	return status;
};

common['getSchoolLevelName'] = function(val){
	if (val == 'PRI') {
		return 'Primary';
	} else if (val == 'SEC') {
		return 'Secondary';
	}
	return 'Special';
};

common['getDistrictName'] = function(val){
	switch (val){
		case 'CW' : return 'Central & Western'; break;
		case 'HKE' : return 'Hong Kong East'; break;
		case 'I' : return 'Islands'; break;
		case 'SOU' : return 'Southern'; break;
		case 'WCH' : return 'Wan Chai'; break;
		case 'KC' : return 'Kowloon City'; break;
		case 'KT' : return 'Kwun Tong'; break;
		case 'SK' : return 'Sai Kung'; break;
		case 'SSP' : return 'Sham Shui Po'; break;
		case 'WTS' : return 'Wong Tai Sin'; break;
		case 'YTM' : return 'Yau Tsim Mong'; break;
		case 'N' : return 'North'; break;
		case 'ST' : return 'Sha Tin'; break;
		case 'TP' : return 'Tai Po'; break;
		case 'KWT' : return 'Kwai Chung & Tsing Yi'; break;
		case 'TM' : return 'Tuen Mun'; break;
		case 'TW' : return 'Tsuen Wan'; break;
		case 'YL' : return 'Yuen Long'; break;
		default : return '';
	}
};
/*
common['showWoStatus'] = function(woStatus){
	switch(woStatus){
		case 10:
			return "Draft";
			break;
		case 20:
			return "Issued";
			break;
		case 30:
			return "Cancelled";
			break;
		case 40:
			return "Completed";
			break;
		case 50:
			return "Completed without dimbook";
			break;
		case 60:
			return "Completed with dimbook";
			break;
		case 70:
			return "Draft TO";
			break;
		case 75:
			return "TO";
			break;
		case 80:
			return "Draft FO";
			break;
		case 85:
			return "FO";
			break;
		case 90:
			return "Finalized";
			break;
		case 100:
			return "Aborted";
			break;
		case 110:
			return "Rejected";
			break;
		default:
			status = "";
		
	}
};
*/