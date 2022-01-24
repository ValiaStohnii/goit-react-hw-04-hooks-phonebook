import { useState, useEffect } from 'react';
import Form from './Form';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter';

export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    console.log(contact);

    if (contacts.some(item => item.name.toLowerCase() === data.name.toLowerCase())) {
      alert('This name is olready in contact');
      return;
    }
    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(c => c.id !== contactId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={getFilteredContacts()} onDeleteContact={deleteContact} />
    </div>
  );
}

// class Phonebook extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   formSubmit = data => {
//     const contact = {
//       id: nanoid(),
//       name: data.name,
//       number: data.number,
//     };

//     const normalizeName = this.textNormalize(data.name);

//     if (this.state.contacts.some(item => item.name.toLowerCase() === normalizeName)) {
//       alert('This name is olready in contact');
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [contact, ...prevState.contacts],
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   textNormalize = text => {
//     return text.toLowerCase();
//   };

//   getFilteredContacts = () => {
//     const { contacts } = this.state;
//     const normalizedFilter = this.state.filter.toLowerCase();
//     return contacts.filter(c => c.name.toLowerCase().includes(normalizedFilter));
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(c => c.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;

//     const filteredContacts = this.getFilteredContacts();

//     return (
//       <div>
//         <h1>Phonebook</h1>
//         <Form onSubmit={this.formSubmit} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
//       </div>
//     );
//   }
// }

// export default Phonebook;
