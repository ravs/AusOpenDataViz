var data = require('./AUSOpenMatches.json');
var fs = require('fs');
//console.log(data);
for (var year=2004;year<2015;year++){

	var players = [];
	for(var i = 0; i<data.length; i++) {
		if (data[i].year === year) {
			if (players.indexOf(data[i].player1) == -1) {
				players.push(data[i].player1);
			}
			if (players.indexOf(data[i].player2) == -1) {
				players.push(data[i].player2);
			}
		}
	}
	//console.log(players.length);
	var playerStats = [];
	var playerWinStat = [];
	var types = ["WinEvent", "ErrorEvent", "DoubleEvent", "AceEvent"];
	for (var i = 0; i<players.length; i++) {
		var obj = {"name":players[i], "totalMatch": 0, "totalPoint": 0, 
					"winners": 0, "errors": 0, "aces": 0, 
					"doubles": 0, "wins": 0};
		for (var j = 0;j<data.length; j++) {
			if (data[j].year === year) {
				if (players[i] === data[j].player1) {
					obj.totalMatch += 1;
					obj.totalPoint += data[j].total1;
					obj.winners += data[j].winner1;
					obj.errors += data[j].error1;
					obj.aces += data[j].ace1;
					obj.doubles += data[j].double1;
				}
				if (players[i] === data[j].player2) {
					obj.totalMatch += 1;
					obj.totalPoint += data[j].total2;
					obj.winners += data[j].winner2;
					obj.errors += data[j].error2;
					obj.aces += data[j].ace2;
					obj.doubles += data[j].double2;
				}
				if (players[i] === data[j].winner) {
					obj.wins += 1;
				}
			}
		}
		var name = obj.name.split(" ");
		for (var k = 0; k<types.length; k++) {
			var stat_rows = {"player_name": name[name.length-1], "type": "", 
								"matches": obj.totalMatch, "events": 0 };
			switch (types[k]) {
				case "WinEvent":
					stat_rows.type = "WinEvent";
					stat_rows.events = obj.winners;
				break;
				case "ErrorEvent":
					stat_rows.type = "ErrorEvent";
					stat_rows.events = obj.errors;
				break;
				case "DoubleEvent":
					stat_rows.type = "DoubleEvent";
					stat_rows.events = obj.doubles;
				break;
				case "AceEvent":
					stat_rows.type = "AceEvent";
					stat_rows.events = obj.aces;
				break;
				default:
					console.error("Invalid type!!");
				break;
			}
			playerStats.push(stat_rows);
		}
		playerWinStat.push({"round": obj.wins, "player_name": name[name.length-1]});
	}

	//console.log(JSON.stringify(playerWinStat));
	//console.log(JSON.stringify(playerStats));

	var fileName1 = "AUSOpen" + year + ".json";
	var fileName2 = "PlayerStat" + year + ".json";
	var data1 = JSON.stringify(playerStats);
	var data2 = JSON.stringify(playerWinStat);
	fs.writeFileSync(fileName1, data1);
	fs.writeFileSync(fileName2, data2);
}