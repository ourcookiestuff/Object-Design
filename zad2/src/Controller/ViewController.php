<?php
namespace App\Controller;

use App\Service\DatabaseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ViewController extends AbstractController
{
    private \PDO $pdo;

    public function __construct(DatabaseService $db)
    {
        $this->pdo = $db->getPdo();
    }

    #[Route('/products', methods: ['GET'])]
    public function products(): Response
    {
        $products = $this->pdo->query('SELECT * FROM product')->fetchAll(\PDO::FETCH_ASSOC);
        return $this->render('product/index.html.twig', ['products' => $products]);
    }

    #[Route('/categories', methods: ['GET'])]
    public function categories(): Response
    {
        $categories = $this->pdo->query('SELECT * FROM category')->fetchAll(\PDO::FETCH_ASSOC);
        return $this->render('category/index.html.twig', ['categories' => $categories]);
    }

    #[Route('/orders', methods: ['GET'])]
    public function orders(): Response
    {
        $orders = $this->pdo->query('SELECT * FROM orders')->fetchAll(\PDO::FETCH_ASSOC);
        return $this->render('order/index.html.twig', ['orders' => $orders]);
    }
}