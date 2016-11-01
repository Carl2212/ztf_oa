/**
 * 微信文件处理(未完成)
 * 郭靖
 */
var common;
if (!common)
	common = {},common.wx={},
	common.wx.file = {};
document.write('<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js?'+Math.random()+'"><\/script>');

common.wx.file={
		wx.chooseImage({
		    count: 1, // 默认9
		    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
		    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
		    success: function (res) {
		        localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
		        $("#img").attr("src", localId); //localIds是数组, 只取第一个
		    }
		}),
		upload:function(){
			//文件上传
		},addPict:function(){
			
		}
}