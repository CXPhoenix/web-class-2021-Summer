/* main */
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
document.querySelector('.btn.add').addEventListener('click', addItemBar);
document.querySelector('.btn.save').addEventListener('click', saveHTML);
const trash = document.querySelector('#trash');
trash.addEventListener('drop', dropped);
trash.addEventListener('dragenter', cancelDefault);
trash.addEventListener('dragover', cancelDefault);
trash.addEventListener('dragleave', function(e){e.target.className = "fas fa-trash";});


/* functions */
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
        input.onkeyup = function () {
            RenderSort('#app');
        };

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
    e.target.classList.add('drag');
    e.dataTransfer.setData('text/plain', index);
}

function dropped(e) {
    cancelDefault(e);
    const oldIndex = e.dataTransfer.getData('text/plain');
    if (e.target.id == 'trash') {
        document.querySelector('.drag').remove();
        RenderSort('#app');
        return;
    }
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

function removeElmnt(index, ParentNode) {
    ParentNode.children[index].remove();
}

function cancelDefault(e) {
    if (e.target.id == 'trash') {
        e.target.className = 'fas fa-trash-restore'
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function RenderSort(targetId) {
    const input = document.querySelectorAll('ul.moveable>li>input');
    const targetElmnt = document.querySelector(targetId);
    targetElmnt.innerHTML = '<div class="preview"><span class="title">預覽</span></div><hr />'
    input.forEach(item => {
        targetElmnt.innerHTML += item.value;
    })
}

function addItemBar() {
    const target = document.querySelector('ul.moveable');
    const li = document.createElement('li');
    const input = document.createElement('input');

    li.setAttribute('draggable', 'true');
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('drop', dropped);
    li.addEventListener('dragenter', cancelDefault);
    li.addEventListener('dragover', cancelDefault);

    input.value = '';
    input.placeholder = '輸入 html 程式碼'
    input.style.width = '90%';
    input.onkeyup = function () {
        RenderSort('#app')
    };

    li.appendChild(input)
    target.appendChild(li);
}

function saveHTML() {
    const input = document.querySelectorAll('ul.moveable>li>input');
    let content = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>你的網站</title>
    </head>
    <body>\n\n`;
    input.forEach(item => {
        content += item.value + '\n';
    })
    content += `\n    </body>\n</html>`;

    console.log(content);
    saveFile(content);
}

function saveFile(content) {
    const fileBlob = new Blob(Array.from(content))
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.setAttribute('download', 'index.html');
    a.setAttribute('target', '_blanl');
    a.setAttribute('href', url);

    a.click()
}


// practice function
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