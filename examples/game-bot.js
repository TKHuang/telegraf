const Telegraf = require('../')
const { Extra, Markup } = require('../')

const gameShortName = 'your-game'
const gameUrl = 'https://your-game.tld'

const markup = Extra.markup(
  Markup.inlineKeyboard([
    Markup.gameButton('🎮 Play now!'),
    Markup.urlButton('Telegraf help', 'http://telegraf.js.org')
  ])
)

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.command('start', (ctx) => ctx.replyWithGame(gameShortName))
bot.command('foo', (ctx) => ctx.replyWithGame(gameShortName, markup))
bot.gameQuery((ctx) => ctx.answerGameQuery(gameUrl))
bot.startPolling()
