default: help

.PHONY: help
help: # Show help for each of the Makefile recipes.
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: migrate@run
migrate@run: # Run pending migrations.
	@echo "Running migration..."
	@yarn typeorm migration:run -d ./src/config/database.ts

.PHONY: migrate@rollback
migrate@rollback: # Rollback last migration.
	@echo "Running migration..."
	@yarn typeorm migration:revert -d ./src/config/database.ts

.PHONY: migrate@create
migrate@create: # Create new migration.
	@echo "Creating migration..."
	@yarn typeorm migration:create ./src/migration/$(name)

.PHONY: migrate@generate
migrate@generate: # Generate migration from entities.
	@echo "Generating migration..."
	@yarn typeorm migration:generate $(name) -d ./src/config/database.ts
