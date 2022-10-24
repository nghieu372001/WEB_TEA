import axios from 'axios'
import {showAlert} from './alert'


export const agreeOrder = async (idOrder) =>{
    try {
        const res = await axios({
            method:'POST',
            url: `/api/v1/orders/confirm-order/${idOrder}`
        });
        console.log(res)
        if(res.status == '204'){
            showAlert('success', 'Xác nhận đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}


export const agreeManyOrder = async (data) =>{
    try {
        const res = await axios({
            method:'POST',
            url: `/api/v1/orders/confirm-order/`,
            data:data
        });
        if(res.status == '204'){
            showAlert('success', 'Xác nhận nhiều đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}



export const denyOrder = async (idOrder) =>{
    try {
        const res = await axios({
            method:'POST',
            url: `/api/v1/orders/deny-order/${idOrder}`
        });
        console.log(res)
        if(res.status == '204'){
            showAlert('success', 'Hủy đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}

export const denyManyOrder = async (data) =>{
    try {
        const res = await axios({
            method:'POST',
            url: `/api/v1/orders/deny-order/`,
            data:data
        });
        if(res.status == '204'){
            showAlert('success', 'Hủy nhiều đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}



export const deleteOrder = async (idOrder) =>{
    try {
        const res = await axios({
            method:'DELETE',
            url: `/api/v1/orders/${idOrder}`
        });
        console.log(res)
        if(res.status == '204'){
            showAlert('success', 'Xóa đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}

export const deleteManyOrder = async (data) =>{
    try {
        const res = await axios({
            method:'DELETE',
            url: `/api/v1/orders/`,
            data:data
        });
        if(res.status == '204'){
            showAlert('success', 'Xóa nhiều đơn đặt bàn thành công');
            window.setTimeout(()=>{
                location.reload(true)
            },1500)
        }
    }
    catch(err){
        showAlert('error',err.response.data.message)
    }
}