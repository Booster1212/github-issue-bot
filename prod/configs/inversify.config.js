"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config(); // Recommended way of loading dotenv
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const bot_1 = require("../bot");
const inversify_types_1 = require("./inversify.types");
let container = new inversify_1.Container();
container.bind(inversify_types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container
    .bind(inversify_types_1.TYPES.Client)
    .toConstantValue(new discord_js_1.Client({ intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES, discord_js_1.Intents.FLAGS.GUILD_MESSAGE_TYPING] }));
container
    .bind(inversify_types_1.TYPES.Token)
    .toConstantValue(process.env.TOKEN);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map