import express from 'express';
import { getAllContactsController } from '../controllers/contacts.controller.js';
import {
  getContactIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contact.controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactIdController));
router.post('/', ctrlWrapper(createContactController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
