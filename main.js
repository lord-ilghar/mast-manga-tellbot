import TelApi from "node-telegram-bot-api";
import { config } from "dotenv";
import nedb from "nedb";

const users = new nedb("./databases/users.nedb");
const database = new nedb("./databases/users.nedb");

config();
const bot = new TelApi(process.env.TOKEN, { polling: true });

//https://stackoverflow.com/questions/70348772/node-telegram-bot-api-how-to-get-user-message-on-a-question

bot.onText(/\/start/, async (ctx) => {
  bot.sendMessage(ctx.chat.id, "Welcome", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: [
        ["تست", "حمایت مالی"],
        ["رزرو کانال", "ارتباط با ما"],
      ],
    },
  });
  users.loadDatabase();
  users.findOne({ id: ctx.from.id }, (err, doc) => {
    if (doc == null) {
      users.insert({ id: ctx.from.id });
    }
  });
});
