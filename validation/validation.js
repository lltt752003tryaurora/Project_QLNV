function formatDate(inputDate) {
  var parts = inputDate.split("-");
  var year = parts[0];
  var month = parts[1];
  var day = parts[2];

  return day + "/" + month + "/" + year;
}

function checkInputRong(idInput, idTb) {
  var valInput = document.getElementById(idInput).value;
  if (valInput == "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}

//check tài khoản từ 4-8 ký số
function checkDinhDangTaiKhoan(idInput, idTb) {
  var regrexTK = /^[0-9]{4,8}$/;
  var valInput = document.getElementById(idInput).value;
  if (!valInput.match(regrexTK) && valInput != "") {
    document.getElementById(idTb).style.display = "inline-block";
    document.getElementById(idTb).innerHTML =
      "Vui lòng nhập đúng tài khoản có 4 đến 6 kí tự là số";
    return false;
  } else if (valInput.match(regrexTK) && valInput != "") {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}

//check tài khoản không được trùng
function checkTrungTaiKhoan(nVien, arrNhanVien) {
  var valInput = document.getElementById("tknv").value;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (nVien.tknv === arrNhanVien[i].tknv && valInput != "") {
      console.log("đã tồn tại");
      document.getElementById("tbTKNV").style.display = "inline-block";
      document.getElementById("tbTKNV").innerHTML = "Tài khoản đã tồn tại";
      return false;
    } else if (!(nVien.tknv === arrNhanVien[i].tknv) && valInput != "") {
      document.getElementById("tbTKNV").innerHTML = "";
      return true;
    }
  }
}

//check tên nhân viên phải là chữ
function checkTenNhanVien(idInput, idTb) {
  var regrexTen =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  var valInput = document.getElementById(idInput).value;
  if (!regrexTen.test(valInput) && valInput !== "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML =
      "Vui lòng nhập tên đúng định dạng.";
    return false;
  } else if (regrexTen.test(valInput) && valInput !== "") {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}

// check email
function checkEmail(idInput, idTb) {
  var regrexEmail = /^[a-zA-Z0-9._%+-]{1,18}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,18}$/;
  var valInput = document.getElementById(idInput).value;
  if (!regrexEmail.test(valInput) && valInput !== "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML = "Vui lòng nhập đúng Email.";
    return false;
  } else if (regrexEmail.test(valInput) && valInput !== "") {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}

//check password
function checkPassword(idInput, idTb) {
  var regrexPass =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,10}$/;
  var valInput = document.getElementById(idInput).value;
  if (!regrexPass.test(valInput) && valInput !== "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML =
      "Mật khẩu phải có độ dài từ 6 đến 10 kí tự và có chứa 1 kí tự số, 1 kí tự in hoa và 1 kí tự đặc biệt.";
    return false;
  } else if (regrexPass.test(valInput) && valInput !== "") {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}

//check lương cơ bản
function checkLuongCB(idInput, idTb) {
  var regrexMoney = /^-?[0-9]+(\.[0-9]+)?$/;
  var valInput = document.getElementById(idInput).value;
  if (!regrexMoney.test(valInput) && valInput !== "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML =
      "Vui lòng đúng định dạng lương là con số.";
    return false;
  } else if (regrexMoney.test(valInput) && valInput !== "") {
    if (valInput >= 1000000 && valInput <= 20000000) {
      document.getElementById(idTb).innerHTML = "";
      return true;
    } else {
      document.getElementById(idTb).style.display = "block";
      document.getElementById(idTb).innerHTML =
        "Vui lòng nhập đúng lương từ 1 triệu đến 20 triệu.";
      return false;
    }
  }
}

//check giờ làm
function checkGioLam(idInput, idTb) {
  var regrexGioLam = /^(8[0-9]|9[0-9]|1[0-9]{2}|200)$/;
  var valInput = document.getElementById(idInput).value;
  if (!regrexGioLam.test(valInput) && valInput !== "") {
    document.getElementById(idTb).style.display = "block";
    document.getElementById(idTb).innerHTML =
      "Vui lòng nhập đúng số giờ làm từ 80 đến 200 giờ";
    return false;
  } else if (regrexGioLam.test(valInput) && valInput !== "") {
    document.getElementById(idTb).innerHTML = "";
    return true;
  }
}
