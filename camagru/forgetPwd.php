<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background-color: #fff;
      font-family: 'Lato', sans-serif;
      font-size: 1em;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    input {
      outline: none;
      margin: 4px;
      padding: 4px;
      border: 1px solid #333;
      border-radius: 4px;
    }

    input[type=button]:active {
      border: 1px solid #eee;
    }

    input[type=button] {
      background-color: #eee;
      cursor: pointer;
      min-height: 25px;
    }
  </style>
  <head>
    <title>Camagru</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Lato:300" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <body>
    <input class="forgetPwd" type="password" name="passwd">
    <input class="forgetPwd" type="password" name="confirmPwd">
    <input class="forgetPwd" type="submit" name="submit" value="Confirmer" onclick="updatePassword()">
    <script type="text/javascript" src="./public/js/utils.js"></script>
    <script type="text/javascript">
      function updatePassword() {
        var req = "id=" + window.location.href.split('=')[1] + "&";
        req += getElemForm('.forgetPwd');
        request('PUT', 'controllers/forgetPwd.php', req, (res) => {
          console.log(res);
          res = JSON.parse(res);

          if (res.success === true) {
            document.location.href = 'http://localhost:3000';
          }
        });
      }
    </script>
  </body>
</html>