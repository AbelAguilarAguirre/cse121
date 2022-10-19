let monsters = [];
function output(listofmonsters) {
    listofmonsters.forEach(function (monster) {
        let article = document.createElement("article");
        let name = document.createElement("h3");
        name.textContent = monster.name;
        let armorClass = document.createElement("p");
        armorClass.textContent = `Armor Class: ${monster["Armor Class"]}`;
        let hitPoints = document.createElement("p");
        hitPoints.textContent = `Hit Points: ${monster["Hit Points"]}`;
        let challenge = document.createElement("p");
        challenge.textContent = `Challenge Rating: ${monster.Challenge}`;
        article.appendChild(name);
        article.appendChild(armorClass);
        article.appendChild(hitPoints);
        article.appendChild(challenge);
        document.getElementById("monsters").appendChild(article);
    });
}
async function getMonsters() {
    const response = await fetch(
        "https://gist.githubusercontent.com/tkfu/9819e4ac6d529e225e9fc58b358c3479/raw/d4df8804c25a662efc42936db60cfbc0a5b19db8/srd_5e_monsters.json"
    );
    if (response.ok) {
        monsters = await response.json();
        output(monsters);
    }
}

getMonsters();
function reset() {
    let article = document.getElementById("monsters");
    return (article.innerHTML = "");
}

function sortBy() {
    let order = document.getElementById("sortBy").value;
    reset();
    if (order == "NameAscending") {
        let sorted = monsters.sort(function (monster1, monster2) {
            if (monster1.name > monster2.name) return 1;
            else if (monster1.name < monster2.name) return -1;
            else return 0;
        });
        return output(sorted);
    } else if (order == "NameDescending") {
        let sorted = monsters.sort(function (monster1, monster2) {
            if (monster1.name < monster2.name) return 1;
            else if (monster1.name > monster2.name) return -1;
            else return 0;
        });
        return output(sorted);
    } else if (order == "ArmorClassAscending") {
        let sorted = monsters.sort(
            (monster1, monster2) =>
                monster1["Armor Class"].substring(0, 3) -
                monster2["Armor Class"].substring(0, 3)
        );
        return output(sorted);
    } else if (order == "ArmorClassDecending") {
        let sorted = monsters.sort(
            (monster1, monster2) =>
                monster2["Armor Class"].substring(0, 3) -
                monster1["Armor Class"].substring(0, 3)
        );
        return output(sorted);
    } else if (order == "ChallengeAscending") {
        let sorted = monsters.sort(function (monster1, monster2) {
            const index1 = monster1.Challenge.indexOf("(");
            const index2 = monster2.Challenge.indexOf("(");
            return (
                parseInt(monster1.Challenge.valueOf().slice(0, index1)) -
                parseInt(monster2.Challenge.valueOf().slice(0, index2))
            );
        });
        return output(sorted);
    } else if (order == "ChallengeDecending") {
        let sorted = monsters.sort(function (monster1, monster2) {
            const index1 = monster1.Challenge.indexOf("(");
            const index2 = monster2.Challenge.indexOf("(");
            return (
                parseInt(monster2.valueOf().Challenge.slice(0, index2)) -
                parseInt(monster1.valueOf().Challenge.slice(0, index1))
            );
        });
        return output(sorted);
    }
}
const filterBy = () => {
    let ac = document.getElementById("filterBy").value;
    reset();
    if (ac == "All") {
        let filtered = monsters;
        output(filtered);
    } else if (ac == "low") {
        let filtered = monsters.filter((monster) => monster["Armor Class"].substring(0, 3) <= 8);
        output(filtered);
    } else if (ac == "medium") {
        let filtered = monsters.filter((monster) => monster["Armor Class"].substring(0, 3) > 8 && monster["Armor Class"].substring(0, 3) < 16);
        output(filtered);
    } else {
        let filtered = monsters.filter((monster) => monster["Armor Class"].substring(0, 3) > 15);
        output(filtered);
    }
    
};

const sortElement = document.getElementById("sortBy");
sortElement.addEventListener("change", sortBy);
const filterElement = document.getElementById("btnLoad");
filterElement.addEventListener("click", filterBy);
