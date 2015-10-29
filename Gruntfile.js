// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

      // get the configuration info from package.json ----------------------------
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),

      // configure jshint to validate js files -----------------------------------
      jshint: {
        options: {
          reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
        },

        // when this task is run, lint the Gruntfile and all js files in src
        build: ['Grunfile.js', 'src/**/*.js']
      },

      // configure uglify to minify js files -------------------------------------
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        build: {
          files: {
            'dist/js/script.min.js': ['src/js/common.js', 'src/js/home.js', 'src/js/about.js']
          }
        }
      },

      // compile jade file to html -----------------------------------------
      jade: {
        build: {
          files: {
            'dist/index.html': 'src/jade/index.jade'
          }
        }
      },

      // compile less stylesheets to css -----------------------------------------
      less: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        build: {
          files: {
            'dist/css/style.css': 'src/less/style.less'
          }
        }
      },

      // configure cssmin to minify css files ------------------------------------
      cssmin: {
        build: {
          files: {
            'dist/css/style.min.css': 'dist/css/style.css'
          }
        }
      },

      // configure copy images from src to dist folder ---------------------------
      copy: {
        images: {
          files: [
            { 
              expand: true,
              cwd: 'src/images/', 
              src: ['**/*.{png,jpg,svg}'], 
              dest:'dist/images/' 
            }
          ]
        }
      },

      // configure watch for chaanges in JS, CSS and Jade files -------------------
      watch: {
        files: ['**/*.js','**/*.jade','**/*.less'],
        tasks: ['jshint','uglify','jade','less','cssmin']
      }

    });


  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['jshint', 'uglify', 'jade', 'less', 'cssmin', 'copy', 'watch']);

};