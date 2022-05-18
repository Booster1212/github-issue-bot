# Github Issue Bot

Just some small fun project which i've made, feel free to use for whatever you want, Pull Requests are also welcome for sure.

## Installation

- Create a Discord Bot, so you have an DISCORD_BOT_TOKEN
- Clone this repository, drop it anywhere in a own folder or whatever
- Create an .env file (NO EXTENSION!) and add your CREDENTIALS there! Do not push the .env file to GITHUB!
- run: npm install
- run: npm run build
- optional: npm run start is also a thing and will remove the whole prod folder on compilation


## Default Config

```ts
export const config = {
    githubRepoUserName: 'Booster1212',
    githubRepoName: 'github-issue-bot',
    
    issueChannel: '976164749572194335',
    issueMinLength: 15,
    commandPrefix: '!',
    issueLabels: ['bug', 'enhancement'],
}
```

## Default .env file
```ts
TOKEN=<YOUR_DISCORD_BOT_TOKEN_HERE> // WITHOUT < >
GITHUB_TOKEN=<YOUR_GITHUB_ACCESS_TOKEN_HERE> // WITHOUT < >
```

## Test it
- In your configured channel id, go ahead and type !issue Here the issue text starts for now ;)
