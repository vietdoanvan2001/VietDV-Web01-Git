// router path
export const menuItems = [
    {
        name: "Tổng quan",
        iconDefault: "dashboard_icon",
        iconActive: "dashboard_icon__active",
        tag: "/tong-quan"
    },
    {
        name: "Tiền mặt",
        iconDefault: "cash_icon",
        iconActive: "cash_icon__active",
        tag: "/tien-mat"
    },
    {
        name: "Tiền gửi",
        iconDefault: "deposit_icon",
        iconActive: "deposit_icon__active",
        tag: "/tien-gui"
    },
    {
        name: "Mua hàng",
        iconDefault: "buy_icon",
        iconActive: "buy_icon__active",
        tag: "/mua-hang"
    },
    {
        name: "Bán hàng",
        iconDefault: "sell_icon",
        iconActive: "sell_icon__active",
        tag: "/ban-hang"
    },
    {
        name: "Quản lý hoá đơn",
        iconDefault: "bill_icon",
        iconActive: "bill_icon__active",
        tag: "/quan-ly-hoa-don"
    },
    {
        name: "Kho",
        iconDefault: "warehouse_icon",
        iconActive: "warehouse_icon__active",
        tag: "/kho"
    },
    {
        name: "Công cụ dụng cụ",
        iconDefault: "tool_icon",
        iconActive: "tool_icon__active",
        tag: "/cong-cu-dung-cu"
    },
    {
        name: "Tài sản cố định",
        iconDefault: "static_asset_icon",
        iconActive: "static_asset_icon__active",
        tag: "/tai-san-co-dinh"
    },
    {
        name: "Tiền lương",
        iconDefault: "salary_icon",
        iconActive: "salary_icon__active",
        tag: "/tien-luong"
    },
    {
        name: "Thuế",
        iconDefault: "tax_icon",
        iconActive: "tax_icon__active",
        tag: "/thue"
    },
    {
        name: "Giá thành",
        iconDefault: "price_icon",
        iconActive: "price_icon__active",
        tag: "/gia-thanh"
    },
    {
        name: "Tổng hợp",
        iconDefault: "summary_icon",
        iconActive: "summary_icon__active",
        tag: "/tong-hop"
    },
    {
        name: "Ngân sách",
        iconDefault: "budget_icon",
        iconActive: "budget_icon__active",
        tag: "/ngan-sach"
    },
    {
        name: "Báo cáo",
        iconDefault: "report_icon",
        iconActive: "report_icon__active",
        tag: "/bao-cao"
    },
    {
        name: "Phân tích tài chính",
        iconDefault: "analyze_icon",
        iconActive: "analyze_icon__active",
        tag: "/phan-tich-tai-chinh"
    }
]



//Text cảnh báo trong Popup

export const warningTxt = {
    Require: "không được để trống",
    ErrorDate: "Ngày không được lớn hơn ngày hiện tại",
    ErrorEmail: "Email sai định dạng",
    OnlyNumberField: "Trường chỉ chứa số",
    DuplicateEmployeeCode: "Mã khách hàng đã tồn tại trong hệ thống"
}

//Các title của bảng nhân viên

export const titleTable = [
    {
        Name: "MÃ NHÂN VIÊN",
        FieldName:"EmployeeCode",
        Title: "",
        Width: "150px",
        Cellclass: "text-align--left second-column"
    },
    {
        Name: "TÊN NHÂN VIÊN",
        FieldName:"FullName",
        Title: "",
        Width: "200px",
        Cellclass: "text-align--left third-column"
    },
    {
        Name: "GIỚI TÍNH",
        FieldName:"GenderName",
        Title: "",
        Width: "150px",
        Cellclass: "text-align--left"
    },
    {
        Name: "NGÀY SINH",
        FieldName:"DateOfBirth",
        Title: "",
        Width: "150px",
        Cellclass: "text-align--center"
    },
    {
        Name: "SỐ CMND",
        FieldName:"IdentityNumber",
        Title: "Số chứng minh nhân dân",
        Width: "150px",
        Cellclass: "text-align--left"
    },
    {
        Name: "CHỨC DANH",
        FieldName:"PositionName",
        Title: "",
        Width: "200px",
        Cellclass: "text-align--left"
    },
    {
        Name: "TÊN ĐƠN VỊ",
        FieldName:"DepartmentName",
        Title: "",
        Width: "250px",
        Cellclass: "text-align--left"
    },
    {
        Name: "SỐ TÀI KHOẢN",
        FieldName:"BankNumber",
        Title: "",
        Width: "200px",
        Cellclass: "text-align--left"
    },
    {
        Name: "TÊN NGÂN HÀNG",
        FieldName:"BankName",
        Title: "",
        Width: "250px",
        Cellclass: "text-align--left"
    },
    {
        Name: "CHI NHÁNH TK NGÂN HÀNG",
        FieldName:"BankBranch",
        Title: "Chi nhánh tài khoản ngân hàng",
        Width: "350px",
        Cellclass: "text-align--left"
    }
]

//Các lựa chọn chức năng trong bảng
export const optionSellectedItem ={
    duplicate: "Nhân bản",
    delete: "Xoá",
    stopUsing: "Ngưng sử dụng"
}


//Thông tin của các trường cần validate
export const listValidateField = {
    EmployeeCode: {
        name: "EmployeeCode",
        //tên trường phục vụ cho hiển thị lỗi
        label: "Mã",
        //biến phục vụ cho add class lỗi vào element
        class: false,
        //biến phục vụ cho add mô tả lỗi vào element
        title: "",
        isRequire: true
    },
    FullName: {
        name:"FullName",
        label:"Tên",
        class: false,
        title:"",
        isRequire: true
    },
    DepartmentId: {
        name: "Department",
        label:"Đơn vị",
        class: false,
        title:"",
        isRequire: true
    },
    PositionId: {
        name: "Position",
        label:"Chức vụ",
        class: false,
        title:"",
        isRequire: false
    },
    DateOfBirth: {
        name: "DateOfBirth",
        label:"Ngày sinh",
        class: false,
        title:"",
        isRequire: false
    },
    IdentityNumber: {
        name: "IdentityNumber",
        label:"Số chứng minh nhân dân",
        class: false,
        title:"",
        isRequire: false
    },
    IdentityDate: {
        name: "IdentityDate",
        label:"Ngày cấp",
        class: false,
        title:"",
        isRequire: false
    },
    PhoneNumber: {
        name: "PhoneNumber",
        label:"Điện thoại di động",
        class: false,
        title:"",
        isRequire: false
    },
    Email: {
        name: "mail",
        label:"Email",
        class: false,
        title:"",
        isRequire: false
    },
    LandLine: {
        name: "LandLine",
        label:"Điện thoại cố định",
        class: false,
        title:"",
        isRequire: false
    },
}



//Text câu hỏi trong popup
export const questionPopup = {
    changeData: "Lưu lại những thay đổi?",
    deleteDataBegin: "Bạn có muốn xoá Nhân viên <",
    deleteDataEnd:"> không?",
    deleteMultipleData: "Các dữ liệu bạn đang chọn sẽ bị xoá."
}



//Các hoạt động của toast message
export const toastActivity = {
    AddSuccess: "Đã thêm mới thông tin nhân viên.",
    UpdateSuccess: "Đã cập nhật thông tin nhân viên.",
    DeleteSuccess: "Đã xoá thông tin nhân viên.",
    AddFail: "Thêm mới thông tin nhân viên thất bại.",
    UpdateFail: "Cập nhật thông tin nhân viên thất bại.",
    DeleteFail: "Xoá thông tin nhân viên thất bại."
}

//Các title của popup
export const popupTitle = {
    DataChanged : "Dữ liệu đã thay đổi",
    DeleteData : "Xoá dữ liệu",
    ErrorMessage : "Thông báo lỗi"
}

//Lựa chọn số bản ghi trên 1 trang

export const pagingOption = [
    { 
        Value: 10,
        Name: "Số bản ghi/trang: 10" 
    },
    { 
        Value: 20, 
        Name: "Số bản ghi/trang: 20" 
    },
    { 
        Value: 30, 
        Name: "Số bản ghi/trang: 30"
    },
    { 
        Value: 50, 
        Name: "Số bản ghi/trang: 50" 
    },
    { 
        Value: 100, 
        Name: "Số bản ghi/trang: 100" 
    },
  ];


//Các lựa chọn mục giới tính trong form chi tiết nhân viên
export const genderSelection = [
    {
        value: 1,
        labelTxt: "Nam"
    },
    {
        value: 0,
        labelTxt: "Nữ"
    },
    {
        value: 2,
        labelTxt: "Khác"
    }
]

//Tên form
export const formTitle ={
    Add : "Thêm mới nhân viên",
    Fix : "Sửa thông tin nhân viên"
}

// Các trạng thái của các nút trong popup
export const buttonStatus = {
    Cancel: "Huỷ",
    Yes: "Có",
    No: "Không"
}

// Trạng thái toast message
export const toastStatus = {
    Success: "Thành Công",
    Fail: "Lỗi"
}

//Các cột trong detail combobox
export const detailComboboxTitle = {
    Position : {
        Code: "Mã chức vụ",
        Name: "Tên chức vụ"
    },
    Department : {
        Code: "Mã đơn vị",
        Name: "Tên đơn vị"
    },
}


//Giá trị default của phân trang
export const  defaultPagingParams = {
    pageSize: 20,
    offSet: 0,
    keyword: ""
}

//Text hiển thị ở paging
export const pagingText = {
    amount: "Tổng: ",
    record: " bản ghi"
}

//text các nút trong bảng
export const tableButtonText = {
    fix: "Sửa",
    function: "CHỨC NĂNG"
}

//text trong các nút
export const buttonText = {
    close : "Đóng",
    cancel: "Huỷ bỏ",
    doNotSave: "Không lưu",
    save: "Lưu",
    delete: "Xoá",
    deleteAll: "Xoá tất cả",
    saveData: "Cất",
    saveAndAdd: "Cất và thêm",
    cancelDetail: "Huỷ",
    addNewEmployee: "Thêm mới nhân viên"
}

//text trong EmployeeList
export const employeeListText = {
    title: "Nhân viên",
    selected: "Đã chọn",
    unchecked: "Bỏ chọn",
    checkedAll: "Chọn tất cả"
}

//placeholder trong các ô input
export const inputPlaceholder = {
    iconInputPlaceholder: "Nhập từ khoá tìm kiếm",
    searchInputPlaceholder: "Tìm theo mã, tên nhân viên"
}

//Các label trong EmployeeDetail
export const employeeDetailLabel = {
    isCustomer: "Là khách hàng",
    isSupplier: "Là nhà cung cấp ",
    code: "Mã",
    name: "Tên",
    department: "Đơn vị",
    position: "Chức danh",
    dateOfBirth: "Ngày sinh",
    gender: "Giới tính",
    identityNumber: "Số CMND",
    identityDate: "Ngày cấp",
    identityPlace: "Nơi cấp",
    address: "Địa chỉ",
    phoneNumber: "ĐT di động",
    landLine: "ĐT cố định",
    email: "Email",
    bankNumber: "Tài khoản ngân hàng",
    bankName: "Tên ngân hàng",
    bankBranch: "Chi nhánh"
}

//các title cho các từ viết tắt
export const titleExplain ={
    identityNumber : "Số chứng minh nhân dân",
    phoneNumber : "Điện thoại di động",
    landLine : "Điện thoại cố định"
}

//chú thích phím tắt cho các nút trong form
export const buttonDetailExplain = {
    cancel: "ESC",
    save: "Ctrl+Enter",
    saveAndAdd:"Ctrl+Shift+S"
}

//Text trong phần header
export const headerText = {
    companyName: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC",
    userName: "Nguyễn Văn Mạnh"
}

// Title icon
export const titleIcon = {
    export: "Xuất khẩu",
    close: "Đóng",
    reload: "Nạp lại dữ liệu",
    next: "Trang sau",
    previos: "Trang trước"
}