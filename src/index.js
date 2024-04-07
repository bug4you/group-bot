import "dotenv/config";
import {Bot} from "grammy";
import {about, help, start} from "./controller/CommandController.js";
import {
    leftChatMember,
    newChatMember,
    newChatPhoto,
    newChatTitle, videoChatEnded, videoChatParticipantsInvited, videoChatScheduled,
    videoChatStarted
} from "./controller/message/ChatMemberController.js";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

bot.command("start", start);
bot.command("help", help);
bot.command("about", about);

bot.on("message", async (ctx) => {
    let message = ctx.update.message;
    if (message.new_chat_title) {
        await newChatTitle(ctx, message);
    } else if (message.new_chat_photo) {
        await newChatPhoto(ctx, message, bot);
    } else if (message.new_chat_members) {
        await newChatMember(ctx, message);
    } else if (message.left_chat_member) {
        await leftChatMember(ctx, message);
    } else if (message.video_chat_started) {
        await videoChatStarted(ctx, message);
    } else if (message.video_chat_ended) {
        await videoChatEnded(ctx, message);
    } else if (message.video_chat_scheduled) {
        await videoChatScheduled(ctx, message);
    } else if (message.video_chat_participants_invited) {
        await videoChatParticipantsInvited(ctx, message);
    }
});

bot.start({
    allowed_updates: ["message", "edited_message", "chat_member"]
});