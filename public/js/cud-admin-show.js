const fs = require('fs');
import axios from 'axios'
import {showAlert} from './alert'

export const createNewShow = async (data) =>{
    try {
        const res = await axios({
            method:'POST',
            url: '/api/v1/shows',
            data: data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Create Show successfully');
            window.setTimeout(()=>{
                location.assign('/crud-show-form')
            },1500)
        }
    }
    catch(err){
        if(err.response.data.message.includes('tea-room-app.shows index: date_1_content_1 dup key')){
            showAlert('error','Ngày diễn và chủ đề âm nhạc đã tồn tại!');
        }
        else {
            showAlert('error',err.response.data.message);
        }
    }
}

export const updateShow = async (data,id) =>{
    try {
        const res = await axios({
            method:'PATCH',
            url: `/api/v1/shows/${id}`,
            data: data//data send with request(gửi lên url)
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Update show successfully');
            window.setTimeout(()=>{
                location.assign('/crud-show-form')
            },1000)

        }
    }
    catch(err){
        console.log(err);
        if(err.response.data.message.includes('tea-room-app.shows index: date_1_content_1 dup key')){
            showAlert('error','Ngày diễn và chủ đề âm nhạc đã tồn tại!');
        }
        else {
            showAlert('error',err.response.data.message);
        }
    }
}


export const deleteShow = async (id) =>{
    try {
        const res = await axios({
            method:'DELETE',
            url: `http://127.0.0.1:8080/api/v1/shows/${id}`
        });

        if(res.status == '204'){
            showAlert('success', 'Delete show successfully');
            window.setTimeout(()=>{
                location.assign('/crud-show-form')
            },500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}