const htmlData = [
    '<h1>Hello，我是 XXX</h1>',
    '<img src="http://placekitten.com/300/300">',
    '<h2>我喜歡 OOOOXXXXX(興趣）</h2>',
    '<h3>我在這堂課想學習的是 <input style="font-size: 1.17rem;" placeholder="你的想法"></h3>',
    '<p>對老師有什麼想法呢？<br/><textarea style="width: 450px; height: 160px;"></textarea></p>',
    '<a href="http://www.google.com/" style="display: block;">連結到個人網頁</a>'
]

setDraggableElmnts(htmlData);
RenderSort('#app');

function setDraggableElmnts(contents) {
    const container = document.querySelector('ul.moveable');

    contents.forEach(data => {
        const li = document.createElement('li');
        const input = document.createElement('input');
        
        li.setAttribute('draggable', 'true');
        li.addEventListener('dragstart', dragStart);
        li.addEventListener('drop', dropped);
        li.addEventListener('dragenter', cancelDefault);
        li.addEventListener('dragover', cancelDefault);

        input.value = data;
        input.style.width = '90%';
        input.onkeyup = function(){RenderSort('#app')};

        li.appendChild(input);
        container.appendChild(li);
    });
}

function getItemIndex(e) {
    let index = 0;
    let elmnt = e.target;
    while (elmnt.previousElementSibling) {
        index += 1;
        elmnt = elmnt.previousElementSibling;
    }
    return index;
}

function dragStart(e) {
    const index = getItemIndex(e);
    e.dataTransfer.setData('text/plain', index);
}

function dropped(e) {
    cancelDefault(e);
    const oldIndex = e.dataTransfer.getData('text/plain');
    const newIndex = getItemIndex(e);
    const eParent = e.target.parentNode;

    switchElmnt(oldIndex, newIndex, eParent);

    RenderSort('#app');
}

function switchElmnt(oldIndex, newIndex, ParentNode) {
    if (oldIndex == newIndex) {
        return;
    }
    const oldElmnt = ParentNode.children[oldIndex];
    const newElmnt = ParentNode.children[newIndex];

    oldElmnt.remove();
    ParentNode.insertBefore(oldElmnt, ParentNode.children[newIndex]);
    
    newElmnt.remove();
    ParentNode.insertBefore(newElmnt, ParentNode.children[oldIndex]);
}

function cancelDefault(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function RenderSort(targetId) {
    const input = document.querySelectorAll('ul.moveable>li>input');
    const targetElmnt = document.querySelector(targetId);
    targetElmnt.innerHTML = '<div class="preview"><span class="title">預覽</span></div>'
    input.forEach(item => {
        targetElmnt.innerHTML += item.value;
    })
}


// practice
function setDraggableElmnts_old() {
    const li = document.querySelectorAll('ul.moveable>li');

    li.forEach((item, index) => {
        item.setAttribute('draggable', 'true');
        item.innerText = htmlData[index];
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('drop', dropped);
        item.addEventListener('dragenter', cancelDefault);
        item.addEventListener('dragover', cancelDefault);
    })
}