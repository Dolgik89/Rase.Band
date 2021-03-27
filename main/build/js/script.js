
//Search form
const searchForm = document.querySelector('.search-form form')
const searchInput = searchForm.querySelector('input')

searchForm.addEventListener('submit', e => {
    let parent = e.target.closest('.search-form')

    if ( parent.querySelector('input').value === '' ) {
        e.preventDefault()
        parent.classList.add('search-form_focus')
        parent.querySelector('input').focus()
    }
})
searchInput.addEventListener('blur', e => {
    if ( e.target.value === '' ) {
        let parent = e.target.closest('.search-form')
        parent.classList.remove('search-form_focus')
    }
})

//Menu
const mobileButton = document.querySelector('.header__mobile-button')
mobileButton.addEventListener('click', function (e) {
    e.target.closest('.header').classList.toggle('header_open')
})

//Footer dropdown
let footerDropdown = document.querySelector('.footer__dropdown')
footerDropdown.addEventListener('click', function(e) {
    e.stopPropagation();

    var target = e.target.closest('.footer__dropdown')
    target.classList.toggle('footer__dropdown_opened')
})



//Document
document.addEventListener('click', function(){
    footerDropdown.classList.remove('footer__dropdown_opened')
})


//Tabs
let tabsBlock = document.querySelectorAll('.tabs')

tabsBlock.forEach( tab => {
    let tabs_nav_items = tab.querySelectorAll('.tabs .tabs__nav__item')
    let tabs_content_items = tab.querySelectorAll('.tabs .tabs__content__item')

    tabs_nav_items.forEach( (nav_item, nav_item_index) => {

        if ( nav_item_index === 0 ) nav_item.classList.add('tabs__nav__item_active')

        nav_item.addEventListener('click', (e) => {

            tabs_content_items.forEach( (content_item, content_item_index) => {

                if ( content_item_index === nav_item_index ) {
                    tabs_nav_items[content_item_index].classList.add('tabs__nav__item_active')
                    tabs_content_items[content_item_index].classList.add('tabs__content__item_active')
                } else {
                    tabs_nav_items[content_item_index].classList.remove('tabs__nav__item_active')
                    tabs_content_items[content_item_index].classList.remove('tabs__content__item_active')
                }
            })
        })
    })
})

//Forms

//Form input number
document.querySelectorAll('.number-control').forEach(control => {

    control.addEventListener('click', e => {
        let input = control.querySelector('input')
        if( e.target.classList.contains('number-control__button') ) {
            let operation = e.target.classList.contains('minus') ? -1 : 1;
            input.value = +input.value + operation
        }
    })
})

//Form DatePicker
document.querySelectorAll('.datepicker').forEach( datepicker => {
    let datepickerLabel;
    let picker = new Lightpick({
        field: datepicker,
        lang: 'en',
        startDate: new Date(),
        onSelect: date => {
            datepickerLabel.innerHTML = date.format('D MMM YYYY');
        },
        onClose: () => {
            datepickerLabel.innerHTML = picker.getStartDate().format('D MMM YYYY')
            datepickerLabel.classList.remove('calculator__form__control_focus')
        },
        onOpen: () => {
            let parent = picker._opts.field.closest('.calculator__form__col')
            datepickerLabel = parent.querySelector('.calculator__form__control')
            datepickerLabel.classList.add('calculator__form__control_focus')
        }
    });
    picker.show()
    picker.hide()
})

//Form Chosen
document.querySelectorAll('.form-select').forEach( select => {

    new TomSelect(select,{
        allowEmptyOption: true,
        copyClassesToDropdown: false,
        searchField: false
    })
})

//Form Submit
let calculator = document.querySelector('#calculator')
calculator.addEventListener('submit', e => {
    e.preventDefault()

    let data = serialize(e.target)
    console.log(data)
})

serialize = form => {
    let result = {}
    form.querySelectorAll('[name]').forEach( e => {
        result[e.attributes.name.value] = e.value;
    })
    return result
}


//How it works
let stepsSwiper = []
document.querySelectorAll('.steps-slider').forEach( (e, i) => {
    stepsSwiper[i] = new Swiper(e, {
        slidesPerView: 1,
        pagination: {
            el: e.querySelector('.steps-slider__nav'),
            renderBullet: (index, className) => {
                return '<span class="steps-slider__nav__item ' + className + '">' + '<b>Step ' + (index + 1) + '</b>' + '</span>';
            },
            clickable: true
        },
        wrapperClass: 'steps-slider__wrapper',
        slideClass: 'steps-slider__wrapper__slide',
        touchEventsTarget: 'wrapper',
        touchMoveStopPropagation: true,
        on: {
            slideChange: swiper => {

                for ( var slide = 0; slide < swiper.pagination.bullets.length; slide++ ) {
                    if ( slide <= swiper.activeIndex ) {

                        swiper.pagination.bullets[slide].classList.add('step-completed')
                    } else {
                        swiper.pagination.bullets[slide].classList.remove('step-completed')
                    }
                }
            }
        }
    })
})

//Scroll blocks
let scrollSwiper = []
let scrollSwiperStarted = false;

swiperScrollStart = () => {
    document.querySelectorAll('.swiper-scroll').forEach( (e, i) => {
        scrollSwiper[i] = new Swiper(e, {
            slidesPerView: 'auto',
            freeMode: true,
            wrapperClass: 'tabs__nav__wrapper',
            slideClass: 'tabs__nav__item',
            resistanceRatio: 0,
            mousewheel: {
                eventsTarget: e.closest('.tabs')
            }
        })
    })
    scrollSwiperStarted = true;
}

swiperScrollStart()

swiperScrollUpdate = () => {
        if ( window.innerWidth > 1024 ) {
            if (scrollSwiperStarted) {
                scrollSwiper.forEach( swiper => {
                    swiper.destroy(true, true)
                })
                scrollSwiperStarted = false;
            }
        } else {
            if ( !scrollSwiperStarted )
                swiperScrollStart()
        }

}

swiperScrollUpdate()

window.addEventListener('resize', () => {
    swiperScrollUpdate()
})


//Reviews Swiper
let reviewsSwiper = []
document.querySelectorAll('.reviews').forEach( (block, index) => {
    reviewsSwiper[index] = new Swiper(block, {
        slidesPerView: 'auto',
        centeredSlides: true,
        // centeredSlidesBounds: true,
        wrapperClass: 'reviews__wrapper',
        slideClass: 'reviews__item',
        pagination: {
            el: block.querySelector('.reviews__pagination'),
            clickable: true
        }
    })
})
console.log(reviewsSwiper);