import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
const { levelling } = '../lib/levelling.js'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'
const time = moment.tz('Asia/Kolkata').format('HH')
let wib = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//import db from '../lib/database.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let d = new Date(new Date() + 3600000)
  let locale = 'en'
  let week = d.toLocaleDateString(locale, { weekday: 'long' })
  let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
  let _uptime = process.uptime() * 1000
  let uptime = clockString(_uptime)
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
  let pp = './Assets/Gurulogo.jpg'
  let user = global.db.data.users[who]
  let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } =
    global.db.data.users[who]
  let { min, xp, max } = xpRange(user.level, global.multiplier)
  let username = conn.getName(who)
  let math = max - xp
  let prem = global.prems.includes(who.split`@`[0])
  let sn = createHash('md5').update(who).digest('hex')
  let totaluser = Object.values(global.db.data.users).length
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)
  let greeting = ucapan()
  let quote = quotes[Math.floor(Math.random() * quotes.length)]

  let taguser = '@' + m.sender.split('@s.whatsapp.net')[0]
  let str = `
🚀 *_Buckle up ${name}, ${greeting}! We're going on an adventure!_* 🚀

📜 *_Quote of the day: ${quote}_* 📜

┏━💼 _User Info:_ 💼━┓
┃ 👾  *User Tag:* ${taguser} 
┃ 🎩  *Name:* ${name} 
┃ 🦸  *Master Mind:* ${author} 
┃ 💎  *Diamonds:* ${diamond} 
┃ 🏆  *Rank:* ${role}
┃ 🎮  *XP:* ${exp} 
┗━━━━━━━━━━━┛

┏━━⏰ _Today's Sauce!_ ⏰━┓
┃ 📆  *Today's Date:* ${date} 
┃ ⏲️  *Current Time:* ${wib} 
┗━━━━━━━━━━━━━┛

┏━━🤖 _BOT STATUS:_🤖━━┓
┃ 🤡  *Bot Name:* ${botname} 
┃ 💻  *Platform:* Linux 
┃ 📣  *Prefix:* ${usedPrefix} 
┃ 🕓  *Uptime:* ${uptime}
┃ 💌  *Database:* ${rtotalreg} of ${totaluser} 
┃ 📚  *Total Users:* ${totaluser} 
┗━━━━━━━━━━━━━┛

💡 *_Remember, when in doubt, use ${usedPrefix}list or ${usedPrefix}help2. It's like my magic spell book!_* 💡
`

  conn.sendFile(m.chat, pp, 'perfil.jpg', str, m, null, rpyt)
  m.react(done)
}
handler.help = ['main']
handler.tags = ['group']
handler.command = ['menu2', 'help2']

export default handler
function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function ucapan() {
  const time = moment.tz('Asia/Kolkata').format('HH')
  let res = 'Morning has come. Revenge never sleeps☀️'
  if (time >= 4) {
    res = 'Good Morning 🌄'
  }
  if (time >= 10) {
    res = 'Good Afternoon ☀️'
  }
  if (time >= 15) {
    res = 'Good Afternoon 🌇'
  }
  if (time >= 18) {
    res = 'Good Night 🌙'
  }
  return res
}
const quotes = [
 "I am justice! I protect the innocent and those who fear evil. I'm the one who will become the god of a new world that everyone desires!",
"I will hunt you down wherever you are hiding and I will eliminate you. I am... justice!",
"I'll solve equations with my right hand and write names with my left. I'll take a potato chip... and eat it!",
"You can't ever win if you're always on the defensive. To win, you have to attack!",
"In the end, there is no greater motivation than revenge.",
"Look around you, and all you will see are people the world would be better off without.",
"This world is rotten, and those who are making it rot deserve to die. Someone has to do it, so why not me?",
"You can’t win if you’re always on the defensive. To win, you have to attack.",
"I'll take a potato chip... and eat it!",
"I am L.",
"Humans aren’t made perfectly. Everyone lies. Even so... I’ve been careful not to tell lies that hurt others.",
"We’re both trying to change the world in our own way.",
"I am... justice.",
]
