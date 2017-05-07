<?php
  session_start();
?>
<!DOCTYPE html>
<html>
  <head>
    <title>Camagru</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link href="https://fonts.googleapis.com/css?family=Lato:300" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  </head>
  <div class="body">
    <input class="forgetPwd" type="password" name="passwd">
    <input class="forgetPwd" type="password" name="confirmPwd">
    <input class="forgetPwd" type="submit" name="submit" value="Confirmer" onclick="updatePassword()">
	</div>
  <body>
    <script type="text/javascript" src="./public/js/utils.js"></script>
    <script type="text/javascript">
      function updatePassword() {
        var req = "token=" + window.location.href.split('=')[1] + "&";
        req += window.location.href.split('?')[1] + "&";
        req += getElemForm('.forgetPwd');
        if (getElemForm('.forgetPwd').split("=")[1].split("&")[0] !== getElemForm('.forgetPwd').split("=")[2]) {
          console.log('diff');
        } else {
          request('PUT', 'controllers/user.php', req, (res) => {
            console.log(res);
          });
        }
      }
    </script>
  </body>
</html>