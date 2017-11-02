<?php
/**
 * Created by PhpStorm.
 * User: BK
 * Date: 02.11.17
 * Time: 14:36
 */

namespace Framework;


use Controller\HighscoreController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
use Symfony\Component\Routing\Matcher\UrlMatcher;

class Core implements HttpKernelInterface
{
    /** @var RouteCollection */
    protected $routes;

    /**
     * Core constructor.
     */
    public function __construct()
    {
        $this->routes = new RouteCollection();
        $this->map('/post', HighscoreController::class . ':' . 'post');
        $this->map('/get', HighscoreController::class . ':' . 'get');
        $this->map('/get/{limit}', HighscoreController::class . ':' . 'get');
    }

    public function handle(Request $request, $type = HttpKernelInterface::MASTER_REQUEST, $catch = true)
    {
        // create a context using the current request
        $context = new RequestContext();
        $context->fromRequest($request);

        $matcher = new UrlMatcher($this->routes, $context);

        try {
            $attributes = $matcher->match($request->getPathInfo());

            $explodedController = explode(':', $attributes['controller']);
            unset($attributes['controller']);
            unset($attributes['_route']);
            $controllerClass = $explodedController[0];
            $action = $explodedController[1] . 'Action';

            if (!class_exists($controllerClass)) {
                throw new ResourceNotFoundException('Class not found!', Response::HTTP_NOT_FOUND);
            }
            $controller = new $controllerClass();

            if (!method_exists($controller, $action)) {
                throw new ResourceNotFoundException('Method not found!', Response::HTTP_NOT_FOUND);
            }

            $actionParameters = implode($attributes);

            $response = $controller->$action($request, $actionParameters? : null);
        } catch (ResourceNotFoundException $e) {
            $response = new Response('Not found!', Response::HTTP_NOT_FOUND);
        }

        return $response;
    }

    public function map($path, $controller) {
        $this->routes->add($path, new Route(
            $path,
            array('controller' => $controller)
        ));
    }
}