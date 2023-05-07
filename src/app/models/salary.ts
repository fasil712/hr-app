import { Employee } from './employee';

export interface Salary {
  id: number;
  salary: string;
  employeeId: Employee;
  description: string;
}
export enum AddEditOperation {
  add = 1,
  update = 2,
}
