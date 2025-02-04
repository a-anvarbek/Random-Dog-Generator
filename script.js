// Random Dog Generali 

document.addEventListener("DOMContentLoaded", () => {
    const dogImage = document.getElementById("dogImage");
    const dogBreed = document.getElementById("dogBreed");
    const getDogButton = document.querySelector(".dogInfo button");
    const favoriteIcon = document.getElementById("favoriteIcon"); // ID orqali olish
    const favoriteCount = document.getElementById("count");
    
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoriteCount.textContent = favorites.length;

    async function fetchRandomDog() {
        try {
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            const data = await response.json();
            
            dogImage.src = data.message;
            dogImage.alt = "Random Dog";
            
            const breedName = data.message.split("/")[4].replace("-", " ");
            dogBreed.textContent = `Breed: ${breedName.charAt(0).toUpperCase() + breedName.slice(1)}`;
        } catch (error) {
            console.error("Error fetching the dog image:", error);
        }
    }

    getDogButton.addEventListener("click", () => {
        favoriteIcon.style.color = "black";
        fetchRandomDog();
    });

    favoriteIcon.addEventListener("click", () => {
        console.log("Icon clicked"); // Konsolga chiqaryapmiz tekshirish uchun
        
        if (favoriteIcon.classList.contains("fa-regular")) {
            favoriteIcon.classList.remove("fa-regular");
            favoriteIcon.classList.add("fa-solid");
            favoriteIcon.style.color = "red";
            
            if (!favorites.includes(dogImage.src)) {
                favorites.push(dogImage.src);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                favoriteCount.textContent = favorites.length;
            }
        } else {
            favoriteIcon.classList.remove("fa-solid");
            favoriteIcon.classList.add("fa-regular");
            favoriteIcon.style.color = "black";
            
            favorites = favorites.filter(src => src !== dogImage.src);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            favoriteCount.textContent = favorites.length;
        }
    });

    fetchRandomDog();
});









// const API = `https://dog.ceo/dog-api/documentation/random`;
// let btnImg = document.querySelector(".dogInfo button")

// async function getRandomDog() {
//     try {
        
//         const response = await fetch(API);
//         const data = await response.json();
        
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// btnImg.addEventListener("click", async () => {
//     const dogData = await getRandomDog();
//     document.querySelector(".dogInfo img").src = dogData.message;
//     document.querySelector(".dogInfo h2").textContent = dogData.message.split("/")[4];
//     document.querySelector(".dogInfo p").textContent = `Breed: ${dogData.message.split("/")[5]}`;
//     document.querySelector(".dogInfo p").style.display = "block";
//     document.querySelector(".dogInfo button").textContent = "Get Another Dog";
//     document.querySelector(".dogInfo button").style.display = "block";

// });


// const dogApiResponseObj = {
//     message: "https://images.dog.ceo/breeds/terrier-tibetan/n02097474_6113.jpg",
//     status: "success",
//   };
  
//   console.log(dogApiResponseObj?.message?.split("/")[4]);
  