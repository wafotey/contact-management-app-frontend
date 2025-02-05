import { Action } from "./contact.action";
import { ContactState } from "./contact.state";

export const contactReducer = (state: ContactState, action: Action): ContactState => {
  console.log(state);

  switch (action.type) {
    case 'ADD_CONTACT':
      return { ...state, contacts: [...state.contacts, action.contact] };

    case 'REMOVE_CONTACT':
      return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.id) };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.contact.id ? { ...contact, ...action.contact } : contact
        ),
      };

    case 'TOGGLE_BOOKMARK': {
      const updatedContacts = state.contacts.map(contact =>
        contact.id === action.id
          ? { ...contact, bookmarked: !contact.bookmarked }
          : contact
      );
      const sortedContacts = updatedContacts.sort((a, b) => {
        if (a.bookmarked === b.bookmarked) return 0; 
        return a.bookmarked ? -1 : 1; 
      });

      return { ...state, contacts: sortedContacts };
    }

    case 'SET_CONTACTS':
      return { ...state, contacts: action.contacts, fullContacts: action.contacts };

    case 'SEARCH': {
        const { searchQuery, filter } = action.params || {}; 
      
        if (!searchQuery?.trim() && !filter?.trim()) {
          return { ...state, contacts: state.fullContacts };
        }
      
        const filteredContacts = state.fullContacts.filter(contact => {

          const matchesSearch = contact.name.toLowerCase().includes(searchQuery?.toLowerCase() || '');
      
          const matchesFilter = filter ? contact.name[0].toUpperCase() === filter.toUpperCase() : true;
      
          return matchesSearch && matchesFilter; 
        });
      
        return { ...state, contacts: filteredContacts };
      }
        

    case 'FILTER':{

      if (action.filter === '') {
        return { ...state, contacts: state.fullContacts };
      }


      return {
        ...state,
        contacts: state.fullContacts.filter(contact =>
          contact.name[0].toUpperCase().startsWith(action.filter.toUpperCase())
        ),
      };
    }

    default:
      return state;
  }
};
