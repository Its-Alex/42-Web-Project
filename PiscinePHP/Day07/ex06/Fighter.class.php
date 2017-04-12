<?php
    abstract class Fighter
    {
        private $_type;

        abstract public function fight($string);

        public function __construct($string) {
            $this->_type = $string;
            return;
        }

        public function str() {
            return $this->_type;
        }
    }
?>