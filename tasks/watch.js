/*

Standard configuration from grunt-contrib-watch:
- Compile LESS when source files change
- Compile page template when index.html changes
- Compile JSON data when CSVs change
- (optional) Run optimizer on AMD modules when JS files change

*/

module.exports = function(grunt) {

  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.config.merge({
    watch: {
      less: {
        files: ["src/**/*.less"],
        tasks: ["less", "template"]
      },
      templates: {
        files: ["src/**/*.html", "csv/**/*.csv"],
        tasks: ["template"]
      },
      js: {
        files: ["src/js/**/*.js"],
        tasks: ["amd", "template"]
      }
    }
  });

}