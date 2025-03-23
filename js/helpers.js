/**
 * @module helpers
 */

let resetCounter = 0;

// INTRO
const rubrik = document.getElementById("rubrik");
const text = document.getElementById("text");
const startBtn = document.getElementById("startBtn");
const rubrikList = ["Intelligenstest", "Deltest 1 - Tipsfrågor", "Deltest 2 - FizzBuzz", "Deltest 3 - Minne"];
let rubrikCounter = 0;

/**
 * @function intro
 * @description Runs the intro. Welcomes the guest and gives them the option to start the test.
 */
function intro () {
    rubrik.innerHTML = `<h1>${rubrikList[rubrikCounter]}</h1>`;
    text.innerHTML = 'Hej och välkommen till mitt intelligenstest. Jag har skapat ett testverktyg som kan mäta hur intelligent du är. Första delen är ett quiz där du ska svara antingen 1, X eller 2. Under andra delen ska du få testa på att spela FizzBuzz. Den tredje och avslutande delen kommer att sätta ditt minne på prov. Nedan hittar du länken för att starta testet. Lycka till!';
    startBtn.innerHTML = "Starta test";
    startBtn.addEventListener("click", startTest);
    rubrikCounter += 1;
}

// QUIZ
const questionQuiz = document.getElementById("question-quiz");
const moveOnBox = document.getElementById("moveOn-box");
const resultQuizBox = document.getElementById("result-quiz");
const textList = ["Fråga 1 av 5", "Fråga 2 av 5", "Fråga 3 av 5", "Fråga 4 av 5", "Fråga 5 av 5"];
const questionList = ["I vilket land ligger staden Dublin?", "Hur många kort finns det i en Uno-kortlek?", "Vilken populär karaktär heter Fifi Brindacier på franska?", "Vad blir 87 x 17?", 'Vem fällde de bevingade orden "Tärningen är kastad"?'];
const altList = ["1. Tyskland", "X. Irland", "2. Frankrike", "1. 108", "X. 98", "2. 88", "1. Madicken", "X. Ronja Rövardotter", "2. Pippi Långstrump", "1. 1305", "X. 1392", "2. 1479", "1. Julius Caesar", "X. Djingis Khan", "2. William Wallace"];
const answerListQuiz = ["X. Irland", "1. 108", "2. Pippi Långstrump", "2. 1479", "1. Julius Caesar"];
let textCounter = 0;
let questionCounter = 0;
let altCounter = 0;
let quizPoints = 0;
let answerCounter = 0;
let message = "";

/**
 * @function startTest
 * @description Starts the test. Makes the question and alternatives pop up and gives each alternative an eventlistener.
 */
function startTest () {
    startBtn.innerHTML = "";
    document.body.removeChild(moveOnBox);
    document.body.removeChild(resultQuizBox);
    rubrik.innerHTML = `<h1>${rubrikList[rubrikCounter]}</h1>`;
    text.innerHTML = textList[textCounter];
    questionQuiz.innerHTML = questionList[questionCounter];
    const alts = document.querySelectorAll(".alt");
    for (let i = 0; i < alts.length; i++) {
        const element = alts[i];
        element.innerHTML = altList[altCounter];
        element.style.backgroundColor = "transparent";
        element.addEventListener("click", checkAnswerQuiz);
        altCounter += 1;
    }
}

/**
 * @function checkAnswerQuiz
 * @description Checks if the alternative is correct. If so makes the element green otherwise red. Calls the function nextQbtn.
 */
function checkAnswerQuiz (event) {
    const alts = document.querySelectorAll(".alt");
    for (let i = 0; i < alts.length; i++) {
        const element = alts[i];
        element.removeEventListener("click", checkAnswerQuiz);
    }
    if (event.target.innerHTML === answerListQuiz[answerCounter]) {
        event.target.style.backgroundColor = "green";
        message = "Rätt svar! ";
        quizPoints += 3;
    } else {
        event.target.style.backgroundColor = "red";
        message = `Tyvärr fel, rätt svar är ${answerListQuiz[answerCounter]}. `;
    }
    answerCounter += 1;
    nextQbtn(message);
}

/**
 * @function nextQbtn
 * @description A box telling the user if the alternative is correct or not. If it is the last question type out the result and the option to move on to next test. Otherwise keep the quiz rolling.
 * @param {string} message The answer of the question.
*/
function nextQbtn (message) {
    if (textCounter === 4) {
        moveOnBox.removeEventListener("click", startTest);
        moveOnBox.addEventListener("click", fizzBuzzTest);
        moveOnBox.innerHTML = message + "Tryck här för att gå vidare till nästa deltest.";
        moveOnBox.classList.add("border");
        document.body.appendChild(moveOnBox);
        resultQuizBox.innerHTML = `Du lyckades samla ihop ${quizPoints} poäng.`;
        document.body.appendChild(resultQuizBox);
        rubrikCounter += 1;
    } else {
        moveOnBox.innerHTML = message + "Tryck här för att gå vidare.";
        moveOnBox.classList.add("border");
        moveOnBox.addEventListener("click", startTest);
        document.body.appendChild(moveOnBox);
        resultQuizBox.innerHTML = "";
        document.body.appendChild(resultQuizBox);
        textCounter += 1;
        questionCounter += 1;
    }
}

// FIZZBUZZ
const randomNum = getRandomBetween(1, 100);
const seq2 = randomNum + 1;
const seq3 = randomNum + 2;
const seq4 = randomNum + 3;
const seqHidden = randomNum + 4;
const sequence = `${fizzBuzz(randomNum)}, ${fizzBuzz(seq2)}, ${fizzBuzz(seq3)}, ${fizzBuzz(seq4)}, ?`;
const correctAnswer = fizzBuzz(seqHidden);
const stringAnswer = correctAnswer.toString();
const fizzList = ["Fizz", "Buzz", "FizzBuzz", `${randomNum + 4}`];
const protipBox = document.getElementById("protip-box");
const resultFizzBox = document.getElementById("result-fizz");
const memoryIntroBox = document.getElementById("memory-intro");
let fizzCounter = 0;
let fizzPoints = 0;
let fizzMessage = "";

/**
 * @function getRandomBetween
 * @description Randomizing a number between the min and max value.
 * @param {number} min Min value
 * @param {number} max Max value
 * @return {number} The random number
*/
function getRandomBetween (min, max) {
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
}

/**
 * @function fizzBuzz
 * @description Checks if the number can be divided by 3, 5 or 15. If so returns either Fizz, Buzz or FizzBuzz otherwise just returns the number.
 * @param {number} number A number which is based on the random number.
 * @return {number|string} Returns either the number or a string based on what number it can be divided by.
*/
function fizzBuzz (number) {
    if (number % 15 === 0) {
        number = "FizzBuzz";
    } else if (number % 3 === 0) {
        number = "Fizz";
    } else if (number % 5 === 0) {
        number = "Buzz";
    } else {
        return number;
    }
    return number;
}

/**
 * @function fizzBuzzTest
 * @description Makes the FizzBuzz test appear on the screen.
 */
function fizzBuzzTest () {
    resetCounter = 1;
    document.body.removeChild(questionQuiz);
    const alts = document.querySelectorAll(".alt");
    for (let i = 0; i < alts.length; i++) {
        const element = alts[i];
        document.body.removeChild(element);
    }
    document.body.removeChild(moveOnBox);
    document.body.removeChild(resultQuizBox);
    document.body.removeChild(resultFizzBox);
    document.body.removeChild(memoryIntroBox);
    document.body.removeChild(protipBox);
    rubrik.innerHTML = `<h1>${rubrikList[rubrikCounter]}</h1>`;
    text.innerHTML = sequence;
    const fizzBoxes = document.querySelectorAll(".fizz-box");
    for (let i = 0; i < fizzBoxes.length; i++) {
        const element = fizzBoxes[i];
        document.body.appendChild(element);
        element.style.backgroundColor = "transparent";
        element.classList.add("border-fizz");
        element.innerHTML = fizzList[fizzCounter];
        element.addEventListener("click", checkAnswerFizzBuzz);
        fizzCounter += 1;
    }
    protipBox.classList.add("border-tip");
    protipBox.innerHTML = "Tips! Är talet delbart med 3 = Fizz, delbart med 5 = Buzz, delbart med både 3 och 5 = FizzBuzz";
    document.body.appendChild(protipBox);
}

/**
 * @function checkAnswerFizzBuzz
 * @description Checks if the answer is correct or not. If correct the box will turn green otherwise red. User is given their total points and option to move on to next test.
 * @param {element} event The box clicked upon
*/
function checkAnswerFizzBuzz (event) {
    const fizzBoxes = document.querySelectorAll(".fizz-box");
    for (let i = 0; i < fizzBoxes.length; i++) {
        const element = fizzBoxes[i];
        element.removeEventListener("click", checkAnswerFizzBuzz);
    }
    if (event.target.innerHTML === stringAnswer) {
        event.target.style.backgroundColor = "green";
        fizzPoints += 4;
        fizzMessage = `Snyggt! Du fick 4 poäng, totalt har du ${quizPoints + fizzPoints} poäng.`;
    } else {
        event.target.style.backgroundColor = "red";
        fizzMessage = `Tyvärr svarade du fel, totalt har du ${quizPoints + fizzPoints} poäng.`;
    }
    resultFizzBox.innerHTML = fizzMessage;
    memoryIntroBox.classList.add("border");
    memoryIntroBox.style.margin = "unset";
    memoryIntroBox.style.marginTop = "20px";
    memoryIntroBox.innerHTML = "För att gå vidare till nästa test tryck här.";
    memoryIntroBox.addEventListener("click", memoryGameIntro);
    document.body.appendChild(resultFizzBox);
    document.body.appendChild(memoryIntroBox);
    rubrikCounter += 1;
}

// MEMORY
const bodyGrid = document.getElementById("body");
const memoryStartBtn = document.getElementById("test3-box");
const picList = ["dator.jpg", "bil.jpg", "bok.jpg", "hund.jpg", "solros.jpg", "hus.jpg", "katt.jpg", "fotboll.jpg", "glödlampa.jpg"];
const picAnswerList = ["1. Bil", "2. Solros", "3. Katt", "4. Hus", "5. Dator", "6. Fotboll", "7. Hund", "8. Glödlampa", "9. Bok"];
const imgList = ['<img src="images/bil.jpg">', '<img src="images/solros.jpg">', '<img src="images/katt.jpg">', '<img src="images/hus.jpg">', '<img src="images/dator.jpg">', '<img src="images/fotboll.jpg">', '<img src="images/hund.jpg">', '<img src="images/glödlampa.jpg">', '<img src="images/bok.jpg">'];
const maxIQ = 140;
const belowAvgIQ = 90;
const normalIQ = 110;
const highIQ = 130;
let picCounter = 0;
let listCounter = 0;
let memoryPoints = 0;
let imgCounter = 0;
let finalMessage = "";
let totalPoints = 0;
let iqmessage = "";

/**
 * @function memoryGameIntro
 * @description An intro to the memory game. User is given the option to start the test.
*/
function memoryGameIntro () {
    resetCounter = 2;
    document.body.removeChild(resultFizzBox);
    document.body.removeChild(memoryIntroBox);
    document.body.removeChild(protipBox);
    rubrik.innerHTML = `<h1>${rubrikList[rubrikCounter]}</h1>`;
    text.innerHTML = "Du har kommit till det tredje och sista deltestet. Du kommer att få se 9 bilder under 5 sekunder. Under bilderna finns en lista med objekt. Din uppgift blir att följa listan och pricka in rätt bild i rätt ordning. Lyckas du får du 1 poäng per rätt. Tryck på länken nedan för att starta testet.";
    const fizzBoxes = document.querySelectorAll(".fizz-box");
    for (let i = 0; i < fizzBoxes.length; i++) {
        const element = fizzBoxes[i];
        document.body.removeChild(element);
    }
    memoryStartBtn.innerHTML = "Starta deltest 3";
    memoryStartBtn.addEventListener("click", memoryGame);
    document.body.appendChild(memoryStartBtn);
}

/**
 * @function memoryGame
 * @description Makes the memory game appear on screen. The setTimeout-function is called making the pictures disappear after 5 second.
*/
function memoryGame () {
    document.body.removeChild(startBtn);
    document.body.removeChild(rubrik);
    document.body.removeChild(text);
    document.body.removeChild(memoryStartBtn);
    bodyGrid.classList.add("grid");
    for (let i = 0; i < picList.length; i++) {
        const picBox = document.createElement("div");
        picBox.className = "pic-box";
        document.body.appendChild(picBox);
    }
    const picBox = document.querySelectorAll(".pic-box");
    for (let i = 0; i < picBox.length; i++) {
        const element = picBox[i];
        element.classList.add("picture-box");
        element.classList.add("picture-box:hover");
        element.innerHTML = `<img src="images/${picList[picCounter]}">`;
        element.addEventListener("click", checkAnswerMemory);
        picCounter += 1;
    }
    const imgBox = document.querySelectorAll(".pic-box");
    for (let i = 0; i < imgBox.length; i++) {
        const element = imgBox[i];
        window.setTimeout(function () {
            element.classList.add("hide");
        }, 5000);
    }
    for (let i = 0; i < picList.length; i++) {
        const listBox = document.createElement("div");
        listBox.className = "memory-objlist";
        document.body.appendChild(listBox);
    }
    const objects = document.querySelectorAll(".memory-objlist");
    for (let i = 0; i < objects.length; i++) {
        const element = objects[i];
        element.innerHTML = picAnswerList[listCounter];
        document.body.appendChild(element);
        listCounter += 1;
    }
}

/**
 * @function checkAnswerMemory
 * @description Checks if the box clicked is correct. If so appears the picture inside the box and user gets to continue otherwise the game is lost. Calls the function finalResultBox.
 * @param {element} event The box clicked upon.
*/
function checkAnswerMemory (event) {
    event.target.removeEventListener("click", checkAnswerMemory);
    if (event.target.innerHTML === imgList[imgCounter]) {
        event.target.style.contentVisibility = "auto";
        memoryPoints += 1;
        imgCounter += 1;
        if (imgCounter > 8) {
            finalMessage = `Alla rätt! Wow vilket minne! Testet är avslutat och du lyckades samla ihop ${quizPoints + fizzPoints + memoryPoints} poäng av totalt 28. För att se din IQ tryck på länken nedan.`;
            finalResultBox(finalMessage);
        }
    } else {
        const picBox = document.querySelectorAll(".pic-box");
        for (let i = 0; i < picBox.length; i++) {
            const element = picBox[i];
            element.removeEventListener("click", checkAnswerMemory);
        }
        finalMessage = `Tyvärr gissade du fel. Testet är avslutat och du lyckades samla ihop ${quizPoints + fizzPoints + memoryPoints} poäng av totalt 28. För att se din IQ tryck på länken nedan.`;
        finalResultBox(finalMessage);
    }
}

/**
 * @function finalResultBox
 * @description User is given their points and option to see their total IQ.
 * @param {string} message A string based on the outcome of the memory game.
*/
function finalResultBox (message) {
    const resultMemoryBox = document.createElement("div");
    const showIQBox = document.createElement("div");
    resultMemoryBox.setAttribute("id", "result-memory");
    showIQBox.setAttribute("id", "showIQ");
    resultMemoryBox.innerHTML = message;
    showIQBox.classList.add("border");
    showIQBox.innerHTML = "Visa IQ";
    showIQBox.addEventListener("click", getIQ);
    document.body.appendChild(resultMemoryBox);
    document.body.appendChild(showIQBox);
}

/**
 * @function getIQ
 * @description Total IQ is shown and the option to restart the test.
*/
function getIQ () {
    const picBox = document.querySelectorAll(".pic-box");
    for (let i = 0; i < picBox.length; i++) {
        const element = picBox[i];
        document.body.removeChild(element);
    }
    const objects = document.querySelectorAll(".memory-objlist");
    for (let i = 0; i < objects.length; i++) {
        const element = objects[i];
        document.body.removeChild(element);
    }
    const resultMemoryBox = document.getElementById("result-memory");
    const showIQBox = document.getElementById("showIQ");
    document.body.removeChild(resultMemoryBox);
    document.body.removeChild(showIQBox);
    bodyGrid.classList.remove("grid");
    totalPoints = quizPoints + fizzPoints + memoryPoints;
    const theEnd = document.createElement("div");
    const tryAgainBtn = document.createElement("div");
    theEnd.setAttribute("id", "the-end");
    tryAgainBtn.setAttribute("id", "try-again");
    theEnd.innerHTML = calcIQ(totalPoints);
    tryAgainBtn.classList.add("border-tryagain");
    tryAgainBtn.innerHTML = "Börja om";
    tryAgainBtn.addEventListener("click", tryAgain);
    document.body.appendChild(theEnd);
    document.body.appendChild(tryAgainBtn);
}

/**
 * @function calcIQ
 * @description Calculates the IQ with a formula. Returning a message based on IQ.
 * @param {number} score The sum of the points from all the quizes.
 * @return {string} A string containing the IQ and what level that IQ is at.
*/
function calcIQ (score) {
    const iq = (score * 10) / 2;
    if (iq < belowAvgIQ) {
        iqmessage = `IQ ${iq} av maximalt ${maxIQ}. Du ligger under den normala nivån.`;
    } else if (iq >= belowAvgIQ && iq < normalIQ) {
        iqmessage = `IQ ${iq} av maximalt ${maxIQ}. Du ligger på den normala nivån.`;
    } else if (iq >= normalIQ && iq < highIQ) {
        iqmessage = `IQ ${iq} av maximalt ${maxIQ}. Du ligger över den normala nivån.`;
    } else {
        iqmessage = `IQ ${iq} av maximalt ${maxIQ}. Du ligger högt över den normala nivån.`;
    }
    return iqmessage;
}

/**
 * @function tryAgain
 * @description Starts the test all over again by calling the reload-function.
*/
function tryAgain () {
    window.location.reload();
}

// RESET

/**
 * @function anonymous
 * @description The cheat-function giving the user the oppertunity to type window.reset() in console to reset the current test.
 */
window.reset = function () {
    if (resetCounter === 0) {
        moveOnBox.removeEventListener("click", fizzBuzzTest);
        document.body.appendChild(moveOnBox);
        document.body.appendChild(resultQuizBox);
        textCounter = 0;
        questionCounter = 0;
        altCounter = 0;
        quizPoints = 0;
        answerCounter = 0;
        message = "";
        rubrikCounter = 1;
        startTest();
    } else if (resetCounter === 1) {
        document.body.appendChild(questionQuiz);
        const alts = document.querySelectorAll(".alt");
        for (let i = 0; i < alts.length; i++) {
            const element = alts[i];
            document.body.appendChild(element);
        }
        document.body.appendChild(moveOnBox);
        document.body.appendChild(resultQuizBox);
        rubrikCounter = 2;
        fizzPoints = 0;
        fizzCounter = 0;
        fizzBuzzTest();
    } else {
        document.body.appendChild(startBtn);
        document.body.appendChild(rubrik);
        document.body.appendChild(text);
        document.body.appendChild(memoryStartBtn);
        totalPoints = 0;
        memoryPoints = 0;
        imgCounter = 0;
        finalMessage = "";
        picCounter = 0;
        listCounter = 0;
        document.body.appendChild(resultFizzBox);
        document.body.appendChild(memoryIntroBox);
        document.body.appendChild(protipBox);
        const fizzBoxes = document.querySelectorAll(".fizz-box");
        for (let i = 0; i < fizzBoxes.length; i++) {
            const element = fizzBoxes[i];
            document.body.appendChild(element);
        }
        bodyGrid.classList.remove("grid");
        const picBox = document.querySelectorAll(".pic-box");
        for (let i = 0; i < picBox.length; i++) {
            const element = picBox[i];
            document.body.removeChild(element);
        }
        const objects = document.querySelectorAll(".memory-objlist");
        for (let i = 0; i < objects.length; i++) {
            const element = objects[i];
            document.body.removeChild(element);
        }
        const resultMemoryBox = document.getElementById("result-memory");
        const showIQBox = document.getElementById("showIQ");
        document.body.removeChild(resultMemoryBox);
        document.body.removeChild(showIQBox);
        memoryGameIntro();
    }
};

export { intro };
