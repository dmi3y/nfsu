'use strict';

var h = require('../nfsu.js');

exports.nfsu = {
    'lookdownFiles': function(test) {
        var
        exp1 = {
            '.css': [
                h.resolve('test/assets/a/a.css'),
                h.resolve('test/assets/a/b/b.css'),
                h.resolve('test/assets/a/b/c/d/d.css'),
                h.resolve('test/assets/x/x.css'),
                h.resolve('test/assets/x/y/z.css')
            ],
            '.csslintrc': [
                h.resolve('test/assets/a/.csslintrc')
            ]
        },
            res1 = h.lookdownFiles(['test/'], ['.csslintrc', '.css']),
            exp2 = {
                '.css': [
                    h.resolve('test/assets/x/x.css')
                ],
                '.csslintrc': []
            },
            res2 = h.lookdownFiles(['test/'], ['.csslintrc', '.css'], {
                excl: ['test/assets/a', 'test/assets/x/y/z.css']
            }),
            exp3 = {
                '.css': [
                    h.resolve('test/assets/x/x.css'),
                    h.resolve('test/assets/x/y/z.css')
                ]
            },
            res3 = h.lookdownFiles(['x/'], ['.css'], {
                base: 'test/assets/'
            });

        exp1['.css'].sort();
        exp1['.csslintrc'].sort();
        res1['.css'].sort();
        res1['.csslintrc'].sort();

        exp2['.css'].sort();
        exp2['.csslintrc'].sort();
        res2['.css'].sort();
        res2['.csslintrc'].sort();

        exp3['.css'].sort();
        res3['.css'].sort();

        test.expect(3);
        test.deepEqual(exp1, res1);
        test.deepEqual(exp2, res2);
        test.deepEqual(exp3, res3);
        test.done();
    },
    'lookupFile': function(test) {
        var
        exp1 = h.resolve('test/assets/a/.csslintrc'),
            res1 = h.lookupFile('.csslintrc', h.resolve('test/assets/a/b/c/d')),
            exp2 = h.resolve('package.json'),
            res2 = h.lookupFile('package.json'),
            exp3 = null,
            res3 = h.lookupFile('_some_bizzar_filename-YOLO_HARDLY-ever-to_EXIST_');

        test.expect(3);
        test.equal(exp1, res1);
        test.equal(exp2, res2);
        test.equal(exp3, res3);
        test.done();
    }
};
