// seeting each letter its own position when it has class `hidden`
function observeMutation(object, positions) {
    const mutationObserver = new MutationObserver((mutationsList) => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!mutation.target.classList.contains("show")) {
                    index = 0
                    mutation.target.querySelectorAll('*').forEach((el) => {
                        el.style.left = `${positions[index]}px`
                        index++
                    })
                } else {
                    mutation.target.querySelectorAll('*').forEach((el) => {
                        el.style.left = '0'
                    })
                }
            }
        }
    })

    mutationObserver.observe(
        object, {attributes: true, attributeFilter: ['class']}
    )
}


// writing each letter of text in a separate `div`
const textElements = document.querySelectorAll('a')
textElements.forEach((el) => {
    const parent = el.parentElement
    const paragraph = document.createElement('p')
    let delay = 0
    let positions = [-100]

    el.textContent.split('').forEach((char) => {
        const newEl = document.createElement('a')
        newEl.textContent = char === ' ' ? '\u00A0' : char

        newEl.style.transitionDelay = `${delay}s`
        delay += 0.22

        positions.push(positions[positions.length - 1] - 22)

        paragraph.appendChild(newEl)
    })

    parent.appendChild(paragraph)
    el.remove()

    observeMutation(parent, positions)
})


// showing and hiding text
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            entry.target.classList.remove('show')
        }
    })
})

document.querySelectorAll('section').forEach((el) => {
    el.classList.add('hidden')
    intersectionObserver.observe(el)
})