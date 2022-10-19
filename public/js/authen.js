import axios from 'axios'
import {showAlert} from './alert'


export const signup = async (data) =>{
    try{
        const res = await axios({
            method:'POST', 
            url:'/api/v1/users/signup',
            data: data // data send with request(gửi lên url)
        });
        if(res.data.status === 'success'){
            showAlert('success', 'Sign up successfully!')
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
    }
    catch(err){
        if(err.response.data.message.includes('Password are not the same')){
            showAlert('error','Xác nhận mật khẩu không giống với mật khẩu');
        }
        else if(err.response.data.message.includes('email_1 dup key')){
            showAlert('error','Tài Khoản Đã Tồn Tại');
        }
    }; 
}

export const login = async (data) =>{
    try{
        const res = await axios({
            method:'POST', 
            url:'/api/v1/users/login',
            data:data
        });

        if(res.data.status === 'success' && res.data.data.user.role === 'user'){
            showAlert('success', 'Đăng nhập thành công!')
            window.setTimeout(()=>{
                location.assign('/')
            },1500)
        }
        else if(res.data.status === 'success' && res.data.data.user.role === 'admin'){
            showAlert('success', 'Admin đăng nhập thành công!')
            window.setTimeout(()=>{
                location.assign('/crud-menu-form')
            },1500)
        }
    }
    catch(err){
        showAlert('error','Vui lòng kiểm tra lại Email và Password')
    }; 

}

export const logout = async (email,password) =>{
    try{
        const res = await axios({
            method:'GET',
            url:'/api/v1/users/logout',
        });
        if(res.data.status === 'success'){
            //location.reload(true);
            location.assign('/');
        }
    }
    catch(err){
        showAlert('error','Error logging out! Try Again.')
    }; 

}