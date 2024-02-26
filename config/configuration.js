import { config } from 'dotenv';

config();

const value = process.env;

const configuration = Object.freeze({
    port: value.PORT,
})

export default configuration;
