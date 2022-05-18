"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const configs_1 = require("./configs");
const inversify_config_1 = __importDefault(require("./configs/inversify.config"));
const inversify_types_1 = require("./configs/inversify.types");
let bot = inversify_config_1.default.get(inversify_types_1.TYPES.Bot);
bot
    .listen()
    .then(() => {
    let client = inversify_config_1.default.get(inversify_types_1.TYPES.Client);
    console.log("GitHub Issue Bot is ready!");
    client.on("messageCreate", (message) => {
        if (message.author.bot)
            return;
        if (!message.content.startsWith(configs_1.config.commandPrefix))
            return;
        const command = message.content
            .split(" ")[0]
            .slice(configs_1.config.commandPrefix.length);
        if (command === "issue") {
            const args = message.content.split(" ").slice(1);
            const issue = args.join(" ");
            if (!issue)
                return;
            message.channel.send(`Issue: ${issue}`);
        }
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map