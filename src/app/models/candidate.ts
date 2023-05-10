import { Employee } from "./employee";

export interface Candidate {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  employeeId: Employee;
}
