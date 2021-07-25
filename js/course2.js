/* main */
const htmlData = [
    '<h1>Hello，我是 XXX</h1>',
    '<img src="http://placekitten.com/300/300">',
    '<h2>我喜歡 OOOOXXXXX(興趣）</h2>',
    '<h3>我在這堂課想學習的是 <input style="font-size: 1.17rem;" placeholder="你的想法"></h3>',
    '<p>對老師有什麼想法呢？<br/><textarea style="width: 450px; height: 160px;"></textarea></p>',
    '<a href="http://www.google.com/" style="display: block;">連結到個人網頁</a>'
]

setDraggableElmnts(htmlData, 'ul.moveable');
setDraggableElmnts(htmlData, '#HTML-xs-Editor ul.moveable');
RenderPreview('#preview');
RenderPreview('#Preview-xs-Viewer', '#HTML-xs-Editor');

document.querySelector('.btn.add').addEventListener('click', addItemBar);
document.querySelector('.btn.save').addEventListener('click', saveFile);
document.querySelector('#HTML-xs-EditorTool .btn.add').addEventListener('click', addItemBar);
document.querySelector('#HTML-xs-EditorTool .btn.save').addEventListener('click', saveFile);
const trash = document.querySelector('#trash');
trash.addEventListener('drop', dropped);
trash.addEventListener('dragenter', cancelDefault);
trash.addEventListener('dragover', cancelDefault);
trash.addEventListener('dragleave', function (e) {
    e.target.className = "fas fa-trash";
    e.target.parentNode.classList.remove('opacity-100');
    e.target.parentNode.classList.add('opacity-40');
});
const trashxs = document.querySelector('#trash-xs');
trashxs.addEventListener('drop', dropped);
trashxs.addEventListener('dragenter', cancelDefault);
trashxs.addEventListener('dragover', cancelDefault);
trashxs.addEventListener('dragleave', function (e) {
    e.target.className = "fas fa-trash";
    e.target.parentNode.classList.remove('opacity-100');
    e.target.parentNode.classList.add('opacity-40');
});


/* functions */
function setDraggableElmnts(contents, elmnt) {
    const container = document.querySelector(elmnt);

    contents.forEach(data => {
        const li = document.createElement('li');
        const input = document.createElement('input');

        li.setAttribute('draggable', 'true');
        li.addEventListener('dragstart', dragStart);
        li.addEventListener('drop', dropped);
        li.addEventListener('dragenter', cancelDefault);
        li.addEventListener('dragover', function (e) {
            cancelDefault(e);
            placeHint(e);
        });
        li.addEventListener('dragleave', removePlaceHint);

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
    // 繞路的部分，後面要想辦法不要動用到 sessionStorage 就解決
    window.sessionStorage.setItem('dragIndex', index);
}

function dropped(e) {
    cancelDefault(e);
    removePlaceHint(e);
    console.log(e);
    const oldIndex = e.dataTransfer.getData('text/plain');
    if (e.target.id == 'trash' || e.target.id == 'trash-xs') {
        document.querySelector('.drag').remove();
        // RenderSort('#app');
        e.target.className = "fas fa-trash";
        e.target.parentNode.classList.remove('opacity-100');
        e.target.parentNode.classList.add('opacity-40');
        return;
    }
    const newIndex = getItemIndex(e);
    const eParent = e.target.parentNode;

    // switchElmnt(oldIndex, newIndex, eParent);
    insertElmnt(oldIndex, newIndex, eParent);

    // RenderSort('#app');
}

function insertElmnt(oldIndex, newIndex, ParentNode) {
    if (oldIndex == newIndex) {
        return;
    }
    const oldElmnt = ParentNode.children[oldIndex];
    const newElmnt = ParentNode.children[newIndex];

    oldElmnt.remove();
    if (oldIndex > newIndex) {
        ParentNode.insertBefore(oldElmnt, newElmnt);
    } else {
        ParentNode.insertBefore(oldElmnt, newElmnt.nextSibling);
    }

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
    if (e.target.id == 'trash' || e.target.id == 'trash-xs') {
        e.target.className = 'fas fa-trash-restore';
        e.target.parentNode.classList.remove('opacity-40');
        e.target.parentNode.classList.add('opacity-100');
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function placeHint(e) {
    if (e.target.id == 'trash' || e.target.id == 'trash-xs') {
        return;
    }

    // const oldIndex = e.dataTransfer.getData('text/plain');
    const newIndex = getItemIndex(e);
    // 繞路的部分，後面要想辦法不要動用到 sessionStorage 就解決
    const indexDivi = window.sessionStorage.getItem('dragIndex') - newIndex
    const newElmnt = e.target;

    if (!indexDivi) {
        return;
    } else if (indexDivi < 0) {
        newElmnt.classList.add('upperHint')
    } else {
        newElmnt.classList.add('lowerHint')
    }
}

function removePlaceHint(e) {
    if (e.target.id == 'trash' || e.target.id == 'trash-xs') {
        return;
    }

    const oldIndex = e.dataTransfer.getData('text/plain');
    const newIndex = getItemIndex(e);
    const eParent = e.target.parentNode;
    const newElmnt = eParent.children[newIndex];

    if (oldIndex == newIndex) {
        return;
    }
    // else if (oldIndex < newIndex) {
    //     newElmnt.classList.remove('lowerHint')
    // } else {
    //     newElmnt.classList.remove('upperHint')
    // }
    else {
        newElmnt.classList.remove('upperHint') || newElmnt.classList.remove('lowerHint');
    }
}

function addItemBar() {
    let target, li, input;
    if (document.body.clientWidth < 640) {
        target = document.querySelector('#HTML-xs-Editor ul.moveable');
        li = document.createElement('li');
        input = document.createElement('input');
    } else {
        target = document.querySelector('ul.moveable');
        li = document.createElement('li');
        input = document.createElement('input');
    }

    li.setAttribute('draggable', 'true');
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('drop', dropped);
    li.addEventListener('dragenter', cancelDefault);
    li.addEventListener('dragover', cancelDefault);

    input.value = '';
    input.placeholder = '輸入 html 程式碼'
    input.style.width = '90%';
    // input.onkeyup = function () {
    //     RenderSort('#app')
    // };

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
    // saveFile(content);
}

function saveFile() {
    const contentElmnt = document.querySelectorAll('iframe');
    let content = ''
    if (document.body.clientWidth >= 640) {
        content = contentElmnt[0].srcdoc
    } else {
        content = contentElmnt[1].srcdoc
    }
    const fileBlob = new Blob(Array.from(content));
    const url = URL.createObjectURL(fileBlob);
    const a = document.createElement('a');
    a.setAttribute('download', 'index.html');
    a.setAttribute('target', '_blanl');
    a.setAttribute('href', url);

    a.click();
}

function RenderPreview(elmntId, fromElmnt = '#HTMLEditor') {
    const input = document.querySelectorAll(fromElmnt + ' ul.moveable>li>input');
    let content = `<!DOCTYPE html>
    <html>
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

    const iframe = document.createElement('iframe');
    iframe.className = 'w-full h-full overflow-visible'
    iframe.sandbox = "allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals";
    iframe.srcdoc = content;

    if (elmntId === '#Preview-xs-Viewer') {
        document.querySelector(elmntId).appendChild(iframe);
        return;
    }
    document.querySelector(elmntId).insertBefore(iframe, document.querySelector(elmntId + '-AreaGap'));
}