
function setNumTeams()
{
  let num_teams = parseInt(sessionStorage.getItem('numTeams'));
  if(num_teams) document.getElementById("inputNumTeams").value = num_teams;
}

function createNameStr(name, mode)
{
  let rtn = "";

  if(mode != 3)
  {
    rtn += name;
    rtn += '<br>';
    return rtn;
  }
  else
  {
    rtn += '<li class="ui-state-default">';
    rtn += name;
    rtn += '</li>';
  }

  return rtn;
}

function getTeamsFromDB(num_teams, mode)
{
  // DBにnum_teams投げて、teamsを受け取る 差が最小となる組合わせ
  return { 0: ["Alice", "Dave", "Grace"], 1: ["Bob", "Ellen", "Heidi"], 2: ["Carol", "Frank"] };
}

function showPlayerNames(num_teams, mode)
{
  if(mode == 3 && !isChanged())
  {
    return;
  }
  let teams = getTeamsFromDB(num_teams, mode);
  let team_area  = document.getElementById("team_area" + mode);
  team_area.textContent = '';

  let insert_str = "";
  for(let team in teams)
  {
    insert_str += "<h4>Team " + (parseInt(team) + 1) + "</h4>";
    insert_str += '<ul class="jquery-ui-sortable">';
    for(let name in teams[team])
    {
      insert_str += createNameStr(teams[team][name], mode);
    }
    insert_str += '</ul>';
  }
  insert_str += '<div style="clear: both;"></div>';
  team_area.insertAdjacentHTML('beforeend', insert_str);

  if(mode == 3)
  {
    $( '.jquery-ui-sortable' ) . sortable( {
      connectWith: '.jquery-ui-sortable',
      axis: "y",
      cursor: 'move',
      opacity: 0.6,
      placeholder: 'ui-state-highlight',
    } );
    $( '.jquery-ui-sortable' ) . disableSelection();
  }
  sessionStorage.setItem('numTeams', num_teams);
  sessionStorage.setItem('groupingMode', mode);
  sessionStorage.setItem('teamsList', JSON.stringify(teams));
}

function setTeamWithManual(num_teams, mode, teams)
{
}

function getModeSelected()
{
  let tab_list = document.getElementsByName("tab_name");
  mode = Array.from(tab_list).filter( tab => tab.checked)[0].id;

  return mode.replace("tab", '');
}

function applyTeam()
{
  let input_num_teams = document.getElementById("inputNumTeams");
  let num_teams = parseInt(input_num_teams.value);
  let num_players = parseInt(sessionStorage.getItem('numPlayers'));
  mode = getModeSelected();

  if(0 < num_teams && num_teams <= num_players)
  {
    showPlayerNames(num_teams, mode)
    return true;
  }
  else
  {
    input_num_teams.max = num_players;
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
    let flag_zero = false;
    let current_mode = getModeSelected();
    if(current_mode == 3)
    {
      let area_manual = document.getElementById("team_area3");
      let ulist = area_manual.getElementsByTagName("ul");

      let teams = {};
      Array.prototype.forEach.call(ulist, function(elem, idx) {
        teams[idx] = [];
        Array.prototype.forEach.call(elem.childNodes, function(name){
          teams[idx].push(name.textContent);
        });
        if(!teams[idx].length)
        {
          flag_zero = true;
        }
      });
      if(flag_zero || !Object.keys(teams).length)
      {
        console.log('A team must have at least one person.');
        return false;
      }
      sessionStorage.setItem('teamsList', JSON.stringify(teams));
    }
    jump("./main.html");
  }
}

