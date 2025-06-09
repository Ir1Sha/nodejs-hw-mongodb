import {
  getContactsById,
  createContact,
  updateContactById,
  deleteContactById,
} from '../services/contacts.js';
import createError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId, req.user._id);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const file = req.file;
    let photoUrl;

    if (file) {
      photoUrl = await saveFileToCloudinary(file);
    }

    const newContact = await createContact(
      { ...req.body, photo: photoUrl },
      userId,
    );

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const file = req.file;
    let photoUrl;

    if (file) {
      photoUrl = await saveFileToCloudinary(file);
    }

    const updatedContact = await updateContactById(
      contactId,
      { ...req.body, ...(photoUrl && { photo: photoUrl }) },
      userId,
    );

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;
    const deleted = await deleteContactById(contactId, userId);

    if (!deleted) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
