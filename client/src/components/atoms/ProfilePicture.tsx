import React from 'react'

const sizes = {
  "sm" : 6,
  "md" : 8,
  "lg" : 12,
  "xl" : 24,

}

interface ProfilePictureProps {
  img : {
    src : string |undefined,
    alt? : string
  },
  size? : "sm"| "md" | "lg" | "xl" ,
  className? : string
}

const ProfilePicture = ({img , size ="md", className}:ProfilePictureProps) => {
  return (
    img.src ? <img src={img.src} alt={img.alt ?? ""} className={`rounded-full object-cover
    w-${sizes[size]} h-${sizes[size]} `+className} /> : 
    <div className={`bg-gray-100 rounded-full w-${sizes[size]} h-${sizes[size]} ` + className}></div>
  )
}

export default ProfilePicture