import { Post, User } from "../types/payload";


export const getMediaPath = (file: File) => {
  const reader = new FileReader();
  
}

export const isLiked = ({PostData, userId}: {
  PostData: Post,
  userId: string
}): boolean => {
  return PostData.likes.includes(userId);
} 

export const isFollowed = ({userData, userId}:{
  userData : User,
  userId: string
}) => {
  return userData.followers.includes(userId);
}

export const isSelf = ({currentId, userId}:{
  currentId : string|undefined,
  userId: string
}): boolean => {
  return currentId == userId
}