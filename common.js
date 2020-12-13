
function getParamsFromString(url_param_str)
{
  let param_map = {};

  url_param_str = url_param_str.substring(url_param_str.indexOf('?') + 1);

  if(url_param_str)
  {
    let params = url_param_str.split('&');

    for(i = 0; i < params.length; i++)
    {
      let param_pair = params[i].split('=');

      let param_key = decodeURIComponent(param_pair[0]);
      let param_value = decodeURIComponent(param_pair[1]);

      param_map[param_key] = param_value;
    }
  }

  return param_map;
}

function getParam(key, url)
{
  if (!url) url = location.href;
  key = key.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

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

function jump(url_base)
{
  let url = url_base + location.search;
  location.replace(url);
}

