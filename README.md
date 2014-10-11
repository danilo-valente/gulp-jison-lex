gulp-jison-lex
==============

Jison-lex plugin for gulp


Installation
------------

You can install gulp-jison-lex via `npm install`:

`npm install gulp-jison-lex`


Example
-------

```javascript
var gulp = require('gulp');
var jisonLex = require('gulp-jison-lex');

gulp.task('jisonlex', function () {
    return gulp.src('src/grammar.jisonlex')
        .pipe(jisonLex())
        .pipe(gulp.dest('dist'));
});
```


Usage
-----

`jisonLex([options])`

gulp-jison-lex currently supports the options below:
 * `json`: (`Boolean`) Parses the input files as JSON files (Default: `false`)
 * `outFile`: (`String`) Output file path (Default: `<input_file_name>.js`)
 * `moduleName`: (`String`) The name of the module to generate (Default: `lexer`)
 * `moduleType`: (`String`) The type of the module to generate. Can be either `js`, `amd` or `commonjs` (Default: `js`)
 
License
-------

See [LICENSE](https://github.com/danilo-valente/gulp-jison-lex/blob/master/LICENSE).