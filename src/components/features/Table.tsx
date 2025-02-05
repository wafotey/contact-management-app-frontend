import TableRow from "./TableRow";
import { Contact, UserActionType } from "../../store/contact.state";

interface TableProps {
  data: Contact[];
  menuOpen: string | null;
  setMenuOpen: React.Dispatch<React.SetStateAction<string | null>>;
  setActionType: React.Dispatch<React.SetStateAction<UserActionType | null>>;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUserId: React.Dispatch<React.SetStateAction<string | null>>;
  onEdit: (id: string) => void;
  onBookmark: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  data,
  menuOpen,
  setMenuOpen,
  setDeleteModalOpen,
  setCurrentUserId,
  onEdit,
  onBookmark
}) => {
  return (
    <table className="w-[90%] md:w-[70%] bg-white shadow-md rounded-lg">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold text-center">
        <tr>
          <th className="px-4 py-3 border-b">Name</th>
          <th className="px-4 py-3 border-b">Address</th>
          <th className="px-4 py-3 border-b">Phone</th>
          <th className="px-4 py-3 border-b">Alt. Phone</th>
          <th className="px-4 py-3 text-center border-b">Bookmarked</th>
          <th className="px-4 py-3 text-center border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((contact) => (
          contact.imageUrl = "../../assets/human-placeholder.jpg",
          <TableRow
            key={contact.id}
            contact={contact}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            setCurrentUserId={setCurrentUserId}
            onEdit={onEdit}
            onBookmark={onBookmark}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
