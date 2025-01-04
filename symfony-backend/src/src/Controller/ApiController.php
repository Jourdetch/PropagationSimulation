<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;

use App\Service\Simulation;

class ApiController extends AbstractController
{
    #[Route('/fire-simulation', name: 'fire_simulation')]
    public function index(Request $request, Simulation $simulation): JsonResponse
    {
        // $config = Yaml::parseFile($this->getParameter('kernel.project_dir') . '/my_conf.yaml');

        $data = json_decode($request->getContent(), true);

        $height = $data["height"];
        $width = $data["width"];
        $propagation = $data["propagation"];

        $allCellStatus = $simulation->fireSimulation($data["cellStatus"], $height, $width, $propagation);

        $response = [
            "height" => $height,
            "width" => $width,
            "propagation" => $propagation,
            "data" => $allCellStatus,
        ];

        return new JsonResponse($response, 200);
    }
}