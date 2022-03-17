export const isIdCard = (id: string) => {
  let regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regex.test(id);
};

export const isPassword = (password: string) => {
  const regex = /(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{6,16}$/;
  return regex.test(password);
};

export const isPhone = (phone: string) => {
  const regex =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  return regex.test(phone);
};
