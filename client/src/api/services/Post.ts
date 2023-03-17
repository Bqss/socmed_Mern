import { NewPost, Post } from "../../types/payload";
import { privateApi } from "../instances";




class PostApi {
  static async createPost ({desc,media}: NewPost) {
    const result = await privateApi.post("/post",{
      media,desc
    },{
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    });
    return result.data;
  } 
  static async deletePost ({postId}:{postId: string}) {

    const result = await privateApi.delete(`/post/${postId}`);
    return result.data;
  } 

  static async getAllPost() {
    const result = await privateApi.get<Post[]>("/post");
    return result.data;
  }

  static async likePost({
    postId
  }:{postId: string}) {
    const result = await privateApi.put(`/post/${postId}/like`);
    return result.data;
  }
  static async unlikePost({
    postId
  }:{postId: string}) {
    const result = await privateApi.put(`/post/${postId}/unlike`);
    return result.data;
  }


  static async addComment ({comment, postId}: {
    comment: string,
    postId: string
  }) {
    const result = await privateApi.post(`/post/${postId}/comment`,{
      comment
    });
    return result.data;
  }
  static async deleteComment ({commentId, postId}: {
    commentId: string,
    postId: string
  }) {
    const result = await privateApi.delete(`/post/${postId}/comment/${commentId}`);
    return result.data;
  }

}


export default PostApi;