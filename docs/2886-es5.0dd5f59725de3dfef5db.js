!function(){"use strict";function n(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function t(n,t){for(var e=0;e<t.length;e++){var i=t[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[2886],{42886:function(e,i,a){a.r(i),a.d(i,{ion_ripple_effect:function(){return c}});var r=a(19369),o=a(76842),s=a(33124),c=function(){function e(n){!function(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),(0,o.r)(this,n),this.type="bounded"}var i,a,c;return i=e,(a=[{key:"addRipple",value:function(n,t){var e=this;return(0,r.Z)(regeneratorRuntime.mark(function i(){return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",new Promise(function(i){(0,o.f)(function(){var a=e.el.getBoundingClientRect(),r=a.width,s=a.height,c=Math.sqrt(r*r+s*s),m=Math.max(s,r),d=e.unbounded?m:c+l,p=Math.floor(m*u),b=d/p,w=n-a.left,k=t-a.top;e.unbounded&&(w=.5*r,k=.5*s);var y=w-.5*p,h=k-.5*p,v=.5*r-w,g=.5*s-k;(0,o.c)(function(){var n=document.createElement("div");n.classList.add("ripple-effect");var t=n.style;t.top=h+"px",t.left=y+"px",t.width=t.height=p+"px",t.setProperty("--final-scale","".concat(b)),t.setProperty("--translate-end","".concat(v,"px, ").concat(g,"px")),(e.el.shadowRoot||e.el).appendChild(n),setTimeout(function(){i(function(){f(n)})},325)})})}));case 1:case"end":return i.stop()}},i)}))()}},{key:"unbounded",get:function(){return"unbounded"===this.type}},{key:"render",value:function(){var t,e=(0,s.b)(this);return(0,o.h)(o.H,{role:"presentation",class:(t={},n(t,e,!0),n(t,"unbounded",this.unbounded),t)})}},{key:"el",get:function(){return(0,o.i)(this)}}])&&t(i.prototype,a),c&&t(i,c),e}(),f=function(n){n.classList.add("fade-out"),setTimeout(function(){n.remove()},200)},l=10,u=.5;c.style=":host{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict;pointer-events:none}:host(.unbounded){contain:layout size style}.ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;animation:225ms rippleAnimation forwards, 75ms fadeInAnimation forwards;will-change:transform, opacity;pointer-events:none}.fade-out{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1));-webkit-animation:150ms fadeOutAnimation forwards;animation:150ms fadeOutAnimation forwards}@-webkit-keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@keyframes rippleAnimation{from{-webkit-animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);-webkit-transform:scale(1);transform:scale(1)}to{-webkit-transform:translate(var(--translate-end)) scale(var(--final-scale, 1));transform:translate(var(--translate-end)) scale(var(--final-scale, 1))}}@-webkit-keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@keyframes fadeInAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0}to{opacity:0.16}}@-webkit-keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}@keyframes fadeOutAnimation{from{-webkit-animation-timing-function:linear;animation-timing-function:linear;opacity:0.16}to{opacity:0}}"}}])}();
//# sourceMappingURL=2886-es5.0dd5f59725de3dfef5db.js.map