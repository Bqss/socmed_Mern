import {FaTwitter} from "react-icons/fa";
import {BiSearch} from "react-icons/bi";
import { Link } from "react-router-dom";
import { ParentComponent } from "../../types/Props";



const Search = ({className}: ParentComponent) => {
  return (
    <div className={["flex items-center gap-2",className].join(" ")}>
      <Link to={"/"}>
        <FaTwitter className="fill-button-grad1 w-8 h-8"/>
      </Link>
      <form action="" className="flex flex-1 gap-2">
        <input type="text" name="search" id="search" className="flex-1 px-4 py-2 rounded-md bg-inputColor placeholder-black" placeholder="#Explore"/>
        <button type="submit" className="bg-gradient-to-br from-button-grad1 to-button-grad2 px-2 rounded-md">
          <BiSearch className="w-6 h-6 fill-white"/>
        </button>
      </form>

    </div>
  )
}

export default Search