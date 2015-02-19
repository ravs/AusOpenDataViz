d3.csv("data/player2009.csv",function(d){
			
	d["Round"]= d["Round"];
	d["name_lc"]=d["Name"].toLowerCase();

	return d;

},function(data){

	var players={};
	data.forEach(function(lang){
		players[lang["name_lc"]]=lang["Round"];
	});

	var unknonw=[];

	d3.csv("data/AUS2009.csv",function(q){
		
		q.matches=q.matches;
		q.events=q.events;
		
		if(!players[q.player_name.toLowerCase()]) {
			if(unknonw.indexOf(q.player_name.toLowerCase())==-1) {
				unknonw.push(q.player_name.toLowerCase());
			}
		}
		
		q.round=players[q.player_name.toLowerCase()] || 1;

		return q;
	},function(data){

		var events={};
		data.forEach(function(d){

			if(!events[d["player_name"]]) {
				events[d["player_name"]]={
						player_name:d["player_name"]
				};
			}
			switch(d["type"]) {
				case "WinEvent":
					events[d["player_name"]]["MatchesPlayed"]=d["matches"];
					events[d["player_name"]]["TotalPointsWon"]=d["events"];
					events[d["player_name"]][d["type"]]=d["events"]/d["matches"];
				break;
				default:
					events[d["player_name"]][d["type"]]=d["events"]/d["matches"];
				break;
			}
			
			events[d["player_name"]].round=d.round;
			
		});
		
		pc=new ParallelCoordinates(d3.values(events),{
			programming_languages:players,
			container:"#pc",
			scale:"linear",
			columns:["name","MatchesPlayed","TotalPointsWon","WinEvent","ErrorEvent","DoubleEvent","AceEvent","round"],
			title_column:"name",
			scale_map:{
				"round":"linear",
				"name":"ordinal",
				"WinEvent":"ordinal",
				"TotalPointsWon":"ordinal",
				"MatchesPlayed":"ordinal",
				"ErrorEvent":"ordinal",
				"AceEvent":"ordinal",
				"DoubleEvent":"ordinal"
			},
			use:{
				"name":"TotalPointsWon"
			},
			sorting:{
				"name":d3.descending
			},
			formats:{
				"round":"d"
			},
			dimensions:["MatchesPlayed","TotalPointsWon","WinEvent","ErrorEvent","AceEvent","DoubleEvent","round","name"],
			column_map:{
				"name":["Player","Name"],
				"WinEvent":["Win per","Match"],
				"TotalPointsWon":["Total Points","Won"],
				"MatchesPlayed":["Matches","Played"],
				"round":["Matches","Won"],
				"ErrorEvent":["Error per","Match"],
				"AceEvent":["Aces per","Match"],
				"DoubleEvent":["Double Fault","per Match"]
			},
			help:{
				"name":"<h4>Player Name</h4>Top performering players in a given year in AUS Open<br/>(Ordered by total points won).",
				"TotalPointsWon":"<h4>Total Points Won</h4>Total number of points won by the player in this AUS Open.",
				"MatchesPlayed":"<h4>Total Matches Played</h4>Number of matches played by the player in this AUS Open.",
				"WinEvent":"<h4>Points Won per Match</h4>Average number of points won by the player this AUS Open.",
				"round":"<h4>Matches Won</h4>Number of matches won, or, till which round the player progressed in this AUS Open.",
				"ErrorEvent":"<h4>Error per Match</h4>Average number of Error committed by the player in this AUS Open.",
				"AceEvent":"<h4>Aces per Match</h4>Average number of Aces served by the player in this AUS Open.",
				"DoubleEvent":"<h4>Double Faults per Match</h4>Average number of Double Faults committed by the player in this AUS Open."
			},
			duration:1000,
			path:"./",
			extension:"csv"
		});
	});
});