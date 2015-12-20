module.exports = function(grunt) {

  var js = "./resources/js/";

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", { "presets": "es2015"}]]
        },
        files: {
          "site/js/build.js": js + "index.js"
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8001,
          base: 'site'
        }
      }
    },
    watch: {
      scripts: {
        files: js + "**/*.js",
        tasks: ["browserify"]
      }
    }

  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");

  grunt.registerTask("dev", ["browserify", "connect", "watch"])
  grunt.registerTask("default", ["browserify"]);
};