const express = require("express");
const app = express();
const port = 3000;

const pets = require("./petList");

app.get("/", (req, res) => {
  const html = `
    <h1>Adopt a Pet!</h1>
    <p>Browse through the links below to find your new furry friend:</p>
    <ul>
      <li><a href="/animals/dogs">Dogs</a></li>
      <li><a href="/animals/cats">Cats</a></li>
      <li><a href="/animals/rabbits">Rabbits</a></li>
    </ul>
  `;
  res.send(html);
});

app.get("/animals/:pet_type", (req, res) => {
  const petType = req.params.pet_type;
  const petList = pets[petType];
  if (petList === undefined) {
    res.status(404).send(`404 - No pets of type ${petType} found`);
  } else {
    const html = `
      <h1>List of ${petType}</h1>
      <ul>
        ${petList
          .map(
            (pet, index) =>
              `<li><a href="/animals/${petType}/${index}">${pet.name}</a></li>`
          )
          .join("")}
      </ul>
    `;
    res.send(html);
  }
});

app.get("/animals/:pet_type/:pet_id", (req, res) => {
  const { pet_type, pet_id } = req.params;
  const petList = pets[pet_type];
  const pet = petList[pet_id];

  const html = `
    <h1>${pet.name}</h1>
    <img src="${pet.photo}" alt="${pet.name}">
    <p>${pet.description}</p>
    <ul>
      <li><a href="/animals/${pet_type}/${pet_id}/breed">${pet.breed}</a></li>
      <li><a href="/animals/${pet_type}/${pet_id}/age">${pet.age}</a></li>
    </ul>
  `;

  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
