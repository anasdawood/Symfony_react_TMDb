<?php
/**
 * Created by PhpStorm.
 * User: Anas.Dawood
 * Date: 7/19/2018
 * Time: 12:01 PM
 */

namespace AppBundle\Controller\api;

//use AppBundle\Entity\CityDetail;
use AppBundle\Entity\Dashboard;
use AppBundle\Entity\User;
use AppBundle\Form\DashboardType;
use GuzzleHttp\Exception\BadResponseException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class MovieController extends Controller
{
    private $apiKey = '2198dafe3e7b04a2a08b204aed7fc4c3';

    /**
     * @Route("/api/movie/dashboard/user/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $nowDate = new \DateTime();
        $dash = $this->getDoctrine()->getRepository('AppBundle:Dashboard')->findBy(["user" => $id]);
        if (count($dash) != 0) {
            $difference = round(abs($nowDate->getTimestamp() - $dash[0]->getLastUpdated()->getTimestamp()) / 60, 2);
            if ($difference >= 10) {
                $this->addMovies($id, $dash);
            }
        } else {
            $this->addMovies($id);
            $dash = $this->getDoctrine()->getRepository('AppBundle:Dashboard')->findBy(["user" => $id]);
        }
        $response = new JsonResponse($dash, 200);
        return $response;
    }

    /**
     * @Route("/api/movie/dashDetails/{dashId}")
     * @Method("GET")
     */
    public function getDashDetails($dashId)
    {

        $dash = $this->getDoctrine()->getRepository('AppBundle:Dashboard')->find($dashId);
        $response = new JsonResponse($dash, 200);
        return $response;
    }

    /**
     * @Route("/api/movie/dashboard/{dashId}")
     * @Method("GET")
     */
    public function toggleFav($dashId)
    {

        $dash = $this->getDoctrine()->getRepository('AppBundle:Dashboard')->find($dashId);
        $dash->setFav(!$dash->getFav());
        $em = $this->getDoctrine()->getManager();
        $em->flush();
        $response = new JsonResponse($dash, 200);
        return $response;
    }

    public function addMovies($id, $dash = null)
    {
        $jsonRes = $this->getJsonResponse();

        $dashboard = $this->populateDashboard($id, $jsonRes, $dash);

        $response = new JsonResponse($dashboard, 200);
        return $response;
    }

    public function getJsonResponse()
    {
        $client = new \GuzzleHttp\Client();
        try {
            $res = $client->request('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=' . $this->apiKey . '&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false');
        } catch (BadResponseException $ex) {
            $response = $ex->getResponse();
            $jsonBody = $response->getBody()->getContents();
            return new JsonResponse(json_decode($jsonBody), 404);
        }

        $jsonRes = json_decode($res->getBody()->getContents());
        return $jsonRes;
    }

    public function populateDashboard($id, $jsonRes, $dash = null)
    {
        $user = $this->getDoctrine()->getRepository('AppBundle:User')->find($id);
        $em = $this->getDoctrine()->getManager();
        for ($i = 0; $i < 20; $i++) {
            $dashboard = new Dashboard();
            $dashboard->setFav(false);
            if ($dash != null) {
                for ($j = 0; $j < count($dash); $j++) {
                    if ($dash[$j]->getTmdbId() == $jsonRes->results[$i]->id) {
                        $dashboard->setId($dash[$j]->getId());
                        $dashboard->setFav($dash[$j]->getFav());
                        break;
                    }
                }
            }
            $dashboard->setLastUpdated(new \DateTime());
            $dashboard->setUser($user);
            $dashboard->setTitle($jsonRes->results[$i]->title);
            $dashboard->setCoverImage($jsonRes->results[$i]->poster_path);
            $dashboard->setMovieDescription($jsonRes->results[$i]->overview);
            $dashboard->setRating($jsonRes->results[$i]->vote_average);
            $dashboard->setTmdbId($jsonRes->results[$i]->id);
            $dashboard->setAdult($jsonRes->results[$i]->adult);
            $genras = implode(",", $jsonRes->results[$i]->genre_ids);
            $dashboard->setGenreIds($genras);

            $em->merge($dashboard);
        }
        $em->flush();

        return new JsonResponse($dashboard, 201);
    }
}