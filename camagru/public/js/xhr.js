function getXMLHttpRequest() {
  var xhr = null;
  
  if (window.XMLHttpRequest || window.ActiveXObject) {
    if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch(e) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
    } else {
      xhr = new XMLHttpRequest(); 
    }
  } else {
    console.error("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
    return null;
  }
  return xhr;
}

function request(method, url, cb) {
  var xhr = getXMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 0)) {
      cb(xhr.responseText);
    }
  }

  xhr.open(method, url, true);
  if (method === `POST`) {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  xhr.send(null);
}