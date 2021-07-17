const listOfa = document.querySelectorAll('a');
listOfa.forEach(a => {
    if (!a.href) {
        a.addEventListener('click', function(e) {
            // renderMask();
            alert('尚未開放');
        })
    }
})

function renderModal() {
    
}

function renderMask() {
    const mask = document.createElement('div');
    mask.className = 'absolute top-0 left-0 w-full h-full bg-black bg-opacity-50';
    
    document.querySelector('body').appendChild(mask);
}