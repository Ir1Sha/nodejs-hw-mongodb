import { ContactsCollection } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) {
  const skip = (page - 1) * perPage;

  const filterConditions = {};

  if (filter.contactType) {
    filterConditions.contactType = filter.contactType;
  }

  if (filter.isFavourite !== undefined) {
    filterConditions.isFavourite = filter.isFavourite;
  }

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(filterConditions),
    ContactsCollection.find(filterConditions)
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const pagination = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    ...pagination,
  };
}

export async function createContact(data) {
  const newContact = await ContactsCollection.create(data);
  return newContact;
}

export async function getContactsById(contactId) {
  return await ContactsCollection.findById(contactId);
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
