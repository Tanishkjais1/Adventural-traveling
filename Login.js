import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

let username = document.querySelector("#username");
let password = document.querySelector("#password")
async function fetchURL() {
    try {
        let res = await fetch("https://adventure-travels-json-server.onrender.com/register");
        let data = await res.json();
        console.log(data);
        let result = checkuser(data)
        if (result) {
            Swal.fire({
                icon: 'success',
                text: `LOGIN IS SUCCESSFUL`,
            })

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'ENTER CURRECT CREDIENCIAL',
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

let username1 = JSON.parse(localStorage.getItem("username")) || "";
function checkuser(user) {
    for (let i = 0; i < user.length; i++) {
        if (user[i].username === username.value && user[i].password === password.value) {
            if (username.value === "admin" && password.value === "admin") {
                window.location.href = "./../adminuser.html";
            }
            let user = username.value
            localStorage.setItem("username", JSON.stringify(user));
            signout(user);
            return true;
        }
    }
    return false;
}

let proceed = document.querySelector(".process");
proceed.addEventListener("click", (el) => {
    el.preventDefault();
    fetchURL();

})

let loginuser = document.querySelector(".username")
let sign_out = document.querySelector(".sign-out");
function signout(user) {
    if (user.length == 0) {
        console.log(username1.length, "#");
        loginuser.innerHTML = "Login";
        sign_out.innerHTML = "";
        loginuser.addEventListener("click", () => { window.location.href = "./../../Sign-In/Login.html" });
    } else {
        console.log(username1, "@");
        loginuser.innerHTML = (user.toUpperCase());
        sign_out.innerHTML = "Sign-out";
    }
}
signout(username1)

sign_out.addEventListener("click", () => {
    let user = "";
    localStorage.setItem("username", JSON.stringify(user));
    signout(user)
})

const toggleBtn = document.querySelector(".toggle_btn");
const toggleBtnIcon = document.querySelector(".toggle_btn i");
const dropDownMenu = document.querySelector(".dropdown_menu");

const scrollTracker = document.querySelector(".scroll-tracker");

const scrollTrackingTimeline = new ScrollTimeline({
    source: document.scrollingElement,
    orientation: "block",
    scrollOffsets: [CSS.percent(0), CSS.percent(100)],
});

scrollTracker.animate(
    {
        transform: ["scaleX(0)", "scaleX(1)"],
    },
    {
        duration: 1,
        timeline: scrollTrackingTimeline,
    }
);

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}