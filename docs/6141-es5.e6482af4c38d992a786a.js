!function(){function e(e,t,n,r,o,i,u){try{var c=e[i](u),a=c.value}catch(f){return void n(f)}c.done?t(a):Promise.resolve(a).then(r,o)}function t(t){return function(){var n=this,r=arguments;return new Promise(function(o,i){var u=t.apply(n,r);function c(t){e(u,o,i,c,a,"next",t)}function a(t){e(u,o,i,c,a,"throw",t)}c(void 0)})}}function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function o(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return i(this,n)}}function i(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[6141],{96141:function(e,i,u){"use strict";u.r(i),u.d(i,{AppWeb:function(){return c}});var c=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}(p,e);var i,u,c,a,f,s,l=o(p);function p(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,p),(e=l.call(this)).handleVisibilityChange=function(){var t={isActive:!0!==document.hidden};e.notifyListeners("appStateChange",t)},document.addEventListener("visibilitychange",e.handleVisibilityChange,!1),e}return i=p,(u=[{key:"exitApp",value:function(){throw this.unimplemented("Not implemented on web.")}},{key:"getInfo",value:(s=t(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return e.stop()}},e,this)})),function(){return s.apply(this,arguments)})},{key:"getLaunchUrl",value:(f=t(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{url:""});case 1:case"end":return e.stop()}},e)})),function(){return f.apply(this,arguments)})},{key:"getState",value:(a=t(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",{isActive:!0!==document.hidden});case 1:case"end":return e.stop()}},e)})),function(){return a.apply(this,arguments)})}])&&n(i.prototype,u),c&&n(i,c),p}(u(68384).Uw)}}])}();
//# sourceMappingURL=6141-es5.e6482af4c38d992a786a.js.map