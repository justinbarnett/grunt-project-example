module.exports = function(grunt) {

  grunt.initConfig({
    concat: { //our grunt-contrib-concat plugin settings
      options: {
        separator: ';'
      },
      js: {
        src: [
          "public/js/*.js" //all .js files in public/js/
        ],
        dest: 'public/src/app.js' //output the result of concatenating them all to public/src/app.js
      }
    },
    uglify: { //our grunt-contrib-uglify plugin settings
      options: {
        banner: '/*! Created on: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        src: '<%= concat.js.dest %>', //we specified 'public/src/app.js' in our concat settings above 
        dest: 'public/src/app.min.js'
      }
    },
    cssmin: { //our grunt-contrib-cssmin plugin settings
      combine: {
        files: {
          'public/src/app.css': [
            "public/css/*.css" //combine all css files in public/css/ and output it to public/src/app.css
          ]
        }
      },
      minify: {
        expand: true,
        cwd: 'public/src/', //current working directory
        src: ['*.css', '!*.min.css'], //minify all files in our cwd EXCEPT the minified file
        dest: 'public/src/',
        ext: '.min.css'
      }
    },
    watch: { //our grunt-contrib-watch settings
      css: {
        files: 'public/css/*.css',
        tasks: ["concat", 'cssmin']
      },
      js_concat: {
        files: "<%= concat.js.src %>",
        tasks: ['concat']
      },
      js_uglify: {
        files: '<%= uglify.dist.src %>',
        tasks: ['uglify']
      }
    }
  });
  
  //load and register the grunt tasks with our settings
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};