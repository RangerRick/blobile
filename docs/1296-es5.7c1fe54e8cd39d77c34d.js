(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[1296],{81296:function(e,t,n){"use strict";n.r(t),n.d(t,{KEYBOARD_DID_CLOSE:function(){return o},KEYBOARD_DID_OPEN:function(){return i},copyVisualViewport:function(){return v},keyboardDidClose:function(){return l},keyboardDidOpen:function(){return p},keyboardDidResize:function(){return b},resetKeyboardAssist:function(){return f},setKeyboardClose:function(){return h},setKeyboardOpen:function(){return d},startKeyboardAssist:function(){return s},trackViewportChanges:function(){return y}});var i="ionKeyboardDidShow",o="ionKeyboardDidHide",r={},u={},a=!1,f=function(){r={},u={},a=!1},s=function(e){c(e),e.visualViewport&&(u=v(e.visualViewport),e.visualViewport.onresize=function(){y(e),p()||b(e)?d(e):l(e)&&h(e)})},c=function(e){e.addEventListener("keyboardDidShow",function(t){return d(e,t)}),e.addEventListener("keyboardDidHide",function(){return h(e)})},d=function(e,t){g(e,t),a=!0},h=function(e){w(e),a=!1},p=function(){return!a&&r.width===u.width&&(r.height-u.height)*u.scale>150},b=function(e){return a&&!l(e)},l=function(e){return a&&u.height===e.innerHeight},g=function(e,t){var n=new CustomEvent(i,{detail:{keyboardHeight:t?t.keyboardHeight:e.innerHeight-u.height}});e.dispatchEvent(n)},w=function(e){var t=new CustomEvent(o);e.dispatchEvent(t)},y=function(e){r=Object.assign({},u),u=v(e.visualViewport)},v=function(e){return{width:Math.round(e.width),height:Math.round(e.height),offsetTop:e.offsetTop,offsetLeft:e.offsetLeft,pageTop:e.pageTop,pageLeft:e.pageLeft,scale:e.scale}}}}]);
//# sourceMappingURL=1296-es5.7c1fe54e8cd39d77c34d.js.map