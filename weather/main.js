import './style.css'
import { weather } from './counter.js'

document.querySelector('#app').innerHTML = `
<div class="h-dvh flex  justify-center">
<div class="  flex flex-col items-center">
<div class="flex justify-center text-3xl">Enter a city</div>
<form id="weatherForm" class="mt-4 flex justify-center flex-row h-14">
  <label for="city" class="block"></label>
  <input type="text" id="city" name="cityInput" required class="border rounded-xl border-black p-2">
  <button type="submit" id="search" disabled class="bg-black text-white px-2 py-2  rounded-2xl ml-5">Find Weather</button>
</form>
<div id="result" class="mt-4 flex flex flex-row border-black border-2 p-5 rounded-xl justify-center"></div>
<div id="updateSection" class="mt-4 flex justify-center absolute bottom-5  flex-row items-center">
  <span>Weather info will refresh in ... <span id="countdown">120</span> s.</span>
  <span id="update" class="text-black px-4 py-2 items-center underline mt-2">Refresh now.</span>
</div>
</div></div>
 
`
weather(document.querySelector('#counter'))