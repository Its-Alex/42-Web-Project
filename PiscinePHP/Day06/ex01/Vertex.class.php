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
            printf('Vertex( x: %.2f, y: %.2f, z:%.2f, w:%.2f, %s ) constructed' . PHP_EOL, $this->getX(), $this->getY(), $this->getZ(), $this->getW(), $this->getColor());
    }

    function __destruct() {
        if (self::$verbose == True)
            printf('Vertex( x: %.2f, y: %.2f, z:%.2f, w:%.2f, %s ) destructed' . PHP_EOL, $this->getX(), $this->getY(), $this->getZ(), $this->getW(), $this->getColor());
    }

    public function getX() : float { return $this->_x; }
    public function getY() : float { return $this->_y; }
    public function getZ() : float { return $this->_z; }
    public function getW() : float { return $this->_w; }
    public function getColor() : Color { return $this->_color; }

    public function setX($arg) { $this->_x = floatval($arg);}
    public function setY($arg) { $this->_y = floatval($arg);}
    public function setZ($arg) { $this->_z = floatval($arg);}
    public function setW($arg) { $this->_w = floatval($arg);}
    public function setColor(Color $newColor) { $this->_color = clone $newColor;}

    public function __toString() {
        if (self::$verbose == TRUE)
			return (sprintf('Vertex( x: %.2f, y: %.2f, z:%.2f, w:%.2f, %s )', $this->getX(), $this->getY(), $this->getZ(), $this->getW(), $this->getColor()));
		else
			return (sprintf('Vertex( x: %.2f, y: %.2f, z:%.2f, w:%.2f )', $this->getX(), $this->getY(), $this->getZ(), $this->getW()));
    }

    public static function doc() {
        return file_get_contents('Vertex.doc.txt').PHP_EOL;
    }
}
?>
