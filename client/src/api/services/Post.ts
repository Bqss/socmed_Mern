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

  static async getAllPost() {
    const result = await privateApi.get<Post[]>("/post");
    return result.data;
  }
}


export default PostApi;