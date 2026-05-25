import Vapor
import Leaf
import Fluent
import FluentSQLiteDriver
import Redis

public func configure(_ app: Application) async throws {
    app.views.use(.leaf)
    app.databases.use(.sqlite(.file("db.sqlite")), as: .sqlite)

    app.redis.configuration = try RedisConfiguration(hostname: "localhost", port: 6379)

    app.migrations.add(CreateCategory())
    app.migrations.add(CreateProduct())

    try await app.autoMigrate()
    try routes(app)
}