import { useReducer } from "react";
import { contactReducer } from "../store/contact.reducer";
import { Contact, initial_contact_state } from "../store/contact.state";

export const useContact = () => {
    const [contacts, dispatch] = useReducer(contactReducer, initial_contact_state);

    const addContact = (contact: Contact) => {
        dispatch({ type: 'ADD_CONTACT', contact });
    };

    const removeContact = (id: string) => {
        dispatch({ type: 'REMOVE_CONTACT', id });
    };

    const updateContact = (contact: Contact) => {
        dispatch({ type: 'UPDATE_CONTACT', contact });
    };

    const toggleBookmark = (id: string) => {
        dispatch({ type: 'TOGGLE_BOOKMARK', id });
    };

    return { contacts, addContact, removeContact, updateContact, toggleBookmark };
}