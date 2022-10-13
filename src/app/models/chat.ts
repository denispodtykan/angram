import { IUser } from "./user";

export interface IChat{
    id: string;
    name?: string;
    members: IUser[];
    creatorId: string;
    avatar?: string
}