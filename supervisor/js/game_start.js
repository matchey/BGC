
function gameStart()
{
  let numTeams = document.getElementById("inputNumTeams").value;
  if(numTeams)
  {
    sessionStorage.setItem('numTeams', numTeams);
    console.log('set num of teams: ' + numTeams);
    jump("./main.html") 
  }
}

