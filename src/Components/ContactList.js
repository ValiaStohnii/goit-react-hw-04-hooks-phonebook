import React from 'react';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(contacts => (
        <li key={contacts.id} name={contacts.name}>
          <p>{contacts.name}</p>
          <p>{contacts.number}</p>
          <button type="button" onClick={() => onDeleteContact(contacts.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
