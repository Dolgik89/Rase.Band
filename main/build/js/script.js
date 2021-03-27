
//Search form
const search_form = document.querySelector('.search-form form')
const search_input = search_form.querySelector('input')

search_form.addEventListener('submit', e => {
    let parent = e.target.closest('.search-form')

    if ( parent.querySelector('input').value === '' ) {
        e.preventDefault()
        parent.classList.add('search-form_focus')
        parent.querySelector('input').focus()
    }
})
search_input.addEventListener('blur', e => {
    if ( e.target.value === '' ) {
        let parent = e.target.closest('.search-form')
        parent.classList.remove('search-form_focus')
    }
})

//Menu
const mobile_button = document.querySelector('.header__mobile-button')
mobile_button.addEventListener('click', function (e) {
    e.target.closest('.header').classList.toggle('header_open')
})

//Footer dropdown
let footer_dropdown = document.querySelector('.footer__dropdown')
footer_dropdown.addEventListener('click', function(e) {
    e.stopPropagation();

    var target = e.target.closest('.footer__dropdown')
    target.classList.toggle('footer__dropdown_opened')
})



//Document
document.addEventListener('click', function(){
    footer_dropdown.classList.remove('footer__dropdown_opened')
})


//Tabs
let tabs_block = document.querySelectorAll('.tabs')

tabs_block.forEach( tab => {
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
    let datepicker_label;
    let picker = new Lightpick({
        field: datepicker,
        lang: 'en',
        startDate: new Date(),
        onSelect: date => {
            datepicker_label.innerHTML = date.format('D MMM YYYY');
        },
        onClose: () => {
            datepicker_label.innerHTML = picker.getStartDate().format('D MMM YYYY')
            datepicker_label.classList.remove('calculator__form__control_focus')
        },
        onOpen: () => {
            let parent = picker._opts.field.closest('.calculator__form__col')
            datepicker_label = parent.querySelector('.calculator__form__control')
            datepicker_label.classList.add('calculator__form__control_focus')
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
    return result;
}

