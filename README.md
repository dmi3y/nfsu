# nfsu [![Build Status](http://img.shields.io/travis/dmi3y/nfsu.svg?style=flat&branch=nfsu)](http://travis-ci.org/dmi3y/nfsu)


> Wrapper for low level NodeJS filesystem utilities.

Mixed `fs` and `path` toolkit, plus commonly used syncronious shortcuts on top.

## Usage

```js

    var nfsu = require('nfsu');
```

## Cheatsheet

```js

    nfsu.readFileStr(file/*str*/);
```

Reads `file` and returns string representation of it or `false` if file does not exists.

```js

    nfsu.readFileJson(file/*str*/);
```

Reads JSON `file` and returns parsed JSON object or `false` if file does not exists.

```js

    nfsu.readDir(target/*str*/);
```

Reads `target` directory and returns array of contained folders/files or `false` if directory does not exists.

```js

   nfsu.ifFile(target/*str*/);
```

Checks if `target` is file and returns `true` if so and `false` if it is not or file does not exists.

```js

   nfsu.ifDir(target);
```

Checks if `target` is directory and returns `true` if so and `false` if it is not or directory does not exists.

```js

   nfsu.lookDownFilesByExts(targets/*arr*/, exts/*arr*/, opt/*obj*/);
```

Recursively iterates down through all the 'targets' folder items and gathers all the files wich are listed into `exts` (.css, .js, .jpg etc).
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


nfsu.lookDownFilesByExts([d/], ['.n'], {excl:['d/y.n'], base: 'a/b/c/'})
This is right -> {'.n':['<fullpath>/a/b/c/d/x.n','<fullpath>/a/b/c/d/z.n']}

~~nfsu.lookDownFilesByExts([a/b/c/d/], ['.n'], {excl:['a/b/c/d/y.n'], base: 'a/b/c/'})~~
This is  wrong -> {'.n':[]}

Tip: To filter files with no extention provide empty sting into 'exts' array.
[""] - will look down files with no extention.

```js 

    nfsu.lookUpFileByName(filename/*str*/, base/*str*/, stopby/*str*/);
````

Recursively iterates up from the current working directory or `base` untill `filename` found, or userhome|`stopby`|top directory.
Returns resolved file path, or `null` if nothing is found.

In addition all the `fs` and `path` methods available through according properties:
`nfsu.fs` and `nfsu.path`, and its shortcuts `nfsu.f` and `nfsu.p`

## License
Copyright (c) 2014 Dmitry Lapshukov. Licensed under the MIT license.
