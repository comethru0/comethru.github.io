$(document).ready(function() {
    // 初始化AOS动画库
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 120
    });
    
    // 页面加载动画
    setTimeout(function() {
        $(".loading-screen").fadeOut(500);
    }, 1500);
    
    // 导航栏滚动效果
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $(".scroll-nav").addClass("scrolled");
            $(".back-to-top").addClass("visible");
        } else {
            $(".scroll-nav").removeClass("scrolled");
            $(".back-to-top").removeClass("visible");
        }
    });
    
    // 平滑滚动到锚点
    $(".nav-link").click(function(e) {
        e.preventDefault();
        var target = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(target).offset().top - 80
        }, 800);

        // 添加激活状态
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });
    
    // 回到顶部按钮
    $(".back-to-top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // 首屏向下滚动按钮
    $(".scroll-indicator").click(function() {
        $("html, body").animate({
            scrollTop: $("#overview").offset().top - 80
        }, 800);
    });
    
    // 时间轴功能
    $(".timeline-item").click(function() {
        var target = $(this).data("target");
        $(".timeline-item").removeClass("active");
        $(this).addClass("active");
        $(".timeline-stage").removeClass("active");
        $("#" + target).addClass("active");
    });
    
    // 滚动动画效果
    function checkScroll() {
        $('.scroll-animation').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
        });
    }

    // 初始化滚动动画元素
    $('.section-title, .section-content > div, .event-item, .exile-event, .poetry-item, .impact-item').addClass('scroll-animation');
    
    // 监听滚动事件
    $(window).on('scroll resize', checkScroll);
    checkScroll(); // 初始检查
    
    // 鼠标悬停效果
    $(".poetry-item").hover(
        function() {
            $(this).find(".poem-content p").css("color", "#8a1616");
        },
        function() {
            $(this).find(".poem-content p").css("color", "");
        }
    );
    
    // 添加响应式导航菜单
    $("<div class='menu-toggle'><i class='fas fa-bars'></i></div>").insertBefore(".nav-links");
    
    $(".menu-toggle").click(function() {
        $(".nav-links").slideToggle();
    });

    // 响应窗口调整
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $(".nav-links").removeAttr("style");
        }
    });

    // 为每个时间线事件添加延迟动画
    $(".exile-event").each(function(index) {
        $(this).css("animation-delay", (index * 0.2) + "s");
    });

    // 添加图片延迟加载
    $("img").attr("loading", "lazy");

    // 添加工具提示
    $(".nav-link, .social-link, .timeline-item").attr("data-tooltip", function() {
        return $(this).text() || "点击查看";
    });

    // 给页面元素添加动态交互效果
    $(".section-container").on("mouseenter", function() {
        $(this).css("transform", "translateY(-5px)");
    }).on("mouseleave", function() {
        $(this).css("transform", "");
    });
});

// 添加中国风装饰元素
function addChineseDecorations() {
    // 添加水墨扩散效果
    $('.section-title').append('<span class="ink-splash"></span>');
    
    // 随机添加一些中国结装饰
    const decorationPositions = [
        { top: '15%', left: '5%' },
        { top: '30%', right: '5%' },
        { top: '60%', left: '8%' },
        { top: '75%', right: '8%' }
    ];
    
    decorationPositions.forEach(function(pos) {
        const decoration = $('<div class="chinese-decoration"></div>');
        decoration.css(pos);
        $('body').append(decoration);
    });
    
    // 在滚动时添加视差效果
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        $('.chinese-decoration').css('transform', 'translateY(' + scrollTop * 0.1 + 'px)');
    });
}

// 移动设备菜单设置
function setupMobileMenu() {
    // 添加移动菜单按钮
    $('.nav-content').prepend('<div class="mobile-menu-btn"><i class="fas fa-bars"></i></div>');
    
    // 移动菜单点击事件
    $('.mobile-menu-btn').on('click', function() {
        $('.nav-links').toggleClass('show-mobile-menu');
    });
    
    // 当点击导航链接后关闭菜单
    $('.nav-link').on('click', function() {
        $('.nav-links').removeClass('show-mobile-menu');
    });
}

// 添加CSS样式以支持JS功能
$('<style>')
    .prop('type', 'text/css')
    .html(`
        .scrolled .nav-content {
            padding: 10px 20px;
            border-radius: 0;
        }
        
        .ink-splash {
            position: absolute;
            width: 50px;
            height: 50px;
            background-image: url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png');
            opacity: 0.1;
            border-radius: 50%;
            right: -15px;
            top: -15px;
            z-index: -1;
        }
        
        .chinese-decoration {
            position: fixed;
            width: 60px;
            height: 60px;
            background-image: url('https://img.icons8.com/color/96/000000/chinese-knot.png');
            background-size: contain;
            background-repeat: no-repeat;
            z-index: -1;
            opacity: 0.3;
        }
        
        .mobile-menu-btn {
            display: none;
            font-size: 24px;
            color: var(--secondary-color);
            cursor: pointer;
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block;
            }
            
            .nav-links {
                display: none;
                flex-direction: column;
                width: 100%;
                text-align: center;
                padding: 10px 0;
            }
            
            .nav-links.show-mobile-menu {
                display: flex;
            }
            
            .nav-links li {
                margin: 10px 0;
            }
        }
    `)
    .appendTo('head'); 