import Vapor
import Leaf
import Fluent
import FluentSQLiteDriver

public func configure(_ app: Application) async throws {
    app.views.use(.leaf)
    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)

    app.migrations.add(CreateCategory())
    app.migrations.add(CreateProduct())
    
    try await app.autoMigrate()
    try routes(app)
}