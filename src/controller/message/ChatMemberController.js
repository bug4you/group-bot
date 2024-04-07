export const newChatMember = async (ctx, message) => {
    await ctx.deleteMessage();
    let resp = `<b><i>Hurmatli  <a href="tg://user?id=${message.new_chat_member.id}">foydalanuvchi</a>, Bizning \`${message.chat.title}\` nomli guruhimizga xush kelibsiz😊\n\nBu guruhda izlaganingizni topasiz degan umiddaman. Iltimos guruhimiz qonun va qoidalariga rioya qiling 🤐</i></b>`;
    await ctx.reply(resp, {parse_mode: "HTML"});
};

export const leftChatMember = async (ctx, message) => {
    await ctx.deleteMessage();
    await ctx.reply(`<i><a href="tg://user?id=${message.left_chat_member.id}">${message.left_chat_member.first_name}</a> nomli foydalanuvchisi guruhni tark etdi.</i>😫`, {parse_mode: "HTML"});
};

export const newChatTitle = async (ctx, message) => {
    await ctx.deleteMessage();
    await ctx.reply(`<i>🎉 Guruh sarlavhasi <a href="tg://user?id=${message.from.id}"><b>${message.from.first_name}</b></a> tomonidan <b>"${message.new_chat_title}"</b> nomiga o'zgartirildi 🤩</i>`, {parse_mode: "HTML"});
};

export const newChatPhoto = async (ctx, message, bot) => {
    await ctx.deleteMessage();
    let data = await ctx.replyWithPhoto(message.new_chat_photo[0].file_id, {
        parse_mode: "HTML",
        caption: `<i>🎉 Guruh rasmi <a href="tg://user?id=${message.from.id}"><b>${message.from.first_name}</b></a> tomonidan ushbu ko'rinishga o'zgartirildi 🍀</i>`
    });
    await bot.api.setMessageReaction(message.chat.id, data.message_id, [{
        type: "emoji",
        emoji: "👍"
    }]);
};

export const videoChatStarted = async (ctx, message) => {
    await ctx.deleteMessage();
    await ctx.reply("<b><i>🎥Video chat boshlandi!🎥</i>\nBarcha guruhimiz foydalanuvchilari video chatimizga marhamat</b>", {parse_mode: "HTML"});
};

export const videoChatEnded = async (ctx, message) => {
    await ctx.deleteMessage();
    let seconds = message.video_chat_ended.duration;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    let timeResponse = "";
    if (hours > 0) {
        timeResponse += `<code>${hours}</code> soat `;
    }
    if (minutes > 0) {
        timeResponse += `<code>${minutes}</code> daqiqa `;
    }
    if (seconds > 0) {
        timeResponse += `<code>${seconds}</code> soniya`;
    }
    let resp = `<b>🎥Video chat tugadi!🎥\n🧭 Video chat davomiyligi: ${timeResponse} davom etdi.\n🤩 Video chatda qatnashgan barcha a'zolarga katta rahmat!</b>`;
    await ctx.reply(resp, {parse_mode: "HTML"});
};

export const videoChatScheduled = async (ctx, message) => {
    await ctx.deleteMessage();
    const [date, time] = new Date(message.video_chat_scheduled.start_date * 1000).toLocaleString("uz-Uz", {timeZone: "Asia/Tashkent"}).split(" ");
    let resp = `<b>🎥Video chat rejalashtirildi!🎥\n🧭 Video chat <code>${date}</code> kuni soat <code>${time}</code> da boshlanadi.\n🤩 Barchani video chatda kutib qolamiz</b>`;
    await ctx.reply(resp, {parse_mode: "HTML"});
};

export const videoChatParticipantsInvited = async (ctx, message) => {
    await ctx.deleteMessage();
    let users = message.video_chat_participants_invited.users.map(user => `<a href="tg://user?id=${user.id}">${user.first_name}</a>`);
    let resp = `<b>🎥<a href="tg://user?id=${message.from.id}">${message.from.first_name}</a> video chatda ${users.join(", ")}${users.length > 1 ? "lar" : ""}ni taklif etdi\n🤩 Siz ham video chatga qatnashishingiz mumkin!</b>`
    await ctx.reply(resp, {parse_mode: "HTML"});
};