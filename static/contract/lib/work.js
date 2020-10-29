onmessage = (e) => {
	self.importScripts('./ajax.js') //请求封装
	self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.min.js')
	self.importScripts('https://www.promisejs.org/polyfills/promise-6.1.0.js')
	let name = self.name;
	
	
	function getData(){
		Promise.all([
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'https://quotes.morgan-ex.com/quotations/getDealRecord',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {
						resolve(res);
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'https://quotes.morgan-ex.com/coinInfo/getCoinInfoByName',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						virtualWalletName: name.split('/')[0]
					},
					success: function(res) {
						resolve(res);
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'https://quotes.morgan-ex.com/quotations/getBuySellData',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {
						resolve(res);
					}
				})
			}),
			new Promise(function(resolve, reject) {
				ajax({
					type: 'GET',
					url: 'https://quotes.morgan-ex.com/quotations/get24hrDataByTwoCoinName',
					contentType: 'application/x-www-form-urlencoded',
					data: {
						childCoinName: name.split('/')[0],
						motherCoinName: name.split('/')[1]
					},
					success: function(res) {
						resolve(res);
						
					}
				})
			})
		]).then((res) => {console.log(res)
			debugger
			postMessage(res);
		})

	}
		
		setInterval(() => {
			getData();
		},3000)
}
