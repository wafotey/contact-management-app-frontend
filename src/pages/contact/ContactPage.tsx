import { useEffect, useReducer, useState } from "react";
import ContactForm from "../../components/features/ContactForm";
import { Contact, initial_contact_state } from "../../store/contact.state";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { contactReducer } from "../../store/contact.reducer";
import { BASE_URL } from "../../config";

export const ContactPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<Contact | undefined>();
  const [loading, setLoading] = useState(!!id);
  const [, dispatch] = useReducer(contactReducer, initial_contact_state);
  

  useEffect(() => {  
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await fetch(`${BASE_URL}/contacts/${id}`);
          if (!response.ok) throw new Error("Contact not found");
          const data = await response.json();
          setInitialData(data);
        } catch (error) {
          console.error("Error fetching contact:", error);
          navigate("/", { replace: true });
        } finally {
          setLoading(false);
        }
      };
      fetchContact();
    }
  }, [id, navigate]);

  const handleSubmit = async (data: Contact) => {
    try {
      if (id) {
        const response = await fetch(`${BASE_URL}/contacts/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error("Update failed");
        const updatedContact = await response.json();
        dispatch({ type: "UPDATE_CONTACT", contact: updatedContact });
      } else {
        const response = await fetch(`${BASE_URL}/contacts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!response.ok) throw new Error("Creation failed");
        const newContact = await response.json();
        dispatch({ type: "ADD_CONTACT", contact: newContact });
      }
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return <ContactForm onSubmit={handleSubmit} initialData={initialData} />;
};

export default ContactPage;