<?php
require_once 'Color.class.php';

Class Vertex {

    private $_x;
    private $_y;
    private $_z;
    private $_w;
    private $_color;

    public static $verbose = False;

    function __construct(array $kwargs) {        
        $this->_x = floatval($kwargs['x']);
        $this->_y = floatval($kwargs['y']);
        $this->_z = floatval($kwargs['z']);

        if (array_key_exists("w", $kwargs))
            $this->_w = floatval($kwargs['w']);
        else
            $this->_w = 1.0;

        if (array_key_exists("color", $kwargs))
            $this->_color = clone $kwargs['color'];
        else
            $this->_color = new Color(array('rgb' => 0xFFFFFF));

        if (self::$verbose == True)
            echo "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w.", ".$this->_color." ) ) constructed".PHP_EOL;
    }

    function __destruct() {
        if (self::$verbose == True)
            echo "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w.", ".$this->_color." ) ) destructed".PHP_EOL;
    }

    public function __toString() {
        if ($this->_color->red != 0 && $this->_color->green != 0 && $this->_color->blue != 0)
            return "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w.", ".$this->_color." ) )";
        else
            return "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w." )";
    }

    public static function doc() {
        return file_get_contents('Vertex.doc.txt').PHP_EOL;
    }
}

Color::$verbose = False;

print( Vertex::doc() );
Vertex::$verbose = True;

$vtxO  = new Vertex( array( 'x' => 0.0, 'y' => 0.0, 'z' => 0.0 ) );
print( $vtxO  . PHP_EOL );

$red   = new Color( array( 'red' => 255, 'green' =>   0, 'blue' =>   0 ) );
$green = new Color( array( 'red' =>   0, 'green' => 255, 'blue' =>   0 ) );
$blue  = new Color( array( 'red' =>   0, 'green' =>   0, 'blue' => 255 ) );

$unitX = new Vertex( array( 'x' => 1.0, 'y' => 0.0, 'z' => 0.0, 'color' => $green ) );
$unitY = new Vertex( array( 'x' => 0.0, 'y' => 1.0, 'z' => 0.0, 'color' => $red   ) );
$unitZ = new Vertex( array( 'x' => 0.0, 'y' => 0.0, 'z' => 1.0, 'color' => $blue  ) );

print( $unitX . PHP_EOL );
print( $unitY . PHP_EOL );
print( $unitZ . PHP_EOL );

Vertex::$verbose = False;

$sqrA = new Vertex( array( 'x' => 0.0, 'y' => 0.0, 'z' => 0.0 ) );
$sqrB = new Vertex( array( 'x' => 4.2, 'y' => 0.0, 'z' => 0.0 ) );
$sqrC = new Vertex( array( 'x' => 4.2, 'y' => 4.2, 'z' => 0.0 ) );
$sqrD = new Vertex( array( 'x' => 0.0, 'y' => 4.2, 'z' => 0.0 ) );

print( $sqrA . PHP_EOL );
print( $sqrB . PHP_EOL );
print( $sqrC . PHP_EOL );
print( $sqrD . PHP_EOL );

$A = new Vertex( array( 'x' => 3.0, 'y' => 3.0, 'z' => 3.0 ) );
print( $A . PHP_EOL );
$equA = new Vertex( array( 'x' => 9.0, 'y' => 9.0, 'z' => 9.0, 'w' => 3.0 ) );
print( $equA . PHP_EOL );

Vertex::$verbose = True;
?>
