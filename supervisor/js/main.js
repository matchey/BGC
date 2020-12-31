
function createScoreInput(name, id)
{
  let input_id = "inputPlayerScore" + id;

  let label = '<label class="label" for="' + input_id + '">' + name + '</label>'
  let input = '<div class="input_scores"><input id="' + input_id + '" type="number" min="0" max="300">'

  let input_handicap_id = "inputPlayerHandicap" + id;
  let label_handicap = '<label class="label" for="' + input_handicap_id + '">  +</label>'
  let handicap = '<input class="num_handicap" id="' + input_handicap_id + '" type="number" min="0" max="300" step="10" value="0" placeholder="10" ></div>'

  return label + input + label_handicap + handicap + '<br>';
}

function setHandicaps()
{
  let handicap_0 = document.getElementById("inputPlayerHandicap0");
  handicap_0.placeholder = 50;
}

function setInputScores()
{
  let input_scores = document.getElementById("area_scores");
  let teams = JSON.parse(sessionStorage.getItem('teamsList'));

  let insert_str = "";
  insert_str += "<h3>Input Scores (+Handicap)</h3>";
  let name_id = 0;
  for(let team in teams)
  {
    insert_str += "<h4>Team " + (parseInt(team) + 1) + "</h4>";
    for(let idx in teams[team])
    {
      name = teams[team][idx];
      insert_str += createScoreInput(name, name_id);
      ++name_id;
    }
  }
  insert_str += '<h2><button id="buttonNext" type="submit" onclick=jump("./result") name="button">Next Game</button></h2>';

  input_scores.insertAdjacentHTML('beforeend', insert_str);
}

