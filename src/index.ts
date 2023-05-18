import { iyu3 } from './iyu3'

iyu3.callback.get_res = (data) => {
    alert(data)
}
// iyu3.run('api.get_res', ['https://apee.top'], 'get_res')
// let result = iyu3.runSync('api.get_file_list', [true], 'sss.file_list')
// alert(result)

for (let i = 0; i < 100; i++) {
    iyu3.log('你好呀 ' + i)
}