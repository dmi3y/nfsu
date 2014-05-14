/*
 * Node filesystem utilities
 *
 * Copyright (c) 2014 Dmitry Lapshukov
 * Licensed under the MIT license.
 */

'use strict';

var
    nfsu = {
        userhome: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        readFileStr: function(file) {
            file = this.p.resolve(file);
            return this.f.existsSync(file) && this.f.readFileSync(file).toString();
        },

        readFileJson: function(file) {
            file = this.p.resolve(file);
            return JSON.parse(this.f.readFile(file));
        },

        readDir: function(target) {
            target = this.p.resolve(target);
            return this.f.existsSync(target) && this.f.readdirSync(target);
        },

        ifFile: function(target) {
            target = this.p.resolve(target);
            return this.f.existsSync(target) && this.f.statSync(target).isFile();
        },

        ifDir: function(target) {
            target = this.p.resolve(target);
            return this.f.existsSync(target) && this.f.statSync(target).isDirectory();
        },

        lookdownFilesByExts: function(targets, exts, opt) {
            var
                extsLen = exts.length,
                files = {},
                excl,
                base,
                self = this;

            for (; extsLen--;) {
                files[exts[extsLen]] = [];
            }

            opt = opt || {};
            excl = (opt.excl || []).map(function(el) {
                return self.p.resolve(process.cwd() + '/' + el);
            });
            base = this.p.resolve(opt.base || process.cwd());

            (function digup(trgs, base) {
                var
                    trgsLen = trgs.length,
                    it,
                    fullpath,
                    ext,
                    i;

                for (i = 0; i < trgsLen; i += 1) {
                    it = trgs[i];
                    fullpath = self.p.resolve(base + '/' + it);

                    if ( excl.indexOf(fullpath) === -1 ) {

                        if ( self.ifFile(fullpath) ) {
                            ext = (/\.[^\.]*$/.exec(it) || ['']).pop();
                            if (files[ext]) {
                                files[ext].push(fullpath);
                            }

                        } else if ( self.ifDir(fullpath) ) {

                            digup(self.readDir(fullpath), fullpath);
                        }
                    }

                }

            }(targets, base));

            return files;
        },

        lookupFileByName: function(file, base, stopby) {
            var
                lookupd = base? this.p.resolve(base): process.cwd(),
                userhome = this.userhome,
                stop = this.p.resolve(stopby || userhome),
                isFile,
                fullpath,
                self = this;

            function isGoodToGoUp() {
                var
                    isStop = (lookupd === stop),
                    _lookupd = self.p.resolve(lookupd + '/../'),
                    isTop = (lookupd === _lookupd),
                    gtg;

                isFile = self.ifFile(fullpath);

                gtg = (!isFile && !isStop && !isTop);
                lookupd = _lookupd;
                return gtg;
            }

            (function traverseUp() {

                fullpath = self.p.resolve(lookupd, file);

                if (isGoodToGoUp()) {
                    traverseUp();
                }
            }());

            return isFile ? fullpath : null;
        }
    },
    proto = Object.create({
        fs: require('fs'),
        path: require("path")
    }),
    p;

for (p in nfsu) {
    if ( nfsu.hasOwnProperty(p) ) {
        proto[p] = nfsu[p];
    }
}

proto.f = proto.fs;
proto.p = proto.path;

module.exports = proto;
