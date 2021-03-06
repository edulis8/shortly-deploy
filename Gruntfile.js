module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      //common names here -- prod, build, dist:
      dist : {
        src : [
              'public/client/app.js',
              'public/client/link.js',
              'public/client/links.js',
              'public/client/linkView.js',
              'public/client/linksView.js',
              'public/client/createLinkView.js',
              'public/client/router.js'
              ],
        dest : 'public/build/production-client.js',
      },
      dist2 : {
         src : [
        'public/lib/jquery.js',
         'public/lib/underscore.js',
         'public/lib/backbone.js',
         'public/lib/handlebars.js'
         ],
        dest : 'public/build/production-lib.js'
      }

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      // target: can have as many as you want, for distribution, testing, staging, etc:
      build: {
        src: 'public/build/production-client.js',
        dest: 'public/build/production-client.min.js'
      },
      build2: {
        src: 'public/build/production-lib.js',
        dest: 'public/build/production-lib.min.js'
      }
      
    },

    jshint: {
      files: [
        'app/**/*.js',
        'lib/**/*.js',
        'Gruntfile.js',
        'index.js',
        'server.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/build/**/*.js'
        ]
      }
    },

    cssmin: {
      css: {
        src: 'public/style.css',
        dest: 'public/build/production.min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        //command: 'git push heroku master',
        //options {
          //stout: true
//          sterr: true
//      failOnError: true
          //}
      }
    },
  });
  // need to do this not just have them in package.json
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
 // Our own tasks:
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  //                              'build'
  grunt.registerTask('default', ['concat', 'cssmin', 'uglify', 'jshint']);

  grunt.registerTask('test', [
    //jshint
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    //concat
    //uglify
    //cssmin
  ]);
  //this gets called for us by buildpack:         here could be just- 'build'
  grunt.registerTask('heroku:production', ['concat', 'cssmin', 'uglify', 'jshint']);

  grunt.registerTask('upload', function(n) {
    // if in prod environment:
    if(grunt.option('prod')) {
      // add your production server task here
      //                  pick a target
      // grunt.task.run(['shell:prodServer'])
      // grunt shell runs all targets
      // grunt shell:prodServer or maybe grunt shell --prod just does the one
    } else {
      //if in dev environment:
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    // test
    // build
    // upload
  ]);


};
