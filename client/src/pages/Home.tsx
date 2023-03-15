import Post from "../components/mollecules/Post";
import { MainContent } from "../layout";
import { NewPost } from "../components/mollecules";
import PostApi from "./../api/services/Post.js"
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";

const Home = () => {

  const {data: posts =[] , isLoading} = useQuery(["posts"],PostApi.getAllPost,{
    refetchInterval : 60 * 1000,
    refetchOnWindowFocus : true
  })

  return (
    <>
      <MainContent>
        <div className="mx-6">
          <NewPost />
          <div className="flex flex-col mt-6 space-y-6">
            {posts?.map((post : any, i: number) => <Post key={i} data={post}/>)}
          </div>
        </div>
      </MainContent>
    </>
  );  
};

export default Home;
