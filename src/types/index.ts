import { Document } from "mongoose";

export interface IUser extends Document{
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
  photoUrl: string;
	videos: IVideo[];
}

export interface IVideo extends Document{
	replicateId: string;
	inputVideoUrl: string;
	outputVideoUrl: string;
}