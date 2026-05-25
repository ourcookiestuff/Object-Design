import Fluent
import Vapor

struct ProductController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let products = routes.grouped("products")
        products.get(use: index)
        products.post(use: create)
        products.group(":id") { product in
            product.get(use: show)
            product.put(use: update)
            product.delete(use: delete)
        }
    }

    // GET /products - lista wszystkich
    func index(req: Request) async throws -> [Product] {
        try await Product.query(on: req.db).all()
    }

    // POST /products - utwórz nowy
    func create(req: Request) async throws -> Product {
        let product = try req.content.decode(Product.self)
        try await product.save(on: req.db)
        return product
    }

    // GET /products/:id - jeden produkt
    func show(req: Request) async throws -> Product {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        return product
    }

    // PUT /products/:id - aktualizuj
    func update(req: Request) async throws -> Product {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        let updated = try req.content.decode(Product.self)
        product.name = updated.name
        product.price = updated.price
        product.description = updated.description
        try await product.save(on: req.db)
        return product
    }

    // DELETE /products/:id - usuń
    func delete(req: Request) async throws -> HTTPStatus {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        try await product.delete(on: req.db)
        return .noContent
    }
}