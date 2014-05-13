/*
 * Node filesystem utilities
 *
 * Copyright (c) 2014 Dmitry Lapshukov
 * Licensed under the MIT license.
 */

'use strict';

var
    fs = require('fs'),
    _path = require("path"),

    nfsu = {
        userhome: process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,

        existsSync: fs.existsSync,
        resolve: _path.resolve,
        dirname: _path.dirname,

        readFile: function(path) {
            return fs.existsSync(path) && fs.readFileSync(path).toString();
        },

        readJson: function(path) {
            return JSON.parse(this.readFile(path));
        },

        readdirSync: function(path) {
            return fs.existsSync(path) && fs.readdirSync(path);
        },

        isFile: function(path) {
            return fs.existsSync(path) && fs.statSync(path).isFile();
        },

        isDirectory: function(path) {
            return fs.existsSync(path) && fs.statSync(path).isDirectory();
        },

        lookdownFiles: function(targets, exts, opt) {
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
                return self.resolve(process.cwd() + '/' + el);
            });
            base = this.resolve(opt.base || process.cwd());

            (function digup(trgs, base) {
                var
                    trgsLen = trgs.length,
                    it,
                    fullpath,
                    ext,
                    i;

                for (i = 0; i < trgsLen; i += 1) {
                    it = trgs[i];
                    fullpath = self.resolve(base + '/' + it);

                    if (excl.indexOf(fullpath) === -1) {

                        if (self.isFile(fullpath)) {
                            ext = (/\.[^\.]*$/.exec(it) || ['']).pop();
                            if (files[ext]) {
                                files[ext].push(fullpath);
                            }

                        } else if (self.isDirectory(fullpath)) {

                            digup(self.readdirSync(fullpath), fullpath);
                        }
                    }

                }

            }(targets, base));

            return files;
        },

        lookupFile: function(rcname, base, stopby) {
            var
                lookupd = base || process.cwd(),
                userhome = this.userhome,
                stop = this.resolve(stopby || userhome),
                file,
                fullpath,
                self = this;

            function isGoodToGoUp() {
                var
                    isStop = (lookupd === stop),
                    _lookupd = self.resolve(lookupd + '/../'),
                    isTop = (lookupd === _lookupd),
                    gtg;

                file = self.isFile(fullpath);

                gtg = (!file && !isStop && !isTop);
                lookupd = _lookupd;
                return gtg;
            }

            (function traverseUp() {

                fullpath = self.resolve(lookupd, rcname);

                if (isGoodToGoUp()) {
                    traverseUp();
                }
            }());

            return file ? fullpath : null;
        }
    };

module.exports = nfsu;
