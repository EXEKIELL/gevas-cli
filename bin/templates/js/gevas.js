/****
 * gevas.js v1.0
 *
 * **/

(function (window,document) {
    /**
     * h5音频播放和预加载
     * **/
    // 音频预加载 针对ios
    var gAudioLoad = function (options) {
        if(typeof options == "string"){
            playAudioLoad(options);
        }else if(typeof options === 'object' && !isNaN(options.length)){
            // 判断是否数组
            for (var i = 0; i<options.length; i++){
                if(typeof options == "string"){
                    playAudioLoad(options[i]);
                }
            }
        }else{
            throw new Error('请传入字符串或数组');
        }
    };

    // 音频播放
    var gAudio = function (options) {
        if(typeof options == "string"){
            playAudio(options);
        }else if(typeof options === 'object' && !isNaN(options.length)){
            // 判断是否数组
            for (var i = 0; i<options.length; i++){
                if(typeof options == "string"){
                    playAudio(options[i]);
                }
            }
        }else{
            throw new Error('请传入字符串或数组');
        }
    };
    window.gAudioLoad = gAudioLoad;
    window.gAudio = gAudio;


    /**
    * 智能机浏览器版本信息:
    **/
    var gBrowser= {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: {
                    name:'IE内核',//IE内核
                    ver:u.indexOf('Trident') > -1
                },
                presto: {
                    name:'opera内核',//opera内核
                    ver:u.indexOf('Presto') > -1
                },
                webKit: {
                    name:'苹果、谷歌内核',//苹果、谷歌内核
                    ver:u.indexOf('AppleWebKit') > -1
                },
                gecko: {
                    name:'火狐内核',//火狐内核
                    ver:u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1
                },
                mobile: {
                    name:'是否为移动终端',//是否为移动终端
                    ver: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/)
                },
                ios: {
                    name:'ios终端',//ios终端
                    ver: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
                },
                android: {
                    name:'android终端或者uc浏览器',//android终端或者uc浏览器
                    ver: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
                },
                iPhone: {
                    name:'是否为iPhone或者QQHD浏览器',//是否为iPhone或者QQHD浏览器
                    ver: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1
                },
                iPad: {
                    name:'是否iPad',//是否iPad
                    ver: u.indexOf('iPad') > -1
                },
                webApp: {
                    name:'是否web应该程序，没有头部与底部',//是否web应该程序，没有头部与底部
                    ver: u.indexOf('Safari') == -1
                }
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    window.gBrowser = gBrowser;
    // 判断是手机还是电脑
    var gPhoneorPc = function () {
        var text = browserRedirect();
        return text;
    }
    window.gPhoneorPc = gPhoneorPc;



    /**
     * 禁止页面滑动和取消滑动限制
     * **/
    var gMove = function (options) {
        documentMove();
    };
    var gStop = function (options) {
        documentStop();
    };
    window.gMove = gMove;
    window.gStop = gStop;


    /**
     * 监听屏幕旋转
     *
     * **/
    var gWrapRotate = function (fun1,fun2) {
        wrapRotate(fun1,fun2);
    };
    window.gWrapRotate = gWrapRotate;



    /**
     * 时间戳转时间
     * **/
    var gDate = function (options) {
        if(isNumber(options)){
            var str = options+'';
            if(str.length == 13){
                var data = options;
                var time = new Date(data);
                var yyyy = time.getFullYear();
                var mm = time.getMonth()+1;
                var dd = time.getDate();
                var h = time.getHours();
                var min = time.getMinutes();
                var second = time.getSeconds();
                if(mm<10){
                    mm = '0'+mm;
                }
                if(dd<10){
                    dd = '0'+dd;
                }
                if(h<10){
                    h = '0'+h;
                }
                if(min<10){
                    min = '0'+min;
                }
                return {
                    year:yyyy,
                    month:mm,
                    day:dd,
                    hour:h,
                    minute:min,
                    second:second
                }
            }else if(str.length == 10){
                var data = options*1000;
                var time = new Date(data);
                var yyyy = time.getFullYear();
                var mm = time.getMonth()+1;
                var dd = time.getDate();
                var h = time.getHours();
                var min = time.getMinutes();
                var second = time.getSeconds();
                if(mm<10){
                    mm = '0'+mm;
                }
                if(dd<10){
                    dd = '0'+dd;
                }
                if(h<10){
                    h = '0'+h;
                }
                if(min<10){
                    min = '0'+min;
                }
                return {
                    year:yyyy,
                    month:mm,
                    day:dd,
                    hour:h,
                    minute:min,
                    second:second
                }
            }else{
                throw new Error('请传入正确的时间戳');
            }
        }else{
            throw new Error('请传入数字类型')
        }
    }
    window.gDate = gDate;


    /**
     * 判断滚动方向
     * **/
    var gScrollXY = function (){
        window.onscroll = function() {
                var beforeTop = gScrollParam().top;
                var beforeLeft = gScrollParam().left;
                window.onscroll = function() {
                    var afterTop = gScrollParam().top;
                    var afterLeft = gScrollParam().left;
                    if (beforeTop<afterTop) {
                        console.log('上');
                        beforeTop = afterTop;
                    };
                    if (beforeTop>afterTop) {
                        console.log('下');
                        beforeTop = afterTop;
                    };
                    if (beforeLeft<afterLeft) {
                        console.log('左');
                        beforeLeft = afterLeft;
                    };
                    if (beforeLeft>afterLeft) {
                        console.log('右');
                        beforeLeft = afterLeft;
                    };
                };
            };
    };
    window.gScrollXY = gScrollXY;




    /**
     * canvas图片合成技术
     * 为了更好的使用。引用jq
     * **/
    var gCanv = showYear;
    window.gCanv = gCanv;
}(window,document));


/**
 * 图片加载，加载页
 *
 * **/
(function () {
    function isArray(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }

    /**
     * @param imgList 要加载的图片地址列表，['aa/asd.png','aa/xxx.png']
     * @param callback 每成功加载一个图片之后的回调，并传入“已加载的图片总数/要加载的图片总数”表示进度
     * @param timeout 每个图片加载的超时时间，默认为5s
     */
    var loader = function (imgList, callback, timeout) {
        timeout = timeout || 5000;
        imgList = isArray(imgList) && imgList || [];
        callback = typeof(callback) === 'function' && callback;

        var total = imgList.length,
            loaded = 0,
            imgages = [],
            _on = function () {
                loaded < total && (++loaded, callback && callback(loaded / total));
            };

        if (!total) {
            return callback && callback(1);
        }

        for (var i = 0; i < total; i++) {
            imgages[i] = new Image();
            imgages[i].onload = imgages[i].onerror = _on;
            imgages[i].src = imgList[i];
        }

        /**
         * 如果timeout * total时间范围内，仍有图片未加载出来（判断条件是loaded < total），通知外部环境所有图片均已加载
         * 目的是避免用户等待时间过长
         */
        setTimeout(function () {
            loaded < total && (loaded = total, callback && callback(loaded / total));
        }, timeout * total);

    };

    "function" === typeof define && define.cmd ? define(function () {
        return loader
    }) : window.imgLoader = loader;
})();
/**
 * // 使用方法
 imgLoader(imgs, function(percentage){
    console.log(parseInt(percentage*100)+'%');
 });
 * **/

/**
 * 移动端单位
 *
 * **/
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if(!clientWidth) return;
            if(clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if(!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);










/**
 * H5音频预加载和播放
 * **/


// 音频预加载 针对ios
function playAudioLoad(id) {
    var audio = document.getElementById(id);
    audio.volume = 0;
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio.play();
            audio.pause();
            audio.currentTime = 0;
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                audio.play();
                audio.pause();
                audio.currentTime = 0;
            });
        }, false);
    }
    audio.play();
    audio.pause();
    audio.currentTime = 0;
    return false;
}

// 多重音频播放 播放流
function playAudio(id) {
    var audio = document.getElementById(id);
    audio.currentTime = 0;
    audio.volume = 1;
    if (window.WeixinJSBridge) {
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio.play();
        }, false);
    } else {
        document.addEventListener("WeixinJSBridgeReady", function () {
            WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                audio.play();
            });
        }, false);
    }
    audio.play();
    return false;
}


function browserRedirect() {
    /**
     * fun1:这是手机回调，fun2:这是电脑回调
     * **/
    var sUserAgent= navigator.userAgent.toLowerCase();
    var bIsIpad= sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs= sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp= sUserAgent.match(/midp/i) == "midp";
    var bIsUc7= sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc= sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid= sUserAgent.match(/android/i) == "android";
    var bIsCE= sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM= sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return 'mobile';
    } else {
        return 'pc';
    }
}




/***禁止页面滑动***/
function documentStop(){
    document.body.style.overflow='hidden';
    document.addEventListener("touchmove",function (e) {
        e.preventDefault();
    },false);//禁止页面滑动
}

/***取消滑动限制***/
function documentMove(){
    document.body.style.overflow='';//出现滚动条
    document.removeEventListener("touchmove",function(e){
        e.preventDefault()
    },false);
}


/**
 * 监听移动端屏幕旋转
 * **/
function wrapRotate(fun1,fun2) {
    // 监听屏幕旋转
    window.addEventListener("orientationchange", function() {
        if(window.orientation == 90 || window.orientation == -90){
            if(typeof fun1 == "function"){
                fun1();
            }else{
                throw new Error('请传入function');
            }
            console.log('横屏');
        }else{
            if(typeof fun2 == "function"){
                fun2();
            }else{
                throw new Error('请传入function');
            }
            console.log('竖屏');
        }
    }, false);
}

/**
 * 校验只要是数字（包含正负整数，0以及正负浮点数）就返回true
 **/
function isNumber(val){

    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(regPos.test(val) || regNeg.test(val)){
        return true;
    }else{
        return false;
    }

}


/**
 * 获取scrollTop 和 scrollLeft
 * **/
function gScrollParam() {
    if (window.pageYOffset != null){
        // 支持IE9 +
        return{
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }else if (document.compatMode == 'CSS1Compat'){
        // 声明了DTD
        return{
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
    return{
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}


/**
 * canvas图片合成技术
 * 为了更好的使用。引用jq
 * **/
function showYear(id,name,originImgSel,targetImgSel,fun){
    /**
     * id = canvas的id
     * name = 传入字体
     * originImgSel = 源图片节点选择器
     * targetImgSel = 合成目标节点选择器
     * fun = 合成操作
     *
     * **/
    //获取画布对象
    //通过id获取canvas对象
    var mainCtx = document.getElementById(id).getContext("2d");
    var maxWidth = mainCtx.width;
    var maxHeight = mainCtx.height;
    mainCtx.clearRect(0,0,maxWidth,maxHeight);
    //获取图片的实际路径
    var starImg = new Image();
    starImg.src = $(originImgSel).attr('src');
    //合成
    starImg.onload = function() {
        //先把图片绘制在这里
        mainCtx.drawImage(starImg, 0, 0, 600, 450);
        if(typeof fun == "function"){
            fun();
            saveImageInfo(id,targetImgSel);
        }
        //读取用户的文本
        // if(name) {
        //     var str = name;
        //     //设置用户文本的大小字体等属性
        //     mainCtx.font = "30px Microsoft YaHei";
        //     //设置用户文本填充颜色
        //     mainCtx.fillStyle = "#fffbb2";
        //     //绘制文字
        //     mainCtx.fillText(str, 25,415);
        //     //设置用户文本的大小字体等属性
        //     mainCtx.font = "24px Microsoft YaHei";
        //     //设置用户文本填充颜色
        //     mainCtx.fillStyle = "white";
        //     saveImageInfo(id,targetImgSel);
        //     //绘制文字
        //     // mainCtx.fillText("长按识别二维码测运势", 152, 1142.5);
        // }

    };

}
//将画布生成图片
function saveImageInfo(id,selector) {
    var mycanvas = document.getElementById(id);
    var image = mycanvas.toDataURL("image/jpg");
    $(selector).attr('src',image);
}