// 银行卡号格式化
function formatBankCard(input,hidden = true){
	if(input.length < 0){
		return ;
	}
	if(hidden){
		return input.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "**** ");
	}else{
		return input.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 ");
	}
}

module.exports = {
	formatBankCard,
}

// let i = "6222234567897654";
// let r = formatBankCard(i);
// console.log(r);