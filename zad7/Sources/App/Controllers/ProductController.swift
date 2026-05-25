import Fluent
import Vapor

struct ProductController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let products = routes.grouped("products")
        products.get(use: index)
        products.get("new", use: new)
        products.post(use: create)
        products.get(":id", "edit", use: edit)
        products.post(":id", "edit", use: update)
        products.post(":id", "delete", use: delete)
    }

    // Dane z formularza HTML
    struct ProductInput: Content {
        var name: String
        var price: Double
        var description: String
    }

    // GET /products
    func index(req: Request) async throws -> View {
        let products = try await Product.query(on: req.db).all()
        return try await req.view.render("products/index", ["products": products])
    }

    // GET /products/new
    func new(req: Request) async throws -> View {
        let context: [String: String] = [
            "title": "Nowy produkt",
            "action": "/products",
            "product.name": "",
            "product.price": "0",
            "product.description": ""
        ]
        return try await req.view.render("products/form", context)
    }

    // POST /products
    func create(req: Request) async throws -> Response {
        let input = try req.content.decode(ProductInput.self)
        let product = Product(name: input.name, price: input.price,
                              description: input.description)
        try await product.save(on: req.db)
        return req.redirect(to: "/products")
    }

    // GET /products/:id/edit
    func edit(req: Request) async throws -> View {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        let context: [String: String] = [
            "title": "Edytuj produkt",
            "action": "/products/\(product.id!)/edit",
            "product.name": product.name,
            "product.price": "\(product.price)",
            "product.description": product.description
        ]
        return try await req.view.render("products/form", context)
    }

    // POST /products/:id/edit
    func update(req: Request) async throws -> Response {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        let input = try req.content.decode(ProductInput.self)
        product.name = input.name
        product.price = input.price
        product.description = input.description
        try await product.save(on: req.db)
        return req.redirect(to: "/products")
    }

    // POST /products/:id/delete
    func delete(req: Request) async throws -> Response {
        guard let product = try await Product.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        try await product.delete(on: req.db)
        return req.redirect(to: "/products")
    }
}