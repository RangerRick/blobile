"use strict";(self.webpackChunkblobile=self.webpackChunkblobile||[]).push([[8380],{48380:function(e,t,i){i.r(t),i.d(t,{LiveFeedPageModule:function(){return O}});var s=i(95861),n=i(54364),o=i(90335),a=i(64373),r=i(31289),l=i(3786);const c=(0,i(41899).fo)("KeepAwake",{web:()=>i.e(641).then(i.bind(i,60641)).then(e=>new e.KeepAwakeWeb)});class d{constructor(e){if("object"==typeof e)this.el=e;else{if("string"!=typeof e)throw new TypeError("Marquee accepts either a HTML Element (object) or a class/id to query (string).");this.el=document.querySelector(e)}this.sign=this.el.children[0],this.RAF=null,this.offset=this.el.offsetWidth,this.speed=this.el.dataset.speed||1,this.onResize=this.getSignWidth.bind(this),this.styleElements(),this.init()}init(){this.getSignWidth(),this.draw(),window.addEventListener("resize",this.onResize)}styleElements(){this.el.style.display="flex",this.sign.style.display="inline-flex"}getSignWidth(){this.signWidth=this.sign.clientWidth}draw(){const e=()=>{this.RAF=requestAnimationFrame(e),-this.offset>=this.signWidth&&this.reset(),this.offset=this.offset-this.speed,this.sign.style.transform=`translate3d(${this.offset}px, 0, 0)`};requestAnimationFrame(e)}stop(){cancelAnimationFrame(this.RAF)}reset(){this.offset=this.el.offsetWidth,this.sign.style.transform=`translate3d(${this.offset}px, 0, 0)`}destroy(){this.stop(),window.removeEventListener("resize",this.onResize)}}var h=i(54709),u=i(16526),g=i(64106),m=i(1095),f=i(30748),v=i(22574),p=i(53975),w=i(6427);function b(e,t){1&e&&(g.TgZ(0,"ion-button"),g._UZ(1,"ion-spinner"),g.qZA())}function T(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"ion-toolbar"),g.TgZ(1,"ion-buttons",8),g.TgZ(2,"ion-button"),g._UZ(3,"ion-icon"),g.qZA(),g.qZA(),g.TgZ(4,"ion-segment",9),g.NdJ("ionChange",function(t){return g.CHM(e),g.oxw().segmentChanged(t)}),g.TgZ(5,"ion-segment-button",10),g.TgZ(6,"ion-label"),g._uU(7),g.qZA(),g.qZA(),g.TgZ(8,"ion-segment-button",11),g.TgZ(9,"ion-label"),g._uU(10),g.qZA(),g.qZA(),g.TgZ(11,"ion-segment-button",12),g.TgZ(12,"ion-label"),g._uU(13),g.qZA(),g.qZA(),g.qZA(),g.TgZ(14,"ion-buttons",2),g.TgZ(15,"ion-button",13),g.NdJ("click",function(){return g.CHM(e),g.oxw().toggleSearchbar()}),g._UZ(16,"ion-icon",14),g.qZA(),g.qZA(),g.qZA()}if(2&e){const e=g.oxw();g.xp6(4),g.Q6J("value",e.segment),g.xp6(3),g.hij("All (",e.getGameCount(),")"),g.xp6(3),g.hij("Active (",e.getActiveGameCount(),")"),g.xp6(3),g.hij("Favorites (",e.getFavoriteGameCount(),")")}}function Z(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"ion-searchbar",15),g.NdJ("ionInput",function(t){return g.CHM(e),g.oxw().filterList(t)}),g.qZA()}if(2&e){const e=g.oxw();g.s9C("value",e.searchTerm)}}function A(e,t){if(1&e&&(g.TgZ(0,"ion-item",16),g.TgZ(1,"h4"),g._uU(2," The "),g._UZ(3,"app-team",22),g._uU(4),g.qZA(),g.qZA()),2&e){const e=t.$implicit;g.xp6(3),g.Q6J("teamColor",e.team.mainColor)("emoji",e.team.emoji)("name",e.team.fullName),g.xp6(1),g.hij(" are the ",e.playoffsName," Champions! ")}}function S(e,t){if(1&e&&(g.TgZ(0,"ion-item",16),g.TgZ(1,"h4"),g._uU(2),g._UZ(3,"br"),g._uU(4),g.qZA(),g.qZA()),2&e){const e=g.oxw(3);g.xp6(2),g.hij(" ",e.uiState.countdownNotice," "),g.xp6(2),g.hij(" ",e.getCountdown()," ")}}function y(e,t){1&e&&(g.TgZ(0,"ion-item",16),g.TgZ(1,"h4"),g._uU(2,"Next season starts in... uhh. "),g.TgZ(3,"i"),g._uU(4,"*tugs collar*"),g.qZA(),g._uU(5," I mean. What "),g.TgZ(6,"i"),g._uU(7,"is"),g.qZA(),g._uU(8," time, really?"),g.qZA(),g.qZA())}function N(e,t){if(1&e&&(g.TgZ(0,"div",23),g._uU(1),g.qZA()),2&e){const e=t.$implicit;g.xp6(1),g.hij(" ",e.msg,"... \xa0 \xa0 \xa0 ")}}function q(e,t){if(1&e&&(g.TgZ(0,"span"),g.TgZ(1,"ion-item",16),g.TgZ(2,"h4"),g._uU(3),g.qZA(),g.qZA(),g.YNc(4,A,5,4,"ion-item",17),g.YNc(5,S,5,2,"ion-item",18),g.YNc(6,y,9,0,"ion-item",18),g.TgZ(7,"div",19),g.TgZ(8,"div",20),g.YNc(9,N,2,1,"div",21),g.qZA(),g.qZA(),g.qZA()),2&e){const e=g.oxw(2);g.xp6(3),g.Oqu(e.uiState.notice),g.xp6(1),g.Q6J("ngForOf",e.uiState.winners),g.xp6(1),g.Q6J("ngIf",void 0!==e.uiState.countdownNotice&&e.countdown&&e.countdown.diff>=0),g.xp6(1),g.Q6J("ngIf",void 0!==e.uiState.countdownNotice&&e.countdown&&e.countdown.diff<0),g.xp6(3),g.Q6J("ngForOf",e.globalEvents)}}function k(e,t){if(1&e&&(g.TgZ(0,"h4",27),g._uU(1),g.qZA()),2&e){const e=g.oxw(4);g.xp6(1),g.Oqu(e.uiState.seasonHeader)}}function x(e,t){if(1&e&&(g.TgZ(0,"ion-item",16),g.YNc(1,k,2,1,"h4",26),g.qZA()),2&e){const e=g.oxw(3);g.xp6(1),g.Q6J("ngIf",e.streamData&&e.streamData.games)}}function E(e,t){if(1&e&&(g.TgZ(0,"ion-item",16),g._uU(1),g.qZA()),2&e){const e=g.oxw(3);g.xp6(1),g.hij(" No active games for day ",e.streamData.games.sim.day,". ")}}function C(e,t){if(1&e){const e=g.EpF();g.TgZ(0,"ion-col",28),g.TgZ(1,"app-diamond",29),g.NdJ("refresh",function(){return g.CHM(e),g.oxw(3).refreshUI()}),g.qZA(),g.qZA()}if(2&e){const e=t.$implicit;g.xp6(1),g.Q6J("game",e)}}function F(e,t){if(1&e&&(g.TgZ(0,"span"),g.YNc(1,x,2,1,"ion-item",18),g.YNc(2,E,2,1,"ion-item",18),g.TgZ(3,"ion-grid",24),g.TgZ(4,"ion-row"),g.YNc(5,C,2,1,"ion-col",25),g.qZA(),g.qZA(),g.qZA()),2&e){const e=g.oxw(2);g.xp6(1),g.Q6J("ngIf",e.uiState.seasonHeader),g.xp6(1),g.Q6J("ngIf","active"===e.segment&&(!e.games||0===e.games.length)),g.xp6(3),g.Q6J("ngForOf",e.games)("ngForTrackBy",e.gameId)}}function D(e,t){if(1&e&&(g.TgZ(0,"span"),g.YNc(1,q,10,5,"span",3),g.YNc(2,F,6,4,"span",3),g.qZA()),2&e){const e=g.oxw();g.xp6(1),g.Q6J("ngIf",e.uiState.notice),g.xp6(1),g.Q6J("ngIf",!e.uiState.notice)}}const L=[{path:"",component:(()=>{class e{constructor(e,t,i,s,n){this.stream=e,this.database=t,this.loadingController=i,this.platform=s,this.settings=n,this.streamData=new h.m({}),this.games=[],this.segment="all",this.ready=!1,this.errors=0,this.lastUpdateTime=Date.now(),this.filterVisible=!1,this.stale=!1,this.staleThreshold=3e4,this.keepAwake=!1,this.PHASES=u.R,this.uiState={}}get schedule(){var e,t;return(null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.schedule)||[]}ngOnInit(){return(0,l.mG)(this,void 0,void 0,function*(){return yield this.platform.ready(),yield this.settings.ready,console.debug("LiveFeed.ngOnInit()"),this.showLoading(),this.segment=this.settings.segment(),yield this.startListening(),!0})}ngOnDestroy(){return(0,l.mG)(this,void 0,void 0,function*(){return this.ready=!1,this.subscription&&(this.subscription.unsubscribe(),this.subscription=void 0),!0})}scrollToTop(){return(0,l.mG)(this,void 0,void 0,function*(){this.content.scrollToTop()})}showLoading(){return(0,l.mG)(this,void 0,void 0,function*(){this.loading=!0})}hideLoading(){return(0,l.mG)(this,void 0,void 0,function*(){this.loading=!1,this.ready=!0})}forceRefresh(e){setTimeout(()=>{this.stream.retry().finally(()=>{var t;null===(t=null==e?void 0:e.target)||void 0===t||t.complete()})},500)}toggleSearchbar(){this.filterVisible=!this.filterVisible,console.debug(`LiveFeed.toggleSearchbar(): filterVisible=${this.filterVisible}`)}filterList(e){return this.searchTerm=e.srcElement.value,this.refreshUI()}getGameCount(){var e,t,i;return(null===(i=null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.schedule)||void 0===i?void 0:i.length)||0}getActiveGames(){var e,t;return(null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.schedule)?this.streamData.games.schedule.filter(e=>e.inProgress):[]}getActiveGameCount(){return this.getActiveGames().length}getFavoriteGames(){var e,t,i,s;return(null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.schedule)?null===(s=null===(i=this.streamData)||void 0===i?void 0:i.games)||void 0===s?void 0:s.schedule.filter(e=>this.settings.isFavorite(e.homeTeam)||this.settings.isFavorite(e.awayTeam)):[]}getFavoriteGameCount(){return this.getFavoriteGames().length}getSegmentGames(){var e,t;console.debug("LiveFeed.getSegmentGames()");let i=[];switch(this.segment){case"all":i=(null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.schedule)||[];break;case"active":i=this.getActiveGames();break;case"favorites":i=this.getFavoriteGames();break;default:console.warn(`LiveFeed.getSegmentGames(): unhandled segment: ${this.segment}`),i=[]}const s=this.settings.favoriteTeam();return i.sort((e,t)=>{if(e.homeTeam===s||e.awayTeam===s)return-1;if(t.homeTeam===s||t.awayTeam===s)return 1;if(this.settings.isFavorite(e.homeTeam)||this.settings.isFavorite(e.awayTeam))return-1;if(this.settings.isFavorite(t.homeTeam)||this.settings.isFavorite(t.awayTeam))return 1;const i=e.homeTeamNickname,n=t.homeTeamNickname;return i<n?-1:i>n?1:0})}doCountdown(e){this.clockUpdater||(this.clockUpdater=setInterval(()=>{this.countdown=this.streamData.sim[e]()},1e3))}getWinners(){var e,t,i;const s=(null===(i=null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.postseasons)||void 0===i?void 0:i.map(e=>{var t,i;const s=(null===(t=null==e?void 0:e.playoffs)||void 0===t?void 0:t.winner)||"";return{team:this.streamData.leagues.teams.find(e=>e.id===s),playoffsName:(null===(i=null==e?void 0:e.playoffs)||void 0===i?void 0:i.name)||""}}))||[];if(s.length)return console.debug("getWinners():",s),s}getPlayoffDay(){var e,t,i;const s=(null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.postseasons)||null;return s.length&&(null===(i=s[0].playoffs)||void 0===i?void 0:i.playoffDay)||0}getCountdown(){return`${this.countdown.hours} ${1===this.countdown.hours?"hour":"hours"}, ${this.countdown.minutes} ${1===this.countdown.minutes?"minute":"minutes"}, ${this.countdown.seconds} ${1===this.countdown.seconds?"second":"seconds"}`}refreshUI(){console.debug("LiveFeed.refreshUI()");let e=this.getSegmentGames();return this.searchTerm&&this.searchTerm.length>=2&&(e=e.filter(e=>e.homeTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1||e.awayTeamName.toLowerCase().indexOf(this.searchTerm.toLowerCase())>-1)),this.games=e,this.games}segmentChanged(e){e&&e.detail&&e.detail.value&&(this.segment=e.detail.value,this.settings.setSegment(this.segment)),console.debug("LiveFeed.segmentChanged():",e),this.refreshUI()}checkStale(){const e=this.stale;this.games&&this.games.length>0&&(this.stale=!!this.games.find(e=>e.inProgress)&&this.lastUpdateTime+this.staleThreshold<Date.now()),console.debug(`LiveFeed.checkStale(): ${e} -> ${this.stale}`)}checkDisableSleep(){console.debug("LiveFeed.checkDisableSleep()");const e=this.settings.disableSleep();try{e&&this.getActiveGameCount()>0?this.keepAwake||(console.debug("LiveFeed.checkDisableSleep(): keeping awake"),this.keepAwake=!0,c.keepAwake()):this.keepAwake&&(console.debug("LiveFeed.checkDisableSleep(): allowing sleep"),this.keepAwake=!1,c.allowSleep())}catch(t){console.error("An error occurred setting keep-awake status.",t)}}onEvent(e){return(0,l.mG)(this,void 0,void 0,function*(){if(console.debug("LiveFeed.onEvent()"),e&&e instanceof ErrorEvent)return console.warn("LiveFeed.onEvent(): got an error:",e),void this.onError(e);const t=e;this.lastUpdateTime=Date.now(),console.debug("LiveFeed.onEvent(): lastUpdateTime=",this.lastUpdateTime),setTimeout(()=>{this.errors=0,this.checkStale()},1e3);for(const e of Object.keys(t.data))this.streamData.data[e]=t.data[e];console.debug("LiveFeed.onEvent(): current data:",this.streamData),this.onUpdate()})}onError(e){console.debug("LiveFeed.onError():",e),this.onUpdate(),setTimeout(()=>{this.errors++,this.checkStale()},1e3)}onUpdate(){var e,t,i,s,n,o,a,r;return(0,l.mG)(this,void 0,void 0,function*(){this.checkDisableSleep(),this.refreshUI();const l={seasonHeader:void 0,notice:void 0,countdownNotice:void 0,winners:void 0};if(!this.streamData&&!this.streamData.sim)return;const c=null===(i=null===(t=null===(e=this.streamData)||void 0===e?void 0:e.games)||void 0===t?void 0:t.sim)||void 0===i?void 0:i.day,d=(this.streamData,null===(n=null===(s=this.streamData)||void 0===s?void 0:s.sim)||void 0===n?void 0:n.phase);switch(d){case u.R.REST:case u.R.PRESEASON:case u.R.POSTSEASON_END:case u.R.ELECTION:this.doCountdown("countdownToNextPhase"),l.notice="Games have finished for the season.",l.countdownNotice="Next season starts in:",l.winners=this.getWinners();break;case u.R.EARLY_SIESTA:this.doCountdown("countdownToNextPhase"),l.notice="Earlseason is complete.",l.countdownNotice="Midseason starts in:";break;case u.R.LATE_SIESTA:this.doCountdown("countdownToNextPhase"),l.notice="Midseason is complete.",l.countdownNotice="Lateseason starts in:";break;case u.R.SEASON_END:case u.R.PRE_POSTSEASON:this.doCountdown("countdownToNextPhase"),l.notice=`Regular Season ${this.streamData.seasonNumber} is over.`,l.countdownNotice="Earlpostseason starts in:";break;case u.R.EARLY_POSTSEASON_END:this.doCountdown("countdownToNextPhase"),l.notice="Earlpostseason is over.",l.countdownNotice="Latepostseason starts in:";break;case u.R.EARLY_POSTSEASON:l.seasonHeader=`Earlpostseason, Day ${c}`;break;case u.R.POSTSEASON:l.seasonHeader=`Postseason Round ${this.streamData.games.postseasons[0].playoffs.round}, Day ${c}`;break;case u.R.EARLSEASON:case u.R.MIDSEASON:default:l.seasonHeader=`Season ${null===(r=null===(a=null===(o=this.streamData)||void 0===o?void 0:o.games)||void 0===a?void 0:a.season)||void 0===r?void 0:r.seasonNumber}, Day ${c}`}!this.uiState.notice&&this.clockUpdater&&(clearInterval(this.clockUpdater),this.clockUpdater=void 0,this.countdown=void 0),this.phase=d,Object.assign(this.uiState,l),this.hideLoading()})}startListening(){var e;return(0,l.mG)(this,void 0,void 0,function*(){console.debug("LiveFeed.startListening(): opening event stream to blaseball.com"),this.showLoading(),null===(e=this.subscription)||void 0===e||e.unsubscribe(),this.subscription=yield this.stream.subscribe(e=>{this.onEvent(e)},e=>{this.onError(e)}),this.database.globalEvents().then(e=>{this.globalEvents=e.filter(e=>null===e.expire),setTimeout(()=>{const e=document.getElementById("marquee");e&&(new d(e),setTimeout(()=>{e.setAttribute("style","visibility: visible")},200))},1e3)})})}gameId(e,t){return t&&t.id?t.id:String(e)}}return e.\u0275fac=function(t){return new(t||e)(g.Y36(m.H),g.Y36(f.k),g.Y36(s.HT),g.Y36(s.t4),g.Y36(v.g))},e.\u0275cmp=g.Xpm({type:e,selectors:[["app-live-feed"]],viewQuery:function(e,t){if(1&e&&g.Gf(s.W2,5),2&e){let e;g.iGM(e=g.CRH())&&(t.content=e.first)}},decls:13,vars:4,consts:[["translucent","true"],["color","primary",3,"click"],["slot","secondary"],[4,"ngIf"],["slot","fixed",3,"ionRefresh"],["pullingIcon","baseball-outline"],["name","default"],["debounce","200","showCancelButton","focus",3,"value","ionInput",4,"ngIf"],["slot","primary"],[3,"value","ionChange"],["value","all"],["value","active"],["value","favorites"],[3,"click"],["name","search-outline"],["debounce","200","showCancelButton","focus",3,"value","ionInput"],["lines","none"],["lines","none",4,"ngFor","ngForOf"],["lines","none",4,"ngIf"],["id","marquee","data-speed","1"],[1,"marquee"],["class","marquee-item",4,"ngFor","ngForOf"],["team","home",3,"teamColor","emoji","name"],[1,"marquee-item"],[2,"margin-top","0","padding-top","0"],["size","12",4,"ngFor","ngForOf","ngForTrackBy"],["class","ion-no-margin",4,"ngIf"],[1,"ion-no-margin"],["size","12"],["prefix","live-diamond",3,"game","refresh"]],template:function(e,t){1&e&&(g.TgZ(0,"ion-header",0),g.TgZ(1,"ion-toolbar",1),g.NdJ("click",function(){return t.scrollToTop()}),g.TgZ(2,"ion-title"),g._uU(3,"Blases Loaded"),g.qZA(),g.TgZ(4,"ion-buttons",2),g.YNc(5,b,2,0,"ion-button",3),g.qZA(),g.qZA(),g.qZA(),g.TgZ(6,"ion-content"),g.YNc(7,T,17,4,"ion-toolbar",3),g.TgZ(8,"ion-refresher",4),g.NdJ("ionRefresh",function(e){return t.forceRefresh(e)}),g.TgZ(9,"ion-refresher-content",5),g._UZ(10,"ion-spinner",6),g.qZA(),g.qZA(),g.YNc(11,Z,1,1,"ion-searchbar",7),g.YNc(12,D,3,2,"span",3),g.qZA()),2&e&&(g.xp6(5),g.Q6J("ngIf",t.loading||t.stale),g.xp6(2),g.Q6J("ngIf",t.ready&&!t.uiState.notice),g.xp6(4),g.Q6J("ngIf",t.filterVisible),g.xp6(1),g.Q6J("ngIf",t.ready))},directives:[s.Gu,s.sr,s.wd,s.Sm,n.O5,s.W2,s.nJ,s.Wo,s.PQ,s.YG,s.gu,s.cJ,s.QI,s.GO,s.Q$,s.VI,s.j9,s.Ie,n.sg,p.h,s.jY,s.Nd,s.wI,w.A],styles:[".danger[_ngcontent-%COMP%]{color:#fff;background-color:var(--ion-color-danger);text-align:center;padding:4em}.danger[_ngcontent-%COMP%]   .big[_ngcontent-%COMP%]{font-size:200%;font-weight:bold}ion-searchbar[_ngcontent-%COMP%]{transition:.1s ease-in-out}ion-item[_ngcontent-%COMP%]{transition:.1s ease-in-out}#marquee[_ngcontent-%COMP%]{visibility:hidden}.marquee[_ngcontent-%COMP%]{position:absolute;bottom:0;overflow:hidden;white-space:nowrap;padding:.5em 0}.marquee-item[_ngcontent-%COMP%]{display:inline-block}"]}),e})()}];let U=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[r.Bz.forChild(L)],r.Bz]}),e})();var I=i(83669);let O=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=g.oAB({type:e}),e.\u0275inj=g.cJS({imports:[[s.Pc,n.ez,o.u5,U,a.T,I.Z]]}),e})()}}]);
//# sourceMappingURL=8380-es2015.e1a177a8fe9fa46f2c1e.js.map