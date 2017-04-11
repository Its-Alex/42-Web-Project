<?php
Class Color {

    public $red;
    public $green;
    public $blue;

    static $verbose = False;

    function __construct(array $kwargs) {
        if (array_key_exists('rgb', $kwargs)) {
            $this->red = (intval($kwargs['rgb'] & 0xFF0000) >> 16);
            $this->green = (intval($kwargs['rgb'] & 0x00FF00) >> 8);
            $this->blue = (intval($kwargs['rgb'] & 0x0000FF));
        }
        else {            
            if (array_key_exists('red', $kwargs)) {
                $this->red = intval($kwargs['red']);
            }
            if (array_key_exists('green', $kwargs)) {
                $this->green = intval($kwargs['green']);
            }
            if (array_key_exists('blue', $kwargs)) {
                $this->blue = intval($kwargs['blue']);
            }
        }
        if (self::$verbose == True)
            print ("Color( red: "."$this->red".", green:   "."$this->green".", blue:   "."$this->blue"." ) constructed." . PHP_EOL);
    }

    public function add(Color $addColor) {
        $newColor = new Color(array($this->red, $this->green, $this->blue));
        $newColor->red += $addColor->red;
        $newColor->green += $addColor->green;
        $newColor->blue += $addColor->blue;
        return $newColor;
    }

    public function __toString() {
        if (self::$verbose == True)
            return "Color( red: "."$this->red".", green:   "."$this->green".", blue:   "."$this->blue"." ) constructed.";
        else
            return "";
    }

    public static function doc() {
        return file_get_contents('Color.doc.txt').PHP_EOL;
    }
}

$red     = new Color( array( 'red' => 0xff, 'green' => 0   , 'blue' => 0    ) );
$green   = new Color( array( 'rgb' => 255 << 8 ) );
$blue    = new Color( array( 'red' => 0   , 'green' => 0   , 'blue' => 0xff ) );
print( $red     . PHP_EOL );
print( $green   . PHP_EOL );
print( $blue    . PHP_EOL );

?>
