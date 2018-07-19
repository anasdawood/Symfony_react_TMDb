<?php
/**
 * Created by PhpStorm.
 * User: Anas.Dawood
 * Date: 7/19/2018
 * Time: 11:13 AM
 */

namespace AppBundle\Controller\api;

use AppBundle\Entity\User;
use AppBundle\Form\UserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


class UserManagementController extends Controller
{
    /**
     * @Route("/api/user/create")
     * @Method("POST")
     */
    public function createUserAction(Request $request)
    {

        $data = json_decode($request->getContent(), true);
        $user = new User();
        $form = $this->createForm(UserType::class, $user, [
            'csrf_protection' => false,
        ]);

        $form->submit($data);

        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        return new JsonResponse($user, 201);
    }

    /**
     * @Route("/api/user/isUserExist")
     * @Method("POST")
     */
    public function isUserExistAction(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->getDoctrine()->getRepository(User::class)->findOneBy($data);

        if ($user === null || count($user) == 0) {
            return new JsonResponse($data, 404);
        }

        return new JsonResponse($user, 200);
    }

    /**
     * @Route("/api/user/{id}")
     * @Method("GET")
     */
    public function getAction($id)
    {
        $data = $this->getDoctrine()->getRepository('AppBundle:User')->find($id);
        return new JsonResponse($data, 200);
    }
}