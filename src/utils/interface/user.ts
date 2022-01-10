export interface UserInterface {
  name: string;
  phone: string | number;
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
