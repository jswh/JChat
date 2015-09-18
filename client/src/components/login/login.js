require('./login.less');

module.exports = {
	template: require('./login.tpl'),
	data () {
		return {
			userName: 'jswh'
		};
	},
	methods: {
		login () {
			var xhr = new XMLHttpRequest();
			xhr.open("get", "http://127.0.0.1:8000/token.php?name=" + this.userName, true);
			xhr.onreadystatechange = function() {
				console.log(this.userName);
				if (xhr.readyState == 4) {
					var res = JSON.parse(xhr.responseText);
					var token = res.token;
					localStorage.setItem('userInfo', xhr.responseText);
					console.log(token);
					location.reload();
				}
			}.bind(this);
			xhr.send(null);
		}
	}

};
