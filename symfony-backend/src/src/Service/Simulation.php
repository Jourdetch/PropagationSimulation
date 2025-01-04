<?php

namespace App\Service;

class Simulation
{
    public function isInTheGrid($pos_x, $pos_y, $max_x, $max_y) {
        # Check if a position x, y is valid by the grid definition
        return ($pos_x >= 0 && $pos_x < $max_x && $pos_y >= 0 && $pos_y < $max_y);
    }

    public function isNeutralCell($key, $arrayCellStatus) {
        # Check cell status for a given key
        # return true if the cell status is 0 or if the key do not exist in the array
        return (!array_key_exists($key, $arrayCellStatus) || $arrayCellStatus[$key] === 0);
    }

    public function fireSimulation($cellStatus, $height, $width, $propagation) {
        $initialCellStatus = [];
        foreach($cellStatus as $dataCellPos => $dataCellStatus) {
            # Check validity of the given positions
            $cellPos = explode("_", $dataCellPos);
            if ($this->isInTheGrid($cellPos[0], $cellPos[1], $height, $width)) {
                $initialCellStatus[$dataCellPos] = $dataCellStatus;
            }

        }

        $allCellStatus = [$initialCellStatus];
        $index = 0;
        while(true) {
            $newCellStatus = [];
            $progress = false;
            foreach($allCellStatus[$index] as $key => $status) {
                # Check if cell is burning
                if($status == 1) {
                    $progress = true;
                    $position = explode("_", $key);
                    $x = $position[0];
                    $y = $position[1];
                    # Check surrounding
                    if(($this->isInTheGrid($x - 1, $y, $height, $width))) {
                        if($this->isNeutralCell($x - 1 . "_" . $y, $allCellStatus[$index])) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x - 1 . "_" . $y] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x + 1, $y, $height, $width))) {
                        if($this->isNeutralCell($x + 1 . "_" . $y, $allCellStatus[$index])) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x + 1 . "_" . $y] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x, $y - 1, $height, $width))) {
                        if($this->isNeutralCell($x . "_" . $y - 1, $allCellStatus[$index])) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x . "_" . $y - 1] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x, $y + 1, $height, $width))) {
                        if($this->isNeutralCell($x . "_" . $y + 1, $allCellStatus[$index])) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x . "_" . $y + 1] = 1;
                            }
                        }
                    }
                    # The cell is now burnt
                    $newCellStatus[$x . "_" . $y] = 2;

                # Check is the cell is already burnt
                } else if ($status == 2) {
                    # Report the status in the next grid state
                    $newCellStatus[$key] = 2;
                }
            }
            if (!$progress) {
                # No more burning cells
                break;
            }
            $allCellStatus[] = $newCellStatus;
            $index = $index + 1;
        }

        return $allCellStatus;
    }
}