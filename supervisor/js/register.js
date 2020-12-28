
function setUrl(input_id)
{
  let param_uuid = getParam("game_id");
  const url_players = "https://matchey.github.io/BGC/players?game_id=" + param_uuid;
  document.getElementById(input_id).value = url_players;
}

function copyToClipboard(input_id, button_id)
{
  let copyText = document.getElementById(input_id);
  let copyButton = document.getElementById(button_id);

  copyText.select();/* Select the text field */
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");
  copyButton.textContent = "Copid!";
}

function removeFromDB(id)
{
  let input_id = "inputPlayerName" + id;
  let inputName = document.getElementById(input_id);
  inputName.value = "";
}

function createNameInput(name, id)
{
  let label_str = 'Player name ' + Number(id + 1);
  let input_id = "inputPlayerName" + id;
  let label = '<label class="label" for="' + input_id + '">' + label_str + '</label>'
  let input = '<div class="input_players"><input id="' + input_id + '" type="text" name="name" autocomplete="name"  autocorrect="off" autocapitalize="off" value="' + name + '">'

  let remove = ' <input type="button" value="remove", onclick=removeFromDB(' +  id + ')></div>'

  return label + input + remove + '<br>';
}

function syncPlayersNamesWithDB(input_players_list)
{
  let db_names = ["Alice", "Bob", "Cacy", "David"];
  const union = new Set([...input_players_list, ...db_names]);
  const player_names = [...union];
  // DBにlist投げて、player_namesを受け取る

  let num_players = player_names.length;

  sessionStorage.setItem('numPlayers', num_players);

  return player_names;
}

function showPlayerNames()// 読み込み時に実行 jump("./") で実行される
{
  let form_players = document.getElementById("formPlayers");
  let button_add = document.getElementById("buttonAddPlayer");

  let last_label = document.getElementById("labelNameLast");
  let last_name  = document.getElementById("inputPlayerNameLast");
  let last_button  = document.getElementById("buttonNameLast");

  let input_players_list = getInputPlayerNames();
  let db_names = syncPlayersNamesWithDB(input_players_list);

  let num_players = db_names.length;

  form_players.textContent = '';
  for(let i = 0; i < num_players; i++)
  {
    form_players.insertAdjacentHTML('beforeend', createNameInput(db_names[i], i));
  }

  form_players.insertAdjacentElement('beforeend', last_label);
  form_players.insertAdjacentHTML('beforeend', '<div class="input_players">');
  form_players.insertAdjacentElement('beforeend', last_name);
  form_players.insertAdjacentHTML('beforeend', ' ');
  form_players.insertAdjacentElement('beforeend', last_button);
  form_players.insertAdjacentHTML('beforeend', '</div><br><br>');
  last_label.textContent = "Player name " + parseInt(num_players + 1);
  form_players.insertAdjacentElement('beforeend', button_add);

  // jump("./");
}

function addInputPlayer()
{
  let num_players = parseInt(sessionStorage.getItem('numPlayers'));
  if(!num_players){ num_players = 0;}

  let last_label = document.getElementById("labelNameLast");
  let last_name  = document.getElementById("inputPlayerNameLast");

  last_label.insertAdjacentHTML('beforebegin', createNameInput('', num_players));
  sessionStorage.setItem('numPlayers', num_players + 1);

  let input_id_added = "inputPlayerName" + num_players;
  let name_added = document.getElementById(input_id_added);

  name_added.value = last_name.value;
  // name_added.id = 'inputPlayerNameLast';
  last_label.textContent = "Player name " + parseInt(num_players + 2);
  last_name.value = "";

  name_added.focus();
}

function getInputPlayerNames()
{
  let input_players_list = [];

  let num_players = parseInt(sessionStorage.getItem('numPlayers'));
  for(let i = 0; i < num_players; ++i)
  {
    let player_name  = document.getElementById("inputPlayerName" + i).value;
    if(player_name)
    {
      input_players_list.push(player_name);
    }
  }

  return input_players_list;
}

window.onload = function () {
  getLastName();
  let last_name = document.getElementById("inputPlayerNameLast");
  last_name.onkeyup = function(){
    getLastName();
  }
}
function getLastName()
{
  let last_name = document.getElementById("inputPlayerNameLast");
  if(last_name.value)
  {
    addInputPlayer();
  }
}

function goGrouping()
{
  showPlayerNames();
  jump("./grouping")
}

