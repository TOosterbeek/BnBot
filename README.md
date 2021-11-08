# Introduction
BnBot is a discord bot designed for the BulletsAndBanter discord server.

In it's most basic form it functions as a quote book. But it is to be expanded with all kinds of functionality.

Any member of BulletsAndBanter is welcome and encouraged to add commands and other functionality.
Reviews mandatory of course :P.

# Setting up
## Prerequisites
- Node >= 16.11.1
- Common sense

## Getting Started
Install required dependencies

    npm install

Copy over .env.dist to .env

    linux   ->  cp .env.dist .env
    windows ->  copy .env.dist .env

## Developing
To develop and actually use and test the changes you've made you'll need to register a bot of your own.
https://discord.com/developers/docs/intro

Once the bot is setup you can go ahead and fill in CLIENTID and TOKEN in the env with the data from the bot.

- CLIENTID = ApplicationID in the discord developers portal from the application you just created
- TOKEN = The token from the bot created under the application

You'll also need to create a server in discord in which you'll add the bot. 

- GUILDID = Id from the server just created

Turning on developer mode in discord makes it easier to find the guildid.

## Slash Commands
This bot uses discord slash commands, to register these with the api for use in your server:

    node src/deploy-commands.js

If you want to add another command, add it as a new file in src/commands and use the same structure 
as the rest of the commands in there.

## Starting the bot
    node src/index.js

## Code Style
No linter because I am quite the lazy boy. Use standard ES6 conventions; try to keep it consistent
and just don't make a complete mess of things :)
But please for the love of all that is not python, use semicolons. Looking at you Marten.

# What is next
1. Setup a webserver or some kind of service to actually see all the quotes
2. Setup a database
3. Do all this before too many quotes are added, and the already bad flatfile approach completely fails

Have fun hacking some commands in there!