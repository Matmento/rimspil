// Define the list of rhyme pairs as an array of objects

const rhymePairs = [
  { word1: "9", word2: "bi" },
  { word1: "2", word2: "sko" },
  { word1: "mælk", word2: "kælk" },
  { word1: "hus", word2: "mus" },
  { word1: "flaske", word2: "taske" },
  { word1: "gul", word2: "fugl" },
  { word1: "blå", word2: "grå" },
  { word1: "rød", word2: "brød" },
  { word1: "and", word2: "spand" },
  { word1: "gris", word2: "is" },
  { word1: "sol", word2: "stol" },
  { word1: "bil", word2: "pil" },
  { word1: "bog", word2: "tog" },
  { word1: "bord", word2: "ror" },
  { word1: "nål", word2: "skål" },
  { word1: "tyv", word2: "7" },
  { word1: "6", word2: "heks" },
  { word1: "kost", word2: "ost" },
  { word1: "krage", word2: "drage" },
];

// Randomly shuffle the rhyme pairs
const shuffledRhymePairs = shuffleArray(rhymePairs);

// Function to shuffle an array
// start a loop that runs from the last index to the first index of the array
// generate a random index between 0 and i (inclusive) using the Math.random() function
// swap the values at the i-th and j-th indexes of the array using destructuring assignment
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  console.log(array);
  // return the shuffled array
  return array;
  //console.log(array);
}

// Select the first 10 rhyme pairs from the shuffled array
const selectedRhymePairs = shuffledRhymePairs.slice(0, 9);

// Flatten the 10 selected rhyme pairs into a single array of 20 words
const selectedWords = selectedRhymePairs.reduce(
  (acc, curr) => [...acc, curr.word1, curr.word2],
  []
);

// Randomly shuffle the 20 selected words
const shuffledWords = shuffleArray(selectedWords);

// Dynamically generate HTML elements for each of the 20 shuffled words and add them to the game container
const gameContainer = document.querySelector(".gameContainer");
shuffledWords.forEach((word) => {
  const wordContainer = document.createElement("div");
  wordContainer.classList.add("wordContainer");
  const imgElement = document.createElement("img");
  imgElement.src = `images/${word}.png`;
  imgElement.alt = word;

  // Attach click event listener to the image element
  imgElement.addEventListener("click", handleImageClick);
  gameContainer.appendChild(imgElement);
});

let score = 0;
let selectedImages = [];

// Function to check if two images form a rhyming pair
function isRhymingPair(image1, image2) {
  const rhymePair = rhymePairs.find((pair) => {
    return (
      (pair.word1 === image1.alt && pair.word2 === image2.alt) ||
      (pair.word1 === image2.alt && pair.word2 === image1.alt)
    );
  });
  return rhymePair !== undefined;
}
// Function to play a sound that matches the name of the selected word
function playSound(word) {
  const sound = new Audio(`sounds/${word}.mp3`);
  sound.play();
}

// Function to handle click event on an image
function handleImageClick(event) {
  const clickedImage = event.target;
  if (clickedImage.classList.contains("selected")) {
    // If the image is already selected, deselect it
    clickedImage.classList.remove("selected");
    selectedImages = selectedImages.filter((image) => image !== clickedImage);
  } else {
    // If the image is not selected, select it and add it to the selectedImages array
    clickedImage.classList.add("selected");
    selectedImages.push(clickedImage);
    // Play the sound that matches the name of the selected word
    // playSound(clickedImage.alt);
  }

  if (selectedImages.length === 2) {
    const [image1, image2] = selectedImages;
    if (isRhymingPair(image1, image2)) {
      // If the selected images form a rhyming pair, increase the score and visually indicate the match
      score++;
      image1.classList.add("matched");
      image2.classList.add("matched");

      //play success sound when a match is found
      const successSound = new Audio("sounds/success.mp3");
      successSound.play();

      //console log the score
      console.log(score);
      document.getElementById("score").textContent = score;
    } else {
      // If the selected images do not form a rhyming pair, remove the "selected" class from both images
      image1.classList.remove("selected");
      image2.classList.remove("selected");
      //  add and remove a class to make the images shake when a match is not found
      image1.classList.add("shake");
      image2.classList.add("shake");
      setTimeout(function () {
        image1.classList.remove("shake");
        image2.classList.remove("shake");
      }, 1000);

      //play failure sound when a match is not found
      const failureSound = new Audio("sounds/failure.mp3");
      failureSound.play();
    }
    selectedImages = [];
  }
}

// Add click event listeners to each image
const images = document.querySelectorAll(".wordContainer img");
images.forEach((image) => {
  image.addEventListener("click", handleImageClick);
});
