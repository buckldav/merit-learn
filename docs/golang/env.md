---
layout: default
title: Beego Part 7 - Environment
parent: Golang
nav_order: 8
---

# Application Environment

For this part of the lesson, explore on your own a little. Make a new Go project in a separate folder for a little proof of concept. Example:

Make a new folder `secretFolder` 
`cd secretFolder`
Make a file called `main.go` in folder

Terminal (in folder) `go mod init secretFolder`

Follow the instructions in [https://github.com/joho/godotenv](https://github.com/joho/godotenv) to make a project that does the following:

- `.env` file with variables
- load file into `main.go`

## Why?

Here are a few reasons why it is a good idea to have an environment for your configuration.

- **Configuration separated from code**: Makes it easy to have a different environment in development and production and to make changes to that environment.
- **Security**: When uploading your code to a version control system (e.g. GitHub), you can ensure that any passwords and secrets are in a separate file and not uploaded to the internet.

## Beego Application Environment

In a Beego Application, we can load our environment in `main.go`. 

```go
package main

import (
	"queenbee/models"
	_ "queenbee/routers"

	beego "github.com/beego/beego/v2/server/web"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	models.InitDB()
	beego.Run()
}
```

Then, you can use any environment variable as needed in your program.

```go
// whatever file
myvar := os.Getenv("MY_VAR")
```
