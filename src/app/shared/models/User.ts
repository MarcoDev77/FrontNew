export class User {
  id: number;
  username: string;
  password: string;
  roles: any[];
  token?: string;
  enabled: boolean;
}
