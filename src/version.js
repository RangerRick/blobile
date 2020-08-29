const { gitDescribeSync } = require('git-describe');
const plist = require('plist');
const { resolve, relative } = require('path');
const { readFileSync, writeFileSync } = require('fs-extra');

const { version, build } = require('../package.json');

const gitInfo = gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
});

gitInfo.version = version;
gitInfo.build = build;

const file = resolve(__dirname, '..', 'src', 'environments', 'version.ts');
writeFileSync(file,
`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const VERSION = ${JSON.stringify(gitInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`Wrote version info ${gitInfo.raw} to ${relative(resolve(__dirname, '..'), file)}`);

const infoFile = resolve(__dirname, '..', 'ios', 'App', 'App', 'Info.plist');
const infoPlist = plist.parse(readFileSync(infoFile, 'utf-8'));
infoPlist.CFBundleVersion = String(build);
infoPlist.CFBundleShortVersionString = String(version);
// console.log(infoPlist);
writeFileSync(infoFile, plist.build(infoPlist));

console.log(`Updated ${relative(resolve(__dirname, '..'), infoFile)}`);
