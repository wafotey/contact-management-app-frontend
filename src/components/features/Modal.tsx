import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  modalOpen: boolean;
  actionType: string | null;
  handleActionConfirm: () => void;
  handleModalClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalOpen, actionType, handleActionConfirm, handleModalClose }) => {
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-gray-800/40 backdrop-blur-md z-50"
        >
          <div className="bg-[#eee] p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-gray-900">
              {actionType === "delete" ? "Confirm Deletion" : "Confirm Action"}
            </h3>
            <p className="text-gray-700 mt-2">
              {actionType === "delete"
                ? "Are you sure you want to delete this user? This action cannot be undone."
                : actionType === "bookmark"
                ? "Are you sure you want to bookmark this user?"
                : "Are you sure you want to edit this user?"}
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleModalClose} className="px-4 py-2 bg-white text-black border border-gray-400 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button
                onClick={handleActionConfirm}
                className={`px-4 py-2 ${actionType === "delete" ? "bg-red-600 text-white" : "bg-white text-black"} border rounded-md hover:bg-gray-200`}
              >
                {actionType === "delete" ? "Delete" : actionType === "bookmark" ? "Bookmark" : "Edit"}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
