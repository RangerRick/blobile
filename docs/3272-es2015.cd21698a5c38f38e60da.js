(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[3272],{53272:function(e,t,n){"use strict";n.r(t),n.d(t,{createSwipeBackGesture:function(){return o}});var r=n(52377),a=n(39461);n(40960);const o=(e,t,n,o,i)=>{const s=e.ownerDocument.defaultView;return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:e=>e.startX<=50&&t(),onStart:n,onMove:e=>{o(e.deltaX/s.innerWidth)},onEnd:e=>{const t=s.innerWidth,n=e.deltaX/t,a=e.velocityX,o=a>=0&&(a>.2||e.deltaX>t/2),c=(o?1-n:n)*t;let l=0;if(c>5){const e=c/Math.abs(a);l=Math.min(e,540)}i(o,n<=0?.01:(0,r.j)(0,n,.9999),l)}})}}}]);
//# sourceMappingURL=3272-es2015.cd21698a5c38f38e60da.js.map