# nfsu [![Build Status](http://img.shields.io/travis/dmi3y/nfsu.svg?style=flat&branch=nfsu)](http://travis-ci.org/dmi3y/nfsu)


> Wrapper for low level NodeJS filesystem utilities.

Mixing up `fs` and `path` and adding commonly used syncronious shortcuts on top.

## Usage

```js

    var nfsu = require('nfsu');
```

## API Cheatsheet

* __nfsu.readFileStr(file/*str*/);__ - Reads `file` and returns string representation of it or `false` if file does not exists.

* __nfsu.readFileJson(file/*str*/);__ - Reads JSON `file` and returns parsed JSON object or `false` if file does not exists.

* __nfsu.readDir(target/*str*/);__ - Reads `target` directory and returns array of contained folders/files or `false` if directory does not exists.

* __nfsu.ifFile(target/*str*/);__ - Checks if `target` is file and returns `true` if so and `false` if it is not or file does not exists.

* __nfsu.ifDir(target);__ - Checks if `target` is directory and returns `true` if so and `false` if it is not or directory does not exists.

* __nfsu.lookDownFilesByExts(targets/*arr*/, exts/*arr*/, opt/*obj*/);__ - Recursively iterates down through all the 'targets' folder items and gathers all the files wich are listed into `exts` (.css, .js, .jpg etc).
Additionally `opt` configuration may be provided.

```js

   opt = { excl:['exclude/folder', 'exclude/file.js'], base: '/basefolder' };
```

By default opt.base is current working directory.

Returns object with key(s) as file extentions and value(s) array of accordingly resolved file pathes found to that extention, or empty array if there is nothing found.

Headsup: if `opt.base` speceficly provided, relative `targets` and `opt.excl` folders/files have to take it into account.
Eg:

```
    ..(cwd)/a/b/c/d/x.n
                 /d/y.n
                 /d/z.n
                 /e/...
```


nfsu.lookDownFilesByExts([d/], ['.n'], {excl:['d/y.n'], base: 'a/b/c/'}) -> {'.n':['<fullpath>/a/b/c/d/x.n','<fullpath>/a/b/c/d/z.n']}

~~nfsu.lookDownFilesByExts([a/b/c/d/], ['.n'], {excl:['a/b/c/d/y.n'], base: 'a/b/c/'})~~ -> {'.n':[]}

Tip: To filter files with no extention provide empty sting into 'exts' array.
[""] - will look down files with no extention.

* __nfsu.lookUpFileByName(filename/*str*/, base/*str*/, stopby/*str*/);__ - Recursively iterates up from the current working directory or `base` untill `filename` found, or userhome|`stopby`|top directory.
Returns resolved file path, or `null` if nothing is found.

In addition all the `fs` and `path` methods available through according properties:
`nfsu.fs` and `nfsu.path`, and its shortcuts `nfsu.f` and `nfsu.p`

## License
Copyright (c) 2014 Dmitry Lapshukov. Licensed under the MIT license.
