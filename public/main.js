/* ============================== PHASE 1 + 2 ============================== */
   function findCookieVal(key) {

   }
// For storing user's theme selection in cookies
 function storeTheme (themeName) {

        const expirationInSeconds = 30; // Set the expiration time in seconds

        // Calculate the expiration time in seconds from the current time
        const expirationTime = new Date();
        expirationTime.setSeconds(expirationTime.getSeconds() + expirationInSeconds);

        // Format the expiration time for the cookie
        const formattedExpiration = expirationTime.toUTCString();

        // Create the cookie string
        const cookieString = `theme=${encodeURIComponent(themeName)}; expires=${formattedExpiration}; path=/`;

        // Set the cookie
        document.cookie = cookieString;
    }


    // if your are going to store  certain part you have to put it in the parameters
//    const cookie = document.cookie = "myCookies=themeName";
//    console.log(cookie)
   //set a cookie to be stored


// For restoring theme from cookies, if selected by the user in the past
 function restoreTheme() {
   const cookie = findCookieVal("themeName"); //retrieve cookie value by name

   if(cookie) {
    setTheme(cookie) //make sure there is a cookie in the browser to be grabbed
   } else {
     resetTheme() // reset the theme if no cookies
   }
   console.log(cookie)
 }

// For clearing theme selection from cookies (reset to default)
function clearTheme(name) {
    // Expire the cookie immediately by setting an expiration date in the past
    const expirationDateInThePast = new Date('2000-01-01');
    document.cookie = `${name}=; expires=${expirationDateInThePast.toUTCString()}; path=/;`;
    console.log(document.cookie); // Print the updated cookies to verify
}

// function clearTheme(name) {
//   const clear = document.cookie = `${name}=; expires=Thu, 05 AUG 2022 00:00:00 UTC; path=/;`; //clear cookie by setting time to the past
// console.log(clear)
// }

/* ================================ PHASE 3 ================================ */

// For storing user's display name in cookies
function storeName(displayName) {
const store = document.cookie = `displayName=${encodedURIcomponent(displayName)}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
console.log(store)
}

function getCookieValue(cookieName) {
   const cookies =  document.cookie.split(";");
    for(const cookie of cookies) {
       const [key, value] = cookie.split("=");
      if(key === cookieName) {
return decodeURIComponent(value)
      }
    }
   return null
}

// For restoring user's display name from cookies, if set in the past
function restoreName() {
  const getCookie = getCookieValue("display-name")
  if(getCookie) {
      setInputValue('display-name', getCookie)
  }
};


// For clearing user's display name from cookies
function clearName() {
document.cookie = "disply-name=; expires=thur 01 Jan 1970 00:00:00 UTC; path=/"

}

/* ========================================================================= */
/* ====================== DO NOT EDIT BELOW THIS LINE ====================== */
/* ========================================================================= */

// ===== THEME CONTROL

// For changing one theme button's styling to indicate which theme is selected

function toggleButtonSelection(themeName, selected) {
    const btn = document.getElementById(`theme-button-${themeName}`);
    if (btn) {
        if (selected) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    }
}

// Use a particular theme

function setTheme(themeName) {
    // Clear previous selection so buttons don't get stuck in selected state
    resetTheme()

    // Remember user's selection by storing it in their browser
    storeTheme(themeName);

    // Apply the theme to the page document
    document.documentElement.className = `theme-${themeName}`;

    // Show which button is selected
    toggleButtonSelection(themeName, true);
}

// Use default theme

function resetTheme() {
    // Remove selection styling from all buttons
    toggleButtonSelection('dragon', false);
    toggleButtonSelection('griffin', false);
    toggleButtonSelection('wizard', false);

    // Set default theme so header and footer are contrast colors
    document.documentElement.className = `theme-none`;
}

// For adding event listeners on the theme buttons

function addThemeEventListeners() {
    const themeNames = ['dragon', 'griffin', 'wizard'];
    themeNames.forEach(themeName => {
        const button = document.getElementById(`theme-button-${themeName}`);
        button.addEventListener('click', () => setTheme(themeName));
    });
}

// ===== NAME CONTROL

// For assigning change event to input field

function assignChangeEvent(inputId, handleChange) {
    const input = document.getElementById(inputId);
    if (input) {
        input.addEventListener('input', (event) => {
            handleChange(event.target.value);
        });
    }
}

// For setting value on input field

function setInputValue(inputId, value) {
    const input = document.getElementById(inputId);
    if (input) {
        input.value = value;
    }
}

// For resetting the display name to empty string

function resetName() {
    setInputValue('display-name', '');
}

// ===== CLEAR ALL

// For the clear/reset button

function clearAll() {
    // Remove from browser storage
    clearTheme();
    clearName();

    // Reset the page
    resetTheme();
    resetName();
}

// For adding click event listener on the Clear All button

function addClearAllEventListener() {
    const button = document.getElementById("clear-all");
    button.addEventListener('click', clearAll);
}

// ===== INITIALIZE PAGE

// For setting a theme when the page loads (called by body's onload event)

function initializePage() {
    // Set default theme so header & footer have dark backgrounds
    resetTheme();

    // Restore user's previous theme selection, if it exists
    restoreTheme();

    // Assign event to name input
    assignChangeEvent('display-name', storeName);

    // Restore user's previous name selection, if it exists
    restoreName();

    // Add event listeners
    addThemeEventListeners();
    addClearAllEventListener();
}

window.addEventListener('DOMContentLoaded', initializePage);
