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

    struct ProductInput: Content {
        var name: String
        var price: Double
        var description: String
        var categoryID: UUID?
    }

    // Kontekst dla szablonu
    struct ProductContext: Content {
        var title: String
        var action: String
        var product: Product
        var categories: [Category]
        var selectedCategoryID: String
    }

    // GET /products
    func index(req: Request) async throws -> View {
        let products = try await Product.query(on: req.db)
            .with(\.$category) 
            .all()
        return try await req.view.render("products/index", ["products": products])
    }

    // GET /products/new
    func new(req: Request) async throws -> View {
        let categories = try await Category.query(on: req.db).all()
        let empty = Product(name: "", price: 0, description: "")
        let context = ProductContext(
            title: "Nowy produkt",
            action: "/products",
            product: empty,
            categories: categories,
            selectedCategoryID: ""
        )
        return try await req.view.render("products/form", context)
    }

    // POST /products
    func create(req: Request) async throws -> Response {
        let input = try req.content.decode(ProductInput.self)
        let product = Product(name: input.name, price: input.price,
                              description: input.description,
                              categoryID: input.categoryID)
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
        let categories = try await Category.query(on: req.db).all()
        let context = ProductContext(
            title: "Edytuj produkt",
            action: "/products/\(product.id!)/edit",
            product: product,
            categories: categories,
            selectedCategoryID: product.$category.id?.uuidString ?? ""
        )
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
        product.$category.id = input.categoryID
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