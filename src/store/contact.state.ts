
export interface Contact{
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    alternativePhone: string;
    bookmarked: boolean;
    imageUrl: string;
}

export interface ContactState {
    contacts: Contact[];
    fullContacts: Contact[]
}

export const initial_contact_state: ContactState = { contacts: [], fullContacts: [] };


export type UserActionType = 'bookmark' | 'edit' | 'delete';

export interface PageHeaderProps {
    onSearch: (params: {searchQuery: string,filter: string}) => void;
    onFilter: (params: {searchQuery: string,filter: string}) => void;
    onAdd: () => void;
    onExport: () => void;
  } 