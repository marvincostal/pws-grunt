module.exports = function(grunt) {

  grunt.initConfig({
    dir : {
      less: 'less',
      css: 'css',
      js: 'js',
      img: 'img'
    },

    less: {
      dist: {
        options: {
          paths: ['<%= dir.css %>'],
          plugins: [
            new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions", "Firefox > 20", "ie > 8"]}),
            new (require('less-plugin-clean-css'))({advanced: true})
          ]
        },
        files: {
          "<%= dir.css %>/main.css": "<%= dir.less %>/*.less"
        }
      }
    },
    jshint : {
      options : {
        globals : {
          jQuery : true
        }
      },
      files : ['<%= dir.js %>/**/*.js']
    },

    concat : {
      dist: {
        src : '<%= dir.js %>/min/plugins/*.js',
        dest : '<%= dir.js %>/plugins.min.js'
      }
    },

    uglify : {
      dist : {
        files: [{
          expand: true,
          cwd: '<%= dir.js %>',
          src: '**/*.js',
          dest: '<%= dir.js %>/min'
        }]
      } 
    },

    imagemin : {
      dev : {
        files: [{
          expand: true,
          cwd: '<%= dir.img %>',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= dir.img %>'
        }]
      }
    },

    watch : {
      options : {
        message : 'task complated'
      },
      less : {
        files: ['<%= dir.less %>/**/*.less'],
        tasks : ['less']
      },
      js : {
        files : '<%= jshint.files %>',
        tasks : ['jshint']
      },
      img : {
        files : '<%= dir.img %>',
        tasks : ['imagemin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['uglify','concat']);
}