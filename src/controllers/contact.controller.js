import { getContactsById } from '../services/contacts.js';

export const getContactIdController = async (req, res) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error in getContactIdController:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Server error',
    });
  }
};
