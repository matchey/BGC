
// const URL_ROOT = location.href ;
// const URL_SUPERVISOR = URL_ROOT + "supervisor";
// const URL_PLAYERS = "players";
const UUID_PATTERN = "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}";

function getParamsFromString(url_param_str)
{
  var param_map = {};

  url_param_str = url_param_str.substring(url_param_str.indexOf('?') + 1);

  if(url_param_str)
  {
    var params = url_param_str.split('&');

    for(i = 0; i < params.length; i++)
    {
      var param_pair = params[i].split('=');

      var param_key = decodeURIComponent(param_pair[0]);
      var param_value = decodeURIComponent(param_pair[1]);

      param_map[param_key] = param_value;
    }
  }

  return param_map;
}

function getParam(key, url)
{
  if (!url) url = window.location.href;
  key = key.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// function getUrlWithParams(url_string, param_map)
// {
//   if(!url_param_str)
//   {
//     if (paramArray.id == 'osaka') {
//       $('.pram').append('<p>大阪です</p>');
//     } else {
//       $('.pram').append('<p>大阪ではありません</p>');
//     }
//     window.location.href='/';
//   }
//   else
//   {
//     var param_item = url_param.split('=');
//     if (param_item[0] != '?game_id')
//     {
//       window.location.href='/';
//     }
//   }
//
//   var url_players = "https://matchey.github.io/BGC/players" + url_param;
//   document.getElementById("urlString").value = url_players;
// }

function isUUID(uuid)
{
  let s = "" + uuid;

  s = s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  if(s === null)
  {
    return false;
  }
  return true;
}


