export const isIdCard = (id: string) => {
  let regex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regex.test(id);
};

export const isPassword = (password: string) => {
  const regex = /(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{6,16}$/;
  return regex.test(password);
};
