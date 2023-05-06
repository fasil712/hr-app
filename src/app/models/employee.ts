import { Department } from './department';
import { Salary } from './salary';

export interface Employee {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  department: Department;
  salary: Salary;
}
