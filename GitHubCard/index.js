/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

let myUrl = 'https://api.github.com/users/tarasshulhan';

import axios from 'axios';
function getRequestAddCard(url,sec, cb = function(param){}){
  let section = document.querySelector(sec);
  let gitData = axios.get(url)
  .then(resp => {
    section.appendChild(cb(resp));
  })
  .catch(err => {
    console.error(err);
  })
}

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
getRequestAddCard(myUrl,'.cards', cardCreator);

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/
const instructors = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'uishrd',
  'bigknelll'
]
const followersArray = [];

instructors.forEach(elem => followersArray.push(`https://api.github.com/users/${elem}`));
followersArray.forEach(elem => getRequestAddCard(elem, '.cards', cardCreator));

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardCreator(response){
  //card
  const card = document.createElement('div');
  card.classList.add('card');
  //user avatar
  const img = document.createElement('img');
  img.classList.add('hidden');
  img.src = response.data.avatar_url;
  card.appendChild(img);
  //user info
  const info = document.createElement('div');
  info.classList.add('card-info');
  card.appendChild(info);
  //name
  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = response.data.name;
  info.appendChild(name);
  //username
  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = response.data.login;
  info.appendChild(userName);
  //location
  const location = document.createElement('p');
  location.textContent = `Location: ${response.data.location}`;
  info.appendChild(location);
  //profile
  const profile = document.createElement('p');
  profile.textContent = 'Profile: ';
  const profileLink = document.createElement('a');
  profileLink.href = response.data.html_url;
  profileLink.textContent = response.data.html_url;
  profile.appendChild(profileLink);
  info.appendChild(profile);
  //followers
  const followers = document.createElement('p');
  followers.textContent = `Followers: ${response.data.followers}`;
  info.appendChild(followers);
  //following
  const following = document.createElement('p');
  following.textContent = `Following: ${response.data.following}`;
  info.appendChild(following);
  //bio
  const bio = document.createElement('p');
  bio.textContent = `Bio: ${response.data.bio}`;
  info.appendChild(bio);
  let expandButton = document.createElement('span');
  expandButton.classList.add('expandButton');
  expandButton.textContent = '+';
  expandButton.addEventListener('click', evt => { 
    card.classList.toggle('card-open');
    img.classList.toggle('hidden');
  });
  card.appendChild(expandButton);
  return card;
}


