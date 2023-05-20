import { iyu3 } from './iyu3'

/**
 * 获取文件列表
 * @param path 文件夹路径，以 `%` 开头
 */
function getFileList(path: string): string[] {
    let listStr = iyu3.runSync('api.get_file_list', [path], 'sss.file_list')
    return listStr ? listStr.split('\n') : []
}

function listClick(event: MouseEvent) {
    let type = (event.target as HTMLDivElement).getAttribute('data-type') as string
    if (type == 'dir') {
        let fileName = (event.target as HTMLDivElement).innerText
        nowPath += fileName + '/'
        loadFileList()
    } else {
        alert('这是一个文件')
    }
}

/** 加载文件列表 */
function loadFileList(path: string = nowPath) {
    const fileList = getFileList(path)
    listEle.innerHTML = ``
    let classList = ['list-group-item', 'list-group-item-action']
    if (nowPath != '%') {
        const backBtn = document.createElement('div')
        backBtn.classList.add(...classList)
        backBtn.innerText = '返回上一级'
        backBtn.addEventListener('click', () => {
            nowPath = nowPath.replace(/[^/%]+\/$/, '')
            loadFileList()
        })
        listEle.append(backBtn)
    }
    fileList.forEach(fileInfo => {
        const info = fileInfo.split('|')
        let fileName = info[0]
        const listItem = document.createElement('div')
        listItem.classList.add(...classList)
        listItem.innerText = fileName
        listItem.setAttribute('data-type', info[1])
        listItem.addEventListener('click', listClick)
        listEle.append(listItem)
    })
    window.scrollTo(0, 0)
}

const listEle = document.querySelector('.file-list') as HTMLDivElement
const aboutEle = document.querySelector('.about') as HTMLDivElement
aboutEle.addEventListener('click', () => {
    iyu3.run('api.about')
})
let nowPath = '%'
loadFileList()