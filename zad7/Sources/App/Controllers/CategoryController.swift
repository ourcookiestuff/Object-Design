import Fluent
import Vapor

struct CategoryController: RouteCollection {

    func boot(routes: RoutesBuilder) throws {
        let categories = routes.grouped("categories")
        categories.get(use: index)
        categories.get("new", use: new)
        categories.post(use: create)
        categories.get(":id", "edit", use: edit)
        categories.post(":id", "edit", use: update)
        categories.post(":id", "delete", use: delete)
    }

    struct CategoryInput: Content {
        var name: String
    }

    // GET /categories
    func index(req: Request) async throws -> View {
        let categories = try await Category.query(on: req.db)
            .with(\.$products) 
            .all()
        return try await req.view.render("categories/index", ["categories": categories])
    }

    // GET /categories/new
    func new(req: Request) async throws -> View {
        return try await req.view.render("categories/form", [
            "title": "Nowa kategoria",
            "action": "/categories",
            "category.name": ""
        ])
    }

    // POST /categories
    func create(req: Request) async throws -> Response {
        let input = try req.content.decode(CategoryInput.self)
        let category = Category(name: input.name)
        try await category.save(on: req.db)
        return req.redirect(to: "/categories")
    }

    // GET /categories/:id/edit
    func edit(req: Request) async throws -> View {
        guard let category = try await Category.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        return try await req.view.render("categories/form", [
            "title": "Edytuj kategorię",
            "action": "/categories/\(category.id!)/edit",
            "category.name": category.name
        ])
    }

    // POST /categories/:id/edit
    func update(req: Request) async throws -> Response {
        guard let category = try await Category.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        let input = try req.content.decode(CategoryInput.self)
        category.name = input.name
        try await category.save(on: req.db)
        return req.redirect(to: "/categories")
    }

    // POST /categories/:id/delete
    func delete(req: Request) async throws -> Response {
        guard let category = try await Category.find(
            req.parameters.get("id"), on: req.db
        ) else {
            throw Abort(.notFound)
        }
        try await category.delete(on: req.db)
        return req.redirect(to: "/categories")
    }
}