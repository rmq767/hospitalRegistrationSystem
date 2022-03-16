export interface UserInterface {
  username: string;
  phoneNumber: string | number;
  gender: number | string;
  id: string | number;
  age?: string | number;
  date?: string;
  department?: string;
  doctor?: string;
  status?: UserStatus;
}

enum UserStatus {
  Enable = 1,
  Disable = 0,
}
