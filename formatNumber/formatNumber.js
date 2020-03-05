// 银行卡号格式化
function formatBankCard(input,hidden = true){
	if(input === undefined || input.length < 0){
		return ;
	}
	if(hidden){
		return input.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "**** ");
	}else{
		return input.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
	}
}

// 格式化手机号
function formatTelNum(input,hidden = true){
	if(input === undefined || input.length < 0 ){
		return ;
	}
	if(hidden){
		return input.slice(0,3) + " **** " +input.slice(7);
	}else{
		return input.slice(0,3) + " " + input.slice(3,7) + " " + input.slice(7);
	}
}

//金额转成中文
function convertCurrency(money) {
	//汉字的数字
	var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
	//基本单位
	var cnIntRadice = new Array('', '拾', '佰', '仟');
	//对应整数部分扩展单位
	var cnIntUnits = new Array('', '万', '亿', '兆');
	//对应小数部分单位
	var cnDecUnits = new Array('角', '分', '毫', '厘');
	//整数金额时后面跟的字符
	var cnInteger = '整';
	//整型完以后的单位
	var cnIntLast = '元';
	//最大处理的数字
	var maxNum = 999999999999999.9999;
	//金额整数部分
	var integerNum;
	//金额小数部分
	var decimalNum;
	//输出的中文金额字符串
	var chineseStr = '';
	//分离金额后用的数组，预定义
	var parts;
	if (money == '') {
		return '';
	}
	money = parseFloat(money);
	if (money >= maxNum) {
		//超出最大处理数字
		return '';
	}
	if (money == 0) {
		chineseStr = cnNums[0] + cnIntLast + cnInteger;
		return chineseStr;
	}
	//转换为字符串
	money = money.toString();
	if (money.indexOf('.') == -1) {
		integerNum = money;
		decimalNum = '';
	} else {
		parts = money.split('.');
		integerNum = parts[0];
		decimalNum = parts[1].substr(0, 4);
	}
	//获取整型部分转换
	if (parseInt(integerNum, 10) > 0) {
		var zeroCount = 0;
		var IntLen = integerNum.length;
		for (var i = 0; i < IntLen; i++) {
			var n = integerNum.substr(i, 1);
			var p = IntLen - i - 1;
			var q = p / 4;
			var m = p % 4;
			if (n == '0') {
				zeroCount++;
			} else {
				if (zeroCount > 0) {
					chineseStr += cnNums[0];
				}
				//归零
				zeroCount = 0;
				chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
			}
			if (m == 0 && zeroCount < 4) {
				chineseStr += cnIntUnits[q];
			}
		}
		chineseStr += cnIntLast;
	}
	//小数部分
	if (decimalNum != '') {
		var decLen = decimalNum.length;
		for (var i = 0; i < decLen; i++) {
			var n = decimalNum.substr(i, 1);
			if (n != '0') {
				chineseStr += cnNums[Number(n)] + cnDecUnits[i];
			}
		}
	}
	if (chineseStr == '') {
		chineseStr += cnNums[0] + cnIntLast + cnInteger;
	} else if (decimalNum == '') {
		chineseStr += cnInteger;
	}
	return chineseStr;
}

//时间格式化
function formatTime(input){
	let y = input.getFullYear().toString().padStart(4,0);
	let M = (input.getMonth() + 1).toString().padStart(2,0)
	let d = input.getDate().toString().padStart(2,0);
	let h = input.getHours().toString().padStart(2,0);
	let m = input.getMinutes().toString().padStart(2,0);
	let s = input.getSeconds().toString().padStart(2,0);
	return `${y}-${M}-${d} ${h}:${m}:${s}`

}

//金额三位一逗号
function formatCurrencyTenThou(num) {
	if(!Number(num)){
		return ;
	}
    let curStr = num.toString().split(".");
    let part = '',part2 = '';
    let res = curStr[0].split("").reverse();
    for(let i = 0 ;i< res.length;i++){
    	if(i !== 0 && i % 3 === 0){
    		part += ','
    	}
    	part += res[i];
    }
    if(curStr[1]){
    	return part.split("").reverse().join("") + "." + curStr[1].slice(0,2).padEnd(2,"0");
    }else{
    	return part.split("").reverse().join("");
    }
    
}


module.exports = {
	formatBankCard,
	formatTelNum,
	convertCurrency,
	formatTime,
}
