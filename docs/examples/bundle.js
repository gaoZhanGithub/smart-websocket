!function(e){function __webpack_require__(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,__webpack_require__),s.l=!0,s.exports}var t={};__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},__webpack_require__.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";function decode(e){var t=e.match(/\[.*\]/);if(t){var n=JSON.parse(t[0]);return{type:n[0],data:n[1]}}return null}var s=n(2),o=function(e){return e&&e.__esModule?e:{default:e}}(s);new Vue({el:"#app",data:{name:"",socket:null,messages:[],msg:""},mounted:function(){var e=this;this.name=prompt("Type your nickname")||"Anonymous",this.socket=new o.default("wss://socketio-chat.now.sh/socket.io/?EIO=3&transport=websocket"),this.socket.send('42["add user","'+this.name+'"]'),this.socket.addEventListener("open",function(t){var n=t.reconnectCount;e.messages.push({type:"system",message:"socket open, reconnectCount: "+n})}),this.socket.addEventListener("close",function(t){var n=t.reconnectCount;e.messages.push({type:"system",message:"socket close, reconnectCount: "+n})}),this.socket.addEventListener("error",function(){e.messages.push({type:"system",message:"socket error"})}),this.socket.addEventListener("message",function(t){var n=t.data,s=decode(n);if(s)switch(s.type){case"new message":case"login":case"user joined":case"user left":e.messages.push(s),e.$nextTick(function(){e.$refs.content.scrollTop=e.$refs.content.scrollHeight})}})},methods:{sendMsg:function(){var e=this;""!==this.msg&&(this.socket.send('42["new message","'+this.msg+'"]'),this.messages.push({type:"new message",data:{username:this.name,message:this.msg}}),this.$nextTick(function(){e.$refs.content.scrollTop=e.$refs.content.scrollHeight}),this.msg="")}}})},function(e,t,n){"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function createEvent(e,t){var n=new CustomEvent(e);return o(n,t),n}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function defineProperties(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return function(e,t,n){return t&&defineProperties(e.prototype,t),n&&defineProperties(e,n),e}}(),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)Object.prototype.hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},c=function(){function SmartWebsocket(e){var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=n.autoOpen,o=void 0===s||s,c=n.smartSend,r=void 0===c||c,i=n.autoReconnect,a=void 0===i||i,u=n.reconnectDelay,_=void 0===u?500:u,d=n.maxReconnectCount,h=void 0===d?3:d;_classCallCheck(this,SmartWebsocket),this._url=e,this._autoOpen=o,this._smartSend=r,this._autoReconnect=a,this._reconnectDelay=_,this._maxReconnectCount=h,this._reconnectCount=0,this._forceClose=!1,this._bus=document.createElement("div"),this.socket=null,this.addEventListener=this._bus.addEventListener.bind(this._bus),this.removeEventListener=this._bus.removeEventListener.bind(this._bus);var l=function(){t._forceClose?(t._forceClose=!1,t._reconnectCount=0):(t._reconnectCount+=1,t._reconnectCount>t._maxReconnectCount?(t._bus.dispatchEvent(createEvent("reconnectStopped",{reconnectCount:t._reconnectCount})),t._reconnectCount=0):setTimeout(function(){t.open()},t._reconnectDelay))};this._autoReconnect&&this.addEventListener("close",l),this._autoOpen&&this.open()}return s(SmartWebsocket,[{key:"open",value:function(){var e=this;this.socket&&1===this.socket.readyState||(this.socket=new WebSocket(this._url),this._bus.dispatchEvent(createEvent("connecting",{reconnectCount:this._reconnectCount})),this.socket.addEventListener("open",function(){e._bus.dispatchEvent(createEvent("open",{reconnectCount:e._reconnectCount})),e._reconnectCount=0}),this.socket.addEventListener("message",function(t){var n=t.data,s=t.origin,o=t.lastEventId,c=t.source,r=t.ports;e._bus.dispatchEvent(createEvent("message",{reconnectCount:e._reconnectCount,data:n,origin:s,lastEventId:o,source:c,ports:r}))}),this.socket.addEventListener("close",function(t){var n=t.code,s=t.reason,o=t.wasClean;e._bus.dispatchEvent(createEvent("close",{reconnectCount:e._reconnectCount,code:n,reason:s,wasClean:o}))}),this.socket.addEventListener("error",function(){e._bus.dispatchEvent(createEvent("error",{reconnectCount:e._reconnectCount}))}))}},{key:"close",value:function(){this.socket&&(this._forceClose=!0,this.socket.close())}},{key:"send",value:function(e){var t=this;!this.socket||0===this.socket.readyState&&this._smartSend?this.addEventListener("open",function(){t.socket.send(e)},{once:!0}):this.socket.send(e)}}]),SmartWebsocket}();t.default=c}]);