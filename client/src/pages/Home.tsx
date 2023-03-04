import Post from "../components/mollecules/Post";
import { MainContent } from "../layout";
import { NewPost } from "../components/mollecules";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  return (
    <>
      <MainContent>
        <div className="mx-6">
          <NewPost />
          <div className="flex flex-col mt-6 gap-4">

          </div>
        </div>
      </MainContent>
    </>
  );
};

export default Home;
