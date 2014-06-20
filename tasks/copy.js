/*

Copies files from one place to another. Can also be used to do concatenation.

*/

var shell = require("shelljs");

module.exports = function(grunt) {

  grunt.registerTask("copy", "Copy source files to build folder", function() {
    if (!grunt.file.exists("build")) {
      grunt.file.mkdir("build");
    }

    shell.cp("-r", "src/mugs", "build");
  });

};