module.exports = function(grunt){
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		sass : {
			compile : {
				files : {
					'css/main.css' : 'scss/main.scss'  
				}
			}
			
		},

		clean: {
			remove_dist : {
				src: ['./dist']
			},
			final_clean : {
				src: ['dist/css/*', '!dist/css/styles.min.css', 'dist/js/*', '!dist/js/main.min.js']
			}
		},

		copy : {
			copy_files : {
				files : [
					{
						expand: true,
				cwd: './',
				src: ['**', '!**/node_modules/**', '!**/bower_components/**', 
					'!bower.json', '!package.json', '!gruntfile.js'],
				dest: './dist/'
					},
					{'dist/css/unsemantic.css' : ['bower_components/unsemantic/assets/stylesheets/unsemantic-grid-responsive-tablet-no-ie7.css']},
					{'dist/js/jquery.js' : ['bower_components/jquery/dist/jquery.min.js']}
				]
				

			}
		},
		uglify : {
			minify_js: {
				files : {
					'dist/js/main.min.js' : ['dist/js/jquery.js', 'dist/js/main.js']
				}
			}
		},
		prettyugly : {
			minify_css : {
				files : {
					'dist/css/styles.min.css' : ['dist/css/main.css', 'dist/css/unsemantic.css']
				}
			}
		},
		processhtml : {
			process : {
				files : {
					'dist/index.html' : ['dist/index.html']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-prettyugly');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-sass');

	//compile sass
	//call == grunt sass
	grunt.registerTask('compile_sass', ['sass'])

 	// Default task(s).
  	grunt.registerTask('default', ['clean:remove_dist', 'copy', 'uglify', 'prettyugly', 'processhtml', 'clean:final_clean']);

};

