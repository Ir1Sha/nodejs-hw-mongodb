import { getAllContacts } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error in getAllContactsController:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
};
