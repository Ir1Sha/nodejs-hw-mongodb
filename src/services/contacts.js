import { ContactsCollection } from '../db/models/contact.js';

export async function getAllContacts() {
  return await ContactsCollection.find();
}

export async function getContactsById(contactId) {
  return await ContactsCollection.findById(contactId);
}

export async function createContact(data) {
  const newContact = await ContactsCollection.create(data);
  return newContact;
}

export async function updateContactById(contactId, data) {
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    data,
    { new: true },
  );

  return updatedContact;
}

export async function deleteContactById(contactId) {
  const result = await ContactsCollection.findByIdAndDelete(contactId);
  return result;
}
