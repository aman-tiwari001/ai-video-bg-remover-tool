import { Document } from "mongoose";

export interface IUser extends Document{
	firstName: string;
	lastName: string;
	email: string;
  photoUrl: string;
	videos: IVideo[];
}

export interface IVideo extends Document{
	inputVideoUrl: string;
	outputVideoUrl: string;
}