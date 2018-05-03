
$(function (){
    // 轮播图
    banner();
    // 移动端页签
    initMobileTab()

    // 初始工具提示
    $('[data-toggle="tooltip"]').tooltip()
})

var banner = function () {

    var getData = function (callback) {
        if(window.data){
            callback && callback(window.data);
        }else{
            $.ajax({
                type: 'get',
                url: 'js/data.json',
                dataType: 'json', /*强制转换后台的数据为json数据，强制转换不成功程序报错，不会执行success，执行error*/
                data: '',
                success: function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }


    var render = function (){
        getData(function (data){
            var isMobile = $(window).width() < 768 ? true : false;
            // console.log(isMobile);
            // 使用模板引擎：哪些html静态内容变成动态的
            // 点容器  图片容器

            var pointHtml = template('pointTemplate', {list: data});
            /*必须传对象*/
            var imageHtml = template('imageTemplate', {list: data, isM: isMobile});
            /*必须传对象*/

            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        })
    }
    render(); /*没有调用过不会默认初始化，需要调用一下*/


    // 测试功能
    $(window).on('resize',function(){
        render()     /*拉动屏幕的时候能根据当前设备重新渲染轮播图*/
    })


    // 移动端手势切换

    var startX = 0;
    var distanceX = 0;
    var isMove = false;


    // originalEvent 代表js原生事件
    $('.wjs_banner').on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        console.log(distanceX);
        isMove = true;
    }).on('touchend',function(e){
        // 距离足够50px 且一定要滑动过
        if(isMove && Math.abs(distanceX) > 50){
            // 满足手势条件
            // 左滑
            if(distanceX < 0){
                $('.carousel').carousel('next');
            }else{
                $('.carousel').carousel('prev');
            }
            // 右滑
        }
    })
     startX = 0;
     distanceX = 0;
     isMove = false;

}

var initMobileTab = function () {
    var $navTabs = $('.wjs_product .nav-tabs');
    var width = 0;
    $navTabs.find('li').each(function ( i , item){
        var $currLi = $(this);
        var liWidth = $currLi.outerWidth(true);
        width += liWidth;
    })
    console.log(width);
    $navTabs.width(width);

    // 给父容器加盒子，使用iscroll实现滑动
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    });

}


