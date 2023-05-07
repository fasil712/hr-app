import { Department } from './department';

export interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  departmentId: Department;
}
