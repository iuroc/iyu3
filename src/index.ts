import { iyu3 } from './iyu3'

/**
 * 获取文件列表
 * @param path 文件夹路径，以 `%` 开头
 */
function getFileList(path: string): string[] {
    let listStr = iyu3.runSync('api.getFileList', [path], 'sss.fileList')
    return listStr ? listStr.split('\n') : []
}

function listClick(event: MouseEvent) {
    let type = (event.target as HTMLDivElement).getAttribute('data-type') as string
    let fileName = (event.target as HTMLDivElement).innerText
    if (type == 'dir') {
        nowPath += fileName + '/'
        loadFileList()
    } else {
        iyu3.run('api.openFile', [nowPath + fileName])
    }
}

/** 加载文件列表 */
function loadFileList(path: string = nowPath) {
    const fileList = getFileList(path)
    listEle.innerHTML = ``
    let classList = ['list-group-item', 'list-group-item-action', 'text-break']
    if (nowPath != basePath) {
        const backBtn = document.createElement('div')
        backBtn.classList.add('text-bg-success')
        backBtn.classList.add(...classList)
        backBtn.innerText = '返回上一级'
        backBtn.addEventListener('click', () => {
            nowPath = nowPath.replace(/[^/]+\/$/, '')
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
        if (info[1] == 'dir') listItem.classList.add('bg-light')
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
let basePath = '/sdcard/'
let nowPath = basePath
loadFileList()