<?php
Class Color {

    public $red;
    public $green;
    public $blue;

    public static $verbose = False;

    function __construct(array $kwargs) {
        if (array_key_exists('rgb', $kwargs)) {
            $this->red = (intval($kwargs['rgb'] & 0xFF0000) >> 16);
            $this->green = (intval($kwargs['rgb'] & 0x00FF00) >> 8);
            $this->blue = (intval($kwargs['rgb'] & 0x0000FF));
        }
        else {
            if (array_key_exists("red", $kwargs))
                $this->red = intval($kwargs['red']);
            else
                $this->red = 0;

            if (array_key_exists("green", $kwargs))
                $this->green = intval($kwargs['green']);
            else
                $this->green = 0;

            if (array_key_exists("blue", $kwargs))
                $this->blue = intval($kwargs['blue']);
            else
                $this->blue = 0;
        }
        if (self::$verbose == TRUE)
			printf( 'Color( red: %3d, green: %3d, blue: %3d ) constructed.' . PHP_EOL, $this->red, $this->green, $this->blue);
    }

    function __destruct() {
        if (self::$verbose == TRUE)
		    printf( 'Color( red: %3d, green: %3d, blue: %3d ) destructed.' . PHP_EOL, $this->red, $this->green, $this->blue);
    }

    public function add(Color $rhs) {
        return new Color( array("red" => $this->red + $rhs->red,
                                 "green" => $this->green + $rhs->green,
                                 "blue" => $this->blue + $rhs->blue));
    }

    public function sub(Color $rhs) {
        return new Color( array("red" => $this->red - $rhs->red,
                                 "green" => $this->green - $rhs->green,
                                 "blue" => $this->blue - $rhs->blue));
    }

    public function mult($f) {
        return new Color( array("red" => $this->red * $f,
                                 "green" => $this->green * $f,
                                 "blue" => $this->blue * $f));
    }

    public function __toString() {
        return (sprintf( 'Color( red: %3d, green: %3d, blue: %3d )', $this->red, $this->green, $this->blue));
    }

    public static function doc() {
        return file_get_contents('Color.doc.txt').PHP_EOL;
    }
}
?>
