let copy = document.getElementById("copy");

let userPost = document.getElementById("userWords");

let copied = document.getElementById("copied");

copy.addEventListener("click", () => {
    copied.style.display = "block";

    setTimeout(() => {
        copied.style.display = "none";
    }, 3000);

    userPost.select();
    //copy new words
    navigator.clipboard.writeText(userPost.value);
});