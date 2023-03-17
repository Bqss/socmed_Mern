import {useState, memo} from "react";
import { useMutation, useQueryClient } from "react-query";
import PostApi from "../../api/services/Post";
import { Post } from "../../types/payload";
import { ParentComponent } from "../../types/Props";

interface NewCommentProps extends  ParentComponent{
  postData : Post
}

const NewComment = memo(({postData, className}: NewCommentProps) => {
  const [comment, setComment] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutateAsync: addComment } = useMutation(PostApi.addComment);

  const commentHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await addComment(
      {
        comment,
        postId: postData._id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("posts");
          setComment("");
        },
      }
    );
  };
  return (
    <form onSubmit={commentHandler} className={["",className].join(" ")}>
      <div className="relative">
        <input
          type="text"
          value={comment}
          onChange={(ev) => setComment(ev.target.value)}
          name="comment"
          id="comment"
          placeholder="Add comment"
          className=" py-1 w-full"
        />
        {comment && (
          <button className="absolute right-0 text-gray-600">Post</button>
        )}
      </div>
    </form>
  );
});

export default NewComment;
