import dotenv from 'dotenv';

dotenv.config();

/**
 * Centralized environment configuration.
 * Access environment variables from a single place.
 */
export const env = {
baseurl: process.env.BASE_URL!,
userName: process.env.USERNNAME!,
password: process.env.PASSWORD!
};