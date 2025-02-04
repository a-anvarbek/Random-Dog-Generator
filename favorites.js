const favoritesBox = document.getElementById("favoritesBox");
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Sevimlilarni sahifaga chiqarish
function renderFavorites() {
    favoritesBox.innerHTML = "";

    if (favorites.length === 0) {
        favoritesBox.innerHTML = "<h2>No favorite dogs yet! 🐶</h2>";
        favoritesBox.style.margin = "200px";
        return;
    }

    favorites.forEach((imgUrl, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = "Dog Image";

        const breed = document.createElement("h2");
        breed.textContent = `Breed: ${extractBreedName(imgUrl)}`;

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("button-group");

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>'; // FontAwesome icon qo‘shish

        deleteButton.addEventListener("click", () => removeFavorite(index));

        buttonGroup.appendChild(deleteButton);
        card.appendChild(img);
        card.appendChild(breed);
        card.appendChild(buttonGroup);

        favoritesBox.appendChild(card);
    });
}

// Sevimlidan o‘chirish
function removeFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

// Rasm URL dan it turini chiqarish
function extractBreedName(url) {
    const parts = url.split("/");
    const breed = parts[parts.length - 2].replace("-", " ");
    return breed.charAt(0).toUpperCase() + breed.slice(1);
}

// Sahifani yuklaganda sevimlilarni chiqarish
renderFavorites();

// "Go Back" tugmasi yaratish
const goBackLink = document.createElement("a");
goBackLink.textContent = "⬅ Go Back";
goBackLink.href = "index.html";
goBackLink.style.display = "inline-block";
goBackLink.style.margin = "20px";
goBackLink.style.padding = "10px 15px";
goBackLink.style.fontSize = "1rem";
goBackLink.style.textDecoration = "none";
goBackLink.style.borderRadius = "5px";
goBackLink.style.backgroundColor = "#007bff";
goBackLink.style.color = "white";

document.body.insertBefore(goBackLink, favoritesBox);
