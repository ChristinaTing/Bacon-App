   module.exports = function(grunt) {
         // Project configuration.
         grunt.initConfig({
             pkg: grunt.file.readJSON('package.json'),
             // Set up configuration options
             sass: {
                 dist: {
    
                     files: {
                         'style.css': 'style.scss'
                     }
                 }
             },
             autoprefixer: {
             		options:{
             			browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
             		},
             		no_dest: {
             			src:'style.css'
             		}
             	},
             watch:{
             	css: {
             		files:['*.scss'],
             		tasks:['sass', 'autoprefixer']
             	},
                jade: {
                    files:["*.jade"],
                    tasks:["jade"]
                },
             	options: {
             		livereload:true
             	},
             //    SVGinject: {
             //        files:['svgs/SVGinject.js'],
             //        tasks:["svginject"]
             //    }
              },
             connect: {
             	server: {
             		options: {
             			port: 9001,
             			base:''
             		}
             	}
             },
             jade: {
                compile: {
                    options: {
                      data: {
                        debug: false
                      }
                    },
                    files: {
                      "test.html": ["test.jade"]
                    }
                  }
             }, 
             svginject: {
                 all : {
                   options: {},
                   files: {
                      'SVGinject.js': ['svgs/*.svg'],
                   }
                 }
               }

         });

         // Load the task plugins
         grunt.loadNpmTasks('grunt-contrib-sass');
         grunt.loadNpmTasks('grunt-autoprefixer');
         grunt.loadNpmTasks('grunt-contrib-watch');
         grunt.loadNpmTasks('grunt-contrib-connect');
         grunt.loadNpmTasks('grunt-contrib-jade');
        grunt.loadNpmTasks('grunt-svginject');
         

         // Define Tasks.
         grunt.registerTask('default', ['connect','watch']);
         grunt.registerTask('svg', ['svginject']);
     };