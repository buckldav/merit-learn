---
layout: default
title:  Beego Part 1 - MVC Web Development
parent: Golang
nav_order: 2
---

# Beego Part 1 - MVC Web Development

One common use case for Go is web development. Typically, web development is done with a *framework*. Frameworks build some abstractions and tooling on top of base Go modules like [`net/http`](https://pkg.go.dev/golang.org/x/net/http) and [`html/template`](https://pkg.go.dev/html/template).

| **Framework** | **Description**                                   | **Key Features**                                   | **Performance** | **Use Cases**                          |
|---------------|---------------------------------------------------|---------------------------------------------------|-----------------|----------------------------------------|
| **Gin**       | A lightweight web framework for building APIs.    | Fast, middleware support, JSON validation, routing | High            | RESTful APIs, microservices            |
| **Fiber**     | An Express-inspired web framework for Go.         | Fast, minimalistic, middleware support, easy to use | Very High       | Web applications, APIs, real-time apps |
| **Echo**      | A high-performance, extensible web framework.     | Middleware support, data binding, validation      | High            | RESTful APIs, web applications         |
| **Beego**     | An MVC framework for rapid development.           | Built-in ORM, RESTful support, admin interface    | Moderate        | Full-stack applications, APIs          |
| **Chi**       | A lightweight, idiomatic router for Go.           | Middleware support, composable routing            | High            | Microservices, modular applications     |

## What is the MVC pattern?

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/DUg2SWWK18I?si=6ri0HIx-MOWBo8gn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Setup an MVC application with Beego

### 1. Installing Beego and Creating a Project

[https://beegodoc.com/en-US/developing/#quick-start](https://beegodoc.com/en-US/developing/#quick-start)

**Bee** is a CLI for creating Beego applications.

```bash
go install github.com/beego/bee/v2@latest
# see if it worked
bee version
```

Create a project.

```bash
# create a project called "queenbee", it can be whatever name
bee new queenbee 
cd queenbee
# this is the magic "make sure packages are installed" command
go mod tidy
```

### 2. Understanding the Project Structure

```tree
.
├── conf
│   └── app.conf
├── controllers
│   └── default.go
├── go.mod
├── go.sum
├── main.go
├── models
├── routers
│   └── router.go
├── static
│   ├── css
│   ├── img
│   └── js
│       └── reload.min.js
├── tests
│   └── default_test.go
└── views
    └── index.tpl

11 directories, 9 files
```

Notice that Beego follows the MVC pattern, there are directories for `models`, `views`, and `controllers`. There is also a directory for the `routers`, which connect controllers and views to routes (paths in the URL).

Run the application with `bee run`.

Navigate the code structure to find where the HTML is coming from. Questions to answer:

- Where is the HTML?
- What ensures that file is served at the index path `/`?

## Add a Layout and Use Templates

We are going to take advantage of templating to make a layout that all pages can use. This will make sure they all have the same navbar, etc.

`./views/layout.tpl`

```html
<!DOCTYPE html>
<html>
<head>
    <title>{{ '{{' }} .Title }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="{{ '{{' }}.BaseUrl}}/static/css/output.css">
     {{ '{{' }} block "css" . }}{{ '{{' }} end }}
</head>
<body>
    <header>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </header>
    <div>
        {{ '{{' }} block "content" . }}{{ '{{' }} end }}
    </div>
    {{ '{{' }} block "js" . }}{{ '{{' }} end }}
</body>
</html>
```

`./views/index.tpl` - Change the file to have just this content.

```html
{{ '{{' }} template "layout.tpl" . }}
{{ '{{' }} define "content" }}
        <h2>{{ '{{' }} .Title }}</h2>
        <p>Welcome to the Home Page!</p>
{{ '{{' }} end }}
```

Notice that the layout template has a `block "content"` section that will be later *defined* by each page that uses that template. 

We also have a variable `.Title` that is expected from the server. With server-side rendering templates (common across many languages, not just Go), you can send data to the template from the controller. 

`./controllers/default.go`

```go
package controllers

import (
    beego "github.com/beego/beego/v2/server/web"
)

type MainController struct {
    beego.Controller
}

// TODO: modify the Get() http handler to render the "Title"
func (c *MainController) Get() {
    // matches with {{ '{{' }} .Title }} in index.tpl and layout.tpl
    c.Data["Title"] = "Home"
    c.TplName = "index.tpl"
}
```

## Adding Another Page

Challenge: How would you add an "About Page" at `/about`?

<details markdown="block">
  <summary>Show Answer (Controller)</summary>

Here is a possible solution.

<code>./controllers/default.go</code>

```golang
package controllers

import (
    beego "github.com/beego/beego/v2/server/web"
)

type MainController struct {
    beego.Controller
}

func (c *MainController) Get() {
    c.Data["Title"] = "Home"
    c.TplName = "index.tpl"
}

type AboutController struct {
    beego.Controller
}

func (c *AboutController) Get() {
    c.Data["Title"] = "About"
    c.TplName = "about.tpl"
}
```

</details>

<details markdown="block">
  <summary>Show Answer (View)</summary>

Here is a possible solution.

<code>./views/about.tpl</code>

```html
{{ '{{' }} template "layout.tpl" . }}
{{ '{{' }} define "content" }}
    <h2>{{ '{{' }} .Title }}</h2>
    <p>Welcome to the About Page!</p>
{{ '{{' }} end }}
```

</details>

<details markdown="block">
  <summary>Show Answer (Router)</summary>

Here is a possible solution.

<code>./routers/router.go</code>

```golang
package routers

import (
	"queenbee/controllers"
	beego "github.com/beego/beego/v2/server/web"
)

func init() {
    beego.Router("/", &controllers.MainController{})
    beego.Router("/about", &controllers.AboutController{})
}
```

</details>
