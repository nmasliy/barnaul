document.addEventListener("DOMContentLoaded", function () {
    const $html = document.querySelector('html');
    let scrollTop = window.pageYOffset;
    
    function hideScroll() {
        document.body.classList.add('block-scroll');
        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            scrollTop = window.pageYOffset; // запоминаем текущую прокрутку сверху
            document.body.style.position = 'fixed';
            document.body.style.top = -scrollTop + 'px';
            $html.style.scrollBehavior = '';
        }
    }

    function showScroll() {
        document.body.classList.remove('block-scroll');
        // Блокировка скролла для Safari
        if (window.innerWidth <= 1024) {
            $html.style.scrollBehavior = 'auto';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            window.scroll(0, scrollTop);
            $html.style.scrollBehavior = '';
        }
    }

    function initMenu() {
        const $header = document.querySelector('.header');
        const $headerBtn = document.querySelector('.header__panel-btn');
        let isInit = false;

        const toggleMenu = () => {
            if ($header.classList.contains('active')) {
                $headerBtn.classList.remove('active');
                $header.classList.remove('active');
                showScroll();
            } else {
                $headerBtn.classList.add('active');
                $header.classList.add('active');
                hideScroll();
            }
            
        }

        const checkScreenWidth = () => {
            // Активируем меню только на экранах <= 1024
            if (window.innerWidth <= 1024) {
                $headerBtn.addEventListener('click', toggleMenu);
                isInit = true;
            }
        }

        function initHeaderMenus() {
            const $openTriggers = document.querySelectorAll('.header-navigation__link');
            const $defaultMenu = document.querySelector('.header-navigation__content');
            const $closeTriggers = document.querySelectorAll('.header-navigation__back-btn');
            const $menuContents = document.querySelectorAll('.header-navigation__list-content');

            function closeMenu(menu) {
                menu.style.display = '';
                $defaultMenu.style.display = '';
            }

            function openMenu(menu) {
                menu.style.display = 'block';
                $defaultMenu.style.display = 'none';
            }

            if ($menuContents.length > 0) {

                $openTriggers.forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();

                        $menuContents.forEach(menu => {
                            if (link.dataset.menu === menu.dataset.menu) {
                                openMenu(menu);
                            }
                        })
                    })
                })
    
                $closeTriggers.forEach(btn => {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();

                        const menu = btn.closest('.header-navigation__list-content');
                        closeMenu(menu);
                    })
                })

            }
        }

        window.addEventListener('resize', checkScreenWidth);
        
        checkScreenWidth();
        initHeaderMenus();
    }

    function initClientsSlider() {
        const $slider = document.querySelector('.clients__slider');
        if ($slider) {
            const clientsSlider = new Swiper($slider, {
                slidesPerView: 6,
                spaceBetween: 34,
                navigation: {
                    nextEl: ".clients__slider-next",
                    prevEl: ".clients__slider-prev",
                },
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 8,
                    },
                    1025: {
                        slidesPerView: 6,
                        spaceBetween: 34,
                    },
                },
            });
        }
    }

    function initDesignSlider() {
        const $slider = document.querySelector('.design-slider__content');
        if ($slider) {
            const designSlider = new Swiper($slider, {
                slidesPerView: 'auto',
                spaceBetween: 25,
                loopedSlides: 5,
                loop: true,
                navigation: {
                    nextEl: ".design-slider__next",
                    prevEl: ".design-slider__prev",
                },
                breakpoints: {
                    320: {
                        spaceBetween: 16,
                    },
                    1025: {
                        spaceBetween: 25,
                    },
                },
            });
        }
    }

    function disableTransitionsBeforePageLoading() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        }
    }

    function initScrollBar() {
        if (window.innerWidth > 1024) {
            new SimpleBar(document.querySelector('.sidebar'));
            document.querySelectorAll('.navigation__list-wrapper').forEach(item => new SimpleBar(item))
        }
    }

    function initMobileNewsSlider() {
        const $slider = document.querySelector('.news__list-wrapper');

        if ($slider && window.innerWidth <= 640) {
            const $wrapper = $slider.querySelector('.news__list');
            const $slides = $slider.querySelectorAll('.news__item');

            // Подгатавливаем слайдер к инициализации
            $slides.forEach(slide =>  slide.classList.add('swiper-slide'));
            $slider.classList.add('swiper-container');
            $wrapper.classList.add('swiper-wrapper');
            // Удаляем старый класс, чтобы стили не перебивали слайдер
            $wrapper.classList.remove('news__list');
            // Инициализируем
            const newsSlider = new Swiper($slider, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                loop: true,
            });
        }
    }

    function initMobileVideoSlider() {
        const $slider = document.querySelector('.video__list-wrapper');

        if ($slider && window.innerWidth <= 640) {
            const $wrapper = $slider.querySelector('.video__list');
            const $slides = $slider.querySelectorAll('.video__item');

            // Подгатавливаем слайдер к инициализации
            $slides.forEach(slide =>  slide.classList.add('swiper-slide'));
            $slider.classList.add('swiper-container');
            $wrapper.classList.add('swiper-wrapper');
            // Удаляем старый класс, чтобы стили не перебивали слайдер
            $wrapper.classList.remove('video__list');
            // Инициализируем
            const videoSlider = new Swiper($slider, {
                slidesPerView: 'auto',
                spaceBetween: 16,
                loop: true,
            });
        }
    }

    function initProjectsSlider() {
        const $slider = document.querySelector('.projects__slider');
        const $sliderThumbs = document.querySelector('.projects__slider-thumbs');
        if ($slider) {
            const thumbs = new Swiper($sliderThumbs, {
                spaceBetween: 8,
                direction: 'vertical',
                slidesPerView: 'auto',
                watchSlidesProgress: true,
                breakpoints: {
                    320: {
                        direction: 'horizontal',
                        spaceBetween: 26,

                    },
                    769: {
                        direction: 'vertical',
                        spaceBetween: 8,
                    },
                },
            });
            const projectsSlider = new Swiper($slider, {
                spaceBetween: 50,
                thumbs: {
                    swiper: thumbs,
                },
            });
        }
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
        
        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })

        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    hideScroll();
                },
                onClose: (modal) => {
                    showScroll();
                },
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true,
                awaitCloseAnimation: true,
            });
        }
    }

    function initRangeSliders() {
        const $sliders = document.querySelectorAll('.calc-form__item-slider');
        const $filterSlider = document.querySelector('.catalog-filter__power-slider');

        if ($sliders.length > 0) {

            $sliders.forEach(slider => {

                const parent = slider.closest('.calc-form__item');
                const input = parent.querySelector('.calc-form__item-input input')
                
                let suffix = input.dataset.suffix;
                let decimals = Number(input.dataset.decimals);
                let min = Number(input.dataset.min);
                let max = Number(input.dataset.max);
                let start = Number(input.dataset.start);
                let step = Number(input.dataset.step);

                noUiSlider.create(slider, {
                    start: start,
                    step: step,
                    connect: 'lower',
                    range: {
                        'min': min,
                        'max': max
                    },
                    format: wNumb({
                        decimals: decimals,
                        suffix: ' ' + suffix,
                        thousand: ' ',
                    })
                });

                

                slider.noUiSlider.on('update', function (values, handle) {
                    input.value = values[handle];
                });
                
                input.addEventListener('change', function () {
                    slider.noUiSlider.set(this.value);
                });
            })
        }
        
        if ($filterSlider) {
            const input = document.querySelector('.catalog-filter__power-input')
            
            let suffix = input.dataset.suffix;
            let min = Number(input.dataset.min);
            let max = Number(input.dataset.max);
            let start = Number(input.dataset.start);

            const filterSlider = noUiSlider.create($filterSlider, {
                start: start,
                range: {
                    'min': min,
                    '18%': 2.5,
                    '34%': 4,
                    '50%': 6.5,
                    '65%': 10,
                    '80%': 20,
                    'max': max
                },
                snap: true,
                pips: {
                    mode: 'values',
                    values: [1, 2.5, 4, 6.5, 10, 20, 25],
                    density: 16,
                    format: {
                        to: function (value) {
                            return value + suffix;
                        },
                        from: function (value) {
                            return Number(value.replace(suffix, ''));
                        }
                    }
                },
                connect: 'lower',
            });

        }
    }

    function initPhoneMask() {
        const $phones = document.querySelectorAll('[data-phone-mask]');

        if ($phones.length > 0) {
            $phones.forEach(phone => {
                IMask(phone, {
                    mask: '+{7}(000)000-00-00',
                    lazy: false,  
                });
            })
        }
    }

    function initFilterAccordion() {
        const $accordions = document.querySelectorAll('.catalog-filter__accordion-name');

        if ($accordions.length > 0) {
            $accordions.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('.catalog-filter__accordion-item').classList.toggle('active');
                })
            })
        }
    }

    function initQuestionsAccordion() {
        const $accordions = document.querySelectorAll('.questions__name');

        if ($accordions.length > 0) {
            $accordions.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('.questions__item').classList.toggle('active');
                })
            })
        }
    }

    function initCardSlider() {
        const $slider = document.querySelector('.card__slider');
        const $sliderThumbs = document.querySelector('.card__slider-thumbs');
        if ($slider) {
            const thumbs = new Swiper($sliderThumbs, {
                spaceBetween: 17,
                direction: 'vertical',
                slidesPerView: 'auto',
                watchSlidesProgress: true,
                breakpoints: {
                    320: {
                        direction: 'horizontal',
                        spaceBetween: 30,

                    },
                    769: {
                        direction: 'vertical',
                        spaceBetween: 17,
                    },
                },
            });
            const cardSlider = new Swiper($slider, {
                spaceBetween: 50,
                thumbs: {
                    swiper: thumbs,
                },
            });
        }
    }

    function initCardTabs() {
        const $tabs = document.querySelectorAll('.card__tabs-btn');
        const $tabsContents = document.querySelectorAll('.card__tabs-content-item');

        if ($tabs.length > 0) {
            $tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();

                    $tabsContents.forEach(content => {
                        if (tab.dataset.tab === content.dataset.tab) {
                            tab.classList.add('active');
                            content.classList.add('active');
                            return;
                        } else {
                            tab.classList.remove('active');
                            content.classList.remove('active');
                        }
                    })
                    
                })
            })
        }
    }
    
    disableTransitionsBeforePageLoading();
    initScrollBar();
    initMenu();
    initClientsSlider();
    initDesignSlider();
    initMobileNewsSlider();
    initMobileVideoSlider();
    initProjectsSlider();
    initModals();
    initRangeSliders();
    initPhoneMask();
    initFilterAccordion();
    initQuestionsAccordion();
    initCardSlider();
    initCardTabs();
});
