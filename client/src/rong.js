
var setEventListner = function () {
	RongIMClient.setConnectionStatusListener({
		onChanged: function (status) {
			switch (status) {
				//链接成功
			case RongIMClient.ConnectionStatus.CONNECTED:
				console.log('链接成功');
				break;
				//正在链接
			case RongIMClient.ConnectionStatus.CONNECTING:
				console.log('正在链接');
				break;
				//重新链接
			case RongIMClient.ConnectionStatus.RECONNECT:
				console.log('重新链接');
				break;
				//其他设备登陆
			case RongIMClient.ConnectionStatus.OTHER_DEVICE_LOGIN:
				//连接关闭
			case RongIMClient.ConnectionStatus.CLOSURE:
				//未知错误
			case RongIMClient.ConnectionStatus.UNKNOWN_ERROR:
				//登出
			case RongIMClient.ConnectionStatus.LOGOUT:
				//用户已被封禁
			case RongIMClient.ConnectionStatus.BLOCK:
				break;
			}
		}
	});
	RongIMClient.getInstance().setOnReceiveMessageListener({
		// 接收到的消息
		onReceived: function (message) {
			// 判断消息类型
			switch(message.getMessageType()){
			case RongIMClient.MessageType.TextMessage:
				// do something...
				break;
			case RongIMClient.MessageType.ImageMessage:
				// do something...
				break;
			case RongIMClient.MessageType.VoiceMessage:
				// do something...
				break;
			case RongIMClient.MessageType.RichContentMessage:
				// do something...
				break;
			case RongIMClient.MessageType.LocationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.DiscussionNotificationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.InformationNotificationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.ContactNotificationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.ProfileNotificationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.CommandNotificationMessage:
				// do something...
				break;
			case RongIMClient.MessageType.UnknownMessage:
				// do something...
				break;
			default:
				// 自定义消息
				// do something...
			}
		}
	});
}
module.export = {
	connect : function () {
		RongIMClient.init(appkey);
		RongIMClient.connect(token, {
			onSuccess: function (userId) {
				afterConnected();
			},
			onError: function (errorCode) {

			}
		})
	}
}
