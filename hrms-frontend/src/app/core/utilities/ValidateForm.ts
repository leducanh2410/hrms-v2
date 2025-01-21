export class ValidateForm {
  static getMessage(errors: any): string {
    if (errors.required) {
      return 'Trường này là bắt buộc.';
    }
    if (errors.minlength) {
      return `Trường này phải có ít nhất ${errors.minlength.requiredLength} ký tự.`;
    }
    return 'Có lỗi xảy ra.';
  }
}
