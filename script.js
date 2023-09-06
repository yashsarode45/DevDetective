const modebtn = document.querySelector(".mode-btn");
const modetitle = document.querySelector(".mode-title");
const modeimage = document.querySelector(".mode-image");
const noresults = document.querySelector(".no-results");
const root = document.documentElement.style;
let mode = "DARK";
const input = document.querySelector(".username");
const searchbtn = document.querySelector(".search-btn");
const url = "https://api.github.com/users/";
const defaultUsername= "yashsarode45";

lightmodeproperties();
fetchData(defaultUsername);
modebtn.addEventListener("click", handlemodeclick);

function handlemodeclick() {
    if (mode==="DARK") {
        darkmodeproperties();
    }
    else{
        lightmodeproperties();
    }
}

function darkmodeproperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    mode="LIGHT";
    modetitle.innerText=`${mode}`;
    modeimage.src= "assets/images/sun-icon.svg"
}

function lightmodeproperties() {
    console.log("lightmodeproperties k andar");
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    mode="DARK";
    modetitle.innerText=`${mode}`;
    modeimage.src= "assets/images/moon-icon.svg"
}
async function fetchData(username){
    console.log("In fetchData");
    try {
        let response = await fetch(url+username);
        let profileData = await response.json();

        if ("message" in profileData) {
        noresults.classList.add("active");
        console.log("username doesn't exist");
        
         } else {
        loadUI(profileData);
        }
    } catch (error) {
        console.log("Error is",error);
    }
    

}

input.addEventListener('keypress', function(event) {
    // Check if the pressed key is Enter (keycode 13)
    if (event.keyCode === 13 && !input.value !== "") {
      // Call your function here
      fetchData(input.value);
    }
  });

searchbtn.addEventListener("click",()=>{
    console.log("the input value is",input.value);
    if(input.value !== ""){
        fetchData(input.value);
    }
})

const profilepic = document.querySelector(".profile-pic"); //src
const profilename = document.querySelector(".profile-name");
const profileusername = document.querySelector(".profile-username"); //href
const profiledate = document.querySelector(".profile-date"); //conversion
const profilebio = document.querySelector(".bio"); // null handling
const profilerepos = document.querySelector(".repos");
const profilefollowers = document.querySelector(".followers");
const profilefollowing = document.querySelector(".following");
const profilelocation = document.querySelector(".location"); // null handling
const profilesite = document.querySelector(".site");// null handling
const profiletwitter = document.querySelector(".twitter");// null handling
const profileinstitute = document.querySelector(".institute");// null handling

function loadUI(data) {
    let datapic = data.avatar_url;
    let dataname = data.name;
    let dataurl = data.html_url;
    let datausername = data.login;
    let datadate= data.created_at;
    let databio = data.bio;
    let datarepos = data.public_repos;
    let datafollowers= data.followers;
    let datafollowing = data.following;
    let datalocation = data.location;
    let datasite= data.blog;
    let datatwitter = data.twitter_username;
    let datainstitute = data.company;
    
    profilepic.src = datapic ;
    profilename.innerText = dataname;
    profileusername.href = dataurl;
    profileusername.innerText = datausername;
    profilerepos.innerText = datarepos;
    profilefollowers.innerText = datafollowers;
    profilefollowing.innerText = datafollowing;

    updateDate(datadate);
    updateBio(databio);
    updateLocation(datalocation);
    updateSite(datasite);
    updateTwitter(datatwitter);
    updateInstitute(datainstitute);
}

function updateDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month= date.substr(5,2);
    let year= date.substr(0,4);
    let dom = date.substr(8,2);
    
    let finalDate = `Joined ${dom} ${months[Number(month)-1]} ${year}`

    profiledate.innerText = finalDate;
}

function updateBio(bio) {
    console.log(bio);
    if (bio===null) {
        profilebio.innerText = "This profile has no bio"
    } else {
        profilebio.innerText = bio;
    }
}

function updateLocation(location) {
    if (location===null) {
        profilelocation.innerText = "Not Available"
    } else {
        profilelocation.innerText = location;
    }
}

function updateSite(site) {
    if (site==="") {
        profilesite.href = "";
        profilesite.innerText = "Not Available";
    } else {
        profilesite.href = site;
        profilesite.innerText = site;
    }
}

function updateTwitter(twitter) {
    if (twitter===null) {
        profiletwitter.innerText = "Not Available"
    } else {
        profiletwitter.href = `https://twitter.com/${twitter}`
        profiletwitter.innerText = twitter;
    }
}

function updateInstitute(institute) {
    if (institute===null) {
        profileinstitute.innerText = "Not Available"
    } else {
        profileinstitute.innerText = institute;
    }
}