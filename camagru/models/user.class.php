<?php
	require '/Users/malexand/http/MyWebSite/models/Utils.Class.php';
	require '/Users/malexand/http/MyWebSite/models/Database.Class.php';

	/*
	** Class User
	*/
	class User
	{
		/*
		** Role constants
		*/
		const USERS = "USERS";
		const MODO = "MODERATEUR";
		const ADMIN = "ADMIN";

		/*
		** State constants
		*/
		const REGISTER = "REGISTERED";
		const NEED_VAL = "NEED_VALID";
		const DEL = "DELETED";
		const FORGET_PWD = "FORGET_PASSWD";

		public $id;
		public $passwd;
		public $name;
		public $mail;
		public $role;
		public $state;
		
		function __construct($args)
		{
			if ($args == null)
				return;

			if (array_key_exists('id', $args))
		}


	}
?>