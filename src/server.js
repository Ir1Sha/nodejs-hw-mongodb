import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getAllContactsController } from './controllers/contacts.controller.js';
import { getContactIdController } from './controllers/contact.controller.js';

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getAllContactsController);
  app.get('/contacts/:contactId', getContactIdController);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
