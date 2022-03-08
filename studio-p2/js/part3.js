const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),

    text3: document.getElementById("text3"),
    text4: document.getElementById("text4"),

    text5: document.getElementById("text5"),
    text6: document.getElementById("text6")
};

const texts = [
    "O",
    "sorrow,",
    "cruel",
    "fellowship,",
    "O",
    "priestess",
    "in the",
    "vaults of ",
    "Death," ,

    "O",
    "sweet ",
    "and ",
    "bitter ",
    "in a",
    "breath,",
    "What",
    "whispers ",
    "from thy",
    "lying ",
    "lip?" ,


];


const texts2 = [
    "The ",
    "stars,,",
    "she ",
    "whispers,",
    "'blindly ",
    " run;",
    "A web",
    "is wov'n",
    "across",
    "the sky; ",
    
    "From," ,
    "out",
    "waste,",
    "places",
    "comes,",
    "a cry,",
    "And",
    "murmurs ",
    "from the ",
    "dying," ,
    "sun," ,

];

const texts3 = [
    "And ",
    " all",
    "the ",
    "phantom,",
    "Nature,",
    "stands-",
    "With ",
    "all",
    "the",
    "music ",
    "in her ",
    "tone," ,
    "A ",
    "hollow",
    "echo,",
    "of-",
    "my",
    "own,-",
    "A ",
    "hollow,",
    "form",
    "with",
    "empty ",
    "hands.",

    "And ",
    " shall",
    "I ",
    "take,",
    "a,",
    "thing",
    "so ",
    "blind,",
    "Embrace",
    "her ",
    "as ",
    "my" ,
    "natural",
    "good;",
    "Or",
    "crush",
    "her,",
    "like",
    "a",
    "vice",
    "of",
    "blood,",
    "Upon ",
    "the",
    "threshold,",
    "of ",
    "the",
    "mind?",
];


const morphTime = 0.75;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];


elts.text3.textContent = texts2[textIndex % texts.length];
elts.text4.textContent = texts2[(textIndex + 1) % texts.length];


elts.text5.textContent = texts3[textIndex % texts.length];
elts.text6.textContent = texts3[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];



    elts.text4.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text4.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text3.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text3.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text3.textContent = texts2[textIndex % texts.length];
    elts.text4.textContent = texts2[(textIndex + 1) % texts.length];



    elts.text6.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text6.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text5.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text5.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text5.textContent = texts3[textIndex % texts.length];
    elts.text6.textContent = texts3[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";


    elts.text4.style.filter = "";
    elts.text4.style.opacity = "100%";

    elts.text3.style.filter = "";
    elts.text3.style.opacity = "0%";


    elts.text6.style.filter = "";
    elts.text6.style.opacity = "100%";

    elts.text5.style.filter = "";
    elts.text5.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

animate();
