
export class Setting {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  note: string;

  get companyName() {
    return this.name;
  }
}
