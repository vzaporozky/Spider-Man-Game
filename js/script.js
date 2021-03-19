let get = (id) => document.querySelector(id);
let getAll = (id) => document.querySelectorAll(id);

let clickOff = (events, on, off) => {
    for (let event of events) {
        let onclick = event.getAttribute(on);
        event.setAttribute(off, onclick);
        event.removeAttribute(on);
    }
};

let messageShow = (interval, str, newStr = "", calories) => {
    message.innerHTML = str;
    clearTimeout(timerId);

    if (!calories) {
        timerId = setTimeout(() => {
            message.innerHTML = newStr;
        }, Number(interval) * 1000);
    } else if (calories < 500) {
        timerId = setTimeout(() => {
            message.innerHTML = newStr;
        }, Number(interval) * 1000);
    } else {
        timerId = setTimeout(() => {
            message.innerHTML = "";
        }, Number(interval) * 1000);
    }
};

let timerId;
let message = get("#message");

class Human {
    constructor(options) {
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.gender = options.gender;
        this.age = options.age;
        this.calories = options.calories;
    }

    sleepFor() {
        let interval = prompt("Enter the number of seconds for sleeping time");

        if (Number(interval)) {
            let events = getAll("[onclick]");
            clickOff(events, "onclick", "offclick");
            setTimeout(() => {
                clickOff(events, "offclick", "onclick");
            }, Number(interval) * 1000);
            messageShow(Number(interval), "I'm sleeping", "I'm awake up");
        } else alert("Invalid value");
    }

    feed() {
        if (this.calories < 500) {
            this.calories += 200;
            get("#calories > span").innerHTML = this.calories;
            messageShow(10, "Nom nom nom", "I'm still hungry", this.calories);
        } else messageShow(10, "I'm not hungry");
    }
    starving() {
        let calories = get("#calories > span");
        if (this.calories > 199) this.calories -= 200;
        else this.calories = 0;
        calories.innerHTML = this.calories;
    }
}

class Superhero extends Human {
    constructor(options) {
        super(options);
    }
    fly() {
        messageShow(10, "I'm flying");
    }
    fightWithEvil() {
        messageShow(10, "Khhhh-chh... Bang-g-g-g... Evil is defeated!");
    }
}

let person = new Superhero({
    firstName: "Peter ",
    lastName: "Parker",
    calories: 0,
    age: 18,
    gender: "male",

});

let getVal = (target) => {
    let key = target.getAttribute("id"),
        p = get(`#${key}`),
        span = p.querySelector("span"),
        newValue = prompt(`Enter new value`);

    if (newValue && newValue.length < 10) {
        if (typeof person[key] === "number") {
            if (!isNaN(+newValue)) {
                person[key] = newValue;
                span.innerHTML = newValue;
            } else {
                alert("Incorrect input");
                return;
            }
        } else {
            person[key] = newValue;
            span.innerHTML = newValue;
        }
    } else alert("Incorrect input");
};

let propRender = () => {
    let div = document.querySelector("#properties");

    for (const [key, value] of Object.entries(person)) {
        div.insertAdjacentHTML(
            "beforeend",
            `<p class="property" id="${key}" onclick="getVal(this)">${key}: <span class="propValue">${value}</span></p>`
        );
    }
};

let turnToSuperhero = () => {
    if (person.calories > 500) {
        let turn = get("#turn");

        get("#head").setAttribute("src", "./assets/images/2.png");
        if (document.querySelectorAll(".fly-fight").length == 0) {
            turn.insertAdjacentHTML(
                "afterend",
                `<br><button class="fly-fight" onclick="person.fly()">
                Fly</button><button class="fly-fight" 
                onclick="person.fightWithEvil()">Fight with evil</button>`
            );
        }
    } else messageShow(5, "I'm too hungry, feed me");
};

propRender();
setTimeout(() => {
    setTimeout(function run() {
        person.starving();
        setTimeout(run, 60000);
    });
}, 65000);
