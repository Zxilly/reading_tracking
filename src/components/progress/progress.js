import axios from 'axios'
import Cookies from 'js-cookie'
import {apiurl} from "@/config";

function sendinfo(isbn, progress, tip) {
    //console.log(isbn)
    return new Promise(((resolve) => {
        axios({
            url: apiurl,
            params: {
                'user': Cookies.get('user')
            },
            method: 'post',
            data: {
                'method': 'update',
                'book': {
                    'isbn': isbn,
                    'progress': progress,
                    'tip': tip
                }
            }
        }).then(function (resp) {
            let data = resp.data
            if (data['code'] === 2) {
                resolve(data['msg'])
            }
        })
    }))
}

export {sendinfo}
export default {}