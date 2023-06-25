function NhanVien() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";
    this.tinhTongLuong = function () {
      if (this.chucvu == "Giám đốc") {
        return this.luongCB * 3;
      } else if (this.chucvu == "Trưởng phòng") {
        return this.luongCB * 2;
      } else if (this.chucvu == "Nhân viên") {
        return this.luongCB * 1;
      }
    };
    this.XepLoai = function () {
      if (this.gioLam >= 192) {
        return "Xuất Xắc";
      } else if (this.gioLam >= 176 && this.gioLam < 192) {
        return "Giỏi";
      } else if (this.gioLam >= 160 && this.gioLam < 176) {
        return "Khá";
      } else {
        return "Trung Bình";
      }
    };
  }
  