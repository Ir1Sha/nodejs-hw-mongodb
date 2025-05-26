import { ContactsCollection } from '../db/models/contact.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) {
  const skip = (page - 1) * perPage;

  const filterConditions = { userId };

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

export async function createContact(data, userId) {
  const newContact = await ContactsCollection.create({ ...data, userId });
  return newContact;
}

export async function getContactsById(contactId, userId) {
  return await ContactsCollection.findOne({ _id: contactId, userId });
}

export async function updateContactById(contactId, data, userId) {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    data,
    { new: true },
  );
  return updatedContact;
}

export async function deleteContactById(contactId, userId) {
  const result = await ContactsCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return result;
}
