import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

let isCloudinaryConfigured = false;

function configureCloudinaryOnce() {
  if (isCloudinaryConfigured) return;

  cloudinary.v2.config({
    secure: true,
    cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
    api_key: getEnvVar(CLOUDINARY.API_KEY),
    api_secret: getEnvVar(CLOUDINARY.API_SECRET),
  });

  isCloudinaryConfigured = true;
}

export const saveFileToCloudinary = async (file) => {
  configureCloudinaryOnce();

  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
