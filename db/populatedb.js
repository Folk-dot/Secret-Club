#!/usr/bin/env node

require('dotenv').config();
const {Client}=require('pg');
const bcrypt=require('bcryptjs');

const main=async()=>{
    console.log('seeding...');
    const seedPassArr=process.env.SEED_PASSWORD.split(',');
    const hashedPassArr=await Promise.all(seedPassArr.map(pass=>bcrypt.hash(pass,10)))
    const client=new Client({
        connectionString:process.env.DATABASE_URI
    })
    await client.connect();
    await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        fullname VARCHAR(100),
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) CHECK (role IN ('user', 'member', 'admin')) DEFAULT 'user');

        CREATE TABLE IF NOT EXISTS posts (
        post_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        user_id INTEGER REFERENCES users(user_id));`);

    await client.query(`
        INSERT INTO users (fullname, username, password, role) VALUES
        ($1, $2, $3, 'user'),
        ($4, $5, $6, 'member'),
        ($7, $8, $9, 'admin')`,
        ['John Doe', 'john', hashedPassArr[0],
        'Jane Smith', 'jane', hashedPassArr[1],
        'Admin Guy', 'admin', hashedPassArr[2]]);

    await client.query(`
        INSERT INTO posts (message, user_id) VALUES
        ('Hello world!', 1),
        ('This is my second post', 1),
        ('Member posting here', 2),
        ('Admin announcement', 3),
        ('Another random post', 2);
    `);
    await client.end();
    console.log('done');
}

main();