import { MoreVertical, Edit, Trash, Bookmark } from "lucide-react";
import { Contact } from "../../store/contact.state";
import placeholder_image from '../../assets/human-placeholder.jpg';

interface TableRowProps {
    contact: Contact;
    menuOpen: string | null; 
    setMenuOpen: React.Dispatch<React.SetStateAction<string | null>>;
    setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentUserId: React.Dispatch<React.SetStateAction<string | null>>;
    onEdit: (id: string) => void;
    onBookmark: (id: string) => void;
  }

  const TableRow: React.FC<TableRowProps> = ({
    contact,
    menuOpen,
    setMenuOpen,
    setDeleteModalOpen,
    setCurrentUserId,
    onEdit,
    onBookmark
  }) => {
    
  const handleMenuToggle = () => {
    if (menuOpen === contact.id) {
      setMenuOpen(null);
    } else {
      setMenuOpen(contact.id);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3 flex items-center space-x-3">
        <img className="w-10 h-10 rounded-full" src={placeholder_image} alt="User" />
        <div>
          <p className="font-semibold text-gray-900">{contact.name}</p>
          <p className="text-gray-500 text-sm">{contact.email}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-gray-700">{contact.address}</td>
      <td className="px-4 py-3 text-gray-700">{contact.phone}</td>
      <td className="px-4 py-3 text-gray-700">{contact.alternativePhone}</td>
      <td className="px-4 py-3 text-center">
        <Bookmark
          className={`w-5 h-5 cursor-pointer ${
            contact.bookmarked ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={() => {
           // dispatch({ type: 'TOGGLE_BOOKMARK', id: contact.id });
           onBookmark(contact.id);
            // setModalOpen(true);
            // setCurrentUserId(contact.id);
          }}
        />
      </td>
      <td className="px-4 py-3 text-center relative">
        <div className="inline-block text-left z-50">
          <MoreVertical
            className="w-5 h-5 cursor-pointer"
            onClick={handleMenuToggle}
          />
          {menuOpen === contact.id && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onEdit(contact.id);
                    // setModalOpen(true);
                    // setCurrentUserId(contact.id);
                    // setMenuOpen(null);
                  }}
                >
                  <Edit className="w-4 h-4 inline mr-2" /> Edit
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setCurrentUserId(contact.id);
                    setMenuOpen(null);
                  }}
                >
                  <Trash className="w-4 h-4 inline mr-2" /> Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TableRow;