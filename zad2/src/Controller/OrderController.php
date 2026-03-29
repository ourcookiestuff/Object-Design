<?php
namespace App\Controller;

use App\Service\DatabaseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/orders')]
class OrderController extends AbstractController
{
    private \PDO $pdo;

    public function __construct(DatabaseService $db)
    {
        $this->pdo = $db->getPdo();
    }

    #[Route('', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $stmt = $this->pdo->query('SELECT * FROM orders');
        return $this->json($stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    #[Route('', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $stmt = $this->pdo->prepare(
            'INSERT INTO orders (customer_name, total, status, created_at)
             VALUES (:customer_name, :total, :status, :created_at)'
        );
        $stmt->execute([
            ':customer_name' => $data['customer_name'],
            ':total'         => $data['total'],
            ':status'        => $data['status'] ?? 'pending',
            ':created_at'    => date('Y-m-d H:i:s'),
        ]);
        return $this->json(['id' => $this->pdo->lastInsertId()], 201);
    }

    #[Route('/{id}', methods: ['GET'])]
    public function show(int $id): JsonResponse
    {
        $stmt = $this->pdo->prepare('SELECT * FROM orders WHERE id = :id');
        $stmt->execute([':id' => $id]);
        $order = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$order) return $this->json(['error' => 'Not found'], 404);
        return $this->json($order);
    }

    #[Route('/{id}', methods: ['PUT'])]
    public function update(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $stmt = $this->pdo->prepare(
            'UPDATE orders SET customer_name = :customer_name, total = :total, status = :status WHERE id = :id'
        );
        $stmt->execute([
            ':customer_name' => $data['customer_name'],
            ':total'         => $data['total'],
            ':status'        => $data['status'] ?? 'pending',
            ':id'            => $id,
        ]);
        return $this->json(['status' => 'updated']);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function delete(int $id): JsonResponse
    {
        $stmt = $this->pdo->prepare('DELETE FROM orders WHERE id = :id');
        $stmt->execute([':id' => $id]);
        return $this->json(['status' => 'deleted']);
    }
}

