
function setNumTeams()
{
  let num_teams = parseInt(sessionStorage.getItem('numTeams'));
  if(num_teams) document.getElementById("inputNumTeams").value = num_teams;
}

function showPlayerNames(num_teams, mode)
{
  // 差が最小となる組み合わせ
  let teams = { 1: ["Alice", "Dave", "Grace"], 2: ["Bob", "Ellen", "Heidi"], 3: ["Carol", "Frank"] };
  // DBにnum_teams投げて、teamsを受け取る
  let team_area  = document.getElementById("team_area" + mode);
  team_area.textContent = '';
  for(let team in teams)
  {
    team_area.insertAdjacentHTML('beforeend', "<h4>Team " + team + "</h4>");
    for(let name in teams[team])
    {
      team_area.insertAdjacentHTML('beforeend', teams[team][name]);
      team_area.insertAdjacentHTML('beforeend', '<br>');
    }
  }
  sessionStorage.setItem('numTeams', num_teams);
  sessionStorage.setItem('groupingMode', mode);
  sessionStorage.setItem('teamsList', JSON.stringify(teams));
}

function getModeSelected()
{
  let tab_list = document.getElementsByName("tab_name");
  mode = Array.from(tab_list).filter( tab => tab.checked)[0].id;

  return mode.replace("tab", '');
}

function applyTeam()
{
  let num_teams = parseInt(document.getElementById("inputNumTeams").value);
  let num_players = parseInt(sessionStorage.getItem('numPlayers'));
  mode = getModeSelected();

  if(0 < num_teams && num_teams <= num_players)
  {
    showPlayerNames(num_teams, mode)
    return true;
  }
  else
  {
    return false;
  }
}

function isChanged()
{
  let current_num_teams = parseInt(document.getElementById("inputNumTeams").value);
  let current_mode = getModeSelected();

  let num_teams = parseInt(sessionStorage.getItem('numTeams'));
  let mode = parseInt(sessionStorage.getItem('groupingMode'));

  return current_num_teams != num_teams || current_mode != mode;
}

function gameStart()
{
  if(isChanged())
  {
    applyTeam();
  }
  else
  {
    jump("./main.html");
  }
}

