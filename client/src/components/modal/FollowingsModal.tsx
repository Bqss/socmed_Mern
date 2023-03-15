import { Modal } from "@mantine/core";
import { Fragment } from "react";
import  { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from "react-query";
import { getUserFollower } from "../../api/services/User";
import { ModalComponent } from "../../types/Props";
import { Following } from "../atoms";

const FollowingsModal = ({ isOpen, onClose, className }: ModalComponent) => {

  const {ref, inView} = useInView()

  const {data : followings , isLoading , hasNextPage} = useInfiniteQuery("followers",({pageParam= 1}) => getUserFollower({pageParam,limit: 4}),{
    getNextPageParam : (lastPage) => lastPage.nextId ??undefined,
    getPreviousPageParam : (firstPage) => firstPage.prevId ??undefined,
    
  });



  return (
    <Modal
      opened ={isOpen}
      onClose = {onClose}
      radius="md"
   
      className={className}
    >
      <div className="">
        <div className="mt-4 flex flex-col sticky top-10 ">
          <span className="font-bold">Who is following you</span>
          <div className="flex flex-col gap-4 mt-4">
            {isLoading ? (
              <div>Loading....</div>
            ) : (
              followings?.pages?.map((page, i) => (
                <Fragment key={i}>
                  {page?.data?.map((following, i) => <Following key={i} id={following}/>)}
                </Fragment>
              ))
            )}
          </div>
          <button className="text-orange font-bold mt-6" disabled={!hasNextPage}>Show more</button>
        </div>
      </div>
    </Modal>
  );
};

export default FollowingsModal;
