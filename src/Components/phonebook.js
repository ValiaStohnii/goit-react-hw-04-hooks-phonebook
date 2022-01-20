import React from 'react';
import Form from './Form';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter';

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmit = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    const normalizeName = this.textNormalize(data.name);

    if (this.state.contacts.some(item => item.name.toLowerCase() === normalizeName)) {
      alert('This name is olready in contact');
      return;
    }
    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  textNormalize = text => {
    return text.toLowerCase();
  };

  getFilteredContacts = () => {
    const { contacts } = this.state;
    const normalizedFilter = this.state.filter.toLowerCase();
    return contacts.filter(c => c.name.toLowerCase().includes(normalizedFilter));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(c => c.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
      </div>
    );
  }
}

export default Phonebook;
