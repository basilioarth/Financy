export const validateName = (name: string) => {
    if (!name) return "Nome é obrigatório";
    if (name.length < 3) return "Nome deve ter no mínimo 3 caracteres";
    return "";
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "E-mail é obrigatório";
    if (!emailRegex.test(email)) return "E-mail inválido";
    return "";
};

export const validatePassword = (password: string) => {
    if (!password) return "Senha é obrigatória";
    if (password.length < 8) return "A senha deve ter no mínimo 8 caracteres";
    return "";
};