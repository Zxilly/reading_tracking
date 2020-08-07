import axios from 'axios'
import Cookies from 'js-cookie'

import {apiurl} from '@/config'


export function updatedialog(isbn, bookname, author, page) {
    //eslint-disable-next-line no-debugger
    //debugger
    if (!isbn) {
        return
    }
    var username = Cookies.get('user')
    var msg = ''
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: apiurl,
            params: {
                'user': username,
            },
            data: {
                'method': 'edit',
                'book': {
                    'isbn': isbn,
                    'title': bookname,
                    'author': author,
                    'page': page,
                }
            }
        }).then((response) => {
            var data = response.data
            if (data['code'] === 7) {
                msg = data['msg']
                resolve(msg)
            } else {
                msg = '肯定有什么东西炸了'
                reject(msg)
            }
        })
    })


}


export default updatedialog()