---
layout: default
title: Beego Part 8 - Deploy Part 2
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

`.env`

```sh
DATABASE_DRIVER=postgres # sqlite3
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_username?sslmode=disable
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

`app.conf`

```sh
appname = stopwatch
httpport = 8080
runmode = prod
sessionon = true

# Enable logging
loglevel = info  # Adjust as needed
logfile = /var/log/app.log  # Path to log file

# Session configuration
sessionprovider = postgresql  
sessionproviderconfig = postgres://your_username:your_password@postgres/your_username?sslmode=false
sessioncookie = true
sessiongcmaxlifetime = 3600  # Session lifetime in seconds

# Security settings
allowcrossdomain = false  # Set to true if you need CORS
```

`models/default.go`

Make sure to add the `pq` import so that you can Postgres.

```go
package models

import (
	"log"
	"os"
	"time"

	"github.com/beego/beego/v2/client/orm"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
)
```

Then, your `InitDB` should look like this.

```go
func InitDB() {
	driverName := os.Getenv("DATABASE_DRIVER")
	dataSource := os.Getenv("DATABASE_URL")
	driver := orm.DRSqlite
	if driverName == "postgres" {
		driver = orm.DRPostgres
	} else {
		driverName = "sqlite3"
		dataSource = "./stopwatch.db"
	}
	orm.RegisterDriver(driverName, driver)
	orm.RegisterDataBase("default", driverName, dataSource)
	orm.RegisterModel(
    	new(ContactModel),
    	new(User),
	)
	O = orm.NewOrm()

	err := orm.RunSyncdb("default", false, true)
	if err != nil {
		log.Fatalf("Failed to sync database: %v", err)
	}
}
```
