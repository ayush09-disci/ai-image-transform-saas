import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import {v2 as cloudinary} from "cloudinary"
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

cloudinary.config({
    cloud_name : process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})


interface CloudinaryUploadResult{
    public_id : string,
    bytes : number,
    duration? : number,
    [key : string] : any
}



export async function POST(request : NextRequest){
    try {
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error : "Unauthorized"},{status: 401})
        }
    
        if(!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            ! process.env.CLOUDINARY_API_SECRET
        ){
            return NextResponse.json({error : "Failed to load the cloudinary credentials"},{status: 401})
        }

        const formData = await request.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const originalSize = formData.get("originalSize") as string;
        const file = formData.get("file") as File | null;

        if(!file){
            return NextResponse.json({error : "Failed to fetch the file"},{status: 401})
        }

        const bytes = await file?.arrayBuffer()
        const buffer =  Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve,reject)=>{
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        resource_type : "video",
                        folder : "video-uploads",
                        transformation: [
                            {quality : "auto",fetch_format : "mp4"}
                        ]
                    },
                    (error,result)=>{
                        if(error) reject(error)
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                uploadStream.end(buffer);
            }
        )

        const video = await prisma.video.create({
            data : {
                title : title,
                description : description,
                publicId : result.public_id,
                originalSize : originalSize,
                compressedSize : String(result.bytes),
                duration : result.duration || 0,
            }
        })

        return NextResponse.json(video);

    } catch (error) {
         console.log("UPload video failed", error)
        return NextResponse.json({error: "UPload video failed"}, {status: 500})
    }finally{
        prisma.$disconnect();
    }
}