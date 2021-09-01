const fetch = require("node-fetch");

const getPlayers = async () => {
    try {
        const response = await fetch('https://mach-eight.uc.r.appspot.com/');
        const players = await response.json();

        return players.values;
    } catch(error) {
        console.log(error.message);
    }
}

const calculatePlayerHeights = async (target) => {
    try {
        const playersData = await getPlayers();

        let resultArray = [];
    
        playersData.forEach(firstPlayer => {
            playersData.forEach(secondPlayer => {
                if (secondPlayer !== firstPlayer) {
                    
                    const playerHeightA = parseInt(firstPlayer.h_in);
                    const playerHeightB = parseInt(secondPlayer.h_in);

                    let sumOfPairs = playerHeightA + playerHeightB;
                    if (sumOfPairs === target) {
                        const string = [`${firstPlayer.first_name} ${firstPlayer.last_name}`, `${secondPlayer.first_name} ${secondPlayer.last_name}`].sort().join(' / ');
                        if (!resultArray.includes(string)) {
                            resultArray.push(string);
                        }
                    }
                }
            });
        });

        return resultArray;
    } catch(error) {
        console.log(error.message);
    }
}

calculatePlayerHeights(171)
.then(response => {
    if(response.length < 1) {
        console.log('No matches found');
    } else {
        console.log(response);
    }
}).catch(error => {
    console.log(error);
});
