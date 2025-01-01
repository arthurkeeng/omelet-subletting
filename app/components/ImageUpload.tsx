'use client'

import {CldUploadWidget} from 'next-cloudinary'
import Image from 'next/image'
import { useCallback } from 'react'
import {TbPhotoPlus} from 'react-icons/tb'

declare global{
    let cloudinary : any
}
interface ImageUploadProps{
    onChange : (value) => void, 
    value : string
}
const ImageUpload:React.FC<ImageUploadProps> = ({
    onChange , value
}) => {
    const handleUpload = useCallback((result : any)=>{
        onChange(result.info.secure_url)
    },[onChange])
  return (
    <CldUploadWidget
    onSuccess={handleUpload}
    uploadPreset='properties'
    options={{
        maxFiles : 1
    }}
    >
        {({open})=>{
            return (
                <div
                onClick={()=> open()}
                className='relative cursor-pointer
                hover:opacity-70 transition border-dashed
                border-2 p-20 border-neutral-300 flex 
                 flex-col justify-center items-center gap-4
                text-neutral-600
                '
                >
                    <TbPhotoPlus/>
                    <div className="font-semibold text-lg">
                        Click to upload
                    </div>
                    {value && (
                        <div className="absolute
                        inset-0 w-full h-full
                        ">
                            <Image
                            alt='upload'
                            fill
                            src={value}
                            style={{
                                objectFit: "cover"
                                
                            }}
                            />
                        </div>
                    )}

                </div>
            )
        }}
    </CldUploadWidget>
  )
}

export default ImageUpload
