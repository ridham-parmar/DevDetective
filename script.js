const get = function (param) {
    return document.getElementById(param) ;  //document.getElementById(`${parameter}`)
};

const url = "https://api.github.com/users/" ;
// console.log(url + "ridham2303") ;

let inputUserName = get("input") ;

inputUserName.addEventListener('keydown' , function(e) {
    if(e.key === "Enter") {
        if(inputUserName.value !== "" && inputUserName.value !== null) {
            fetchUserData(inputUserName.value) ;
            inputUserName.value = "" ;
        }
    }
});

let submitUserName = get("submit") ;

submitUserName.addEventListener('click', function() {
    if(inputUserName.value !== "" && inputUserName.value !== null) {
        fetchUserData(inputUserName.value) ;
        inputUserName.value = "" ;    
    }
});

let profileContent = document.querySelector(".profile-content") ;
let profileHidden = get("profile-hidden") ;

let darkMode = "false" ;

async function fetchUserData(userName) {
    // console.log(url + userName) ;
    let response = await fetch(url + userName) ;
    // console.log(true);
    let data = await response.json() ;
    // console.log(data) ;
    renderData(data) ;
}

// fetching data to show on UI
let profilePic = get("avatar") ;
let userName = get("name") ;
let userId = get("user") ;
let date = get("date") ;
let bio = get("bio") ;
let repos = get("repos") ;
let followers = get("followers") ;
let following = get("following") ;
let userLocation = get("location") ;
let page = get("page") ;
let twitter = get("twitter") ;
let company = get("company") ;

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let bottomIcon4 = document.querySelector('.bottom-icon-4') ;


function renderData(userData) {
    
    if(userData?.message === "Not Found") {
        profileHidden.classList.add("add") ;
        profileContent.classList.add("not-found") ;
       
    } else {
        profileHidden.classList.remove("add") ;
        profileContent.classList.remove("not-found") ;
        // setting opacity of location, link, company, twitter if they are null
        function reduceOpacity(param1, param2) {
            if(param2 == "" || param2 == null) {
                param1.previousElementSibling.style.opacity = 0.5;
                param1.style.opacity = 0.5;
                return false ;
            } else {
                param1.previousElementSibling.style.opacity = 1;
                param1.style.opacity = 1;
                return true;
            }
        }

        profilePic.src = userData?.avatar_url ;
        userName.innerText = userData?.name == null ? userData?.login : userData?.name;
        userId.href = `https://github.com/${userData?.login}`
        userId.innerText = `@${userData?.login}` ;
        dateAttribute = userData?.created_at.split("-") ;
        // console.log(dateAttribute) ;
        let day = dateAttribute[2].split("T") ;
        // console.log(day) ;
        date.innerText = `Joined ${day[0]} ${months[dateAttribute[1] - 1]} ${dateAttribute[0]}` ;
        bio.innerText = userData?.bio == null ? "This profile has no bio" : userData?.bio;
        repos.innerText = userData?.public_repos ;
        followers.innerText = userData?.followers ;
        following.innerText = userData?.following ;
        userLocation.innerText = reduceOpacity(userLocation, userData?.location) ? userData?.location : "Not Available" ;
        page.innerText = reduceOpacity(page, userData?.blog) ? userData?.blog :  "Not Available" ;
        page.href = ((userData?.blog) == "") ? "Not Available" : `https://${userData?.blog}` ;
        twitter.innerText = reduceOpacity(twitter, userData?.twitter_username) ? userData?.twitter_username : "Not Available";
        twitter.href = (userData?.twitter_username == null) ? "Not Available" :`https://twitter.com/${userData?.twitter_username}` ;
        company.innerText = reduceOpacity(company,userData?.company) ? userData?.company : "Not Available";
        
        
        
        if(userData?.company == "" || userData?.company == null) {
            bottomIcon4.classList.remove('profile-info-comp') ;
        } else {
            bottomIcon4.classList.add('profile-info-comp') ;
        }
    }
}

let themeButton = get('btn-mode') ;
let themeText = get('mode-text') ;
let modeIcon = get('mode-icon') ;

themeButton.addEventListener('click', function() {
    
    if(darkMode == "false") {
        darkModeProperties() ;
    } else {
        lightModeProperties() ;
    }
});

const root = document.documentElement.style;

// activating dark mode 
function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    // root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    themeText.innerText = "LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = "true";
    localStorage.setItem("dark-mode", "true"); 
}

// activating light mode
function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    // root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    themeText.innerText = "DARK";
    modeIcon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = "false";
    localStorage.setItem("dark-mode", "false");
}

initializeData() ;

function initializeData() {
    let name = "thepranaygupta" ;
    fetchUserData(name) ;

    // checking if dark mode is activate or not
    if(localStorage.getItem("dark-mode") == "true") {
        darkModeProperties() ;
    } else {
        lightModeProperties() ;
    }

}


