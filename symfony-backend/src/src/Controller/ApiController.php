<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

class ApiController extends AbstractController
{
    private function isInTheGrid($pos_x, $pos_y, $max_x, $max_y) {
        return ($pos_x >= 0 && $pos_x < $max_x && $pos_y >= 0 && $pos_y < $max_y);
    }

    #[Route('/fire-simulation', name: 'fire_simulation')]
    public function index(Request $request): JsonResponse
    {
        // $config = Yaml::parseFile($this->getParameter('kernel.project_dir') . '/my_conf.yaml');
        // dd($config);
        $data = json_decode($request->getContent(), true);
        // dd($data);
        $height = $data["height"];
        $width = $data["width"];
        $propagation = $data["propagation"];

        $initialCellStatus = [];
        foreach($data["cellStatus"] as $dataCellPos => $dataCellStatus) {
            # Check validity of the given positions
            $cellPos = explode("_", $dataCellPos);
            if ($this->isInTheGrid($cellPos[0], $cellPos[1], $height, $width)) {
                $initialCellStatus[$dataCellPos] = $dataCellStatus;
            }

        }
        // dd($initialCellStatus);

        $allCellStatus = [$initialCellStatus];
        $index = 0;
        while(true) {
            $newCellStatus = [];
            $progress = false;
            foreach($allCellStatus[$index] as $key => $status) {
                # Check if cell is burning
                if($status == 1) {
                    $progress = true;
                    # Check surrounding
                    $position = explode("_", $key);
                    $x = $position[0];
                    $y = $position[1];
                    if(($this->isInTheGrid($x - 1, $y, $height, $width))) {
                        if(!array_key_exists($x - 1 . "_" . $y, $allCellStatus[$index]) || $allCellStatus[$index][$x - 1 . "_" . $y] === 0) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x - 1 . "_" . $y] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x + 1, $y, $height, $width))) {
                        if(!array_key_exists($x + 1 . "_" . $y, $allCellStatus[$index]) || $allCellStatus[$index][$x + 1 . "_" . $y] === 0) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x + 1 . "_" . $y] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x, $y - 1, $height, $width))) {
                        if(!array_key_exists($x . "_" . $y - 1, $allCellStatus[$index]) || $allCellStatus[$index][$x . "_" . $y - 1] === 0) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x . "_" . $y - 1] = 1;
                            }
                        }
                    }
                    if(($this->isInTheGrid($x, $y + 1, $height, $width))) {
                        if(!array_key_exists($x . "_" . $y + 1, $allCellStatus[$index]) || $allCellStatus[$index][$x . "_" . $y + 1] === 0) {
                            if(rand(1, 100) < $propagation) {
                                $newCellStatus[$x . "_" . $y + 1] = 1;
                            }
                        }
                    }
                    $newCellStatus[$x . "_" . $y] = 2;
                # Check is the cell is already burned
                } else if ($status == 2) {
                    # Check surrounding
                    $position = explode("_", $key);
                    $x = $position[0];
                    $y = $position[1];
                    $newCellStatus[$x . "_" . $y] = 2;
                }
            }
            if (!$progress) {
                break;
            }
            $allCellStatus[] = $newCellStatus;
            $index = $index + 1;
        }
        // dd($allCellStatus);

        $response = [
            "height" => $height,
            "width" => $width,
            "propagation" => $propagation,
            "data" => $allCellStatus,
        ];

        return new JsonResponse($response, 200);
    }
}