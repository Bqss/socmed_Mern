import { Post } from "../types/payload";


export const getMediaPath = (file: File) => {
  const reader = new FileReader();
  
}

export const isLiked = ({PostData, userId}: {
  PostData: Post,
  userId: string
}): boolean => {
  return PostData.likes.includes(userId);
} 