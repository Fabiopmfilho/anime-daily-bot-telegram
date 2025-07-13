import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import axios from "axios";
import cron from "node-cron";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);
const dayMap: { [key: string]: string } = {
  segunda: "monday",
  terca: "tuesday",
  quarta: "wednesday",
  quinta: "thursday",
  sexta: "friday",
  sabado: "saturday",
  domingo: "sunday",
};

let chatId: number | null = null;

bot.start((ctx) => {
  chatId = ctx.chat.id;
  ctx.reply("Olá! Vou te avisar todo dia sobre os animes lançados.");
});

bot.command("hoje", async (ctx) => {
  const animes = await getTodayAnimes();
  sendAnimesResponse(ctx, animes, "hoje");
});

bot.command("ajuda", (ctx) => {
  ctx.reply(
    `🤖 *Comandos disponíveis:*\n\n` +
      `📅 *Comandos por dia da semana:*\n` +
      `• /segunda – Animes lançados na segunda-feira\n` +
      `• /terca – Animes lançados na terça-feira\n` +
      `• /quarta – Animes lançados na quarta-feira\n` +
      `• /quinta – Animes lançados na quinta-feira\n` +
      `• /sexta – Animes lançados na sexta-feira\n` +
      `• /sabado – Animes lançados no sábado\n` +
      `• /domingo – Animes lançados no domingo\n\n` +
      `📌 *Comando rápido:*\n` +
      `• /hoje – Mostra os animes lançados no dia de hoje automaticamente\n\n` +
      `ℹ️ Enviarei automaticamente os animes todos os dias às 10h\n\n` +
      `Qualquer dúvida, me chame por aqui!`,
    { parse_mode: "Markdown" }
  );
});

Object.entries(dayMap).forEach(([ptDay, enDay]) => {
  bot.command(ptDay, async (ctx) => {
    const animes = await getAnimesByDay(enDay);
    sendAnimesResponse(ctx, animes, ptDay);
  });
});

function sendAnimesResponse(ctx: any, animes: string[], dia: string) {
  if (animes.length === 0) {
    ctx.reply(`Nenhum anime novo lançado na ${dia}.`);
  } else {
    ctx.reply(
      `🎉 Animes lançados na ${dia}:\n\n` +
        animes.map((a) => `• ${a}`).join("\n")
    );
  }
}

async function getTodayAnimes(): Promise<string[]> {
  const weekday = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  return await getAnimesByDay(weekday);
}

async function getAnimesByDay(day: string): Promise<string[]> {
  try {
    const { data } = await axios.get(
      `https://api.jikan.moe/v4/schedules?filter=${day}&kids=false&sfw=false&limit=35`
    );

    const uniqueAnimes = Array.from(
      new Map(data.data.map((anime: any) => [anime.url, anime])).values()
    );

    return uniqueAnimes.map((anime: any) => `${anime.title} - ${anime.url}`);
  } catch (error: any) {
    console.error(`Erro ao buscar animes de ${day}:`, error.message);
    return [];
  }
}

cron.schedule("0 10 * * *", async () => {
  if (!chatId) return;
  const animes = await getTodayAnimes();
  if (animes.length === 0) {
    bot.telegram.sendMessage(chatId, "Nenhum anime novo lançado hoje.");
  } else {
    bot.telegram.sendMessage(
      chatId,
      "🎉 Animes lançados hoje:\n\n" + animes.map((a) => `• ${a}`).join("\n")
    );
  }
});

bot.launch();
console.log("🤖 Bot rodando...");
