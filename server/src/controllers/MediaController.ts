import cloudinary from "./../util/cloudinary.js";

type uploadMediaOptions ={
  replace : boolean
}

export const uploadMedia = async (media: any, userId: string, options? : uploadMediaOptions) => {

  try{
    await media.mv(`./tmp/${userId}-${media.name}`);
    const option = {
      use_filename: true,
      unique_filename: false,
      overwrite: options?.replace || false,
    };
    const mediaPath = `.\\tmp\\${userId}-${media.name}`;

    const result = await cloudinary.v2.uploader.upload(mediaPath, options);
    return result;
  }catch(err){
    throw Error("server error")
  }
  
};

export const deleteMedia = async (media_pid: string) => {
  await cloudinary.v2.uploader.destroy(media_pid);
};
