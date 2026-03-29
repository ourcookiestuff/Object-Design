<?php
namespace App\Controller;

use App\Service\DatabaseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/products')]
class ProductController extends AbstractController
{
    private \PDO $pdo;

    public function __construct(DatabaseService $db)
    {
        $this->pdo = $db->getPdo();
    }

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $stmt = $this->pdo->query('SELECT * FROM product');
        return $this->json($stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $stmt = $this->pdo->prepare(
            'INSERT INTO product (name, price, description) VALUES (:name, :price, :description)'
        );
        $stmt->execute([
            ':name'        => $data['name'],
            ':price'       => $data['price'],
            ':description' => $data['description'] ?? null,
        ]);
        return $this->json(['id' => $this->pdo->lastInsertId()], 201);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $stmt = $this->pdo->prepare('SELECT * FROM product WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $product = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$product) {
            return $this->json(['error' => 'Not found'], 404);
        }
        return $this->json($product);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $stmt = $this->pdo->prepare('SELECT * FROM product WHERE id = :id');
        $stmt->execute([':id' => $id]);
        if (!$stmt->fetch()) {
            return $this->json(['error' => 'Not found'], 404);
        }
        $stmt = $this->pdo->prepare(
            'UPDATE product SET name = :name, price = :price, description = :description WHERE id = :id'
        );
        $stmt->execute([
            ':name'        => $data['name'],
            ':price'       => $data['price'],
            ':description' => $data['description'] ?? null,
            ':id'          => $id,
        ]);
        return $this->json(['status' => 'updated']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $stmt = $this->pdo->prepare('DELETE FROM product WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $this->json(['status' => 'deleted']);
    }
}
