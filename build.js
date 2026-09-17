// Bouwscript voor een statische build (bijvoorbeeld voor Cloudflare Pages)
// Haalt de API data eenmalig op en rendert index.ejs naar platte HTML in ./dist

import ejs from 'ejs'
import fs from 'node:fs'
import path from 'node:path'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

const outDir = './dist'

// Haal data op uit de FDND API
const data = await fetchJson('https://fdnd.directus.app/items/person/18')
data.data.custom = JSON.parse(data.data.custom)

// Render index.ejs uit de views map naar een HTML string
const html = await ejs.renderFile('./views/index.ejs', data)

// Zorg dat de output map bestaat (bestaande bestanden worden hierna overschreven)
fs.mkdirSync(outDir, { recursive: true })

// Schrijf de gerenderde pagina weg als index.html
fs.writeFileSync(path.join(outDir, 'index.html'), html)

// Kopieer de statische bestanden (css, js, fonts, assets) naar de output map
fs.cpSync('./public', outDir, {
  recursive: true,
  filter: (src) => !src.endsWith('.gitkeep') && !src.endsWith('.DS_Store'),
})

console.log(`Statische site gebouwd in ${outDir}`)
