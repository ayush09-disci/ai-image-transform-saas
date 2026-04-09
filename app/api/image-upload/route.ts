import { auth } from "@clerk/nextjs/server"
import { rejects } from "assert"
import {v2 as cloudinary} from "cloudinary"
import { NextResponse,NextRequest } from "next/server"
import { resolve } from "path"
import { arrayBuffer } from "stream/consumers"

//set the config
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

//define the interface
interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: any
}

//check the user is loggedIn or not using userId
// get the file from the formData
//covert the file intp byte using buffer
// convert the byte into buffer using Buffer
//upload the image using Promise of interface
//end the stream
//return the response
export async function POST(request : NextRequest) {
    const {userId} = auth();
    if(!userId){
        return NextResponse.json({error : "Unauthorized User"},{status : 401})
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        if(!file){
        return NextResponse.json({error : "Failed to fteched the file"},{status : 401})
        }

        const byte = await file?.arrayBuffer()
        const buffer =  Buffer.from(byte);

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {folder : "next-cloudinary-uploads"},
                    (error,result)=>{
                        if(error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer);
            }
        )

        return NextResponse.json(
            {publicId : result.public_id},
            {status : 200}
        )

    } catch (error) {
        console.log("Error uploading the image in cloudinary",error);
        return NextResponse.json({error : "Error uploading the image in cloudinary"},{status : 401})
    }
}