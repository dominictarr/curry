var assert = require('assert');
var curry = require('curry');
var spawn = require('child_process').spawn;

exports.anon = function () {
    assert.equal(
        curry([3], function (x,y) { return x * 2 + y })(4),
        3 * 2 + 4
    );
};

exports.repl = function () {
    var node = spawn('node');
    node.stdout.on('data', function (buf) {
        node.stdin.write(
            'require("curry")([3], function (x,y) { return x * 2 + y })(4)\n'
        );

        node.stdout.removeListener('data',arguments.callee)

        node.stdout.on('data', function (buf) {
            node.stdin.end();
            
            var s = buf.toString();
            if (!s.match(/^10\s+/)) {
                console.error(s);
                assert.fail('Invalid response');
            }
        node.stdout.removeListener('data',arguments.callee)
        })
    });
};
