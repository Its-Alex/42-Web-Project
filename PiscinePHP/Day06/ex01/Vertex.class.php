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

    public function getX() {
        return $this->_x;
    }

    public function getY() {
        return $this->_y;
    }

    public function getZ() {
        return $this->_z;
    }

    public function getW() {
        return $this->_w;
    }

    public function getColor() {
        return $this->_color;
    }

    public function setX($arg) {
        $this->_x = floatval($arg); 
    }

    public function setY($arg) {
        $this->_y = floatval($arg);
    }

    public function setZ($arg) {
        $this->_z = floatval($arg);
    }

    public function setW($arg) {
        $this->_w = floatval($arg);
    }

    public function setColor(Color $newColor) {
        $this->_color = clone $newColor;
    }

    public function __toString() {
        if (self::$verbose == True)
            return "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w.", ".$this->_color." ) )";
        else
            return "Vertex( x: ".$this->_x.", y: ".$this->_y.", z:".$this->_z.", w:".$this->_w." )";
    }

    public static function doc() {
        return file_get_contents('Vertex.doc.txt').PHP_EOL;
    }
}
?>
