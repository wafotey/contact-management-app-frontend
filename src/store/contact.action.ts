import { Contact } from "./contact.state";

export type Action =
  | { type: 'ADD_CONTACT'; contact: Contact }
  | { type: 'REMOVE_CONTACT'; id: string }
  | { type: 'UPDATE_CONTACT'; contact: Contact }
  | { type: 'TOGGLE_BOOKMARK'; id: string }
  | { type: 'SET_CONTACTS'; contacts: Contact[] }
  | { type: 'SEARCH'; params: {searchQuery: string,filter: string} }
  | { type: 'FILTER'; filter: string };