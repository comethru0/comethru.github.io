// 当文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 初始化所有Swiper轮播组件
    // 小小讲解员活动轮播
    if (document.querySelector('.mySwiper')) {
        const mainSwiper = new Swiper('.mySwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            }
        });
    }

    // 初始化杜诗课堂轮播
    if (document.querySelector('.classroomSwiper')) {
        const classroomSwiper = new Swiper('.classroomSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            }
        });
    }

    // 初始化学生作品轮播
    if (document.querySelector('.studentWorksSwiper')) {
        const studentWorksSwiper = new Swiper('.studentWorksSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    }
    
    // 初始化诗歌周轮播
    if (document.querySelector('.poetryWeekSwiper')) {
        const poetryWeekSwiper = new Swiper('.poetryWeekSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            }
        });
    }
    
    // 初始化灯箱效果
    if (document.getElementById('lightgallery')) {
        lightGallery(document.getElementById('lightgallery'), {
            selector: '.gallery-item',
            download: false,
            counter: false
        });
    }

    // 初始化滚动动画函数
    const initAnimations = function() {
        // 收集所有需要动画的元素
        const contentBoxes = document.querySelectorAll('.content-box');
        const contentCards = document.querySelectorAll('.content-card');
        const featureCards = document.querySelectorAll('.feature-card');
        const activityCards = document.querySelectorAll('.activity-card');
        const singleImage = document.querySelectorAll('.single-image-container');
        const featureItems = document.querySelectorAll('.feature-item');
        const timelineItems = document.querySelectorAll('.timeline-item');
        const imageGallery = document.querySelectorAll('.image-gallery');
        const highlightItems = document.querySelectorAll('.highlight-item');
        const achievementItems = document.querySelectorAll('.achievement-item');
        const studentWorks = document.querySelectorAll('.student-works');

        // 观察器配置
        const observerOptions = {
            root: null, // 使用视口作为观察器的根
            rootMargin: '0px',
            threshold: 0.2 // 当元素可见20%时触发
        };

        // 创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 添加fade-in类使元素可见
                    entry.target.classList.add('fade-in');
                    // 停止观察已经显示的元素
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // 开始观察所有元素
        const allElements = [
            ...contentBoxes, ...contentCards, ...featureCards, 
            ...activityCards, ...singleImage, ...featureItems,
            ...timelineItems, ...imageGallery, ...highlightItems,
            ...achievementItems, ...studentWorks
        ];

        // 为不同元素设置不同的延迟，创造级联动画效果
        allElements.forEach((el, index) => {
            // 设置一些随机性但有逻辑的延迟
            const sectionIndex = Math.floor(index / 5); // 每5个元素为一组
            const delayBase = 0.1; // 基础延迟
            const delay = delayBase + (sectionIndex * 0.1); // 每组额外增加0.1s延迟
            el.style.transitionDelay = `${delay}s`;
            
            // 将元素添加到观察者
            observer.observe(el);
        });
    };

    // 初始化所有动画
    initAnimations();

    // 计数器动画
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    if (achievementNumbers.length > 0) {
        const options = {
            rootMargin: '0px',
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseFloat(target.textContent);
                    let count = 0;
                    const duration = 2000; // 持续2秒
                    const frameDuration = 1000 / 60; // 60fps
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = value / totalFrames;

                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= value) {
                            target.textContent = `${Math.floor(value)}+`;
                            clearInterval(counter);
                        } else {
                            target.textContent = `${Math.floor(count)}+`;
                        }
                    }, frameDuration);

                    observer.unobserve(target);
                }
            });
        }, options);

        achievementNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    // 折叠面板交互
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target && target.classList.contains('show')) {
                this.textContent = '查看详情';
            } else {
                this.textContent = '收起详情';
            }
        });
    });

    // 视差滚动效果 - 为有parallax-bg类的元素添加视差效果
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.banner, .section-padding');
        const scrollPosition = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // 根据元素在页面的位置调整背景的偏移量
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const viewportHeight = window.innerHeight;
            
            // 只有当元素接近或在视口中时才应用效果
            if (scrollPosition + viewportHeight > elementTop && 
                scrollPosition < elementTop + elementHeight) {
                // 计算视差效果程度
                const scrollFactor = 0.3; // 调整以获得所需的视差效果强度
                const offset = (scrollPosition - elementTop) * scrollFactor;
                
                // 创建视差效果
                element.style.backgroundPositionY = `calc(50% + ${offset}px)`;
            }
        });
    });

    // 自定义滚动指示器
    const banner = document.querySelector('.banner');
    if (banner) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        
        // 添加两个箭头
        for (let i = 0; i < 2; i++) {
            const chevron = document.createElement('div');
            chevron.className = 'chevron';
            scrollIndicator.appendChild(chevron);
        }
        
        // 将指示器添加到banner
        banner.appendChild(scrollIndicator);
    }

    // 为按钮添加涟漪效果
    document.querySelectorAll('.btn-detail').forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600); // 动画持续时间
        });
    });

    // 添加CSS类用于滚动动画和涟漪效果
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .ripple {
            position: absolute;
            background-color: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(styleSheet);
}); 