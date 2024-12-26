import { Person } from "./person";

export interface Collaborator{
    id: number;
    personId: number;
    collaboratorType: number;
    registrationNumber: number;
    admissionDate?: Date;
    contribution?: number;
    person? : Person;
}