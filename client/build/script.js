/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	var store = __webpack_require__(5);
	
	var appkey = '25wehl3uwa6hw';
	
	Vue.config.debug = true;
	//localStorage.clear();
	var userInfo = JSON.parse(localStorage.getItem('userInfo'));
	if (userInfo) {
		initRIMClient(userInfo.token);
		var chat = new Vue({
			el: '#chat',
			template: __webpack_require__(6),
			data: {
				store: store
			},
			ready: function ready() {
				var _this = this;
	
				this.$on('search', function (search) {
					_this.$broadcast('search', search);
				});
				this.store.setUser(userInfo.userId, userInfo.userName, userInfo.image);
				this.store.addSession(userInfo.userId, userInfo.userName, userInfo.image);
				this.store.init();
			},
			watch: {
				// 每当sessionList改变时，保存到localStorage中
				'store.sessionList': {
					handler: function handler() {
						store.save();
					},
					deep: true
				}
			},
			filters: {
				time: function time(date) {
					if (typeof date === 'string') {
						date = new Date(date);
					}
	
					return date.getHours() + ':' + date.getMinutes();
				}
			},
			components: {
				card: __webpack_require__(7),
				list: __webpack_require__(11),
				text: __webpack_require__(15),
				message: __webpack_require__(19)
			}
		});
	} else {
		login();
	}
	
	function login() {
		var login = new Vue({
			el: '#chat',
			template: __webpack_require__(23),
			ready: function ready() {},
			components: {
				login: __webpack_require__(24)
			}
		});
	}
	
	function initRIMClient(token) {
		RongIMClient.init(appkey);
		RongIMClient.connect(token, {
			onSuccess: function onSuccess(userId) {},
			onError: function onError(errorCode) {
				console.error('connect failed' + errorCode);
			}
		});
	
		RongIMClient.setConnectionStatusListener({ onChanged: function onChanged() {
				console.log('connect status channged');
			} });
	
		RongIMClient.getInstance().setOnReceiveMessageListener({
			onReceived: function onReceived(msg) {
				var sessionId = msg.getSenderUserId();
				if (!store.sessionList[sessionId]) {
					RongIMClient.getInstance().getUserInfo(sessionId, {
						onSuccess: function onSuccess(user) {
							if (!store.isUserExist()) {
								store.addSession(user.getUserId(), user.getUserName, user.getPortraitUri());
							}
						}
					});
				}
				store.sessionList[store.sessionId].messages.push({
					text: msg.getContent(),
					date: new Date()
				});
			}
		});
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/less-loader/index.js!./chat.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/less-loader/index.js!./chat.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "#chat {\n  overflow: hidden;\n  border-radius: 3px;\n}\n#chat .sidebar,\n#chat .main {\n  height: 100%;\n}\n#chat .sidebar {\n  float: left;\n  width: 200px;\n  color: #f4f4f4;\n  background-color: #2e3238;\n}\n#chat .main {\n  position: relative;\n  overflow: hidden;\n  background-color: #eee;\n}\n#chat .m-text {\n  position: absolute;\n  width: 100%;\n  bottom: 0;\n  left: 0;\n}\n#chat .m-message {\n  height: calc(100% - 160px);\n}\n#chat .login {\n  display: block;\n  width: 250px;\n  height: 150px;\n  background-color: white;\n  border-radius: 5px;\n  padding: 10px;\n  opacity: 0.7;\n  margin: 100px auto 0 auto;\n}\n#chat .login > input {\n  display: block;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  height: 36px;\n  padding: 18px;\n  color: #333;\n  font-size: 18px;\n  width: 100%;\n}\n#chat .login > button {\n  display: block;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  color: #333;\n  font-size: 16px;\n  width: 80%;\n  margin: 20px auto;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var key = 'VUE-CHAT';
	
	// 虚拟数据
	module.exports = {
		user: null,
		userList: [],
		sessionId: null,
		sessionList: {},
	
		setUser: function setUser(id, name, image) {
			this.user = {
				id: id,
				name: name,
				img: image
			};
		},
	
		addSession: function addSession(userId, userName, userImage) {
			//todo check exist
			if (this.sessionList[userId]) return;
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
	
		addMessage: function addMessage(userId, text, time) {
			//todo check exist
			this.sessionList[userId]['messages'].push({
				text: text,
				time: time
			});
		},
		isUserExist: function isUserExist(userId) {
			return this.sessionList[userId] ? true : false;
		},
		save: function save() {
			var history = {
				userList: this.userList,
				sessionId: this.sessionId,
				sessionList: this.sessionList
			};
			localStorage.setItem('chathistory', JSON.stringify(history));
		},
		init: function init() {
			var history = localStorage.getItem('chathistory');
			if (history) {
				history = JSON.parse(history);
				this.userList = history.userList;
				this.sessionId = history.sessionId;
				this.sessionList = history.sessionList;
			}
		}
	
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

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<div class=\"sidebar\">\n\t\t<card store=\"{{store}}\"></card>\n\t\t<list store=\"{{store}}\"></list>\n\t</div>\n\t<div class=\"main\">\n\t\t<message store=\"{{store}}\"></message>\n\t\t<text store=\"{{store}}\"></text>\n\t</div>\n</div>\n";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(8);
	
	module.exports = {
		template: __webpack_require__(10),
		props: ['store'],
		data: function data() {
			return {
				search: ''
			};
		},
		methods: {
			inputing: function inputing() {
				this.$dispatch('search', this.search);
			}
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./card.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./card.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-card {\n  padding: 12px;\n  border-bottom: solid 1px #24272C;\n}\n.m-card footer {\n  margin-top: 10px;\n}\n.m-card .avatar,\n.m-card .name {\n  vertical-align: middle;\n}\n.m-card .avatar {\n  border-radius: 2px;\n}\n.m-card .name {\n  display: inline-block;\n  margin: 0 0 0 15px;\n  font-size: 16px;\n}\n.m-card .search {\n  padding: 0 10px;\n  width: 100%;\n  font-size: 12px;\n  color: #fff;\n  height: 30px;\n  line-height: 30px;\n  border: solid 1px #3a3a3a;\n  border-radius: 4px;\n  outline: none;\n  background-color: #26292E;\n}\n", ""]);
	
	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-card\">\n\t<header>\n\t\t<img class=\"avatar\" alt=\"{{store.user.name}}\" width=\"40\" height=\"40\" v-attr=\"src: store.user.img\">\n\t\t<p class=\"name\">{{store.user.name}}</p>\n\t</header>\n\t<footer>\n\t\t<input class=\"search\" type=\"text\" placeholder=\"search user...\" v-model=\"search\" v-on=\"keyup: inputing\">\n\t</footer>\n</div>";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(12);
	
	module.exports = {
		template: __webpack_require__(14),
		props: ['store'],
		data: function data() {
			return {
				search: ''
			};
		},
		ready: function ready() {
			var _this = this;
	
			this.$on('search', function (search) {
				_this.search = search;
			});
		},
		computed: {
			selectUserId: function selectUserId() {
				return this.store.sessionList[this.store.sessionId].userId;
			}
		},
		methods: {
			select: function select(index) {
				this.store.sessionId = index;
			}
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./list.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./list.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-list li {\n  padding: 12px 15px;\n  border-bottom: 1px solid #292C33;\n  cursor: pointer;\n  -webkit-transition: background-color 0.1s;\n          transition: background-color 0.1s;\n}\n.m-list li:hover {\n  background-color: rgba(255, 255, 255, 0.03);\n}\n.m-list li.active {\n  background-color: rgba(255, 255, 255, 0.1);\n}\n.m-list .avatar,\n.m-list .name {\n  vertical-align: middle;\n}\n.m-list .avatar {\n  border-radius: 2px;\n}\n.m-list .name {\n  display: inline-block;\n  margin: 0 0 0 15px;\n}\n", ""]);
	
	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-list\">\n\t<ul>\n\t\t<li v-repeat=\"item in store.userList\" \n\t\t\tv-on=\"click: select(item.id)\"\n\t\t\tv-class=\"active: selectUserId === item.id\"\n\t\t\tv-show=\"item.name.indexOf(search) > -1\">\n\t\t\t<img class=\"avatar\" alt=\"{{item.name}}\" width=\"30\" height=\"30\" v-attr=\"src: item.img\">\n\t\t\t<p class=\"name\">{{item.name}}</p>\n\t\t</li>\n\t</ul>\n</div>\n";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(16);
	module.exports = {
		template: __webpack_require__(18),
		props: ['store'],
		data: function data() {
			return {
				text: ''
			};
		},
		methods: {
			inputing: function inputing(e) {
				if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
					this.store.sessionList[this.store.sessionId].messages.push({
						text: this.text,
						date: new Date(),
						self: true
					});
					var type = RongIMClient.ConversationType.PRIVATE;
					var targetId = this.store.sessionList[this.store.sessionId].userId;
					var msg = new RongIMClient.TextMessage();
	
					msg.setContent(this.text);
					RongIMClient.getInstance().sendMessage(type, targetId, msg, null, {
						onSuccess: function onSuccess() {},
						onError: function onError() {}
					});
	
					this.text = '';
				}
			}
		}
	
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(17);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./text.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./text.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-text {\n  height: 160px;\n  border-top: solid 1px #ddd;\n}\n.m-text textarea {\n  padding: 10px;\n  height: 100%;\n  width: 100%;\n  border: none;\n  outline: none;\n  font-family: \"Micrsofot Yahei\";\n  resize: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-text\">\n\t<textarea placeholder=\"按 Ctrl + Enter 发送\" v-model=\"text\" v-on=\"keyup: inputing\"></textarea>\n</div>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(20);
	
	//const dateFilter = require('filter/date');
	
	module.exports = {
		template: __webpack_require__(22),
		props: ['store'],
		ready: function ready() {},
		filters: {
			avatar: function avatar(item) {
				if (item.self) {
					return this.store.user.img;
				}
	
				var session = this.store.sessionList[this.store.sessionId],
				    user = this.store.userList.filter(function (user) {
					return user.id === session.userId;
				})[0];
				return user && user.img;
			}
		},
		directives: {
			// 发送消息后滚动到底部
			'scroll-bottom': function scrollBottom() {
				var _this = this;
	
				Vue.nextTick(function () {
					_this.el.scrollTop = _this.el.scrollHeight - _this.el.clientHeight;
				});
			}
		}
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./message.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./message.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".m-message {\n  padding: 10px 15px;\n  overflow-y: scroll;\n}\n.m-message li {\n  margin-bottom: 15px;\n}\n.m-message .time {\n  margin: 7px 0;\n  text-align: center;\n}\n.m-message .time > span {\n  display: inline-block;\n  padding: 0 18px;\n  font-size: 12px;\n  color: #fff;\n  border-radius: 2px;\n  background-color: #dcdcdc;\n}\n.m-message .avatar {\n  float: left;\n  margin: 0 10px 0 0;\n  border-radius: 3px;\n}\n.m-message .text {\n  display: inline-block;\n  position: relative;\n  padding: 0 10px;\n  max-width: calc(100% - 40px);\n  min-height: 30px;\n  line-height: 2.5;\n  font-size: 12px;\n  text-align: left;\n  word-break: break-all;\n  background-color: #fafafa;\n  border-radius: 4px;\n}\n.m-message .text:before {\n  content: \" \";\n  position: absolute;\n  top: 9px;\n  right: 100%;\n  border: 6px solid transparent;\n  border-right-color: #fafafa;\n}\n.m-message .self {\n  text-align: right;\n}\n.m-message .self .avatar {\n  float: right;\n  margin: 0 0 0 10px;\n}\n.m-message .self .text {\n  background-color: #b2e281;\n}\n.m-message .self .text:before {\n  right: inherit;\n  left: 100%;\n  border-right-color: transparent;\n  border-left-color: #b2e281;\n}\n", ""]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"m-message\" v-scroll-bottom=\"store.sessionList[store.sessionId].messages\">\n\t<ul>\n\t\t<li v-repeat=\"item in store.sessionList[store.sessionId].messages\">\n\t\t\t<p class=\"time\"><span>{{item.date | time}}</span></p>\n\t\t\t<div class=\"main\" v-class=\"self: item.self\">\n\t\t\t\t<img class=\"avatar\" v-attr=\"src: item | avatar\" width=\"30\" height=\"30\" />\n\t\t\t\t<div class=\"text\">{{item.text}}</div>\n\t\t\t</div>\n\t\t</li>\n\t</ul>\n</div>\n";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div>\n\t<div class=\"login\">\n\t\t<login></login>\n\t<div>\n</div>\n";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(25);
	
	module.exports = {
		template: __webpack_require__(27),
		data: function data() {
			return {
				userName: 'jswh'
			};
		},
		methods: {
			login: function login() {
				var xhr = new XMLHttpRequest();
				xhr.open("get", "http://127.0.0.1:8000/token.php?name=" + this.userName, true);
				xhr.onreadystatechange = (function () {
					console.log(this.userName);
					if (xhr.readyState == 4) {
						var res = JSON.parse(xhr.responseText);
						var token = res.token;
						localStorage.setItem('userInfo', xhr.responseText);
						console.log(token);
						location.reload();
					}
				}).bind(this);
				xhr.send(null);
			}
		}
	
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(26);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./login.less", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/less-loader/index.js!./login.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "", ""]);
	
	// exports


/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "<input type=\"text\" v-model=\"userName\"/>\n<button v-on=\"click : login\">登录</button>\n";

/***/ }
/******/ ]);
//# sourceMappingURL=script.js.map