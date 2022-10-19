import axios from 'axios'
import {showAlert} from './alert'


export const createNewOrder = async (data,id_user) =>{
    try {
        const res = await axios({
            method:'POST',
            url: `/api/v1/users/${id_user}/orders`,
            data: data
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Đặt bàn thành công');
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
    }
    catch(err){
        showAlert('error','Vui lòng thử lại')
    }
}
