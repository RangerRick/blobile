!function(){"use strict";function e(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function n(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[6793],{16793:function(t,o,i){i.r(o),i.d(o,{SettingsPageModule:function(){return H}});var r=i(54364),a=i(90335),c=i(95861),s=i(31289),u=i(3786),l=i(45619),g=i(22574),f=i(57097),d=i(64106),h=i(30748),v=i(4913),p=i(28499),m=i(18456);function Z(e,n){1&e&&(d.TgZ(0,"ion-button"),d._UZ(1,"ion-spinner"),d.qZA())}function x(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){return d.CHM(t),d.oxw(2).setBetaEnabled()})("ngModelChange",function(e){return d.CHM(t),d.oxw(2).current.betaEnabled=e}),d.qZA()}if(2&e){var o=d.oxw(2);d.Q6J("ngModel",o.current.betaEnabled)}}function b(e,n){if(1&e&&(d.TgZ(0,"ion-item"),d.TgZ(1,"ion-label",14),d._uU(2),d.qZA(),d._UZ(3,"ion-progress-bar",15),d.qZA()),2&e){var t=d.oxw(2);d.xp6(2),d.hij("",t.updateService.phase,":"),d.xp6(1),d.s9C("value",t.updateService.percentDone)}}function C(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-item",16),d.TgZ(1,"ion-label",6),d._uU(2,"A content update is available."),d.qZA(),d.TgZ(3,"ion-button",17),d.NdJ("click",function(){return d.CHM(t),d.oxw(2).updateService.reload()}),d._uU(4,"Apply"),d.qZA(),d.qZA()}}function T(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){return d.CHM(t),d.oxw(2).setBoolean("disableSleep")})("ngModelChange",function(e){return d.CHM(t),d.oxw(2).current.disableSleep=e}),d.qZA()}if(2&e){var o=d.oxw(2);d.Q6J("ngModel",o.current.disableSleep)}}function w(e,n){if(1&e&&(d.TgZ(0,"span"),d.TgZ(1,"ion-list-header",5),d.TgZ(2,"h3"),d._uU(3,"Automatic Updates"),d.qZA(),d.qZA(),d.TgZ(4,"ion-item"),d.TgZ(5,"ion-label",6),d._uU(6,"Receive content updates early?"),d.qZA(),d.YNc(7,x,1,1,"ion-toggle",7),d.qZA(),d.YNc(8,b,4,2,"ion-item",3),d.YNc(9,C,5,0,"ion-item",12),d.TgZ(10,"ion-list-header",5),d.TgZ(11,"h3"),d._uU(12,"Disable Sleep"),d.qZA(),d.qZA(),d.TgZ(13,"ion-item"),d.TgZ(14,"ion-label",6),d._uU(15,"Disable sleep while games are active?"),d.qZA(),d.YNc(16,T,1,1,"ion-toggle",7),d.qZA(),d.qZA()),2&e){var t=d.oxw();d.xp6(7),d.Q6J("ngIf",t.current),d.xp6(1),d.Q6J("ngIf",t.updateService.updateAvailable&&!t.updateService.updateReady&&t.updateService.percentDone),d.xp6(1),d.Q6J("ngIf",t.updateService.updateReady),d.xp6(7),d.Q6J("ngIf",t.current)}}function A(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){return d.CHM(t),d.oxw().setBoolean("reduceMotion")})("ngModelChange",function(e){return d.CHM(t),d.oxw().current.reduceMotion=e}),d.qZA()}if(2&e){var o=d.oxw();d.Q6J("ngModel",o.current.reduceMotion)}}function q(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){d.CHM(t);var e=d.oxw();return e.settings.setDarkMode(e.current.darkMode)})("ngModelChange",function(e){return d.CHM(t),d.oxw().current.darkMode=e}),d.qZA()}if(2&e){var o=d.oxw();d.Q6J("ngModel",o.current.darkMode)}}function y(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){return d.CHM(t),d.oxw().setBoolean("audio")})("ngModelChange",function(e){return d.CHM(t),d.oxw().current.audio=e}),d.qZA()}if(2&e){var o=d.oxw();d.Q6J("ngModel",o.current.audio)}}function M(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-range",18),d.NdJ("ionChange",function(e){return d.CHM(t),d.oxw().setVolume(e)})("ngModelChange",function(e){return d.CHM(t),d.oxw().volume=e}),d.qZA()}if(2&e){var o=d.oxw();d.Q6J("ngModel",o.volume)}}function k(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-toggle",13),d.NdJ("ionChange",function(){return d.CHM(t),d.oxw(2).setBoolean("speech")})("ngModelChange",function(e){return d.CHM(t),d.oxw(2).current.speech=e}),d.qZA()}if(2&e){var o=d.oxw(2);d.Q6J("ngModel",o.current.speech)}}function J(e,n){if(1&e&&(d.TgZ(0,"ion-item"),d.TgZ(1,"ion-label",6),d._uU(2,"Enable Speech?"),d.qZA(),d.YNc(3,k,1,1,"ion-toggle",7),d.qZA()),2&e){var t=d.oxw();d.xp6(3),d.Q6J("ngIf",t.current)}}function S(e,n){if(1&e&&(d.TgZ(0,"ion-select-option",15),d._uU(1),d.qZA()),2&e){var t=n.$implicit;d.Q6J("value",t.voiceURI),d.xp6(1),d.Oqu(t.name)}}function N(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-select",22),d.NdJ("ionChange",function(e){return d.CHM(t),d.oxw(2).setVoice(e)}),d.YNc(1,S,2,2,"ion-select-option",23),d.qZA()}if(2&e){var o=d.oxw(2);d.Q6J("interfaceOptions",o.voiceOptions)("value",o.current.voice),d.xp6(1),d.Q6J("ngForOf",o.voices)}}function I(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-item"),d.TgZ(1,"ion-icon",19),d.NdJ("click",function(e){return d.CHM(t),d.oxw().speak(e)}),d.qZA(),d.TgZ(2,"ion-label",20),d._uU(3,"Voice:"),d.qZA(),d.YNc(4,N,2,3,"ion-select",21),d.qZA()}if(2&e){var o=d.oxw();d.xp6(4),d.Q6J("ngIf",o.current&&o.voice)}}function Q(e,n){if(1&e&&(d.TgZ(0,"ion-select-option",15),d._uU(1),d.qZA()),2&e){var t=n.$implicit;d.Q6J("value",t.key),d.xp6(1),d.Oqu(t.value)}}function O(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-select",26),d.NdJ("ionChange",function(e){return d.CHM(t),d.oxw(2).setCommentaryLevel(e)}),d.YNc(1,Q,2,2,"ion-select-option",23),d.ALo(2,"keyvalue"),d.qZA()}if(2&e){var o=d.oxw(2);d.Q6J("interfaceOptions",o.commentaryLevelOptions)("value",o.current.commentaryLevel),d.xp6(1),d.Q6J("ngForOf",d.lcZ(2,3,o.commentaryLevels))}}function Y(e,n){if(1&e&&(d.TgZ(0,"ion-item"),d.TgZ(1,"ion-label",24),d._uU(2,"Commentary Level:"),d.qZA(),d.YNc(3,O,3,5,"ion-select",25),d.qZA()),2&e){var t=d.oxw();d.xp6(3),d.Q6J("ngIf",t.current&&t.commentaryLevel)}}function U(e,n){if(1&e&&(d.TgZ(0,"ion-select-option",15),d._uU(1),d.qZA()),2&e){var t=n.$implicit;d.Q6J("value",t.id),d.xp6(1),d.Oqu(t.fullName)}}function _(e,n){if(1&e){var t=d.EpF();d.TgZ(0,"ion-select",27),d.NdJ("ionChange",function(e){return d.CHM(t),d.oxw().setString("favoriteTeam",e)})("ngModelChange",function(e){return d.CHM(t),d.oxw().current.favoriteTeam=e}),d.YNc(1,U,2,2,"ion-select-option",28),d.qZA()}if(2&e){var o=d.oxw();d.Q6J("interfaceOptions",o.teamOptions)("ngModel",o.current.favoriteTeam),d.xp6(1),d.Q6J("ngForOf",o.teams)("ngForTrackBy",o.id)}}var E,F=[{path:"",component:(E=function(){function t(n,o,i,r,a,c){e(this,t),this.database=n,this.deploy=o,this.platform=i,this.settings=r,this.updateService=a,this.voiceService=c,this.loading=!0,this.betaEnabled=!1,this.devicePlatform="web",this.hasSpeech=!1,this.teamOptions={header:"Choose Your Team"},this.voiceOptions={header:"Choose a Voice"},this.commentaryLevelOptions={header:"Choose a Commentary Level"},this.id=f.Z.trackById,this.hasSpeech=void 0!==window.speechSynthesis}var o,i,r;return o=t,(i=[{key:"ngOnInit",value:function(){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){var n,t;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.platform.ready();case 2:return console.debug("SettingsPage.ngOnInit()"),e.prev=3,e.next=6,l.A.getInfo();case 6:n=e.sent,this.devicePlatform=n.platform,console.debug("SettingsPage.ngOnInit(): platform=".concat(this.devicePlatform)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(3),console.error("SettingsPage.ngOnInit(): failed to get device info:",e.t0);case 13:if("web"===this.devicePlatform){e.next=24;break}return e.prev=14,e.next=17,this.deploy.getConfiguration();case 17:t=e.sent,this.betaEnabled="beta"===t.channel.toLowerCase(),console.debug("SettingsPage.ngOnInit(): betaEnabled=".concat(this.betaEnabled)),e.next=24;break;case 21:e.prev=21,e.t1=e.catch(14),console.error("SettingsPage.ngOnInit(): failed to get deploy configuration:",e.t1);case 24:return e.next=26,this.settings.getAll();case 26:return this.current=e.sent,this.volume=Math.round(1e3*this.current.volume),e.next=30,this.database.teams();case 30:return this.teams=e.sent.sort(function(e,n){return e.fullName<n.fullName?-1:e.fullName>n.fullName?1:0}),this.voices=this.voiceService.voices(),e.next=34,this.voiceService.voice(this.current.voice);case 34:this.voice=e.sent,this.commentaryLevels=g.M,this.commentaryLevel=this.current.commentaryLevel,this.loading=!1,console.debug("SettingsPage.onInit(): current settings=",this.current);case 39:case"end":return e.stop()}},e,this,[[3,10],[14,21]])}))}},{key:"setBetaEnabled",value:function(){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.settings.setBetaEnabled(this.current.betaEnabled);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e,this)}))}},{key:"getTeamName",value:function(e){var n=this.teams.find(function(n){return n.id===e});return n?n.fullName:""}},{key:"setBoolean",value:function(e){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.settings.setBoolean(e,this.current[e]);case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},n,this)}))}},{key:"setString",value:function(e,n){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.debug("setString: key=",e),console.debug("setString: ev=",n),t.next=4,this.settings.setString(e,this.current[e]);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}))}},{key:"setVolume",value:function(e){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.settings.setNumber("volume",e.detail.value/1e3);case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},n,this)}))}},{key:"setVoice",value:function(e){var n,t;return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function o(){return regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,this.voiceService.voice(null===(n=null==e?void 0:e.detail)||void 0===n?void 0:n.value);case 2:if(!o.sent){o.next=8;break}return o.next=5,this.settings.setVoice(e.detail.value);case 5:this.speak(),o.next=9;break;case 8:console.error("Unable to locate voice: ".concat(null===(t=null==e?void 0:e.detail)||void 0===t?void 0:t.value));case 9:case"end":return o.stop()}},o,this)}))}},{key:"setCommentaryLevel",value:function(e){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.settings.setCommentaryLevel(parseInt(e.detail.value));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}},n,this)}))}},{key:"speak",value:function(e){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.abrupt("return",(null==e||e.preventDefault(),null==e||e.stopPropagation(),this.voiceService.say("The commissioner is doing a great job!",{force:!0})));case 1:case"end":return n.stop()}},n,this)}))}},{key:"setFavoriteTeam",value:function(e){return(0,u.mG)(this,void 0,void 0,regeneratorRuntime.mark(function n(){var t;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:t=this.teams.find(function(n){return n.id===e.value}),this.settings.setFavoriteTeam(null==t?void 0:t.id);case 2:case"end":return n.stop()}},n,this)}))}}])&&n(o.prototype,i),r&&n(o,r),t}(),E.\u0275fac=function(e){return new(e||E)(d.Y36(h.k),d.Y36(v.g),d.Y36(c.t4),d.Y36(g.g),d.Y36(p.G),d.Y36(m.Z))},E.\u0275cmp=d.Xpm({type:E,selectors:[["app-settings"]],decls:45,vars:11,consts:[[3,"translucent"],["color","primary"],["slot","secondary"],[4,"ngIf"],["lines","none",1,"ion-text-wrap"],["lines","full"],[1,"ion-text-wrap"],["slot","end",3,"ngModel","ionChange","ngModelChange",4,"ngIf"],["aria-label","Volume","min","0","max","1000","debounce","200","slot","end",3,"ngModel","ionChange","ngModelChange",4,"ngIf"],["id","bl-team-selector"],["for","choose-your-team"],["id","choose-your-team","aria-label","Choose Your Team","class","ion-text-wrap","interface","action-sheet","okText","Choose","cancelText","Cancel",3,"interfaceOptions","ngModel","ionChange","ngModelChange",4,"ngIf"],["color","danger",4,"ngIf"],["slot","end",3,"ngModel","ionChange","ngModelChange"],["slot","start"],[3,"value"],["color","danger"],["slot","end","color","light",3,"click"],["aria-label","Volume","min","0","max","1000","debounce","200","slot","end",3,"ngModel","ionChange","ngModelChange"],["name","volume-high-outline","slot","start",1,"ion-no-margin",2,"margin-right","0.5em",3,"click"],["for","select-voice",1,"ion-text-wrap"],["id","select-voice","aria-label","Select a Voice","class","ion-text-wrap","interface","action-sheet","okText","Choose","cancelText","Cancel",3,"interfaceOptions","value","ionChange",4,"ngIf"],["id","select-voice","aria-label","Select a Voice","interface","action-sheet","okText","Choose","cancelText","Cancel",1,"ion-text-wrap",3,"interfaceOptions","value","ionChange"],[3,"value",4,"ngFor","ngForOf"],["for","choose-commetary-level",1,"ion-text-wrap"],["id","choose-commentary-level","aria-label","Choose a Commentary Level","class","ion-text-wrap","interface","action-sheet","okText","Choose","cancelText","Cancel",3,"interfaceOptions","value","ionChange",4,"ngIf"],["id","choose-commentary-level","aria-label","Choose a Commentary Level","interface","action-sheet","okText","Choose","cancelText","Cancel",1,"ion-text-wrap",3,"interfaceOptions","value","ionChange"],["id","choose-your-team","aria-label","Choose Your Team","interface","action-sheet","okText","Choose","cancelText","Cancel",1,"ion-text-wrap",3,"interfaceOptions","ngModel","ionChange","ngModelChange"],[3,"value",4,"ngFor","ngForOf","ngForTrackBy"]],template:function(e,n){1&e&&(d.TgZ(0,"ion-header",0),d.TgZ(1,"ion-toolbar",1),d.TgZ(2,"ion-title"),d._uU(3,"Slettings"),d.qZA(),d.TgZ(4,"ion-buttons",2),d.YNc(5,Z,2,0,"ion-button",3),d.qZA(),d.qZA(),d.qZA(),d.TgZ(6,"ion-content"),d.TgZ(7,"ion-list",4),d.YNc(8,w,17,4,"span",3),d.TgZ(9,"ion-list-header",5),d.TgZ(10,"h3"),d._uU(11,"Interface"),d.qZA(),d.qZA(),d.TgZ(12,"ion-item"),d.TgZ(13,"ion-label",6),d._uU(14,"Reduce motion in effects?"),d.qZA(),d.YNc(15,A,1,1,"ion-toggle",7),d.qZA(),d.TgZ(16,"ion-item"),d.TgZ(17,"ion-label",6),d._uU(18,"Always use dark mode?"),d.qZA(),d.YNc(19,q,1,1,"ion-toggle",7),d.qZA(),d.TgZ(20,"ion-list-header",5),d.TgZ(21,"h3"),d._uU(22,"Audio"),d.qZA(),d.qZA(),d.TgZ(23,"ion-item"),d.TgZ(24,"ion-label",6),d._uU(25,"Enable Sound Effects?"),d.qZA(),d.YNc(26,y,1,1,"ion-toggle",7),d.qZA(),d.TgZ(27,"ion-item"),d.TgZ(28,"ion-label",6),d._uU(29,"Volume:"),d.qZA(),d.YNc(30,M,1,1,"ion-range",8),d.qZA(),d.YNc(31,J,4,1,"ion-item",3),d.YNc(32,I,5,1,"ion-item",3),d.YNc(33,Y,4,1,"ion-item",3),d.TgZ(34,"ion-list-header",5),d.TgZ(35,"h3"),d._uU(36,"Teams"),d.qZA(),d.qZA(),d.TgZ(37,"ion-item",9),d.TgZ(38,"ion-label",6),d.TgZ(39,"ion-label",10),d.TgZ(40,"h4"),d._uU(41,"Choose Your Team:"),d.qZA(),d.qZA(),d.TgZ(42,"ion-note"),d._uU(43,"Your team is always first in the live feed."),d.qZA(),d.qZA(),d.YNc(44,_,2,4,"ion-select",11),d.qZA(),d.qZA(),d.qZA()),2&e&&(d.Q6J("translucent",!0),d.xp6(5),d.Q6J("ngIf",n.loading),d.xp6(3),d.Q6J("ngIf","web"!==n.devicePlatform),d.xp6(7),d.Q6J("ngIf",n.current),d.xp6(4),d.Q6J("ngIf",n.current),d.xp6(7),d.Q6J("ngIf",n.current),d.xp6(4),d.Q6J("ngIf",n.current),d.xp6(1),d.Q6J("ngIf",n.hasSpeech),d.xp6(1),d.Q6J("ngIf",n.hasSpeech),d.xp6(1),d.Q6J("ngIf",n.hasSpeech),d.xp6(11),d.Q6J("ngIf",n.current&&n.teams))},directives:[c.Gu,c.sr,c.wd,c.Sm,r.O5,c.W2,c.q_,c.yh,c.Ie,c.Q$,c.uN,c.YG,c.PQ,c.ho,c.w,a.JJ,a.On,c.X7,c.I_,c.QI,c.gu,c.t9,r.sg,c.n0],pipes:[r.Nd],styles:[""]}),E)}],R=function(){var n=function n(){e(this,n)};return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=d.oAB({type:n}),n.\u0275inj=d.cJS({imports:[[s.Bz.forChild(F)],s.Bz]}),n}(),H=function(){var n=function n(){e(this,n)};return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=d.oAB({type:n}),n.\u0275inj=d.cJS({imports:[[r.ez,a.u5,c.Pc,R]]}),n}()}}])}();
//# sourceMappingURL=6793-es5.923b83db376f9612f013.js.map