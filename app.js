//lyrics OVH
// https://api.lyrics.ovh

//global variablles for DOM elements
const apiURL = "https://api.lyrics.ovh";
const formEl = document.querySelector("#form");
const searchEl = document.querySelector("#search");
const resultEl = document.querySelector("#results");
const moreEl = document.querySelector("#more-songs");

//search by song or artist
async function searchSongs(term) {
  // fetch(`${apiURL}/suggest/${term}`)
  // .then(res => res.json())
  // .then(songLyricData => console.log(songLyricData));
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const songLyricData = await res.json();

//   console.log(songLyricData);
  showSongLyricData(songLyricData);
}

//show song and artist information in DOM
//TODO update with image and link to play in audio player
function showSongLyricData(data) {
    var outputForDom = "";
    data.data.forEach((song) => {
      outputForDom += `
          <li>
              <span>
                  <strong>${song.artist.name} - ${song.title}</strong>
              </span>
              <button class="btn"
              data-artist="${song.artist.name}"
              data-songtitle="${song.title}">
              LYRICS</button>
          </li>
          `;
    });

    resultEl.innerHTML = `
      <ul class="songs">
           ${outputForDom}
      </ul>
      `;

//   resultEl.innerHTML = `
//         <ul class="songs">
//              ${data.data
//                .map(
//                  (song) => `
//          <li>
//              <span>
//                  <strong>${song.artist.name} - ${song.title}</strong>
//              </span>
//              <button class="btn" 
//              data-artist="${song.artist.name}"
//              data-songtitle="${song.title}">
//              LYRICS</button>
//          </li>
//              `
//                )
//                .join("")}
//         </ul>
//         `;

  if (data.prev || data.next) {
    moreEl.innerHTML = `
            ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Previous</button>` : ""}
            ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button` : ""}
            `;
  } else {
      moreEl.innerHTML = "";
  }
}

//previous and next button functionality
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const songLyricData = await res.json();
  
  //   console.log(songLyricData);
    showSongLyricData(songLyricData);
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
