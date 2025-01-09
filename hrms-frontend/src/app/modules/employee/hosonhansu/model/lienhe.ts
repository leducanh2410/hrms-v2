export class LienHe {
    companyEmail: string; // Email công ty
    phoneNumber: string; // Số điện thoại
    address: string; // Địa chỉ
    hoKhauThuongTru: string; // Hộ khẩu thường trú
    emergencyContactAddress: string; // Địa chỉ liên hệ khẩn cấp
    emergencyContactName: string; // Tên liên hệ khẩn cấp
    emergencyContactPhoneNumber: string; // Số điện thoại liên hệ khẩn cấp
    emergencyContactRelationship: string; // Mối quan hệ với người liên hệ khẩn cấp
    emergencyContactEmail: string; // Email liên hệ khẩn cấp
  
    constructor(
      companyEmail: string = '',
      phoneNumber: string = '',
      address: string = '',
      hoKhauThuongTru: string = '',
      emergencyContactAddress: string = '',
      emergencyContactName: string = '',
      emergencyContactPhoneNumber: string = '',
      emergencyContactRelationship: string = '',
      emergencyContactEmail: string = ''
    ) {
      this.companyEmail = companyEmail;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.hoKhauThuongTru = hoKhauThuongTru;
      this.emergencyContactAddress = emergencyContactAddress;
      this.emergencyContactName = emergencyContactName;
      this.emergencyContactPhoneNumber = emergencyContactPhoneNumber;
      this.emergencyContactRelationship = emergencyContactRelationship;
      this.emergencyContactEmail = emergencyContactEmail;
    }
  }