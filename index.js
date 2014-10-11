var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var lexParser = require('lex-parser');
var jisonLex = require('jison-lex');

const PLUGIN_NAME = 'gulp-jison-lex';

module.exports = function (options) {
    options = options || {};

    return through.obj(function (file, encoding, callback) {

        if (file.isNull()) {
            // Do nothing
        }

        if (file.isStream()) {
            // Not yet supported
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported yet'));
        }

        if (file.isBuffer()) {

            file = file.clone();

            file.path = options.outFile
                ? path.resolve(path.dirname(file.path), './', options.outFile)
                : gutil.replaceExtension(file.path, '.js');

            try {
                var grammar = file.contents.toString();
                if (options.json) {
                    grammar = JSON.parse(grammar);
                } else {
                    grammar = lexParser.parse(grammar);
                }

                grammar.options = grammar.options || {};
                grammar.options.moduleName = options.moduleName;
                grammar.options.moduleType = options.moduleType;

                var lexer = jisonLex.generate(grammar);
                file.contents = new Buffer(lexer);
            } catch (err) {
                this.emit('error', new gutil.PluginError(PLUGIN_NAME, err));
            }
        }

        this.push(file);

        return callback();
    });
};