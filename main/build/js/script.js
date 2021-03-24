const search_form = document.querySelector('.search-form form')
const search_input = search_form.querySelector('input')

search_form.addEventListener('submit', e => {
    let parent = e.target.closest('.search-form');
    if ( !parent.classList.contains('search-form_focus') ) {
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