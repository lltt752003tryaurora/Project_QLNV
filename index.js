var arrNhanVien = [];
var arrNhanVienXepLoai = [];
var arrAttribute = [
  "tknv",
  "name",
  "email",
  "password",
  "datepicker",
  "luongCB",
  "chucvu",
  "gioLam",
];

var arrTb = [
  "tbTKNV",
  "tbTen",
  "tbEmail",
  "tbMatKhau",
  "tbNgay",
  "tbLuongCB",
  "tbChucVu",
  "tbGiolam",
];

function themNhanVien() {
  event.preventDefault();
  var nVien = new NhanVien();
  var valid = true;
  for (var i = 0; i < arrAttribute.length; i++) {
    valid &= checkInputRong(arrAttribute[i], arrTb[i]);
    var value = document.getElementById(arrAttribute[i]).value;
    nVien[arrAttribute[i]] = value;
  }
  
  valid &=
    checkDinhDangTaiKhoan("tknv", "tbTKNV") &
    checkTenNhanVien("name", "tbTen") &
    checkEmail("email", "tbEmail") &
    checkPassword("password", "tbMatKhau") &
    checkLuongCB("luongCB", "tbLuongCB") &
    checkGioLam("gioLam", "tbGiolam");
  if (arrNhanVien.length >= 1) {
    valid &= checkTrungTaiKhoan(nVien, arrNhanVien);
  }
  if (valid) {
    arrNhanVien.push(nVien);
    renderNhanVien();
    luuLocal();
    document.getElementById("formNhanVien").reset();
    document.getElementById("offcanvasTop").style.background = "green";
    document.getElementById(
      "offcanvasTop"
    ).innerHTML = `Thêm nhân viên thành công,`;
  } else {
    document.getElementById("offcanvasTop").style.background = "red";
    document.getElementById(
      "offcanvasTop"
    ).innerHTML = `Thêm nhân viên thất bại.`;
  }
}

document.getElementById("btnThem").onclick = function () {
  document.getElementById("SapXepTang").style.display = "none"
  document.getElementById("SapXepGiam").style.display = "none"
  // tránh việc khi input bị sai ở nút sửa, rồi t ấn nút thêm nhân viên lại thì hiện lỗi
  for (var i = 0; i < arrTb.length; i++) {
    document.getElementById(arrTb[i]).style.display = "none";
  }
  document.getElementById("formNhanVien").reset();
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemNV").style.display = "inline-block";
  document.getElementById("header-title").innerHTML = "Login Form";
  document.getElementById("password").type = "password";
  document.getElementById("tknv").readOnly = false;
};

document.getElementById("btnThemNV").onclick = themNhanVien;

function renderNhanVien() {
  var content = "";
  //index_btn: để chèn vào id modal để xác định chính xác id cần xóa cần trỏ tới (nếu không có thì khi ta xóa mặc định là xóa phần tử đầu)
  var index_btn = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    index_btn++;
    var nVien = arrNhanVien[i];
    var new_NV_LayPT = new NhanVien();
    // copy data nVien for new_NV_LayPT
    Object.assign(new_NV_LayPT, nVien);
    var formatLuong = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(new_NV_LayPT.tinhTongLuong() * 1);
    new_NV_LayPT.datepicker = formatDate(new_NV_LayPT.datepicker);
    content += `
          <tr>
              <th class="nowrap mr-1 taikhoan">${new_NV_LayPT.tknv}</th>
              <th>${new_NV_LayPT.name}</th>
              <th>${new_NV_LayPT.email}</th>
              <th>${new_NV_LayPT.datepicker}</th>
              <th>${new_NV_LayPT.chucvu}</th>
              <th>${formatLuong}</th>
              <th>${new_NV_LayPT.XepLoai()}</th>
              <th> 
              <button type="button" class="btn btn-danger text-center mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal${index_btn}">Xóa</button>
              <div class="modal fade" id="exampleModal${index_btn}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-body text-danger">
                      Bạn có chắc chắn muốn xóa thông tin người này ?
                    </div>
                    <div class="modal-footer">
                      <button onclick="xoaNhanVien('${new_NV_LayPT.tknv}')" type="button" class="btn btn-primary data-bs-dismiss="modal">Chắc chắn</button>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                    </div>
                  </div>
                </div>
              </div>
              <button onclick="layThongTinNhanVien('${
                new_NV_LayPT.tknv
              }')" class="btn btn-warning text-center mb-3" data-toggle="modal" data-target="#myModal" id="btnSua">Sửa</button>
              </th>
          </tr>
          `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

function luuLocal() {
  localStorage.setItem("arrNhanVien", JSON.stringify(arrNhanVien));
}

function layLocalHienThi() {
  var data1 = localStorage.getItem("arrNhanVien");
  if (data1 != null) {
    arrNhanVien = JSON.parse(data1);
    renderNhanVien();
  }
}

layLocalHienThi();

function xoaNhanVien(taiKhoan) {
  var index = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nVienXoa = arrNhanVien[i];
    if (nVienXoa.tknv == taiKhoan) {
      index = i;
    }
  }
  console.log(taiKhoan);
  arrNhanVien.splice(index, 1);
  renderNhanVien();
  luuLocal();
}

function layThongTinNhanVien(taiKhoan) {
  document.getElementById("SapXepTang").style.display = "none"
  document.getElementById("SapXepGiam").style.display = "none"
  for (var i = 0; i < arrTb.length; i++) {
    document.getElementById(arrTb[i]).style.display = "none";
  }
  document.getElementById("tbTKNV").innerHTML = "";
  document.getElementById("header-title").innerHTML = "Edit Form";
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("password").type = "text";
  document.getElementById("btnCapNhat").style.display = "inline-block";
  var nVien_new = new NhanVien();
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == taiKhoan) {
      nVien_new = arrNhanVien[i];
    }
  }
  // push data for nVien_new
  for (var j = 0; j < arrAttribute.length; j++) {
    document.getElementById(arrAttribute[j]).value = nVien_new[arrAttribute[j]];
  }
  document.getElementById("tknv").readOnly = true;
}

function CapNhatThongTinNhanVien() {
  var nVien = new NhanVien();
  var valid = true;
  for (var i = 0; i < arrAttribute.length; i++) {
    valid &= checkInputRong(arrAttribute[i], arrTb[i]);
    var valueInput = document.getElementById(arrAttribute[i]).value;
    nVien[arrAttribute[i]] = valueInput;
  }

  var index = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].tknv == nVien.tknv) {
      index = i;
    }
  }
  valid &=
    checkTenNhanVien("name", "tbTen") &
    checkEmail("email", "tbEmail") &
    checkPassword("password", "tbMatKhau") &
    checkLuongCB("luongCB", "tbLuongCB") &
    checkGioLam("gioLam", "tbGiolam");
  if (valid) {
    arrNhanVien[index] = nVien;
    renderNhanVien();
    luuLocal();
    document.getElementById("offcanvasTop").style.background = "green";
    document.getElementById(
      "offcanvasTop"
    ).innerHTML = `Cập nhật nhân viên thành công.`;
  } else {
    document.getElementById("offcanvasTop").style.background = "red";
    document.getElementById(
      "offcanvasTop"
    ).innerHTML = `Cập nhật nhân viên thất bại.`;
  }
  document.getElementById("tknv").readOnly = true;
}

document.getElementById("btnCapNhat").onclick = function () {
  CapNhatThongTinNhanVien();
  var offcanvasElement = document.querySelector(".offcanvas");
  var oldVisibility = offcanvasElement.style.visibility;
  // Sau 1s, thông báo sẽ tắt
  offcanvasElement.style.visibility = "unset";
  setTimeout(function () {
    offcanvasElement.style.visibility = oldVisibility;
  }, 1000);
};

// Danh sách xếp loại
function NVienTrongDSXepLoai(xepLoai) {
  xepLoai = xepLoai.toLowerCase();
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nVien = arrNhanVien[i];
    var new_NV_LayPT = new NhanVien();
    // copy data nVien for new_NV_LayPT
    Object.assign(new_NV_LayPT, nVien);
    var newNVxepLoai = new_NV_LayPT.XepLoai().toLowerCase();
    if (xepLoai == newNVxepLoai) arrNhanVienXepLoai.push(new_NV_LayPT);
  }
}

function renderDanhSachXepLoai() {
  // xepLoai = xepLoai.toLowerCase();
  // var content = "";
  // for (var i = 0; i < arrNhanVien.length; i++) {
  //   var nVien = arrNhanVien[i];
  //   var new_NV_LayPT = new NhanVien();
  //   // copy data nVien for new_NV_LayPT
  //   Object.assign(new_NV_LayPT, nVien);
  //   var newNVxepLoai = new_NV_LayPT.XepLoai().toLowerCase();
  //   if (xepLoai == newNVxepLoai) arrNhanVienXepLoai.push(new_NV_LayPT);
  // }
  var content = "";
  for (var i = 0; i < arrNhanVienXepLoai.length; i++) {
    var nVien = arrNhanVienXepLoai[i];
    var new_NV_LayPT = new NhanVien();
    // copy data nVien for new_NV_LayPT
    Object.assign(new_NV_LayPT, nVien);
    var formatLuong = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(new_NV_LayPT.tinhTongLuong() * 1);
    new_NV_LayPT.datepicker = formatDate(new_NV_LayPT.datepicker);
    content += `
          <tr>
              <th class="nowrap mr-1">${new_NV_LayPT.tknv}</th>
              <th>${new_NV_LayPT.name}</th>
              <th>${new_NV_LayPT.email}</th>
              <th>${new_NV_LayPT.datepicker}</th>
              <th>${new_NV_LayPT.chucvu}</th>
              <th>${formatLuong}</th>
              <th>${new_NV_LayPT.XepLoai()}</th>
              <th><em class="fa fa-cog"></em></th>
          </tr>
          `;
  }
  document.getElementById("tableDanhSachXepLoai").innerHTML = content;
}

document.getElementById("btnSearch").onclick = function () {
  var data_xepLoai = document.getElementById("searchName").value;
  NVienTrongDSXepLoai(data_xepLoai);
  renderDanhSachXepLoai();
  arrNhanVienXepLoai.splice(0, arrNhanVienXepLoai.length);
  document.getElementById("searchName").value = "";
};

// Sắp xếp tăng theo tài khoản
document.getElementById("btnSapXepTangTheoTK").onclick = function () {
  var arrNV = document.querySelectorAll("#tableDanhSach tr");
  for (var i = 0; i < arrNV.length - 1; i++) {
    for (var j = i + 1; j < arrNV.length; j++) {
      var diemi = arrNV[i].querySelector(".taikhoan").innerHTML * 1;
      var diemj = arrNV[j].querySelector(".taikhoan").innerHTML * 1;
      if (diemi > diemj) {
        var temp = arrNV[i].innerHTML;
        arrNV[i].innerHTML = arrNV[j].innerHTML;
        arrNV[j].innerHTML = temp;
      }
    }
  }
  document.getElementById("SapXepTang").style.display = "inline-block";
  document.getElementById("SapXepGiam").style.display = "none";
};

// Sắp xếp giảm theo tài khoản
document.getElementById("btnSapXepGiamTheoTK").onclick = function () {
  // mỗi tr là mỗi dòng
  var arrNV = document.querySelectorAll("#tableDanhSach tr");
  console.log(arrNV);
  for (var i = 0; i < arrNV.length - 1; i++) {
    for (var j = i + 1; j < arrNV.length; j++) {
      var diemi = arrNV[i].querySelector(".taikhoan").innerHTML * 1;
      var diemj = arrNV[j].querySelector(".taikhoan").innerHTML * 1;
      if (diemi < diemj) {
        var temp = arrNV[i].innerHTML;
        arrNV[i].innerHTML = arrNV[j].innerHTML;
        arrNV[j].innerHTML = temp;
      }
    }
  }
  document.getElementById("SapXepGiam").style.display = "inline-block";
  document.getElementById("SapXepTang").style.display = "none";
};
