import {signup,login,logout} from './authen' //getUserByID - test axios
import {createNewMenu,updateMenu, deleteMenu} from './cud-admin-menu'
import {createNewShow,updateShow,deleteShow} from './cud-admin-show'
import {createNewOrder} from './user-create-order'
import {agreeOrder,agreeManyOrder,denyOrder,denyManyOrder,deleteOrder,deleteManyOrder} from './ud-admin-order'
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

const seats = document.querySelectorAll('.seat');

const btnOrderShows = document.querySelectorAll('.btn-order-show');


const btnCheckAllOrder = document.getElementById('check-all');
const btnCheckOrders = document.querySelectorAll('.check-order');
const btnForMany = document.getElementById('btn-for-many');
const btnConfirmForMany= document.getElementById('btn-action-many-confirm');








//Signup
if(signupForm){
    signupForm.addEventListener('submit',(e)=>{ // nút btn mới có submit
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const passwordConfirm = document.getElementById('passwordConfirm').value;
        console.log(name,email,phone,password,passwordConfirm);
        signup({name,email,phone,password,passwordConfirm});
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
        const timeCome = document.getElementById('timeCome').value;
        const seat = document.getElementById('id_seat').value;// lấy id của seat
                
        if(seat == ''){
            showAlert('error','Vui lòng chọn vị trí');
            return
        }

        createNewOrder({name,phone,amount,dateOrder,show,timeOrder,timeCome,seat},id_user);
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
        formShow.append('time',document.getElementById('time').value);
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
        else if(formShow.get('time') ==='') {
            showAlert('error','Vui lòng nhập thời gian');
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


//Chọn Show trong form order thì hiển thị ngày biểu diễn,giờ, và tên trong map-seat của show đó  - Chỉ thực hiện chức năng hiển thị dữ liệu, không be
if(btnSelect){
    btnSelect.addEventListener('change',(e)=>{
        var date = btnSelect.options[btnSelect.selectedIndex].dataset.date;
        var time = btnSelect.options[btnSelect.selectedIndex].dataset.time;
        var nameShow = btnSelect.options[btnSelect.selectedIndex].innerHTML

        if(!date){ // có nghĩa là select show trong form order là *Chọn Show Diễn
            document.getElementById('dateOrder').value = '';
            document.getElementById('timeOrder').value = '';
            document.getElementById('name-show-for-position').innerHTML  = 'Vui lòng chọn show để xem';
            
            const arrMapSeat = document.querySelectorAll('.row-seat');
            arrMapSeat.forEach(el => { 
                el.classList.add('hidden');
            })

            return
        }
            
        const arrayDate = date.split('/');
        if(arrayDate[0] < 10) {arrayDate[0] = `0${arrayDate[0]}`}
        if(arrayDate[1] < 10) {arrayDate[1] = `0${arrayDate[1]}`}
        const dateTranfer = `${arrayDate[2]}-${arrayDate[1]}-${arrayDate[0]}`;
        document.getElementById('dateOrder').value = dateTranfer;
        document.getElementById('timeOrder').value = time;
        document.getElementById('name-show-for-position').innerHTML  = `<h3>${nameShow}</h3>`;


        //thay đổi map seat khi lựa chọn trong lịch diễn của form order
        const arrMapSeat = document.querySelectorAll('.row-seat');
        arrMapSeat.forEach(el => {
            if(el.id == btnSelect.value){
                el.classList.remove('hidden');
            }
            else{
                el.classList.add('hidden');
            }
        })
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



//hiển thị màu vị trí khi chọn và lấy vị trí bàn điền vào form order
if(seats){
    seats.forEach( (seat,index,arr) => {
        seat.addEventListener('click', e => {
            const idseat = seat.dataset.idseat;
            //
            if(document.querySelector('.forPosition')){
                if (e.target.classList.contains("seat") && !e.target.classList.contains("sold")) {
                    if(!e.target.classList.contains("selected")){
                        arr.forEach(el => {
                            el.classList.remove("selected");
                        });
                        e.target.classList.add("selected");
                        document.getElementById('position').value = e.target.innerHTML;
                        document.getElementById('id_seat').value = idseat
                    }
                    else if(e.target.classList.contains("selected")){
                        e.target.classList.remove("selected");
                        document.getElementById('position').value = '';
                        document.getElementById('id_seat').value = '';
                    }
                }
            }
            //
        })
    })
}




//nhấn nút đặt bàn trong section lịch diễn thì tự động trỏ xuống form order và điền thông tin lịch diễn, ngày diễn, giờ diễn của show đó
if(btnOrderShows.length > 0){ // btnOrderShows.length > 0 có nghĩa user đã đăng nhập, => nodelist > 0
    btnOrderShows.forEach(btnOrderShow => {
        btnOrderShow.addEventListener('click', e =>{
            const idShow = btnOrderShow.dataset.id
            const timeShow = btnOrderShow.dataset.time;
            const dateShow = btnOrderShow.dataset.date;
            const contentShow = btnOrderShow.dataset.content;
            
            const arrayDateShow = dateShow.split('/');
            if(arrayDateShow[0] < 10) {arrayDateShow[0] = `0${arrayDateShow[0]}`}
            if(arrayDateShow[1] < 10) {arrayDateShow[1] = `0${arrayDateShow[1]}`}
            const dateShowTranfer = `${arrayDateShow[2]}-${arrayDateShow[1]}-${arrayDateShow[0]}`;

            document.getElementById('show').value = idShow;
            document.getElementById('timeOrder').value = timeShow;
            document.getElementById('dateOrder').value = dateShowTranfer;
            document.getElementById('name-show-for-position').innerHTML = `<h3>${contentShow}</h3>`;


            //khi click đặt bàn trong section lịch diễn thì map seat thay đổi
            const arrMapSeat = document.querySelectorAll('.row-seat');
            arrMapSeat.forEach(el => {
                if(el.id == idShow){
                    el.classList.remove('hidden');
                }
                else{
                    el.classList.add('hidden');
                }
            })

            //test
            // getUserByID('6353a4aab81802acd65c246b') // return ra promise
            // .then((data)=>{
            //     document.getElementById('name-show-for-position').innerHTML = `<h3>${data.data.data.user.name}</h3>`;
            // });
        })
    })
}


//chức năng chọn nhiều trong quản lý đơn đặt bàn
// chọn nhiều id order trong quản lý đặt bàn
let arrIdByCheck = []; // biến global cho check
if(btnCheckAllOrder){
    btnCheckAllOrder.addEventListener('click',(e)=>{
        if(btnCheckAllOrder.checked){
            //nếu check all thì button enable
            btnForMany.disabled = false;

            [...btnCheckOrders].forEach(btnCheckOrder => {
                btnCheckOrder.checked = true;
                arrIdByCheck.push(btnCheckOrder.dataset.id)
            })
        }
        else if(!btnCheckAllOrder.checked){
            //nếu không check all thì button disable
            btnForMany.disabled = true; 

            [...btnCheckOrders].forEach(el => {
                el.checked = false;
                arrIdByCheck.splice(0,arrIdByCheck.length) // xóa tất cả id ra khỏi mảng
            })
        };
        console.log(arrIdByCheck)
    })
}


if(btnCheckOrders){
    [...btnCheckOrders].forEach(btnCheckOrder => {
        btnCheckOrder.addEventListener('click', (e) => {
            //kiểm tra có tất cả có check ko, nếu có btnCheckAll = true, không thì btnCheckAll = false
            var isAllChecked = [...btnCheckOrders].every(el => {
                return el.checked == true
            })
            if(isAllChecked){
                btnCheckAllOrder.checked = true
            }
            else {
                btnCheckAllOrder.checked = false
            }
            //

            //thêm id vào array nếu có check
            if(btnCheckOrder.checked == true){
                arrIdByCheck.push(btnCheckOrder.dataset.id)
            }
            else{
                const deleteArr = arrIdByCheck.indexOf(btnCheckOrder.dataset.id);
                arrIdByCheck.splice(+deleteArr,1)
            };

            console.log(arrIdByCheck);

            var someChecked = [...btnCheckOrders].some(el => {
                return el.checked == true
            });
            if(someChecked){
                //nếu có 1 nút checked thì button enable
                btnForMany.disabled = false;
            }
            else {
                //nếu không có 1 nút checked thì button disable
                btnForMany.disabled = true;
            }
        })
    });
}


if(btnConfirmForMany){
    btnConfirmForMany.addEventListener('click',(e) => {
        const arrIdByCheckForSubmit =  arrIdByCheck;
        const selectActionMany = document.getElementById('select-action-many').value;
        if(selectActionMany == 0){
            showAlert('error','Vui lòng chọn hành động');
            return
        }
        else if(selectActionMany == 1){
            agreeManyOrder(arrIdByCheckForSubmit)
        }
        else if(selectActionMany == 2){
            denyManyOrder(arrIdByCheckForSubmit)
        }
        else if(selectActionMany == 3){
            deleteManyOrder(arrIdByCheckForSubmit)
        }
    })
}
