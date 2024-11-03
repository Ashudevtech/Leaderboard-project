let button = document.querySelector('button');
let fname = document.querySelector('.fname');
let lname = document.querySelector('.lname');
let country = document.querySelector('.country');
let score = document.querySelector('.score');
let container = document.querySelector('.container');
let playerList = [];

button.addEventListener('click', function(e) {
    e.preventDefault();
    if (fname.value == "" || lname.value == "" || score.value == "" || country.value == "") {
        alert("Please fill all fields.");
    } else {
        let player = {
            name: `${fname.value} ${lname.value}`,
            country: country.value,
            date: new Date().toLocaleDateString(),
            score: parseInt(score.value)
        };
        playerList.push(player);
        updateData();
        fname.value = "";
        lname.value = "";
        country.value = "";
        score.value = "";
    }
});

function updateData() {
    if (playerList.length > 0) {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
    container.innerHTML = '';
    playerList.sort((a, b) => b.score - a.score);
    playerList.forEach((item) => {
        const main = document.createElement("div");
        main.className = "player-item";

        const nameDate = document.createElement("div");
        const countryDiv = document.createElement("div");
        const scoreDiv = document.createElement("div");
        const controlsDiv = document.createElement("div");
        controlsDiv.className = "score-controls";

        nameDate.innerText = `${item.name} \n ${item.date}`;
        countryDiv.innerText = item.country;
        scoreDiv.innerText = item.score;

        const del = document.createElement("div");
        del.innerHTML = `<i class="bi bi-trash">🗑️</i>`;
        const inc = document.createElement("div");
        inc.innerText = "+5";
        const dec = document.createElement("div");
        dec.innerText = "-5";

        del.addEventListener('click', function() {
            const index = playerList.indexOf(item);
            if (index !== -1) {
                playerList.splice(index, 1);
            }
            updateData();
        });

        inc.addEventListener('click', function() {
            item.score += 5;
            scoreDiv.innerText = item.score;
            updateData();
        });

        dec.addEventListener('click', function() {
            if (item.score > 5) {
                item.score -= 5;
                scoreDiv.innerText = item.score;
                updateData();
            } else {
                alert("Score cannot be negative.");
            }
        });

        controlsDiv.appendChild(del);
        controlsDiv.appendChild(dec);
        controlsDiv.appendChild(inc);
        main.appendChild(nameDate);
        main.appendChild(countryDiv);
        main.appendChild(scoreDiv);
        main.appendChild(controlsDiv);
        container.appendChild(main);
    });
}
