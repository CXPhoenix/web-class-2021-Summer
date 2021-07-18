const listOfa = document.querySelectorAll('a');
listOfa.forEach(a => {
    if (!a.href) {
        a.addEventListener('click', function(e) {
            renderModal();
        });
    }
})

function renderModal() {
    const mask = setMask();
    mask.id = 'NotReleaseModal';
    const modal = document.createElement('div');
    modal.className = 'bg-white rounded-xl w-1/2 h-auto grid grid-cols-1 p-6 gap-3';

    const row1 = document.createElement('div');
    row1.className = 'text-center';
    row1.innerHTML = '<i class="fas fa-tools text-lg sm:text-xl md:text-3xl"></i>';
    modal.appendChild(row1);

    const row2 = document.createElement('div');
    row2.className = 'text-center';
    row2.innerHTML = '<span class="text-base sm:text-lg md:text-2xl">Opps! 尚未開放...</span>'
    modal.appendChild(row2);

    const row3 = document.createElement('div');
    row3.className = 'text-center';
    row3.innerHTML = '<span class="text-sm sm:text-base md:text-xl">本區域還在施工，所以沒有開放喔～</span>'
    modal.appendChild(row3);

    const btn = document.createElement('button');
    btn.className = 'bg-blue-600 hover:bg-blue-800 rounded-lg text-center py-3 select-none';
    btn.innerHTML = '<span class="text-white">我知道了！</span>'
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelector('#NotReleaseModal').remove();
    },false);
    modal.appendChild(btn);


    mask.appendChild(modal);
    document.querySelector('body').appendChild(mask);
}

function setMask() {
    const mask = document.createElement('div');
    mask.className = 'absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center';
    
    return mask;
}