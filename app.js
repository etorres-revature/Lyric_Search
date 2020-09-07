//lyrics OVH
// https://api.lyrics.ovh

//global variablles for DOM elements
const apiURL = "https://api.lyrics.ovh";
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");
const resultEl = document.querySelector("#results");
const moreEl = document.querySelector("#more");

//search by song or artist
async function searchSongs(term) {
  // fetch(`${apiURL}/suggest/${term}`)
  // .then(res => res.json())
  // .then(songLyricData => console.log(songLyricData));
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const songLyricData = await res.json();

  //     console.log(songLyricData);
  showSongLyricData(songLyricData);
}

//show song and artist information in DOM
//TODO update with image and link to play in audio player
function showSongLyricData(data) {
    
}

//event Listeners
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value.trim();

  if (!searchTerm) {
    //TODO remove this alert and make html for
    alert("please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});
