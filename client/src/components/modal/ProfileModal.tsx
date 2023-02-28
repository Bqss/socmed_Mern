import { Modal } from "@mantine/core";
import { ParentComponent } from "../../types/Props";
import { NewPost } from "../mollecules";

interface NewPostModalProps extends ParentComponent {
  onClose: () => void;
  isOpen: boolean;
}

const NewPostModal = ({ onClose, isOpen }: NewPostModalProps) => {
  return (
    <Modal
      onClose={onClose}
      opened={isOpen}
      size="auto"
      withCloseButton ={false}
      overlayOpacity={0.55}
      overlayBlur={3}
    >
      <div className="w-screen max-w-3xl">
        <NewPost />
      </div>
    </Modal>
  );
};

export default NewPostModal;
