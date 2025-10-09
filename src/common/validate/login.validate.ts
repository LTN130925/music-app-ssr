export const LoginValidate = (email: string, password: string): string => {
    if (!email) return 'email rỗng!';
    if (!password) return 'mật khẩu rỗng!';
    return '';
}