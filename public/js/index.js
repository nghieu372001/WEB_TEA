import {signup,login,logout} from './authen'
import {createNewMenu,updateMenu, deleteMenu} from './cud-admin-menu'
import {createNewShow,updateShow,deleteShow} from './cud-admin-show'
import {createNewOrder} from './user-create-order'
import {agreeOrder,denyOrder,deleteOrder} from './ud-admin-order'
import {showAlert} from './alert'



const signupForm = document.querySelector('.form-sign-up');
const loginForm = document.querySelector('.form-log-in');
const logoutBtn = document.querySelector('.log-out');
const logoutBtnAdmin = document.querySelector('.log-out-admin');

const imgCover = document.getElementById('imageDish');
const imgCoverShow = document.getElementById('imageShow');

const btnCreateMenu = document.querySelector('.btn-create-menu');
const btnSaveMenu = document.querySelector('.btn-save-menu');
const btnDeleteMenus = document.querySelectorAll('.btn-delete-menu');
const btnDeleteMenuConfirm = document.querySelector('.btn-delete-confirm');

const formUserOrder = document.querySelector('.form-user-order');

const btnConfirmAgreeOrders = document.querySelectorAll('.btn-confirm-agree-order');
const btnAgreeOrder = document.querySelector('.btn-agree-order');

const btnConfirmDenyOrders = document.querySelectorAll('.btn-confirm-deny-order');
const btnDenyOrder = document.querySelector('.btn-deny-order');

const btnConfirmDeleteOrders = document.querySelectorAll('.btn-confirm-delete-order');
const btnDeleteOrder = document.querySelector('.btn-delete-order');


const btnCreateShow = document.querySelector('.btn-create-show');
const btnSaveShow = document.querySelector('.btn-save-show');
const btnDeleteShows = document.querySelectorAll('.btn-delete-show');
const btnDeleteShowConfirm = document.querySelector('.btn-confirm-delete-show');

const btnSelect = document.getElementById('show');
// const btnSelectOptions = document.querySelectorAll('.show');

const dateShow = document.getElementById('date');




//Signup
if(signupForm){
    signupForm.addEventListener('submit',(e)=>{ // nút btn mới có submit
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        console.log(name,email,password,passwordConfirm);
        signup({name,email,password,passwordConfirm});
    });
}

//Login
if(loginForm){
    loginForm.addEventListener('submit',(e)=>{ // nút btn mới có submit
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login({email,password});
    });
}

//Logout
if(logoutBtn){
    logoutBtn.addEventListener('click',logout);
}

//Logout Admin
if(logoutBtnAdmin){
    logoutBtnAdmin.addEventListener('click',logout);
}

//Display image menu before save in database
if(imgCover){
    imgCover.addEventListener('change',async (e)=>{
        e.preventDefault();
        const ImagesFileURL = ()=>{
            var fileSelected = document.getElementById('imageDish').files;
            if(fileSelected.length > 0){
                var fileToLoad = fileSelected[0];
                var fileReader = new FileReader();
                fileReader.onload = (e) => {
                    var srcData = e.target.result;
                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    document.getElementById('displayImg').innerHTML = newImage.outerHTML;
                }
                fileReader.readAsDataURL(fileToLoad)

            }
        };
        ImagesFileURL();
    })
}

//Display image show before save in database
if(imgCoverShow){
    imgCoverShow.addEventListener('change',async (e)=>{
        e.preventDefault();
        const ImagesFileURL = ()=>{
            var fileSelected = document.getElementById('imageShow').files;
            if(fileSelected.length > 0){
                var fileToLoad = fileSelected[0];
                var fileReader = new FileReader();
                fileReader.onload = (e) => {
                    var srcData = e.target.result;
                    var newImage = document.createElement('img');
                    newImage.src = srcData;
                    document.getElementById('displayImgShow').innerHTML = newImage.outerHTML;
                }
                fileReader.readAsDataURL(fileToLoad)

            }
        };
        ImagesFileURL();
    })
}



//Admin Create menu
if(btnCreateMenu){
    btnCreateMenu.addEventListener('click',(e)=>{ // nút btn mới có submit
        e.preventDefault();

        const form = new FormData();
        form.append('name',document.getElementById('name').value);
        form.append('price',document.getElementById('price').value);
        form.append('description',document.getElementById('description').value);
        form.append('imageDish',document.getElementById('imageDish').files[0]);

        // Check data
        if(form.get('name') ===''){
            showAlert('error','Vui lòng nhập tên món ăn');
            return
        }
        else if(form.get('price') ==='') {
            showAlert('error','Vui lòng nhập giá');
            return  
        }
        else if(Number(form.get('price')) < 0) {
            showAlert('error','Giá món ăn phải lớn hoặc bằng hơn 0');
            return
        }
        else if(form.get('imageDish') == 'undefined'){
            showAlert('error','Vui lòng chọn hình ảnh');
            return
        }

        createNewMenu(form);
    });
}

//Admin update menu
if(btnSaveMenu){
    btnSaveMenu.addEventListener('click',(e)=>{ // nút btn mới có submit
        e.preventDefault();

        const form = new FormData();
        form.append('name',document.getElementById('name').value);
        form.append('price',document.getElementById('price').value);
        form.append('description',document.getElementById('description').value);
        form.append('imageDish',document.getElementById('imageDish').files[0]);
        const id = document.getElementById('id').value;

        // Check data
        if(form.get('name') ===''){
            showAlert('error','Vui lòng nhập tên món ăn');
            return
        }
        else if(form.get('price') ==='') {
            showAlert('error','Vui lòng nhập giá');
            return  
        }
        else if(Number(form.get('price')) < 0) {
            showAlert('error','Giá món ăn phải lớn hoặc bằng hơn 0');
            return
        }

        updateMenu(form, id);
    });
}

//Admin delete menu 
if(btnDeleteMenus){
    let id_del;
    btnDeleteMenus.forEach(btnDel =>{
        btnDel.addEventListener('click',()=>{
            id_del = btnDel.getAttribute('id');
        });
    });
    if(btnDeleteMenuConfirm){
        btnDeleteMenuConfirm.addEventListener('click',()=>{
            deleteMenu(id_del);
        })
    }
}

//User create new order -- User Booking
if(formUserOrder){
    formUserOrder.addEventListener('submit',(e)=>{
        e.preventDefault();

        const id_user = document.getElementById('id_user').value;

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const amount = document.getElementById('amount').value;
        const dateOrder = document.getElementById('dateOrder').value;
        const show = document.getElementById('show').value;
        const timeOrder = document.getElementById('timeOrder').value;
        const note = document.getElementById('note').value;

        //lấy ngày hiện tại
        let getDate = new Date();

        let yearCurrent = getDate.getFullYear();
        let monthCurrent = getDate.getMonth() + 1;
        let dayCurrent = getDate.getDate();
        // T4 ngày 22/12/2021

        const arrayDateInput  = dateOrder.split('-');

        if(Number(arrayDateInput[0]) > Number(yearCurrent)){
            createNewOrder({name,phone,amount,dateOrder,show,timeOrder,note},id_user);
        }
        else if(Number(arrayDateInput[0]) == Number(yearCurrent)){
            if(Number(arrayDateInput[1]) > Number(monthCurrent)){
                createNewOrder({name,phone,amount,dateOrder,show,timeOrder,note},id_user);
            }
            else if(Number(arrayDateInput[1]) == Number(monthCurrent)){
                if(Number(arrayDateInput[2]) >= Number(dayCurrent)){
                    createNewOrder({name,phone,amount,dateOrder,show,timeOrder,note},id_user);
                }
                else{
                    showAlert('error','Show diễn không tồn tại');
                    return
                }
            }
            else{
                showAlert('error','Show diễn không tồn tại');
                return
            }
        }
        else if(Number(arrayDateInput[0]) < Number(yearCurrent)){
            showAlert('error','Show diễn không tồn tại');
            return
        }
    })
}

//Admin confirm user order
if(btnConfirmAgreeOrders){
    let idOrder;
    btnConfirmAgreeOrders.forEach(btnConfirmAgree =>{
        btnConfirmAgree.addEventListener('click',()=>{
            idOrder = btnConfirmAgree.getAttribute('id');
        });
    });
    if(btnAgreeOrder){
        btnAgreeOrder.addEventListener('click',()=>{
            agreeOrder(idOrder);
        })
    }
}

//Admin deny user order
if((btnConfirmDenyOrders)){
    let idOrder;
    btnConfirmDenyOrders.forEach(btnConfirmDeny =>{
        btnConfirmDeny.addEventListener('click',()=>{
            idOrder = btnConfirmDeny.getAttribute('id');
        });
        
    });
    if(btnDenyOrder){
        btnDenyOrder.addEventListener('click',()=>{
            denyOrder(idOrder);
        })
    }
}

//Admin delete user order
if(btnConfirmDeleteOrders){
    let idOrder;
    btnConfirmDeleteOrders.forEach(btnConfirmDelete =>{
        btnConfirmDelete.addEventListener('click',()=>{
            idOrder = btnConfirmDelete.getAttribute('id');
        });
        
    });
    if(btnDeleteOrder){
        btnDeleteOrder.addEventListener('click',()=>{
            deleteOrder(idOrder);
        })
    }
}

//Admin create show
if(btnCreateShow){
    btnCreateShow.addEventListener('click',(e)=>{
        e.preventDefault();

        const formShow = new FormData();
        formShow.append('date',document.getElementById('date').value);
        formShow.append('day',document.getElementById('day').value);
        formShow.append('content',document.getElementById('content-show').value);
        formShow.append('singer',document.getElementById('singer').value);
        formShow.append('imageShow',document.getElementById('imageShow').files[0]);

        for(var p of formShow){
            if(p[0]!='imageShow'){
                if(p[1].includes('\t')){
                    formShow.set(p[0],p[1].split('\t')[0])
                }
            }
        }

        // Check data
        if(formShow.get('date') ===''){
            showAlert('error','Vui lòng nhập ngày diễn');
            return
        }
        else if(formShow.get('day') ==='') {
            showAlert('error','Vui lòng nhập ngày');
            return  
        }
        else if(formShow.get('content') ==='') {
            showAlert('error','Vui lòng nhập chủ đề âm nhạc');
            return  
        }
        else if(formShow.get('singer') ==='') {
            showAlert('error','Vui lòng nhập tên ca sĩ');
            return  
        }
        else if(formShow.get('imageShow') == 'undefined'){
            showAlert('error','Vui lòng chọn hình ảnh');
            return
        }

        createNewShow(formShow);
    })
}

//Update show
if(btnSaveShow){
    btnSaveShow.addEventListener('click',(e)=>{ // nút btn mới có submit
        e.preventDefault();

        const formShow = new FormData();
        formShow.append('date',document.getElementById('date').value);
        formShow.append('day',document.getElementById('day').value);
        formShow.append('content',document.getElementById('content-show').value);
        formShow.append('singer',document.getElementById('singer').value);
        formShow.append('imageShow',document.getElementById('imageShow').files[0]);

        const id = document.getElementById('id').value;

        for(var p of formShow){
            if(p[0]!='imageShow'){
                if(p[1].includes('\t')){
                    formShow.set(p[0],p[1].split('\t')[0])
                }
            }
        }

        // Check data
        if(formShow.get('date') ===''){
            showAlert('error','Vui lòng nhập ngày diễn');
            return
        }
        else if(formShow.get('day') ==='') {
            showAlert('error','Vui lòng nhập ngày');
            return  
        }
        else if(formShow.get('content') ==='') {
            showAlert('error','Vui lòng nhập chủ đề âm nhạc');
            return  
        }
        else if(formShow.get('singer') ==='') {
            showAlert('error','Vui lòng nhập tên ca sĩ');
            return  
        }

        updateShow(formShow, id);
    });
}

//Admin delete show 
if((btnDeleteShows)){
    let id_del_show;
    btnDeleteShows.forEach(btnDel =>{
        btnDel.addEventListener('click',()=>{
            id_del_show = btnDel.getAttribute('id');
        });
    });
    if(btnDeleteShowConfirm){
        btnDeleteShowConfirm.addEventListener('click',()=>{
            deleteShow(id_del_show);
        })
    }
}


//Chọn Show trong overview thì hiển thị ngày biểu diễn của show đó  - Chỉ thực hiện chức năng hiển thị dữ liệu, không be
if(btnSelect){
    btnSelect.addEventListener('change',(e)=>{
        var date = btnSelect.options[btnSelect.selectedIndex].dataset.date;
        if(!date){
            document.getElementById('dateOrder').value = '';
            return
        }
            
        const arrayDate = date.split('/');
        if(arrayDate[0] < 10) {arrayDate[0] = `0${arrayDate[0]}`}
        if(arrayDate[1] < 10) {arrayDate[1] = `0${arrayDate[1]}`}
        const dateTranfer = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
        document.getElementById('dateOrder').value = dateTranfer;
    })
}


//thay đổi ngày diễn -> thay đổi thứ trong thêm lịch diễn
if(dateShow){
    dateShow.addEventListener('change',()=>{
        var day_name = '';
        const dateShowChosen = new Date(dateShow.value);
        var current_day = dateShowChosen.getDay();
        switch (current_day) {
            case 0:
                day_name = "Chủ Nhật";
                break;
            case 1:
                day_name = "Thứ Hai";
                break;
            case 2:
                day_name = "Thứ Ba";
                break;
            case 3:
                day_name = "Thứ Tư";
                break;
            case 4:
                day_name = "Thứ Năm";
                break;
            case 5:
                day_name = "Thứ Sáu";
                break;
            case 6:
                day_name = "Thứ Bảy";
            };

        document.getElementById('day').value = day_name;
    })
}