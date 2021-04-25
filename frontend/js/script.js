let tabUsers = null;
let tabEstatics = null;
let countUsers = 0;
let countMale = 0;
let countWomem = 0;
let allUsers = [];
let sumAges = [];
let avgAge = [];

async function fetchUsers() {
  const resource = await fetch('http://localhost:3001/users');
  const users = await resource.json();
  allUsers = users.map((user) => {
    const { name, picture, dob, gender, location } = user;
    return {
      id: name,
      img: picture,
      age: dob.age,
      gender,
      city: location.city,
      country: location.country,
    };
  });
  return allUsers;
}

window.addEventListener('load', start());

function start() {
  tabUsers = document.querySelector('#tabUsers');
  countMale = document.querySelector('#countMale');
  countWomem = document.querySelector('#countWomem');
  sumAges = document.querySelector('#sumAges');
  avgAge = document.querySelector('#avgAge');
}

let buttonElement = document.getElementById('search');
buttonElement.addEventListener('click', search);

async function search() {
  const allUsers = await fetchUsers();
  const name = document.querySelector('#name').value;
  const userFounded = allUsers.filter(
    (user) =>
      user.id.first.toLowerCase().includes(name.toLowerCase()) ||
      user.id.last.toLowerCase().includes(name.toLowerCase())
  );
  countUsers.textContent = allUsers.length;
  userFounded.sort((user1, user2) =>
    user1.id.first.localeCompare(user2.id.first)
  );
  userFounded.length == []
    ? window.alert('User not Found!')
    : renderUsers(userFounded);
}

function renderUsers(users) {
  let usersFoundHTML = "<div class='users'>";

  const countUsersSpan = document.getElementById('countUsers');
  countUsersSpan.innerText = users.length;

  const countGenderMSpan = document.getElementById('countMale');
  const maleUsers = users.filter((u) => u.gender === 'male');
  countGenderMSpan.innerText = maleUsers.length;

  const countGenderWSpan = document.getElementById('countWomem');
  const femUsers = users.filter((u) => u.gender === 'female');
  countGenderWSpan.innerText = femUsers.length;

  const sumAge = document.getElementById('sumAge');
  const totalAge = users.reduce((acc, cur) => {
    return acc + cur.age;
  }, 0);
  sumAge.innerText = totalAge;

  const avgAge = document.getElementById('avgAge');
  const average = (totalAge / users.length).toFixed(2);
  avgAge.innerText = average;

  users.forEach((user, index) => {
    const { id, img, age, city, country } = user;
    const userHTML = `
    <div id="itens">
      <div>
      <img src="${img.thumbnail}" alt="${id}" />
      </div>
      <div>
      <h3>${id.first} ${id.last}</h3>
      </div>
      <div>
          ${age},
          ${city} / ${country}  
      </div>
    </div>
  `;
    usersFoundHTML += userHTML;
  });
  tabUsers.innerHTML = usersFoundHTML;
}
