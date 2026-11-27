
/* ==========================================
   1. EDIT YOUR FRIEND'S DETAILS HERE
========================================== */

const birthdayData = {

  name: "Ullas",

  pin: "2810", // DDMM format

  message: [
    "Happy Birthday to one of the most wonderful people in my life! 💜",
    "Thank you for all the laughs, silly moments and beautiful memories.",
    "May your new year bring happiness, success and countless reasons to smile.",
    "Keep shining and never stop being amazing! ✨"
  ],

  photos: [
    "images/picture1.jpeg",
    "images/picture2.jpeg",
    "images/picture3.jpeg",
    "images/picture4.jpeg",
    "images/picture5.jpeg"
  ],

  captions: [
    "The beginning ♡",
    "Crazy moments ✨",
    "Pure happiness 💜",
    "Unforgettable day",
    "Forever memories ♡"
  ]

};


/* ==========================================
   2. GET HTML ELEMENTS
========================================== */

const pinInput = document.getElementById("pinInput");
const unlockBtn = document.getElementById("unlockBtn");
const pinError = document.getElementById("pinError");

const friendName = document.getElementById("friendName");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const choiceMessage = document.getElementById("choiceMessage");

const makeWishBtn = document.getElementById("makeWishBtn");
const wishBtn = document.getElementById("wishBtn");

const candleFlame = document.getElementById("candleFlame");
const blowBtn = document.getElementById("blowBtn");
const candleMessage = document.getElementById("candleMessage");

const bigCake = document.getElementById("bigCake");
const cutCakeBtn = document.getElementById("cutCakeBtn");
const cakeMessage = document.getElementById("cakeMessage");

const giftCharacters = document.querySelectorAll(".gift-character");

const photoPopup = document.getElementById("photoPopup");
const giftPhoto = document.getElementById("giftPhoto");
const photoCaption = document.getElementById("photoCaption");
const closePhotoBtn = document.getElementById("closePhotoBtn");

const prevPhotoBtn = document.getElementById("prevPhotoBtn");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
const photoCounter = document.getElementById("photoCounter");

const letterBtn = document.getElementById("letterBtn");
const envelope = document.getElementById("envelope");
const envelopeText = document.getElementById("envelopeText");
const letterInside = document.getElementById("letterInside");
const birthdayMessage = document.getElementById("birthdayMessage");
const finalBtn = document.getElementById("finalBtn");

const replayBtn = document.getElementById("replayBtn");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");


/* ==========================================
   3. GENERAL SCREEN FUNCTION
========================================== */

function showSection(sectionId) {

  document.querySelectorAll(".screen").forEach(function(screen) {
    screen.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}

friendName.textContent = birthdayData.name;


/* ==========================================
   4. PIN UNLOCK
========================================== */

unlockBtn.addEventListener("click", function() {

  const enteredPin = pinInput.value.trim();

  if (enteredPin === birthdayData.pin) {

    pinError.textContent =
      "Correct! Your surprise is waiting! 💜";

    unlockBtn.textContent = "Unlocked! ✨";

    setTimeout(function() {
      showSection("birthdaySection");
    }, 800);

  } else {

    pinError.textContent =
      "Oops! That's not the right date. Try again! 🙈";

    pinInput.value = "";
    pinInput.focus();

  }

});

pinInput.addEventListener("keydown", function(event) {

  if (event.key === "Enter") {
    unlockBtn.click();
  }

});


/* ==========================================
   5. YES / NO BUTTONS
========================================== */

yesBtn.addEventListener("click", function() {

  choiceMessage.textContent =
    "Yayyyy! I knew you would say YES! 🥹💜";

  yesBtn.disabled = true;
  noBtn.disabled = true;

  setTimeout(function() {
    showSection("makeWishSection");
  }, 1100);

});

noBtn.addEventListener("click", function() {

  choiceMessage.textContent =
    "Awww! 🥺 No is not an option! Give that YES button a chance! 💜";

});


/* ==========================================
   6. MAKE A WISH -> CLOSE YOUR EYES
========================================== */

makeWishBtn.addEventListener("click", function() {

  showSection("wishSection");

});

wishBtn.addEventListener("click", function() {

  showSection("candleSection");

});


/* ==========================================
   7. BLOW THE CANDLE
========================================== */

let candleBlown = false;

function blowCandle() {

  if (candleBlown) {
    return;
  }

  candleBlown = true;

  candleFlame.classList.add("off");

  candleMessage.textContent =
    "Yayyy! May all your wishes come true! ✨💜";

  blowBtn.textContent = "Wish made! 💜";

  setTimeout(function() {
    showSection("cakeSection");
  }, 1700);

}

blowBtn.addEventListener("click", blowCandle);
candleFlame.addEventListener("click", blowCandle);


/* ==========================================
   8. CAKE CUTTING ANIMATION
========================================== */

let cakeIsCut = false;

cutCakeBtn.addEventListener("click", function() {

  if (cakeIsCut) {
    return;
  }

  cakeIsCut = true;

  bigCake.classList.add("cutting");

  cutCakeBtn.disabled = true;
  cutCakeBtn.textContent = "Cutting the cake... 🎂";

  setTimeout(function() {

    bigCake.classList.remove("cutting");
    bigCake.classList.add("cut");

    cakeMessage.textContent =
      "Yayyy! Cake successfully cut! Time for your gifts! 🎂💜";

    cutCakeBtn.textContent = "Cake Cut! 💜";

    setTimeout(function() {
      showSection("giftSection");
    }, 1700);

  }, 650);

});


/* ==========================================
   9. PHOTO GIFTS + SLIDESHOW
========================================== */

let currentPhotoIndex = 0;


// UPDATE PHOTO

function updatePhoto() {

  const selectedPhoto = birthdayData.photos[currentPhotoIndex];
  const selectedCaption = birthdayData.captions[currentPhotoIndex];

  giftPhoto.style.display = "block";

  giftPhoto.onerror = function() {

    giftPhoto.style.display = "none";

    photoCaption.textContent =
      "Please add " + selectedPhoto + " to your project folder.";

  };

  giftPhoto.src = selectedPhoto;

  photoCaption.textContent = selectedCaption;

  photoCounter.textContent =
    "Memory " + (currentPhotoIndex + 1) +
    " of " + birthdayData.photos.length;

  prevPhotoBtn.disabled = currentPhotoIndex === 0;

}


// OPEN PHOTO

function openPhoto(index) {

  if (index < 0 || index >= birthdayData.photos.length) {
    return;
  }

  currentPhotoIndex = index;

  updatePhoto();

  photoPopup.classList.add("show");

}


// GIFT CHARACTER CLICK

giftCharacters.forEach(function(character) {

  character.addEventListener("click", function() {

    const photoIndex = Number(character.dataset.photo);

    openPhoto(photoIndex);

  });

});


// PREVIOUS PHOTO

prevPhotoBtn.addEventListener("click", function() {

  if (currentPhotoIndex > 0) {

    currentPhotoIndex--;

    updatePhoto();

  }

});


// NEXT PHOTO

nextPhotoBtn.addEventListener("click", function() {

  if (currentPhotoIndex < birthdayData.photos.length - 1) {

    currentPhotoIndex++;

    updatePhoto();

  } else {

    closePhoto();

    showSection("giftSection");

  }

});


// CLOSE PHOTO

function closePhoto() {

  photoPopup.classList.remove("show");

  giftPhoto.src = "";

  currentPhotoIndex = 0;

}


// CLOSE BUTTON

closePhotoBtn.addEventListener("click", closePhoto);


// CLICK OUTSIDE TO CLOSE

photoPopup.addEventListener("click", function(event) {

  if (event.target === photoPopup) {
    closePhoto();
  }

});


/* ==========================================
   10. OPEN THE LETTER SECTION
========================================== */

letterBtn.addEventListener("click", function() {

  showSection("letterSection");

});


/* ==========================================
   11. ENVELOPE + LETTER REVEAL
========================================== */

let letterOpened = false;
let letterTimers = [];

function clearLetterTimers() {

  letterTimers.forEach(function(timer) {
    clearTimeout(timer);
  });

  letterTimers = [];

}


function typeLetter() {

  clearLetterTimers();

  birthdayMessage.innerHTML = "";

  birthdayData.message.forEach(function(line, index) {

    const paragraph = document.createElement("p");

    paragraph.textContent = line;

    birthdayMessage.appendChild(paragraph);

    const timer = setTimeout(function() {

      paragraph.classList.add("revealed");

    }, 350 + index * 850);

    letterTimers.push(timer);

  });

}


function openEnvelope() {

  if (letterOpened) {
    return;
  }

  letterOpened = true;

  envelope.classList.add("open");

  envelopeText.textContent =
    "A little letter, sealed with love... 💜";

  setTimeout(function() {

    letterInside.classList.add("show");

    envelopeText.textContent =
      "A message written just for you ♡";

    typeLetter();

  }, 1050);

}


envelope.addEventListener("click", openEnvelope);

envelope.addEventListener("keydown", function(event) {

  if (event.key === "Enter" || event.key === " ") {

    event.preventDefault();

    openEnvelope();

  }

});


/* ==========================================
   12. FINAL SURPRISE
========================================== */

finalBtn.addEventListener("click", function() {

  showSection("finalSection");

});


/* ==========================================
   13. MUSIC PLAYER
========================================== */

musicButton.addEventListener("click", function() {

  if (birthdayMusic.paused) {

    birthdayMusic.play()
      .then(function() {

        musicButton.textContent = "🎵 Pause Music";

      })
      .catch(function() {

        musicButton.textContent = "Music unavailable";

      });

  } else {

    birthdayMusic.pause();

    musicButton.textContent = "🎵 Play Music";

  }

});


/* ==========================================
   14. REPLAY THE WHOLE WEBSITE
========================================== */

replayBtn.addEventListener("click", function() {

  // RESET PIN

  pinInput.value = "";
  pinError.textContent = "";
  unlockBtn.textContent = "Unlock My Surprise ✨";


  // RESET YES / NO

  choiceMessage.textContent = "";

  yesBtn.disabled = false;
  noBtn.disabled = false;


  // RESET CANDLE

  candleBlown = false;

  candleFlame.classList.remove("off");

  blowBtn.disabled = false;
  blowBtn.textContent = "Blow the Candle ✨";

  candleMessage.textContent = "";


  // RESET CAKE

  cakeIsCut = false;

  bigCake.classList.remove("cut", "cutting");

  cutCakeBtn.disabled = false;
  cutCakeBtn.textContent = "Cut the Cake 🍰";

  cakeMessage.textContent =
    "Ready? Let's cut the cake together! 🎀";


  // RESET LETTER

  clearLetterTimers();

  letterOpened = false;

  envelope.classList.remove("open");

  envelopeText.textContent =
    "Tap the little envelope to open your letter. ♡";

  letterInside.classList.remove("show");

  birthdayMessage.innerHTML = "";


  // RESET PHOTOS

  closePhoto();


  // RESET MUSIC

  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;

  musicButton.textContent = "🎵 Play Music";


  // GO BACK TO PIN SCREEN

  showSection("pinSection");

});
