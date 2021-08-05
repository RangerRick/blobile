
> blobile@3.1.0 changelog /Volumes/Share/git/blobile
> conventional-changelog -p angular -i CHANGELOG.md -r 0

# [3.1.0](https://github.com/RangerRick/blobile/compare/v3.0.0-78...v3.1.0) (2021-08-05)


### Bug Fixes

* **assets:** fix weather offsets ([cab9ae1](https://github.com/RangerRick/blobile/commit/cab9ae1de6265e9809cd4a78b7866bbb975f4027))
* remove X-Requested-With CORS error ([ac3c388](https://github.com/RangerRick/blobile/commit/ac3c388d7fddfd174702d7c4dfb04366e3e1fc66))
* turn off named chunks to make gh-pages happy ([cea95ae](https://github.com/RangerRick/blobile/commit/cea95ae37f3a336d79be869f0ff08ab8fe803104))
* use new CORS proxy ([56dace4](https://github.com/RangerRick/blobile/commit/56dace401b34d12a16074c3c1453884d0aa74904))


### Features

* **assets:** supernova eclipse ([ee3c6e3](https://github.com/RangerRick/blobile/commit/ee3c6e39da2b91db7789dcb730ad1999fb320c18))
* **weather:** add recent weathers ([e4cdda5](https://github.com/RangerRick/blobile/commit/e4cdda5ee07b21c6e4331bd06ce78a18a4644966))



# [3.0.0-78](https://github.com/RangerRick/blobile/compare/v3.0.0-77...v3.0.0-78) (2021-05-10)


### Bug Fixes

* **api:** add debugging for Static.get() ([12ce329](https://github.com/RangerRick/blobile/commit/12ce329cc6a2de2da8b0f3da3df7a9a0174146a1))
* **update:** not injected ([12f571c](https://github.com/RangerRick/blobile/commit/12f571c1393a4e799f38c547125828b1db0d017f))
* **update:** undo broken beta channel config ([5f5b641](https://github.com/RangerRick/blobile/commit/5f5b641d773b8c37a5df9cef8ab02d8b1fc0c14e))


### Features

* **api:** load weather dynamically if possible ([6bc6029](https://github.com/RangerRick/blobile/commit/6bc60295abb8f555dd35c9ec4c4ae614c70e3ea1))
* **weather:** flood -> flooding ([1af41e2](https://github.com/RangerRick/blobile/commit/1af41e238d74ee840985b9d2dffe8da64fdad1f7))



# [2.0.0-76](https://github.com/RangerRick/blobile/compare/v2.0.0-75...v2.0.0-76) (2021-04-09)


### Features

* **model:** salmon chanted evening, you may see a stranger ([a0fa26a](https://github.com/RangerRick/blobile/commit/a0fa26a4cc9d079d8c0974eb1fe7777d3d482ebb))



# [2.0.0-75](https://github.com/RangerRick/blobile/compare/v2.0.0-74...v2.0.0-75) (2021-03-18)


### Bug Fixes

* **model:** update text should have a space if scoreUpdate is set ([47ad618](https://github.com/RangerRick/blobile/commit/47ad61868fb524eeb4ba971ace3f0515d186ab77)), closes [#232](https://github.com/RangerRick/blobile/issues/232)



# [2.0.0-74](https://github.com/RangerRick/blobile/compare/v2.0.0-73...v2.0.0-74) (2021-03-04)


### Features

* **live-feed:** support earlsiesta and latesiesta countdown display ([9e99e3d](https://github.com/RangerRick/blobile/commit/9e99e3d8f1fed9b59c5abe936b9627ca4cceaaeb))
* **standings:** wins, nonLosses, losses ([080eb9c](https://github.com/RangerRick/blobile/commit/080eb9c37000ff67c5da5e468c361a921d91b439))



# [2.0.0-73](https://github.com/RangerRick/blobile/compare/v2.0.0-72...v2.0.0-73) (2021-03-02)


### Bug Fixes

* **api:** fix inconsistent response parsing ([f71ebf0](https://github.com/RangerRick/blobile/commit/f71ebf0416c4445c3dc5fa43f4b8df0c0af71d69))



# [2.0.0-72](https://github.com/RangerRick/blobile/compare/v2.0.0-71...v2.0.0-72) (2021-03-01)


### Bug Fixes

* **api:** wait for device before deciding on CORS URL ([e39022f](https://github.com/RangerRick/blobile/commit/e39022f92be8a8bd934d962476b69d1a2436ebff))
* **score-box:** show HOME/AWAY if team info does not load ([f65a675](https://github.com/RangerRick/blobile/commit/f65a6757bc8223528593b301e7c3f32ef68b4364))



# [2.0.0-71](https://github.com/RangerRick/blobile/compare/v1.3.1-69...v2.0.0-71) (2021-03-01)


### Bug Fixes

* **index:** use relative for base href ([a153423](https://github.com/RangerRick/blobile/commit/a153423af82c92b89fae3af2ac7f4313dbdbbf25))
* **live-feed:** no more PHASES.BOSS_FIGHT for now ([b0ab3d9](https://github.com/RangerRick/blobile/commit/b0ab3d987ee80fe78e4a059356a5bdaa80022ce1))
* **model:** fix phase handling to use new phases ([11da44f](https://github.com/RangerRick/blobile/commit/11da44fc13d265b694cf4b627af37cd133003c22))
* **stream:** fix typescript issue ([7c232e2](https://github.com/RangerRick/blobile/commit/7c232e2dc7a842977c458798d74a29b3e638564b))


### Features

* **about:** update about with garages info ([9194f10](https://github.com/RangerRick/blobile/commit/9194f10bf23fbd73b837212cc7b8da2605c6ca7f))
* **diamond:** update diamond to use lastUpdate+scoreUpdate ([88e3acf](https://github.com/RangerRick/blobile/commit/88e3acfaa28c433d4fd0c77445139f417d3efa78))
* **model:** add new fields to game ([6976733](https://github.com/RangerRick/blobile/commit/697673326c322ba27f5ab27a491cf679195fc598))
* **model:** new weather ([c7fb599](https://github.com/RangerRick/blobile/commit/c7fb599669b65503d7bf1305e2075f95d532a9fe))



## [1.3.1-69](https://github.com/RangerRick/blobile/compare/v1.3.1-68...v1.3.1-69) (2020-12-01)


### Features

* weather always comes in 3s ([479f142](https://github.com/RangerRick/blobile/commit/479f142b762111dd91b3a69384870752bdb6e451))



## [1.3.1-68](https://github.com/RangerRick/blobile/compare/v1.3.1-67...v1.3.1-68) (2020-11-24)


### Bug Fixes

* **a11y:** add some aria labels to various controls ([0edfedc](https://github.com/RangerRick/blobile/commit/0edfedca628d464179ca1bb92c57644565379215))


### Features

* Coffee 2: Electric Boogaloo ([cb034ea](https://github.com/RangerRick/blobile/commit/cb034ea182b67d573b1fd8a040f8e88c87f11087))
* dumb percolated animation ([ac9eeae](https://github.com/RangerRick/blobile/commit/ac9eeae1687f4ac13e4c92cf1bc4cda908e67159))



## [1.3.1-67](https://github.com/RangerRick/blobile/compare/v1.3.1-66...v1.3.1-67) (2020-11-18)


### Bug Fixes

* **matchups:** a little fine tuning to shrink the window a bit ([05739cd](https://github.com/RangerRick/blobile/commit/05739cd09c30ab006e7807a908c12f2501735b17))



## [1.3.1-66](https://github.com/RangerRick/blobile/compare/v1.3.1-65...v1.3.1-66) (2020-11-17)


### Bug Fixes

* **matchups:** make layout work better on iOS ([1e6e4b3](https://github.com/RangerRick/blobile/commit/1e6e4b32480c9e2d4cca03128124618564ea05d0))
* **team-component:** screw it, use pt ([1247569](https://github.com/RangerRick/blobile/commit/1247569b6008062fd70dc15362fe810cc0605362))



## [1.3.1-65](https://github.com/RangerRick/blobile/compare/v1.3.1-64...v1.3.1-65) (2020-11-17)


### Features

* **live-feed:** show the tournament name in tournament mode ([0c9be3a](https://github.com/RangerRick/blobile/commit/0c9be3ae8c2c8caa9f8d4dd66b7ab95bdd80e6d2))



## [1.3.1-64](https://github.com/RangerRick/blobile/compare/v1.3.1-63...v1.3.1-64) (2020-11-17)


### Bug Fixes

* **index:** use relative for base href ([df0ef01](https://github.com/RangerRick/blobile/commit/df0ef01cc47d47d408024066565ae493a785c90f))


### Features

* only show standings during regular season ([3b247c0](https://github.com/RangerRick/blobile/commit/3b247c0f3a712417699b9b9f54a4b88de98cc40c))



## [1.3.1-63](https://github.com/RangerRick/blobile/compare/v1.3.0-61...v1.3.1-63) (2020-11-17)


### Bug Fixes

* **model:** fix masked "emoji" property ([70578cc](https://github.com/RangerRick/blobile/commit/70578cced4c8abf737160b585e369a0a001f8d22))
* **team:** make border scaler with font size ([f4158d0](https://github.com/RangerRick/blobile/commit/f4158d0aff6a5a18ae3eb2678a1abb440bd3f4ba))


### Features

* **live-feed:** handle tournament inbetween phase(s) ([0882db7](https://github.com/RangerRick/blobile/commit/0882db7f374a91df62030a01a82f2e1e09d431a7))
* **live-feed:** use lozenge for team name in championship notice ([cf14c2f](https://github.com/RangerRick/blobile/commit/cf14c2fac5971af7498ac8a9a85f426d7b6c6a13))
* **matchups:** add matchups/bracket page ([3e05203](https://github.com/RangerRick/blobile/commit/3e052037dfc9b00b9184227666915b17a8055ccb))
* **model:** add Coffee weather ([b468bd6](https://github.com/RangerRick/blobile/commit/b468bd69260d36cdbb9b4706868adafbff016b83))
* **model:** add tournament phases ([ea09081](https://github.com/RangerRick/blobile/commit/ea09081b73a145a9773ca581c5ffa2f8492912ec))
* **model:** seed is incremented, add gamesNeeded ([7f09246](https://github.com/RangerRick/blobile/commit/7f092465baa3d49752c0a5357aa004f28770a2da))



# [1.3.0-61](https://github.com/RangerRick/blobile/compare/v1.3.0-60...v1.3.0-61) (2020-10-25)


### Bug Fixes

* **diamond:** a few visual tweaks ([42fd379](https://github.com/RangerRick/blobile/commit/42fd3792604ab4e5157be3130978049acca3719c))
* **live-feed:** fix error during initialization ([2405056](https://github.com/RangerRick/blobile/commit/2405056fb9b34da6def233c074edd33031f9ad89))
* **standings:** do not show playoff cutoff since it can be wrong ([c35252f](https://github.com/RangerRick/blobile/commit/c35252fc8a18247a4aa2fd2f8196a0280fade524))



# [1.3.0-60](https://github.com/RangerRick/blobile/compare/v1.3.0-59...v1.3.0-60) (2020-10-24)


### Bug Fixes

* **diamond:** fix series length in playoffs ([89b418b](https://github.com/RangerRick/blobile/commit/89b418b7728e5459273057748158991681381c8d))
* **live-feed:** show postseason header after round 1 ([b3ca51d](https://github.com/RangerRick/blobile/commit/b3ca51d823a48bcbc0ee7e205409771211d5f523))



# [1.3.0-59](https://github.com/RangerRick/blobile/compare/v1.2.0-58...v1.3.0-59) (2020-10-23)


### Bug Fixes

* **diamond:** more attempts at cleaning up the team names ([47967f5](https://github.com/RangerRick/blobile/commit/47967f5b9ad6242fe25d7db44f0a641a7f188268))
* **live-feed:** Sun 2 ([67a484d](https://github.com/RangerRick/blobile/commit/67a484d985fdb0a4e86e699e77f368a1a3eb9aba))


### Features

* **live-feed:** boss fight? ([e9fa118](https://github.com/RangerRick/blobile/commit/e9fa1181b9895ddeae4ea63b004eeb053a0faa46))
* **model:** update model to handle phase, bossFights ([6147a93](https://github.com/RangerRick/blobile/commit/6147a939f42bd9a450c42ad098fc87932c5d4d1f))
* **team-component:** support icon-only ([ee6f58e](https://github.com/RangerRick/blobile/commit/ee6f58e035e6b466868cc2502bef4d50d59248ab))



# [1.2.0-58](https://github.com/RangerRick/blobile/compare/v1.2.0-57...v1.2.0-58) (2020-10-19)


### Bug Fixes

* **game-detail:** fix font sizes to match ([57815b2](https://github.com/RangerRick/blobile/commit/57815b2afad631005522116ab69e56b1fffd0939))


### Features

* **game-detail:** better deduplication using playCount ([d98fb46](https://github.com/RangerRick/blobile/commit/d98fb4662d717f46987e18b95e435fb2e4b7841e))
* **game:** weather "black hole" ([f1cdb94](https://github.com/RangerRick/blobile/commit/f1cdb94e5a6fe06aeb49b0d0c3c92bb0b2e178cc))



# [1.2.0-57](https://github.com/RangerRick/blobile/compare/v1.2.0-54...v1.2.0-57) (2020-10-19)


### Bug Fixes

* **diamond:** show play-by-play button properly ([44c9c75](https://github.com/RangerRick/blobile/commit/44c9c75f2f59c2f965293bcdc9ee864f7e4693f0))
* **diamond:** shrink teams a bit to fit smaller screens ([1fcfbfa](https://github.com/RangerRick/blobile/commit/1fcfbfa1a9b0ec70ec6f8de3fdb236daa6dcf399))
* **live-feed:** fix team emoji display here too ([f25ac8b](https://github.com/RangerRick/blobile/commit/f25ac8bed9699e15448f09f69d4cfc983bbe63d8))
* **standings:** fix display now that Tokyo Bro even Lifts ([6fa13c1](https://github.com/RangerRick/blobile/commit/6fa13c1bbf82546a015c41feb29f90786508ed20))
* **team-component:** actually show the emoji :/ ([ec91995](https://github.com/RangerRick/blobile/commit/ec9199595b1dc89037685dba19c6b24f717c87ad))


### Features

* **live-feed:** make feed chooser toolbar scrollable ([3eefb74](https://github.com/RangerRick/blobile/commit/3eefb7489c61fe85bf87fa6b60bb51916e385373))
* **live-feed:** show normal day, match blaseball.com ([cffb653](https://github.com/RangerRick/blobile/commit/cffb653c5dd3f44afd11408774a3bda477007d08))
* **score-box:** move the inning caret over a tiny bit ([168b05e](https://github.com/RangerRick/blobile/commit/168b05e0c1abee26e5f551376d266a1530969ef7))
* **score-box:** shrink the log box a little ([ef52e36](https://github.com/RangerRick/blobile/commit/ef52e36ba792fbf1b7a43649648e128bc79b61e8))



# [1.2.0-54](https://github.com/RangerRick/blobile/compare/v1.2.0-53...v1.2.0-54) (2020-10-16)


### Bug Fixes

* **settings:** load settings *before* making expensive rest call :/ ([d7ce5ff](https://github.com/RangerRick/blobile/commit/d7ce5ff65c0df34b4102d845d24e64bb2e72a684))
* **update:** fix update service to run properly ([80aceeb](https://github.com/RangerRick/blobile/commit/80aceebe069f8843952c616b228dff1b5cb0865b))


### Features

* **diamond:** add game over/series/weather drop shadow ([aba1623](https://github.com/RangerRick/blobile/commit/aba162344d2a51e92606bc8d9e286ca6ae79c36b))
* **ui:** allow landscape mode on mobile ([edf4641](https://github.com/RangerRick/blobile/commit/edf464188b75247abca59b2f3519be9984827aa3))



# [1.2.0-53](https://github.com/RangerRick/blobile/compare/v1.2.0-52...v1.2.0-53) (2020-10-15)


### Bug Fixes

* **assets:** use relative paths to fix base href= issue ([102ada6](https://github.com/RangerRick/blobile/commit/102ada60f2c7cc26952fb7ea4485065c0e02e22a))
* **diamond:** change threshold for side-by-side ([231cc10](https://github.com/RangerRick/blobile/commit/231cc10e472aa48eed656d4878d8a36ca4004809))
* **score-box:** fix a bunch of score-box layout issues ([3f42ff1](https://github.com/RangerRick/blobile/commit/3f42ff101dabdebae437995619db8bffa35d2371))


### Features

* **database:** customizable caching, add gamesByDay query ([a8a4a84](https://github.com/RangerRick/blobile/commit/a8a4a84797d99ffa2e8a9777585c02f572cf4d1a))
* **diamond:** add (unused) record, it is expensive ([60d7267](https://github.com/RangerRick/blobile/commit/60d7267a4edcd9e8cbf4dc32102d6b8c0f8c3bfe))
* **diamond:** lots of layout improvements, add weather, series, game over text ([1451f8e](https://github.com/RangerRick/blobile/commit/1451f8ee0727b5694d775b8c50e69d04145f5604))
* **model:** additional convenience methods for game ([50dea3b](https://github.com/RangerRick/blobile/commit/50dea3b525aaa59706668575fe3e3883cda7db4e))
* **model:** more useful game accessors, including weather ([fecdca6](https://github.com/RangerRick/blobile/commit/fecdca67d24867d65adc71f1e573efcd5dd6e126))
* **score-box:** convert score-box to SVG ([832a03d](https://github.com/RangerRick/blobile/commit/832a03d7dbb71862afe61364cb10057ce76e9825))



# [1.2.0-52](https://github.com/RangerRick/blobile/compare/v1.1.6-51...v1.2.0-52) (2020-10-13)


### Bug Fixes

* **diamond:** fix maximum blaseball calc, use new game metadata ([5913e6f](https://github.com/RangerRick/blobile/commit/5913e6fdeb342a98d62b843ad5bb7b89cfe9a08b))
* **score-box:** pass hideLog and openTeam ([adbcae3](https://github.com/RangerRick/blobile/commit/adbcae3576cade6691792cc3edd4f561cacaefad))


### Features

* **diamond:** support wide-screen layout, also scorebox fixes ([99b2755](https://github.com/RangerRick/blobile/commit/99b275529b42da938eecb6ba067419d34cc3d602))
* enable game detail view with text-to-speech ([a1ba0f7](https://github.com/RangerRick/blobile/commit/a1ba0f7654ab864644b5d3f621139695a7c98da9))
* **model:** add additional convenience properties for game metadata ([4a64d39](https://github.com/RangerRick/blobile/commit/4a64d39f60c85210939395c6e4de6dd8e9a53b40))



## [1.1.6-51](https://github.com/RangerRick/blobile/compare/v1.1.6-50...v1.1.6-51) (2020-09-29)


### Bug Fixes

* **database:** fix issue with player query (again) ([f005df2](https://github.com/RangerRick/blobile/commit/f005df25a187f1a8010a89fdf8185cfc25e5e194))
* **database:** handle missing result properly ([f479aab](https://github.com/RangerRick/blobile/commit/f479aab1c6f06d9625ce82e7ed2a6e02bb979b5c))
* **diamond:** switch home and away to match blaseball.com ([32ec8bb](https://github.com/RangerRick/blobile/commit/32ec8bb61754ecaecad54a802cfc0d6df62ded53))
* **live-feed:** use Countdown typescript def from sim ([e88ef8e](https://github.com/RangerRick/blobile/commit/e88ef8e1522cd1f6bd53099e33d3ce2870ce0ef8))
* **stream:** fix eventsource leak on retry, increase exponential multiplier ([a9c984b](https://github.com/RangerRick/blobile/commit/a9c984b7ef00c30581955354cf72dbd341a438e2))


### Features

* **diamond:** a few more effects, also clean up ordering ([65e807c](https://github.com/RangerRick/blobile/commit/65e807cbd3c3ba195d6d85bbbf0296caa3436069))
* **live-feed:** be appropriately vague on unhandled/negative countdowns ([60c5c69](https://github.com/RangerRick/blobile/commit/60c5c6977130d8bb15de87c6b03084932bb959de))
* **sim:** include the raw diff in the countdown response ([9ff46a7](https://github.com/RangerRick/blobile/commit/9ff46a7c0b4ab69675207d66393425c6ccc46b25))



## [1.1.6-50](https://github.com/RangerRick/blobile/compare/v1.1.6-49...v1.1.6-50) (2020-09-25)


### Bug Fixes

* **dev:** try to clean up on refresh ([dc40235](https://github.com/RangerRick/blobile/commit/dc40235d1abad8f98337f05036fd42d29bcfdbde))
* **live-feed:** only show countdown if it is positive (sigh) ([2de4f8f](https://github.com/RangerRick/blobile/commit/2de4f8ffbaede44b1bc4effda75e7dd918102f6e))


### Features

* **diamond:** party time ([7cd16cc](https://github.com/RangerRick/blobile/commit/7cd16ccb86c2e2998adcad839bbef60c307e6346))



## [1.1.6-49](https://github.com/RangerRick/blobile/compare/v1.1.6-48...v1.1.6-49) (2020-09-25)


### Bug Fixes

* **standings:** looks like I had tiebreaker sort backwards :/ ([1bc3007](https://github.com/RangerRick/blobile/commit/1bc3007d5d0b1ea24361d2beeb3d667aa879f969))



## [1.1.6-48](https://github.com/RangerRick/blobile/compare/v1.1.6-47...v1.1.6-48) (2020-09-25)


### Bug Fixes

* **database:** handle empty results ([2c4e738](https://github.com/RangerRick/blobile/commit/2c4e738c71007d938b4a0faa4568f0a9a31f1314))


### Features

* **effects:** add zap and flicker ([160e7e5](https://github.com/RangerRick/blobile/commit/160e7e5681e3e1f50f52a8efd91cbbc14dca0854))



## [1.1.6-47](https://github.com/RangerRick/blobile/compare/v1.1.6-46...v1.1.6-47) (2020-09-25)


### Bug Fixes

* **standings:** fix tiebreakers, also clean up layout a tad ([a3948c4](https://github.com/RangerRick/blobile/commit/a3948c4f52000744847976f44cbaba96d7377b76))
* **stream:** subject, not observable :/ ([d134a61](https://github.com/RangerRick/blobile/commit/d134a61acda6dfda6b49caeba762fd5542693e98))



## [1.1.6-46](https://github.com/RangerRick/blobile/compare/v1.1.6-45...v1.1.6-46) (2020-09-25)


### Bug Fixes

* **stream:** fix freezing on background ([5c698c9](https://github.com/RangerRick/blobile/commit/5c698c9311522e62f3dbe993ae7f876df53cefce))



## [1.1.6-45](https://github.com/RangerRick/blobile/compare/v1.1.6-44...v1.1.6-45) (2020-09-21)


### Bug Fixes

* **settings:** apply properly ([8baeb37](https://github.com/RangerRick/blobile/commit/8baeb371dbde2068e1a0b06d56f815262fb76a8e))



## [1.1.6-44](https://github.com/RangerRick/blobile/compare/v1.1.6-43...v1.1.6-44) (2020-09-21)


### Bug Fixes

* **settings:** set dark mode immediately ([2ea0830](https://github.com/RangerRick/blobile/commit/2ea08300a6fadd4febb7f6df269463ee1630a2d9))
* **updates:** repair broken beta channel stuff ([30fb7db](https://github.com/RangerRick/blobile/commit/30fb7db1b4a6785905a62533c7dbcc082be2277a))



## [1.1.6-43](https://github.com/RangerRick/blobile/compare/v1.1.6-42...v1.1.6-43) (2020-09-20)


### Bug Fixes

* **android:** crash on launch from settings ([cc1ffa5](https://github.com/RangerRick/blobile/commit/cc1ffa52f3db21bf69c42c332902b186f0473355))
* **database:** need some extra steps on Android ([04c0670](https://github.com/RangerRick/blobile/commit/04c0670f34a42ef5793cf01bcc1f1d4cfbdfa3d2))



## [1.1.6-42](https://github.com/RangerRick/blobile/compare/v1.1.5-39...v1.1.6-42) (2020-09-20)


### Bug Fixes

* **diamond:** fix drop-shadow on safari ([3e4a938](https://github.com/RangerRick/blobile/commit/3e4a938a2e5c52cd3d7c13d9b817d633eb199027))
* **diamond:** make a button for opening game detail rather than clicking the diamond ([4242433](https://github.com/RangerRick/blobile/commit/4242433f87bfa99c98dfa5150a1fa5c3193ae7fa))
* **diamond:** make sure the effects apply to the right diamond ([18cd37e](https://github.com/RangerRick/blobile/commit/18cd37eb16a8089e78d5e774d553494e77c1a9b4))
* **game-detail:** slight delay before opening ([eecf041](https://github.com/RangerRick/blobile/commit/eecf041f91bf33507d78f05d27572bc1f70f1285))
* **live-feed:** rework display, show countdown to postseason now ([52db567](https://github.com/RangerRick/blobile/commit/52db56746ea838d721e78afab1755db6b5ed9f77))
* **live-feed:** work around by using the src import for now ([71ae792](https://github.com/RangerRick/blobile/commit/71ae792d1909ecd3e2b867b1ff54b04429d80b27))
* **settings:** fix beta configuration ([b04ee36](https://github.com/RangerRick/blobile/commit/b04ee360ebd9323f140f8a81e17a9ff5568fbd80))
* **settings:** load dark mode setting properly ([a339938](https://github.com/RangerRick/blobile/commit/a3399380c6b627944ddf6bcfd2010f4eee30b0fe))
* **settings:** only show elements once initialized ([8550426](https://github.com/RangerRick/blobile/commit/85504261563a136bdae47659d3aa8bc06ade239d))


### Features

* add "game detail" view ([f9d875d](https://github.com/RangerRick/blobile/commit/f9d875d761318d9306aaa7378a589df5384f3366))
* add support for always using dark mode ([36cb5bd](https://github.com/RangerRick/blobile/commit/36cb5bd3ebffe7056c476d174202e36de5d912e2))
* bump eventsource dep, use builtin keep-awake code ([9616619](https://github.com/RangerRick/blobile/commit/96166190654525365bd52fcfbd7388e2630c8ea6))
* **diamond:** a fourth base?!? ([31a02ff](https://github.com/RangerRick/blobile/commit/31a02ffd924cd504466afd5dfcc1bacb751a221a))
* **game-detail:** basic TTS ([de59145](https://github.com/RangerRick/blobile/commit/de59145a470f8d30cf6677453146d1b4d76980a5))
* **game-detail:** use new voice service ([d4645db](https://github.com/RangerRick/blobile/commit/d4645db9f753b11f8c5b0a5c506de4ffb0fe7afa))
* **model:** additional metadata from s7 ([97eee85](https://github.com/RangerRick/blobile/commit/97eee85ca3120fff33669f7b0e0780e517a4e96f))
* mute/unmute from game log ([388c551](https://github.com/RangerRick/blobile/commit/388c551042a3ff20dea5acd3f219eb5cfd5557bc))
* sound! launch audio, and audio settings ([4e426d9](https://github.com/RangerRick/blobile/commit/4e426d958cd318a3b38d53c2556ddb77ae64e3a9))
* **standings:** show playoff cutoff ([4ec7cb1](https://github.com/RangerRick/blobile/commit/4ec7cb1fc77cb8bd5d4df1638adaf14ac65ba1ec))
* **team:** close icon instead of text ([51d5a77](https://github.com/RangerRick/blobile/commit/51d5a775671452d522a41d4b9b3d7c214341de48))



## [1.1.5-39](https://github.com/RangerRick/blobile/compare/v1.1.5-38...v1.1.5-39) (2020-09-17)


### Bug Fixes

* give the team selector a whole row ([485d4f0](https://github.com/RangerRick/blobile/commit/485d4f002cca284670f1dfe512d28eaab534b3f7))


### Features

* **standings:** show loading marker, fix title size ([a97495d](https://github.com/RangerRick/blobile/commit/a97495d7d785e39f9bba9713d1949af997ef4884))



## [1.1.5-38](https://github.com/RangerRick/blobile/compare/v1.1.5-37...v1.1.5-38) (2020-09-17)


### Bug Fixes

* oops, remove test data :) ([484e301](https://github.com/RangerRick/blobile/commit/484e3015ca1dacdd71458b497b8c0c6b27af152d))



## [1.1.5-37](https://github.com/RangerRick/blobile/compare/v1.1.5-36...v1.1.5-37) (2020-09-17)


### Bug Fixes

* fix settings not always sticking ([f929551](https://github.com/RangerRick/blobile/commit/f929551caf430fe950e5a93f35a5636f18b61a99))


### Features

* reverb effect, also some refactoring ([6849709](https://github.com/RangerRick/blobile/commit/6849709562251ce06d5c59cd883ff9414ae89168))



## [1.1.5-36](https://github.com/RangerRick/blobile/compare/v1.1.5-35...v1.1.5-36) (2020-09-17)


### Features

* add support for reduced motion on effects ([1acc05a](https://github.com/RangerRick/blobile/commit/1acc05a6af9b35238949f6c0af016b21b1f73b0e))



## [1.1.5-35](https://github.com/RangerRick/blobile/compare/v1.1.5-34...v1.1.5-35) (2020-09-16)


### Bug Fixes

* still streamlining events ([f3dbb1a](https://github.com/RangerRick/blobile/commit/f3dbb1a676346b72dc8cb6ad224ca78866fa56e0))



## [1.1.5-34](https://github.com/RangerRick/blobile/compare/v1.1.5-33...v1.1.5-34) (2020-09-16)


### Bug Fixes

* more attempts at fixing initialization issues ([80edd23](https://github.com/RangerRick/blobile/commit/80edd2335a7e48a236cce3ae05cdd14a2bee57c0))



## [1.1.5-33](https://github.com/RangerRick/blobile/compare/v1.1.5-32...v1.1.5-33) (2020-09-16)


### Bug Fixes

* **settings:** shorten text to fit screen ([6e17bba](https://github.com/RangerRick/blobile/commit/6e17bbab95a2a0cbe0ad02babeaad2f756b09960))



## [1.1.5-32](https://github.com/RangerRick/blobile/compare/v1.1.4-31...v1.1.5-32) (2020-09-16)


### Bug Fixes

* **model:** typo in subleagues ([568129f](https://github.com/RangerRick/blobile/commit/568129f0246d1112c326d9f620f22866b2c2508c))


### Features

* **standings:** working standings ([d597cbb](https://github.com/RangerRick/blobile/commit/d597cbbd50887d02a8a6b656a4a2c83bf3ab9a45))
* **updates:** improve update feedback and algorithm ([41c42fa](https://github.com/RangerRick/blobile/commit/41c42fa8743a1698417aef7d19fb17e16aaafb63))



## [1.1.4-31](https://github.com/RangerRick/blobile/compare/v1.1.4-30...v1.1.4-31) (2020-09-14)


### Bug Fixes

* **diamond:** fix displaying short names on 1st and 3rd ([47c9cbe](https://github.com/RangerRick/blobile/commit/47c9cbec86afc005e308e033c35f67c60a3d2f0e))
* **live-feed:** only initialize marquee if offseason ([76a50e6](https://github.com/RangerRick/blobile/commit/76a50e6548434efad68c5702d3d0bac2817f81ac))
* **live-feed:** show the season number again ([8aae71a](https://github.com/RangerRick/blobile/commit/8aae71a679f29d37b27c6019a4bbf800b799b51d))



## [1.1.4-30](https://github.com/RangerRick/blobile/compare/v1.1.4-28...v1.1.4-30) (2020-09-14)


### Bug Fixes

* **api:** shorten first retry, simplify backgrounding ([f0d6e32](https://github.com/RangerRick/blobile/commit/f0d6e329b4ea524b0bfa95632ae8673a914dd742))
* **diamond:** fix text outline on diamond ([c405a8e](https://github.com/RangerRick/blobile/commit/c405a8e0ae27181538a9f51de39fa533caaa67cb))
* **diamond:** missing bat image ([477663e](https://github.com/RangerRick/blobile/commit/477663e93d49a7ac81b4f1270f0d8fa1c5d84d31))
* **diamond:** tweak black text outline ([eb723dd](https://github.com/RangerRick/blobile/commit/eb723dddff92d2276eb4774bfffc89dc62620626))
* fix postseason calculation (again) ([d0305cc](https://github.com/RangerRick/blobile/commit/d0305cc1e66fbe8e659b3b9da15b8fea29dcd74f))
* **live-feed:** fix "no active games" to show postseason day ([a9ad3ab](https://github.com/RangerRick/blobile/commit/a9ad3abcb755f67f08af271cedb0b5a8999dfd0f)), closes [#10](https://github.com/RangerRick/blobile/issues/10)
* **live-feed:** fix playoff day offset ([c8eb1c1](https://github.com/RangerRick/blobile/commit/c8eb1c1edd5df51df53e3bc5f245fe8b88dbc78a))
* **live-feed:** race condition in initialization ([da1b3ec](https://github.com/RangerRick/blobile/commit/da1b3ec9bed7e24b22dbfec9e6581279ec400cbb))
* **live-feed:** screw it, time is but a construct ([80201a4](https://github.com/RangerRick/blobile/commit/80201a4fa7c9f36c440fcdc7ee35162792cfbee1))
* **model:** typo and add series to game ([e3bfcef](https://github.com/RangerRick/blobile/commit/e3bfcef770453ca048bd40c194acf9fc74b7b0ef))
* **settings:** sort team names in chooser ([19c8d1c](https://github.com/RangerRick/blobile/commit/19c8d1c9c7b06ce51c6c4fa840d0460d8d3a8624))
* **stream:** make sure eventsource is closed before cleaning up handles ([f747f5c](https://github.com/RangerRick/blobile/commit/f747f5c57c95e2e2b4107a5fb73d9d726fa5c139))


### Features

* add apple icon for "add to home screen" ([f132291](https://github.com/RangerRick/blobile/commit/f1322910a1a6967853766361e44721d2985057ff))
* add setup for full pwa support ([f9bedf1](https://github.com/RangerRick/blobile/commit/f9bedf1fb579b45cf81c922a8f91285c32860569))
* **diamond:** show who is pitching and who is hitting ([a2a04f9](https://github.com/RangerRick/blobile/commit/a2a04f9a5067e8a29ef008b9103e8b92df8f80ad))
* **diamond:** wrap names, other visual improvements ([7da6b32](https://github.com/RangerRick/blobile/commit/7da6b324e48db91b0fee4686321cee0f773099f5)), closes [#8](https://github.com/RangerRick/blobile/issues/8)
* **live-feed:** show global event ticker during downtime ([49c7140](https://github.com/RangerRick/blobile/commit/49c71402a1d608accc4ed512c1783056282edf8d))



## [1.1.4-28](https://github.com/RangerRick/blobile/compare/v1.1.4-27...v1.1.4-28) (2020-09-11)


### Features

* **api:** proper caching/in-flight handling of urls ([3780e38](https://github.com/RangerRick/blobile/commit/3780e38c7ccd7e71df32290b161970d97ab18717))
* hide splashscreen after initial startup ([92342fe](https://github.com/RangerRick/blobile/commit/92342fea5a610f5ad8f54ec71532e5703e59f3a3))
* **model:** hash game for better change detection ([e108796](https://github.com/RangerRick/blobile/commit/e1087969a1bbd71bfa2996ce5aae43f6b7cfa0bc))
* remember last URL for next launch ([39639af](https://github.com/RangerRick/blobile/commit/39639af790b8692090e2dcf3076e47792c6a5399))
* **util:** reduce default effect duration by half-second ([020aeee](https://github.com/RangerRick/blobile/commit/020aeee04e29c4e059466c3ed6345b087089b768))



## [1.1.4-27](https://github.com/RangerRick/blobile/compare/v1.1.4-26...v1.1.4-27) (2020-09-11)


### Bug Fixes

* **api:** initialize observable immediately ([d8f5e7f](https://github.com/RangerRick/blobile/commit/d8f5e7fddd99d425ac628a8f638bb5d7d1fcfc92))
* **live-feed:** move effect-handling to diamond ([d916d50](https://github.com/RangerRick/blobile/commit/d916d50c3cbee7f4b79f2cd24c40a86c2d0c2d99))
* **model:** a few cleanups to game handling ([b588da9](https://github.com/RangerRick/blobile/commit/b588da949c134cf3ee4cabf2f33ba935815c76ac))


### Features

* **live-feed:** add incineration ([23846ea](https://github.com/RangerRick/blobile/commit/23846eaefa1c7853db42a8312f91952a5df41058))
* **util:** allow disabling blink in messages ([2279f6f](https://github.com/RangerRick/blobile/commit/2279f6fa9ea262535035bd9fe673f0d5a8013cfd))



## [1.1.4-26](https://github.com/RangerRick/blobile/compare/v1.1.4-25...v1.1.4-26) (2020-09-11)


### Bug Fixes

* **live-feed:** change wording when no games ([5819a1a](https://github.com/RangerRick/blobile/commit/5819a1a0f04a5717768eacdb8fcdf0186fea3096))
* **live-feed:** fix sorting by starred teams ([e28eaa9](https://github.com/RangerRick/blobile/commit/e28eaa9c9801b3fad206409b85c5c0384c8e3921))


### Features

* **live-feed:** more confetti/special options ([bcafb8a](https://github.com/RangerRick/blobile/commit/bcafb8a32854c6ecfe70051de7025f1ab0297e23))
* **model:** track awayStrikes & homeStrikes in game ([53cc739](https://github.com/RangerRick/blobile/commit/53cc73980e98bd753405db566cf69494c15f7bc8))



## [1.1.4-25](https://github.com/RangerRick/blobile/compare/v1.1.3-23...v1.1.4-25) (2020-09-10)


### Bug Fixes

* **diamond:** fix team lozenge truncation on ipad ([64c8ea4](https://github.com/RangerRick/blobile/commit/64c8ea433d7694a6ca640cd5271cf310b14c70a2))
* **model:** remove extraneous logging ([17e387b](https://github.com/RangerRick/blobile/commit/17e387b5fb7dac638c0cfc7d446237e2440f85ba))
* **settings:** actually reload ([89d59ba](https://github.com/RangerRick/blobile/commit/89d59ba33311b322cf07877be200f2a66a80a6b4))
* **settings:** wrap text on settings page ([d15f670](https://github.com/RangerRick/blobile/commit/d15f670461d3884429347b586b04e4382a0dd226)), closes [#7](https://github.com/RangerRick/blobile/issues/7)


### Features

* **live-feed:** home run effect ([21a8209](https://github.com/RangerRick/blobile/commit/21a8209a365e59f7df11b6c77395e49d427ac6a2))



## [1.1.3-23](https://github.com/RangerRick/blobile/compare/v1.1.2-22...v1.1.3-23) (2020-09-09)



## [1.1.2-22](https://github.com/RangerRick/blobile/compare/v1.1.1-21...v1.1.2-22) (2020-09-08)



## [1.1.1-21](https://github.com/RangerRick/blobile/compare/v1.1.0-20...v1.1.1-21) (2020-09-07)


### Bug Fixes

* **update:** canceling auto-update no longer breaks blaseball updates ([2ce2783](https://github.com/RangerRick/blobile/commit/2ce278303f33800105b5cf93d0bf8890518b1937))
* **web:** use hash strategy so github pages works ([e95ee34](https://github.com/RangerRick/blobile/commit/e95ee34a91fc34b75000a15e931e3ce232bb5500))



# [1.1.0-20](https://github.com/RangerRick/blobile/compare/v1.0.6-17...v1.1.0-20) (2020-09-03)



## [1.0.6-17](https://github.com/RangerRick/blobile/compare/v1.0.5-15...v1.0.6-17) (2020-09-02)



## [1.0.5-15](https://github.com/RangerRick/blobile/compare/v1.0.4-14...v1.0.5-15) (2020-09-02)



## [1.0.4-14](https://github.com/RangerRick/blobile/compare/v1.0.2-12...v1.0.4-14) (2020-08-31)



## [1.0.2-12](https://github.com/RangerRick/blobile/compare/v1.0.1-10...v1.0.2-12) (2020-08-30)



## 1.0.1-10 (2020-08-30)



