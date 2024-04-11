import dotenv from 'dotenv';

dotenv.config();

if (!process.env.WEBSITES || !process.env.USERNAMES || !process.env.PASSWORDS)
    throw new Error('One or more environment variables are not specified.');

const envs = {
    websites: process.env.WEBSITES.split(','),
    usernames: process.env.USERNAMES.split(','),
    passwords: process.env.PASSWORDS.split(',')
};

if (envs.websites.length !== envs.usernames.length || envs.usernames.length !== envs.passwords.length)
    throw new Error('"WEBSITES", "USERNAMES", and "PASSWORDS" must contain the same amount of values separated by commas.');

const websites = envs.websites.map((website, index) => ({
    url: website,
    username: envs.usernames[index],
    password: envs.passwords[index]
}));

const config = { websites };

export default config;
