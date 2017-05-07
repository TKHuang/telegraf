const Telegraf = require('../')
const fetch = require('node-fetch')

// async/await example.
// Similar bot with `micro-bot` wrapper: https://gist.github.com/dotcypress/b26e7bcd6f70e72c482292d8778420da

async function spotifySearch (query = '', offset, limit) {
  const apiUrl = `https://api.spotify.com/v1/search?type=track&limit=${limit}&offset=${offset}&q=${encodeURIComponent(query)}`
  const response = await fetch(apiUrl)
  const x = await response.json()
  return x.tracks.items
}

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.on('inline_query', async (ctx) => {
  const offset = parseInt(ctx.inlineQuery.offset) || 0
  const tracks = await spotifySearch(ctx.inlineQuery.query, offset, 30)
  const results = tracks.map((track) => ({
    type: 'audio',
    id: track.id,
    title: track.name,
    audio_url: track.preview_url
  }))
  return ctx.answerInlineQuery(results, {next_offset: offset + 30})
})

bot.startPolling()
