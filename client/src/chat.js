require('./chat.less');
const store = require('./lib/store');

const appkey = '25wehl3uwa6hw';

Vue.config.debug = true;
//localStorage.clear();
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
if(userInfo) {
	initRIMClient(userInfo.token);
	const chat = new Vue({
		el: '#chat',
		template: require('./chat.tpl'),
		data: {
			store: store
		},
		ready () {
			this.$on('search', (search) => {
				this.$broadcast('search', search);
			});
			this.store.setUser(userInfo.userId, userInfo.userName, userInfo.image);
			this.store.addSession(userInfo.userId, userInfo.userName, userInfo.image);
			this.store.init();
		},
		watch: {
			// 每当sessionList改变时，保存到localStorage中
			'store.sessionList': {
				handler () {
					store.save();
				},
				deep: true
			}
		},
		filters: {
			time (date) {
				if (typeof date === 'string') {
					date = new Date(date);
				}
				
				return date.getHours() + ':' + date.getMinutes();
			}
		},
		components: {
			card: require('./components/card/card'),
			list: require('./components/list/list'),
			text: require('./components/text/text'),
			message: require('./components/message/message')
		}
	});
} else {
	login();
}

function login() {
	const login = new Vue({
		el: '#chat',
		template: require('./login.tpl'),
		ready (){},
		components: {
			login: require('./components/login/login')
		}
	});
}

function initRIMClient(token){
	RongIMClient.init(appkey);
	RongIMClient.connect(token, {
		onSuccess: function (userId) {},
		onError: function (errorCode) {
			console.error('connect failed' + errorCode);
		}
	});

	RongIMClient.setConnectionStatusListener({onChanged: function() {console.log('connect status channged');}});

	RongIMClient.getInstance().setOnReceiveMessageListener({
		onReceived: function (msg) {
			var sessionId = msg.getSenderUserId();
			if(!store.sessionList[sessionId]) {
				RongIMClient.getInstance().getUserInfo(sessionId, {
					onSuccess: function (user) {
						if(!store.isUserExist()) {
							store.addSession(user.getUserId(), user.getUserName, user.getPortraitUri());
						}
					}
				});
			}
			store.sessionList[store.sessionId].messages.push({
				text: msg.getContent(),
				date: new Date(),
			});
		}
	});
}
