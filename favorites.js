    const favoritesBox = document.getElementById("favoritesBox");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Sevimlilarni sahifaga chiqarish
    function renderFavorites() {
        favoritesBox.innerHTML = "";

        if (favorites.length === 0) {
            favoritesBox.innerHTML = "<h2>No favorite dogs yet! 🐶</h2>";
            return;
        }

        favorites.forEach((imgUrl, index) => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = imgUrl;

            const breed = document.createElement("h2");
            breed.textContent = `Breed: ${extractBreedName(imgUrl)}`;

            const buttonGroup = document.createElement("div");
            buttonGroup.classList.add("button-group");

            const getAnotherButton = document.createElement("button");
            getAnotherButton.innerHTML = "🐕 Get Another Dog";
            getAnotherButton.addEventListener("click", () => fetchRandomDog(img, breed));

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.innerHTML = "🗑";
            deleteButton.addEventListener("click", () => removeFavorite(index));

            buttonGroup.appendChild(getAnotherButton);
            buttonGroup.appendChild(deleteButton);

            card.appendChild(img);
            card.appendChild(breed);
            card.appendChild(buttonGroup);

            favoritesBox.appendChild(card);
        });
    }

    // Tasodifiy it rasmini olish va o‘zgartirish
    async function fetchRandomDog(imgElement, breedElement) {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            const newImageUrl = data.message;

            imgElement.src = newImageUrl;
            breedElement.textContent = `Breed: ${extractBreedName(newImageUrl)}`;

            // Yangilangan rasmni sevimlilar ro‘yxatiga saqlash
            const index = favorites.indexOf(imgElement.src);
            if (index !== -1) {
                favorites[index] = newImageUrl;
                localStorage.setItem("favorites", JSON.stringify(favorites));
            }
        } catch (error) {
            console.error("Error fetching dog image:", error);
        }
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
