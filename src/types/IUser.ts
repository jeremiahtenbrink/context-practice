export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    gym?: string;
    location: number;
    goals?: object[];
}