let crypto = require('crypto');

let live1xBetdata = () => {
    let data = []
    let divs = [...document.querySelectorAll('.c-events__item_game')]

    for (let div of divs) {
        let team1 = div.children[0].children[0].children[0].children[1].firstChild.children[0].firstChild.innerText;
        let team2 = div.children[0].children[0].children[0].children[1].firstChild.children[1].firstChild.innerText;
        let time = div.children[0].children[0].children[1].children[0].children[1].children[0].innerText;
        let w1 = div.children[1].children[0].firstChild.innerText;
        let x = div.children[1].children[1].firstChild.innerText;
        let w2 = div.children[1].children[2].firstChild.innerText;

        let gameInfo = { team1, team2, time, w1, x, w2}
        
        data = [...data, gameInfo]
    }

    return data;
}

let upcoming1xBetData = () => {
    let data = []
    let divs = [...document.querySelectorAll('.c-events__item_game')]

    for(let div of divs){
        let team1 = div.children[3].firstChild.children[0].innerText;
        let team2 = div.children[3].firstChild.children[1].innerText;
        let w1 = div.children[5].children[0].firstChild.innerText;
        let x = div.children[5].children[1].firstChild.innerText;
        let w2 = div.children[5].children[2].firstChild.innerText;

        let gameInfo = { team1, team2, w1, x, w2 }

        data = [...data, gameInfo]
    }

    return data;
}

let upcoming22BetData = () => {
    let data = ['data']
    let divs = [...document.querySelectorAll('.c-events__item_col')]
    console.log(divs)
    
    for (let div of divs) {
        let team1 = div.firstChild.children[1].firstChild.children[0].innerText;
        let team2 = div.firstChild.children[1].firstChild.children[1].innerText;
        let w1 = div.firstChild.children[4].children[0].firstChild.innerText;
        let x = div.firstChild.children[4].children[1].firstChild.innerText;
        let w2 = div.firstChild.children[4].children[2].firstChild.innerText;
        let time = div.firstChild.children[0].firstChild.innerText.split(' ');

        let id = crypto.randomUUID();

        let gameInfo = { team1, team2, w1, x, w2, id, time : { date : time[0], starts : time[1] } }

        data = [...data, gameInfo]
    }
    return divs;
}

let live22BetData = () => {
    let data = [];
    let divs = [...document.querySelectorAll('.c-events__item_col')]

    for (let div of divs) {
        let team1 = div.firstChild.children[1].firstChild.children[0].innerText;
        let team2 = div.firstChild.children[1].firstChild.children[1].innerText;
        let score1 = div.firstChild.children[2].children[0].children[1].innerText;
        let score2 = div.firstChild.children[2].children[0].children[2].innerText;
        let time = div.firstChild.children[0].children[0].innerText;
        let w1 = div.firstChild.children[4].children[0].firstChild.innerText;
        let x = div.firstChild.children[4].children[1].firstChild.innerText;
        let w2 = div.firstChild.children[4].children[2].firstChild.innerText;

        let id = crypto.randomUUID();

        let gameInfo = { team1, team2, scores : [score1, score2], w1, x, w2, id, time : { current : (time ? time : '00:00') } }
        data = [...data, gameInfo]
    }
    return data;
}

module.exports = {
    live1xBetdata,
    upcoming1xBetData,
    upcoming22BetData,
    live22BetData,
}