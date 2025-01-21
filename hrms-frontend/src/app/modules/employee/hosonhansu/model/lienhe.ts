export class LienHe {
    companyEmail: string; // Email công ty
    phoneNumber: string; // Số điện thoại
    noiOHienTai: object; // Địa chỉ
    hoKhauThuongTru: object; // Hộ khẩu thường trú
    emergencyContactAddress: string; // Địa chỉ liên hệ khẩn cấp
    emergencyContactName: string; // Tên liên hệ khẩn cấp
    emergencyContactPhoneNumber: string; // Số điện thoại liên hệ khẩn cấp
    emergencyContactRelationship: string; // Mối quan hệ với người liên hệ khẩn cấp
    emergencyContactEmail: string; // Email liên hệ khẩn cấp
  
    constructor(
      companyEmail: string = '',
      phoneNumber: string = '',
      noiOHienTai: object = new Object(),
      hoKhauThuongTru: object = new Object(),
      emergencyContactAddress: string = '',
      emergencyContactName: string = '',
      emergencyContactPhoneNumber: string = '',
      emergencyContactRelationship: string = '',
      emergencyContactEmail: string = ''
    ) {
      this.companyEmail = companyEmail;
      this.phoneNumber = phoneNumber;
      this.noiOHienTai = noiOHienTai;
      this.hoKhauThuongTru = hoKhauThuongTru;
      this.emergencyContactAddress = emergencyContactAddress;
      this.emergencyContactName = emergencyContactName;
      this.emergencyContactPhoneNumber = emergencyContactPhoneNumber;
      this.emergencyContactRelationship = emergencyContactRelationship;
      this.emergencyContactEmail = emergencyContactEmail;
    }
  }