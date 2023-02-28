import profile from "../../assets/profileImg.jpg";
import { IoImageOutline, IoLocationOutline } from "react-icons/io5";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { RiCalendarCheckLine } from "react-icons/ri";
import { Button } from "../atoms";




const NewPost = ({className}: {className?: string}) => {
  return (
    <div className={["bg-white p-6 rounded-xl flex flex-col justify-center shadow-sm",className].join(" ")}>
      <div className="flex gap-4 items-center">
        <img src={profile} alt="" className="w-14 h-14 rounded-full" />
        <input
          type="text"
          name="description"
          placeholder="What's happening ?"
          id="description"
          className="bg-gray-100 px-5 py-3 placeholder-black rounded-lg flex-1"
        />
      </div>
      <div className="flex ml-auto items-center gap-6 mt-4">
        <button className="inline-flex gap-2 text-green-500">
          <IoImageOutline className="w-6 h-6" />
          <span>Photo</span>
        </button>
        <button className="inline-flex gap-2 text-blue-500">
          <AiOutlineVideoCameraAdd className="w-6 h-6" />
          <span>Video</span>
        </button>
        <button className="inline-flex gap-2 text-red-500">
          <IoLocationOutline className="w-6 h-6" />
          <span>Location</span>
        </button>
        <button className="inline-flex gap-2 text-yellow-500">
          <RiCalendarCheckLine className="w-6 h-6 " />
          <span>Schedule</span>
        </button>
        <Button className="px-7 py-2 font-medium">Share</Button>
      </div>
    </div>
  );
};

export default NewPost;
