#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
// var json = JSON.parse(fs.readFileSync('./package.json'));

// console.log(fs);

function copyTemplate (from, to) {
    from = path.join(__dirname, 'templates', from);
    write(to, fs.readFileSync(from, 'utf-8'))
}
function write (path, str, mode) {
    fs.writeFileSync(path, str)
}
function mkdir (path, fn) {
    fs.mkdir(path, function (err) {
        fn && fn()
    })
}

var PATH = '.';
var config = {};
// process.argv.slice(2).forEach( function (item) {
//     switch (item) {
//         case "-v":
//             console.log(json.version);
//             break;
//     }
// });


// 拷贝index.html文件在根目录
copyTemplate("index.html",PATH+'/index.html');
// 拷贝package.json文件根目录
copyTemplate("package.json", PATH + '/package.json');
//
mkdir(PATH + '/public',function () {
    // 新建css文件夹
    mkdir(PATH + '/public/css',function () {
        // 拷贝css文件到目录里
        copyTemplate("css/reset.css",PATH + '/public/css/reset.css');
        copyTemplate("css/animate.css",PATH + '/public/css/animate.css');
    });
    // 新建img文件夹
    mkdir(PATH +'/public/img');
    // 新建js文件夹
    mkdir(PATH + '/public/js',function () {
        // 拷贝js文件到目录里
        copyTemplate("js/gevas.js",PATH + '/public/js/gevas.js');
        copyTemplate("js/jquery-1.11.3.min.js",PATH + '/public/js/jquery-1.11.3.min.js');
        copyTemplate("js/jquery-3.3.1.min.js",PATH + '/public/js/jquery-3.3.1.min.js');
    });
    // 新建sass文件夹
    mkdir(PATH + '/public/scss');
    // 新建static文件夹
    mkdir(PATH + '/public/static',function () {
        mkdir(PATH + '/public/static/music',function () {
            copyTemplate("static/music/y1.mp3",PATH + '/public/static/music/y1.mp3');

        })
    });
    // 新建swiper4文件夹
    mkdir(PATH + '/public/swiper4',function () {
        mkdir(PATH + '/public/swiper4/css',function () {
            copyTemplate("swiper4/css/swiper.min.css",PATH + '/public/swiper4/css/swiper.min.css');
        });
        mkdir(PATH + '/public/swiper4/js',function () {
            copyTemplate("swiper4/js/swiper.min.js",PATH + '/public/swiper4/js/swiper.min.js');
        })
    })
});

console.log("build complete.");

