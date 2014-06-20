

module.exports = function(grunt) {

  //load tasks
  grunt.loadTasks("./tasks");

  grunt.registerTask("template", "Perform a complete build of data and templates", ["state", "json", "csv", "build"]);
  grunt.registerTask("default", ["copy", "amd", "less", "template", "connect:dev", "watch"]);
}