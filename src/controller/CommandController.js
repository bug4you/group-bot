export const start = async (ctx) => {
    await ctx.reply("Hello! I'm a bot");
};

export const help = async (ctx) => {
    await ctx.reply("Help message");
}

export const about = async (ctx) => {
    await ctx.reply("About message");
}