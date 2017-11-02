<?php
/**
 * Created by PhpStorm.
 * User: BK
 * Date: 02.11.17
 * Time: 14:16
 */

namespace Controller;

use Repository\HighscoreRepository;
use Repository\Repository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class HighscoreController
 * @package Controller
 */
class HighscoreController {

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function postAction(Request $request)
    {
        $name = $request->get('name');
        $score = (int) $request->get('score');
        if ($name && $score) {
            $repository = new HighscoreRepository();
            $repository->insert($name, $score);
            $response = new JsonResponse(['name' => $name, 'score' => $score]);
        } else {
            $response = new JsonResponse();
        }

        return $response;
    }

    /**
     * @param Request $request
     * @param int $limit
     * @return JsonResponse
     */
    public function getAction(Request $request, $limit)
    {
        $repository = new HighscoreRepository();
        $results = $repository->findByHighestScore($limit);

        return new JsonResponse($results);
    }
}