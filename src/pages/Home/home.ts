const textEl = document.getElementById('loggedInId');

const sessionRes = await fetch('http://localhost:3000/api/session');
const sessionJson = await sessionRes.json();

console.log(sessionJson);

if (sessionJson.user) {
  textEl.innerHTML = sessionJson.user.firstName;
}
