import './style.css'
import heroImg from './assets/hero.png'
import javascriptLogo from './assets/javascript.svg'
import viteLogo from './assets/vite.svg'
import { setupCounter } from './counter.js'
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://rjlcdsgooblhidfthoes.supabase.co'
const supabaseKey = 'sb_publishable_nrCdSROE2erNMrUDelC-Cg_0DykDbjx'
const supabase = createClient(supabaseUrl, supabaseKey)

document.querySelector('#app').innerHTML =`
 <section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.js</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Documentation</h2>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src="${viteLogo}" alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <input type="text" id="search-box" placeholder="Search teams..." />
  <div id ="team-list"></div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))

async function renderTeams(){
  const {data,error} = await supabase
    .from('teams')
    .select('*')

  const html = data.map(team => `<li>${team.name} - Coach: ${team.coach_name}</li>`).join('');document.querySelector('#team-list').innerHTML = `<ul>${html}</ul>` 
}
renderTeams()

async function getWolvesPlayers(){
  const {data ,error} = await supabase
     .from ('players')
     .select('*')
     .eq('team_id',1)
     .order('jersey_number',{ascending : true})

  console.log(data)
  console.log(error)
}
getWolvesPlayers()

document.querySelector('#search-box').addEventListener('input', async (event) => {
  const searchTerm = event.target.value
  
  const {data , error} = await supabase
    .from ('teams')
    .select('*')
    .ilike('name', `%${searchTerm}%`)

  const html = data.map(team => `<li>${team.name} - Coach: ${team.coach_name}</li>`).join('');document.querySelector('#team-list').innerHTML = `<ul>${html}</ul>`   
})
  
 
setupCounter(document.querySelector('#counter'))
