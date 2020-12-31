
function createTotalRevenue(name, data)
{
  let row = '<tr><td>' + name + '</td><td class="tbl_number">'
                       + data["ave"] + '</td><td class="tbl_number">'
                       + data["revenue"] + '</td></tr>';

  return row;
}

function showTotalRevenues(area_id)
{
  let area_total = document.getElementById(area_id);

  let insert_str = "";

  insert_str += "<table class='result_tbl'><tr><th></th><th>Score Average</th><th>Total Revenue</th></tr>";

  let total_data = {"Alice":{"ave":210, "revenue":500},
                    "Dave" :{"ave":180, "revenue":100},
                    "Grace":{"ave":170, "revenue":-500},
                    "Bob"  :{"ave":190, "revenue":-100},
                    "Ellen":{"ave":190, "revenue":3000},
                    "Heidi":{"ave":163, "revenue":-1000},
                    "Carol":{"ave":162, "revenue":-2000},
                    "Frank":{"ave":180, "revenue":0}};
  for(let name in total_data)
  {
    insert_str += createTotalRevenue(name, total_data[name]);
  }
  insert_str += "</table><h2>";
  if(area_id == "area_total")
  {
    insert_str += '<button type="submit" onclick=jump("./grouping") name="button">Next Game</button>';
  }
  insert_str += '<button type="submit" onclick=finishGame() name="button">Finish</button>';
  insert_str += "</h2>";
  area_total.insertAdjacentHTML('beforeend', insert_str);
}

function createLastResult(name, data)
{
  let row = '<tr><td>' + name + '</td><td class="tbl_number">'
                       + data["score"] + '</td><td class="tbl_number">'
                       + data["revenue"] + '</td></tr>';

  return row;
}

function showLastResult()
{
  let area_last = document.getElementById("area_last");

  let insert_str = "";
  insert_str += "<table class='result_tbl'><tr><th></th><th>Score</th><th>Revenue</th></tr>";

  let total_data = {"Alice":{"score":210, "revenue":200},
                    "Dave" :{"score":180, "revenue":10},
                    "Grace":{"score":170, "revenue":-200},
                    "Bob"  :{"score":190, "revenue":-10},
                    "Ellen":{"score":190, "revenue":300},
                    "Heidi":{"score":163, "revenue":-100},
                    "Carol":{"score":162, "revenue":-200},
                    "Frank":{"score":180, "revenue":0}};
  for(let name in total_data)
  {
    insert_str += createLastResult(name, total_data[name]);
  }
  insert_str += "</table><h2>";
  insert_str += '<button type="submit" onclick=jump("./grouping") name="button">Next Game</button>';
  insert_str += "</h2>";
  area_last.insertAdjacentHTML('beforeend', insert_str);
}

function finishGame()
{
  console.log("Download Result?\n No [Yes]");
  console.log("Close tab");
}

