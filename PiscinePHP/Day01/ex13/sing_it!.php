#!/usr/bin/php
<?php
if ($argc === 2)
{
  if (strcmp($argv[1], "mais pourquoi cette demo ?") === 0)
  {
  	echo "Tout simplement pour qu'en feuilletant le sujet\non ne s'apercoive pas de la nature de l'exo";
  }
  if (strcmp($argv[1], "mais pourquoi cette chanson ?") === 0)
  {
  	echo "Parce que Kwame a des enfants\n";
  }
  if (strcmp($argv[1], "vraiment ?") === 0)
  {
  	if (file_exists(".exists") == 0)
  	{
  		$fd = fopen(".exists", "c+");
  		fclose($fd);
  		echo "Nan c'est parce que c'est le premier avril\n";
  	}
  	else
  	{
  		unlink(".exists");
  		echo "Oui il a vraiment des enfants\n";
  	}
  }
}  
?>