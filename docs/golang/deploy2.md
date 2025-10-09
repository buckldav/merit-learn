---
layout: default
title: Beego Part 9 - Deploy Part 2
parent: Golang
nav_order: "91"
---

# Deploy Part 2

Now it is time to hook up to our PostgreSQL database in production.

## Try it out in Dev

To try to connect to PostgreSQL in dev, we can create a little docker compose file to try things out.

`postgres.docker-compose.yaml`

```yaml
networks:
  pg:
    driver: bridge
    external: true
services:
  postgres:
    container_name: postgres
    image: postgres:15
    networks:
      - pg
    env_file:
      - .env
    ports:
      - "5432:5432"
```

Run the docker compose file with this:

```bash
docker compose -f postgres.docker-compose.yaml up -d
```

### Session

For your application to hook up to postgres and sessions to be managed properly, we need to modify our `.env`, `app.conf`, and `InitDB` function from models. 
Then, you will need to manually create a session table.

For right now in dev, the credentials can just be `your_username` and `your_password`. These will obviously change for production.

`.env`

```sh
DATABASE_DRIVER=postgres # sqlite3
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_username?sslmode=disable
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

`app.conf`

```sh
appname = myapp
httpport = 8080
runmode = prod
sessionon = true

# Enable logging
loglevel = info  # Adjust as needed
logfile = /var/log/app.log  # Path to log file

# Session configuration
sessionprovider = postgresql  
sessionproviderconfig = postgres://your_username:your_password@localhost:5432/your_username?sslmode=disable
sessioncookie = true
sessiongcmaxlifetime = 3600  # Session lifetime in seconds

# Security settings
allowcrossdomain = false  # Set to true if you need CORS
```

`main.go`

For your session to be stored on postgres, you need to make sure you add this import to `main.go`.

```go
_ "github.com/beego/beego/v2/server/web/session/postgres"
```

`models/default.go`

Make sure to add the `pq` import so that you can Postgres.

```go
package models

import (
	"log"
	"os"

	"github.com/beego/beego/v2/client/orm"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
)
```

Then, your `InitDB` should look like this.

```go
func InitDB() {
	// NEW: Configure database from env
	driverName := os.Getenv("DATABASE_DRIVER")
	dataSource := os.Getenv("DATABASE_URL")
	driver := orm.DRSqlite
	if driverName == "postgres" {
		driver = orm.DRPostgres
	} else {
		driverName = "sqlite3"
		dataSource = "./myapp.db"
	}
	orm.RegisterDriver(driverName, driver)
	orm.RegisterDataBase("default", driverName, dataSource)
	// You already have this part.
	orm.RegisterModel(
		new(ContactModel),
        	new(User),
	)
	O = orm.NewOrm()

	err := orm.RunSyncdb("default", false, true)
	if err != nil {
		log.Fatalf("Failed to sync database: %v", err)
	}
	// NEW: Create session table
	if driverName == "postgres" {
		_, err = O.Raw(`CREATE TABLE IF NOT EXISTS "session" (
			"session_key" CHAR(64) NOT NULL,
			"session_data" BYTEA,
			"session_expiry" TIMESTAMP NOT NULL,
			PRIMARY KEY ("session_key")
		);`).Exec()
		if err != nil {
			fmt.Println("table `session` created")
		} else {
			fmt.Println("`session` table not created, application may not work")
		}
	}
}
```

Test locally with:

```sh
docker compose -f postgres.docker-compose.yaml up -d
bee run
```

## Production database

You need to create a Postgres Database. First, create a username and password. Each should be randomly generated, and it is nice if the username is lowercase. Therefore, running a command like this should get you what you need: 

```sh
openssl rand -hex 20
```

Here is a script, make a file like `create_db.sh` and run with `sh create_db.sh`. You will only need to create a production database once.

```sh
touch create_db.sh
echo "create_db.sh" >> .gitignore
```

File contents of `create_db.sh`:

```sh
# Set these yourself
# It is nice to be lowercase/numeric (no caps), so I'd recommend generating with
# NEW_USER=$(openssl rand -hex 20)
NEW_USER=abcdefd566beb912fa25701cda117894b5e8fd5f
NEW_PASS=abcdef0af13364f51f80a8ee4b0f89011db96382
# Run this to create the database
docker exec -it postgres sh -c "psql -U \$POSTGRES_USER -c 'CREATE DATABASE \"$NEW_USER\"'; \
psql -U \$POSTGRES_USER -d \"$NEW_USER\" -c 'CREATE USER \"$NEW_USER\" WITH PASSWORD '\''$NEW_PASS'\'';'; \
psql -U \$POSTGRES_USER -d \"$NEW_USER\" -c 'GRANT ALL PRIVILEGES ON DATABASE \"$NEW_USER\" TO \"$NEW_USER\";'; \
psql -U \$POSTGRES_USER -d \"$NEW_USER\" -c 'GRANT USAGE, CREATE ON SCHEMA public TO \"$NEW_USER\";'; \
psql -U \$POSTGRES_USER -d \"$NEW_USER\" -c 'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO \"$NEW_USER\";'"
```

### Conf and env with production database

Make a production conf file based on your `app.conf`.

```sh 
cp conf/app.conf conf/prod.conf
echo "conf/prod.conf" >> .gitignore
```

Modify `conf/prod.conf` to have your production database creds. Ensure that you replace `USERNAME` and `PASSWORD` with your generated credentials.

```
sessionproviderconfig = postgres://USERNAME:PASSWORD@postgres:5432/USERNAME?sslmode=disable
```

Also make a `.env.prod`

```sh
cp .env .env.prod
echo ".env.prod" >> .gitignore
```

Modify it to have your variables.

```sh
DATABASE_DRIVER=postgres # sqlite3
DATABASE_URL=postgres://USERNAME:PASSWORD@postgres:5432/PASSWORD?sslmode=disable
POSTGRES_USER=USERNAME
POSTGRES_PASSWORD=PASSWORD
```

Modify `Dockerfile` to use the `prod.conf`.

```Dockerfile
# Copy the rest of the application code from host to image
COPY . .
# NEW: Overwrite the app.conf with prod version
COPY ./conf/prod.conf ./conf/app.conf 

#### .........
# Ensure you have all of these COPY statements.
COPY --from=builder /app/server .
COPY --from=builder /app/static ./static/
COPY --from=builder /app/views ./views/
COPY --from=builder /app/conf/app.conf ./conf/
COPY --from=builder /app/go.* .
COPY --from=builder /app/scripts ./scripts/
COPY .env.prod .env
```

Deploy and see if it works!

You can create a user with:

```sh
CONTAINER_NAME=myapp
docker exec -it $CONTAINER_NAME go run scripts/create_user.go
```
