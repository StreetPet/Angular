'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    config: grunt.file.readJSON('./environments/grunt.config.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '!js/*.js',
      ]
    },
    watch: {
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint']
      }
    },
    clean: {
      dist: [
      ]
    },
    firebase: {
      options: {
        reference: '<%= config.firebase.reference %>',
        token: '<%= config.firebase.token %>'
      },
      getMyFiles: {
        options: {
          mode: 'live'
        },
        files: [
           { src: '../Model/data/**/*.json' },
           { src: '../Model/data/**'}
        ]
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-firebase');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};