export const isValidPassword = (password: string): boolean => {
    const hasLower = /[a-z]/.test(password); // Có ít nhất 1 ký tự thường
    const hasDigit = /\d/.test(password); // Có ít nhất 1 số
    const hasNoWhitespace = /^\S+$/.test(password); // Không có khoảng trắng
    const hasLength = password.length >= 8; // Độ dài hợp lý

    return hasLower && hasDigit && hasNoWhitespace && hasLength;
}