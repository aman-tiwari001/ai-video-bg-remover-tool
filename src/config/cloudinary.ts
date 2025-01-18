import cloudinary from 'cloudinary';

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (
	mediaUrl: string,
	type: 'auto' | 'image' | 'video' | 'raw'
) => {
	const cloud = await cloudinary.v2.uploader.upload(mediaUrl, {
		resource_type: type,
	});
	return cloud.url;
};
