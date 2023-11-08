//Reference Type of redact option picked
let preset = document.getElementById("preset");
//Reference User redact sign
let userPresetWord = document.getElementById("userRedactWord");

/** Keeping Track of redact sign state  
 for predefined/user redact sign
**/
let isPreset = false;
let isUserPreset = false;

//When u click on preset button
preset.addEventListener("click", () => {
    isPreset = true;
    isUserPreset = false;

    let redactPreset = document.getElementById("redactWord");

    let userPreset = document.getElementById("userPreset");

    //Hide/Show predefined/type word button and inputs
    redactPreset.style.display = "block";
    userPreset.style.display = "none";
    userPresetWord.style.display = "block";
    preset.style.display = "none";
});

//When u click on type word button
userPresetWord.addEventListener("click", () => {
    isPreset = false;
    isUserPreset = true;

    let redactPreset = document.getElementById("redactWord");

    //Hide/Show predefined/type word button and inputs
    userPreset.style.display = "block";
    redactPreset.style.display = "none";
    preset.style.display = "block";
    userPresetWord.style.display = "none";
});

////////////////////////////////////////

//Reference to user content
let userContent = document.getElementById("userWords");

//Reference to words to be redacted fro user content
let userRedactWords = document.getElementById("wordsToRedact");

//Reference to predefined presect sign
let predefinedPreset = document.getElementById("redactWord");

//Reference to user presect sign
let userPreset = document.getElementById("userPreset");

//predefined redact sign
let redactSign = predefinedPreset.value;

//user redact sign
let presetRedactSign = userPreset.value;

//Reference to store scrambled words
let userWordsNew;

//Reference to operation status title
let operationTitle = document.getElementById("operationTitle");

//Reference to predefined scrambled sign selection
let redactPreset = document.getElementById("redactWord");

/**
 * Function returning the scrambled
 * sign or scramble input of user
 * */
function scrambledSign() {
    //
    if (isPreset) {
        return redactPreset.value;
    } else if (isUserPreset) {
        return userPreset.value;
    } else {
        return redactPreset.value;
    }
}

//Function performing the scrambling
function redact() {
    //Record the start time of the operation
    const startTime = performance.now();

    //User Content
    let userWords = userContent.value;

    //Trimming and sanitizing user input for operation
    userWords.trim().replace(/\s+/g, " ");

    //Storing words to be scrambled
    let userRedact = userRedactWords.value;

    //Reference to scanned characters message
    let scannedCharac = document.getElementById("characters");

    //Trimming and sanitizing user words for operation
    let numOfCharac = userWords.trim().split(" ").join("");

    //Display the number of characters in the user words
    scannedCharac.textContent = `Scanned ${numOfCharac.length} Characters`;

    //Trimming and splitting words to be scrambled
    let userRedactSplit = userRedact.trim().split(" ");

    //Creating regex pattern for words to be scrambled
    let regexMatch = userRedactSplit.join("|");

    //Regex pattern to be used
    let pattern = `\\b(${regexMatch})\\b`;

    // console.log(pattern);

    //create a regex expression instance
    let regex = new RegExp(pattern, "g");

    //Check for words that match words to be scrambled
    let result = userWords.match(regex);

    /** Trimming and splitting user words for checking amount of
     * words in the user words **/
    let numOfScannedWord = userWords.trim().split(" ");

    //Reference to scanned words message
    let scannedWords = document.getElementById("words");

    //Display num of words in user words
    scannedWords.textContent = `Scanned ${numOfScannedWord.length} Words`;

    //If there is a match and the user pasted word to be scrambled
    if (result && userContent.value) {
        let resultStat = document.getElementById("resultStats");
        resultStat.style.display = "flex";

        let scrambledWords = document.getElementById("scramWords");

        //Display number of scrambled words
        scrambledWords.textContent = `Scrambled ${result.length} words`;
        userWordsNew = userWords.replace(regex, scrambledSign());

        //Reassign user words with the new word scrambled
        userContent.value = userWordsNew;

        //Change operation title
        operationTitle.textContent = "SCRAMBLED SUCCESSFULLY";

        noWord.style.display = "none";
    } else {
        //Display message to paste word
        let noWord = document.getElementById("noWord");
        noWord.style.display = "block";

        //Don't display copy icon
        let copy = document.getElementById("copy");
        copy.style.display = "none";

        //Don't display stats
        let resultStat = document.getElementById("resultStats");
        resultStat.style.display = "none";

        console.log("No Words Found");
    }

    //Store end time of operation
    const endTime = performance.now();

    //Format time to seconds
    const timeTaken = (endTime - startTime) / 1000;

    let operationTime = document.getElementById("time");
    //Display the operation time
    operationTime.textContent = `Time taken: ${timeTaken} seconds`;
}

//redact button
document.getElementById("redactButton").addEventListener("click", () => {
    //If there is no content the user pasted
    if (userContent.value === " ") {
        //Display message
        let title = document.getElementById("operationTitle");
        title.textContent = "Please Paste A Word";

        //Don't display
        let copy = document.getElementById("copy");
        copy.style.display = "none";

        let copied = document.getElementById("copied");
        copied.style.display = "none";

        console.log("NOW WORDS");
    } else {
        //show copy icon
        let copy = document.getElementById("copy");
        copy.style.display = "block";

        //perform operation scrambling operation
        redact();

        //Switch button to reset
        document.getElementById("redactButton").style.display = "none";
        document.getElementById("resetButton").style.display = "flex";
    }
});

//Reset Button
document.getElementById("resetButton").addEventListener("click", () => {
    //Don't display copy message
    let copy = document.getElementById("copy");
    copy.style.display = "none";
    //Don't display copied message
    let copied = document.getElementById("copied");
    copied.style.display = "none";

    //Reset text areas
    userContent.value = " ";
    userRedactWords.value = " ";

    let resultStat = document.getElementById("resultStats");
    resultStat.style.display = "none";

    operationTitle.textContent = "PASTE YOUR WORDS";

    //Reset scrambled sign state
    isPreset = false;
    isUserPreset = false;

    let redactPreset = document.getElementById("redactWord");

    let userPreset = document.getElementById("userPreset");

    redactPreset.style.display = "none";
    userPreset.style.display = "none";

    preset.style.display = "block";
    userPresetWord.style.display = "block";

    //switch button
    document.getElementById("redactButton").style.display = "flex";
    document.getElementById("resetButton").style.display = "none";
});