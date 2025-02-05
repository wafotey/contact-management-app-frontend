import { useEffect, useReducer, useRef, useState } from "react";
import { contactReducer } from "../../store/contact.reducer";
import {
  initial_contact_state,
  UserActionType,
} from "../../store/contact.state";
import Table from "../../components/features/Table";
import Modal from "../../components/features/Modal";
import PageHeader from "../../components/features/PageHeader";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router";

const ContactsPage = () => { 
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [, setActionType] = useState<UserActionType | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [state, dispatch] = useReducer(contactReducer, initial_contact_state);
  const navigate = useNavigate();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const url = `${BASE_URL}/contacts`
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        dispatch({ type: "SET_CONTACTS", contacts: data });
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    getContacts();
  }, []);

  const removeContact = async () => {
    try {
      await fetch(`${BASE_URL}/contacts/${currentUserId}`, { method: "DELETE" });
      dispatch({ type: "REMOVE_CONTACT", id: currentUserId! });
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
    handleModalClose();
  };

  const  onBookMark = async (id: string)  => {

    try {
      await fetch(`http://localhost:3000/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      });
      dispatch({ type: "TOGGLE_BOOKMARK", id });
    } catch (error) {
      console.error("Failed to update bookmark:", error);
    }
  };

  const handleModalClose = () => {
    // setModalOpen(false);
    setDeleteModalOpen(false);
    setActionType(null);
  };

  const onEdit = (id: string) => {
    handleModalClose();
    navigate(`/contact/${id}`);
  };

  const handleSearch = (params: {searchQuery: string,filter: string}) => {
    console.log("searching ... ",params);
    dispatch({ type: 'SEARCH', params});
  };


  const onAddContact = () => {
    navigate("/contact");
  };

  const onExportContact = async () => {
    try {
      const url = `${BASE_URL}/contacts/export`;
      const response = await fetch(url);
     
      
      if (!response.ok) throw new Error(`Export failed: ${response.status}`);
      
      // Get filename from headers or default
      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition?.split('filename=')[1]?.replace(/"/g, '') || 'contacts.zip';

      // Create object URL from blob
      const blob = await response.blob();
      const urlObject = window.URL.createObjectURL(blob);

      // Use React ref to access the anchor element
      if (downloadRef.current) {
        downloadRef.current.href = urlObject;
        downloadRef.current.download = filename;
        downloadRef.current.click();
      }

      // Cleanup object URL
      window.URL.revokeObjectURL(urlObject);

    } catch (error) {
      console.error("Export error:", error);
      // Add proper error handling (e.g., error toast)
    }
  };



  return (
    <>
      <PageHeader
        onSearch={(query) => handleSearch(query)}
        onFilter={(filter) => handleSearch(filter)}
        onAdd={() => onAddContact()}
        onExport={async () => await onExportContact()}
      />
      <div className="flex justify-center mt-6">
        <Table
          data={state.contacts}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          setActionType={setActionType}
          setDeleteModalOpen={setDeleteModalOpen}
          setCurrentUserId={setCurrentUserId}
          onEdit={onEdit}
          onBookmark={onBookMark}
        />
      </div>

      {/* <Modal
        modalOpen={modalOpen}
        actionType={actionType}
        handleActionConfirm={handleEditConfirm}
        handleModalClose={handleModalClose}
      /> */}
      <Modal
        modalOpen={deleteModalOpen}
        actionType="delete"
        handleActionConfirm={removeContact}
        handleModalClose={handleModalClose}
      />

      <a
        ref={downloadRef}
        style={{ display: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
};

export default ContactsPage;
