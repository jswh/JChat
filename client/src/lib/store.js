
const key = 'VUE-CHAT';

// 虚拟数据
module.exports = {
	user: null,
	userList:[],
	sessionId: null,
	sessionList:{},
	
	setUser(id, name, image) {
		this.user = {
			id: id,
			name: name,
			img: image
		}
	},

	addSession: function (userId, userName, userImage) {
		//todo check exist
		if(this.sessionList[userId]) return;
		this.userList.push({
			id: userId,
			name: userName,
			img: userImage
		});

		this.sessionList.$set(userId, {
			userId: userId,
			messages: []
		});
	},

	addMessage(userId, text, time) {
		//todo check exist
		this.sessionList[userId]['messages'].push({
			text: text,
			time: time
		})
	},
	isUserExist(userId) {
		return this.sessionList[userId] ? true : false;
	},
	save() {
		var history = {
			userList:this.userList,
			sessionId:this.sessionId,
			sessionList:this.sessionList
		};
		localStorage.setItem('chathistory', JSON.stringify(history));
	},
	init() {
		var history = localStorage.getItem('chathistory');
		if(history) {
			history = JSON.parse(history);
			this.userList = history.userList;
			this.sessionId = history.sessionId;
			this.sessionList = history.sessionList;
		}
	},

};
/*
 * data struct sample
let data = {
	// 登录用户
	user: {
		id: 1,
		name: 'Coffce',
		img: 'build/images/1.jpg'
	},
	
	// 用户列表
	userList: {
		2: {
			id: 2,
			name: '示例介绍',
			img: 'build/images/2.png'
		}
	},
	
	// 当前会话ID
	sessionId: 0,

	// 会话列表
	sessionList: {
		2: {
			userId: 2,
			messages: [
				{
					text: 'Hello，这是一个基于Vue + Webpack构建的简单chat示例，聊天记录保存在localStorge。简单演示了Vue的component、filter、directive、computed以及组件间的事件通讯，代码非常少。',
					date: now
				}, 
				{
					text: '项目地址: https://github.com/coffcer/vue-chat',
					date: now
				}
			]
		},
	},
};
*/
