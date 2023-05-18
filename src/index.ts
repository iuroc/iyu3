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
    let fileName = (event.target as HTMLDivElement).innerText
    nowPath += fileName + '/'
    loadFileList()
}

/** 加载文件列表 */
function loadFileList(path: string = nowPath) {
    const fileList = getFileList(path)
    listEle.innerHTML = ''
    fileList.forEach(fileName => {
        const listItem = document.createElement('div')
        listItem.classList.add('list-group-item', 'list-group-item-action')
        listItem.innerText = fileName
        listItem.addEventListener('click', listClick)
        listEle.append(listItem)
    })
}

const listEle = document.querySelector('.file-list') as HTMLDivElement
const aboutEle = document.querySelector('.about') as HTMLDivElement
aboutEle.addEventListener('click', () => {
    iyu3.run('api.about')
})
let nowPath = '%'
loadFileList()