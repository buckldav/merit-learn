---
layout: default
title: Beego Part 5 - Users and Admin Interface Part 1
parent: Golang
nav_order: 6
---

# Users and Admin Interface Part 1

Intro video: How are passwords cracked? Watch at least the first 7 minutes.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/7U-RbOKanYs?si=_nzNBXK1_t3ShzLw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Password Crytography

It's a bad idea to store passwords in plaintext <sup><i>[citation needed]</i></sup>. We will use `bcrypt`, a common and easy to implement [hashing algorithm](https://www.authgear.com/post/password-hashing-how-to-pick-the-right-hashing-function) to encrypt user passwords. Hashing algorithms are one-way cryptography, meaning that you can't undo the encryption. When users authenticate, their password input is hashed and compared with the hash stored on the database.

New folder and file: `utils/password.go`.

```go
package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password []byte) (string, error) {
	// Generate a hash
	hash, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	return string(hash), nil
}

/*
* Returns true if validated.
 */
func CheckPassword(hashedPassword []byte, password []byte) bool {
	return bcrypt.CompareHashAndPassword(hashedPassword, password) == nil
}
```

## User Model

We need to make a User model that can be saved to the database.

`models/default.go`

```go
type User struct {
	Id       uint64 `orm:"auto"` // this automatically creates an integer primary key
	Name     string `orm:"size(100)"`
	Email    string `orm:"size(255);unique"`
	Password string `orm:"size(255)"`
}
```

<details markdown="block">
  <summary>What does a more complex User model look like?</summary>

  Here is an example. 

```go
type User struct {
	Id       uint64 `orm:"auto"` // this automatically creates an integer primary key
	Name     string `orm:"size(100)"`
	Email    string `orm:"size(255);unique"`
	Password string `orm:"size(255)"`

	IsAdmin   bool // separate admin users from regular users
	IsDeleted bool // some applications "soft delete" (keep data)
	
	CreatedAt time.Time `orm:"auto_now_add;type(datetime)"`
	UpdatedAt time.Time `orm:"auto_now;type(datetime)"`
}
```

</details>


When initializing the database, you will need to add the User model.

```diff
- orm.RegisterModel(new(ContactModel))
+ orm.RegisterModel(new(ContactModel), new(User))
```

## Create User Script

This application will not have public registration. Therefore, we can create users with a script. Let's start by writing a utility function that ensures that the user password gets hashed on save to database.

`utils/user.go`

```go
package utils

import (
	"errors"
	"queenbee/models"
)

type LoginReq struct {
	Email    string `form:"email"`
	Password string `form:"password"`
}

func SaveUser(user *models.User) (*models.User, error) {
	hashed, err := HashPassword([]byte(user.Password))
	if err != nil {
		return nil, err
	}
	user.Password = hashed
	id, err := models.O.Insert(user)
	if err != nil {
		return nil, err
	}
	user.Id = uint64(id)
	return user, nil
}

func GetUserByEmail(email string) (*models.User, error) {
	user := models.User{Email: email}
	err := models.O.Read(&user, "Email")
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func Authenticate(login *LoginReq) (*models.User, error) {
	user, err := GetUserByEmail(login.Email)
	if err != nil {
		return nil, err
	}
	if CheckPassword([]byte(user.Password), []byte(login.Password)) {
		return user, nil
	} else {
		err = errors.New("password validation failed.")
		return nil, err
	}
}
```

Then, we can write a script to create a user on the command line. Here are a few concepts the script uses.

- `readName()`: Uses a buffer from `bufio.Reader` to get user input from the command line. The reader includes the `\n` (newline) character, so that gets trimmed on the following line with `strings.TrimSpace`. If there is an error, the programs exits with a code 1. In general, code 0 is "OK" and everything else greater than 0 is an error.  
- `readEmail()`: Regular expression matching: Ensures that user input matches a certain format. In this case, we are matching against a pattern for email to make sure it's a real email.
- `readPassword()`: Uses a hidden input function called `term.ReadPassword` to read the password and then does a check to make sure they entered it correctly and that the password is sufficiently long. 

`scripts/create_user.go`

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"queenbee/models"
	"queenbee/utils"
	"regexp"
	"strings"

	"golang.org/x/term"
)

func readName(reader *bufio.Reader) string {
	fmt.Print("Full Name: ")
	name, err := reader.ReadString('\n')
	name = strings.TrimSpace(name)
	if err != nil {
		fmt.Println("Error reading input:", err)
		os.Exit(1)
	}
	return name
}

func readEmail(reader *bufio.Reader) string {
	fmt.Print("Email: ")
	email, err := reader.ReadString('\n')
	email = strings.TrimSpace(email)
	if err != nil {
		fmt.Println("Error reading input:", err)
		os.Exit(1)
	}
	// Define a regex pattern (e.g., to match an email address)
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`
	// Compile the regex
	regex := regexp.MustCompile(pattern)
	if !regex.MatchString(email) {
		fmt.Println("The input is NOT a valid email address.")
		os.Exit(1)
	}
	return email
}

func readPassword() string {
	const PASSWORD_LENGTH = 8
	fmt.Print("Password: ")
	passbyte, err := term.ReadPassword(int(os.Stdin.Fd()))
	if err != nil {
		fmt.Println("Error reading input:", err)
		os.Exit(1)
	}
	fmt.Print("\nConfirm Password: ")
	passbyte2, err := term.ReadPassword(int(os.Stdin.Fd()))
	if err != nil {
		fmt.Println("Error reading input:", err)
		os.Exit(1)
	}
	password, password2 := string(passbyte), string(passbyte2)
	if password != password2 {
		fmt.Println("Passwords do not match.")
		os.Exit(1)
	}
	if len(password) < PASSWORD_LENGTH {
		fmt.Printf("Password must be %d characters or more in length.\n", PASSWORD_LENGTH)
		os.Exit(1)
	}
	return password
}

func main() {
	models.InitDB()

	fmt.Println("Create User")
	reader := bufio.NewReader(os.Stdin)
	name := readName(reader)
	email := readEmail(reader)
	password := readPassword()

	// Create User
	user := models.User{
		Email:    email,
		Name:     name,
		Password: password,
	}
	_, err := utils.SaveUser(&user)
	if err != nil {
		fmt.Println("Error saving user: " + err.Error())
		os.Exit(1)
	} else {
		fmt.Println("User created successfully!")
	}
}
```

**To execute the script, use `go run scripts/create_user.go`.**

## User Login and Session

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/UBUNrFtufWo?si=ulZ7fJME68UnUQxv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Session authentication is how we can authorize logged-in users. When a user logs in, a session is created on the server and the ID is stored in a cookie and sent to the browser. On subsequent requests, the cookie is used to match with the user's session and authorize the user.

<details markdown="block">
  <summary>What is the difference between authentication and authorization?</summary>

  - Authentication is when a user logs in, typically with a credential like a password. Happens one time. Provides the user with a session or token
  - Authorization is when a user presents a session cookie or token header in a request and the server allows them access to their resources.

</details>


In this application, we will use [beego's session module](https://beegodoc.com/en-US/developing/web/session/). In `conf/app.conf`, enable session and we will use file-based sessions in development. In production, we will use PostgreSQL.

`conf/app.conf`

```sh
appname = queenbee
httpport = 8080
runmode = dev

# Session configuration
sessionon = true
sessionname = "queenbeesessionid"
sessiongcmaxlifetime = 3600
sessionprovider = "memory"
sessioncookielifetime = 3600
sessioncookiehttponly = true
sessioncookiesecure = false
sessiondomain = ""
sessioncookiepath = "/"
```

### Admin Layout and Templates

In a new layout file, we will display the logged in user in the navigation bar.

`views/admin/layout.tpl`

```html
<!DOCTYPE html>
<html data-theme="emerald">
<head>
<title>{{ '{{' }} .Title }}</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="{{ '{{' }}.BaseUrl}}/static/css/output.css">
{{ '{{' }} block "css" . }}{{ '{{' }} end }}
</head>
<body>
<header class="navbar bg-base-100 shadow-lg mb-4">
  <div class="navbar-start">
    <div class="flex gap-2">
      <a class="link link-primary" href="/">Home</a>
      <a class="link link-primary" href="/about">About</a>
      <a class="link link-primary" href="/contact">Contact</a>
    </div>
  </div>
  
  <div class="navbar-end">
    {{ '{{' }} if .IsLoggedIn }}
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 h-10 rounded-full bg-primary text-primary-content">
            {{ '{{' }} if .User }}
              <span class="sr-only">{{ '{{' }} .User.Email }}</span>
            {{ '{{' }} end }}
            <svg
              style="margin: 7px;"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <path d="M16 16c4.418 0 8-3.582 8-8S20.418 0 16 0 8 3.582 8 8s3.582 8 8 8z"/>
              <path d="M4 32c0-6.627 5.373-12 12-12s12 5.373 12 12"/>
            </svg>
        </div>
      </div>
      <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li class="menu-title">
          <span>Welcome, {{ '{{' }} .User.Name}}!</span>
        </li>
        <li><a href="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          Profile
        </a></li>
        <li><a href="/admin/logout" class="text-error">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
          </svg>
          Logout
        </a></li>
      </ul>
    </div>
    {{ '{{' }} else }}
    <div class="flex gap-2">
      <a href="/admin/login" class="btn btn-ghost">Login</a>
    </div>
    {{ '{{' }} end }}
  </div>
</header>

<div class="container mx-auto px-4">
{{ '{{' }} block "content" . }}{{ '{{' }} end }}
</div>

{{ '{{' }} block "js" . }}{{ '{{' }} end }}
</body>
</html>
```

Then, we will make a few templates.

`views/admin/index.tpl`

```html
{{ '{{' }} template "admin/layout.tpl" . }}
{{ '{{' }} define "content" }}
<h1 class="text-4xl">Admin</h1>
{{ '{{' }} end }}
```

`views/admin/login.tpl`

```html
{{ '{{' }} template "admin/layout.tpl" . }}
{{ '{{' }} define "content" }}
  <h2 class="text-2xl font-bold mb-4">Login</h2>
  <form method="POST" action="/admin/login">
    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Email</span>
      </label>
      <input type="email" name="email" placeholder="Your Email" class="input input-bordered" required />
    </div>
    <div class="form-control mb-4">
      <label class="label">
        <span class="label-text">Password</span>
      </label>
      <input type="password" name="password" class="input input-bordered" required />
    </div>
    <div class="form-control">
      <button type="submit" class="btn btn-primary">Log In</button>
    </div>
  </form>
  {{ '{{' }} if .Result }}
    <div role="alert" class="alert mt-4 pe-8 w-fit">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>{{ '{{' }} .Result }}</span>
    </div>
  {{ '{{' }} end }}
{{ '{{' }} end }}
```

### Admin Controllers

We will make a `BaseAdminController` and use <abbr title="Creating a base data structure with attributes that can be utilized by children data structures.">inheritance</abbr> to allow all children controllers to share user-related functionality.

`controllers/admin.go`

```go
package controllers

import (
	"queenbee/models"
	"queenbee/utils"

	beego "github.com/beego/beego/v2/server/web"
)

type BaseAdminController struct {
	beego.Controller
}

// Prepare runs before every request
func (c *BaseAdminController) Prepare() {
	// Set common template data
	c.setCommonData()
}

// Set common data for all templates
func (c *BaseAdminController) setCommonData() {
	// Check if user is logged in and set template variables
	if c.IsLoggedIn() {
		user := c.GetCurrentUser()
		c.Data["IsLoggedIn"] = true
		c.Data["User"] = user
	} else {
		c.Data["IsLoggedIn"] = false
		c.Data["User"] = nil
	}
}

// Check if user is logged in
func (c *BaseAdminController) IsLoggedIn() bool {
	user := c.GetSession("user")
	return user != nil
}

// Get current user from session
func (c *BaseAdminController) GetCurrentUser() *models.User {
	userSession := c.GetSession("user")
	if userSession == nil {
		return nil
	}

	// Assuming you store user info in session
	if user, ok := userSession.(models.User); ok {
		return &user
	}
	return nil
}

// RequireAuth middleware - add this to controllers that need authentication
func (c *BaseAdminController) RequireAuth() {
	if !c.IsLoggedIn() {
		// Store the current URL for redirect after login
		c.SetSession("redirect_after_login", c.Ctx.Request.URL.Path)
		c.Redirect("/admin/login", 302)
		return
	}
}
```

Here is the code for the `AdminController` and the `LoginController`. You can add this code in the same file (`controllers/admin.go`), below the `RequireAuth` function you just added.

```go
type AdminController struct {
	BaseAdminController
}

func (c *AdminController) Get() {
	c.RequireAuth()
	c.Data["Title"] = "Admin"
	c.TplName = "admin/index.tpl"
}

type LogoutController struct {
	BaseAdminController
}

func (c *LogoutController) Get() {
	c.DestroySession()
	c.Redirect("/admin/login", 302)
}

type LoginController struct {
	BaseAdminController
}

func (c *LoginController) Get() {
	c.Data["Title"] = "Login"
	c.TplName = "admin/login.tpl"
}

func (c *LoginController) Post() {
	c.Data["Title"] = "Login"
	c.TplName = "admin/login.tpl"

	loginreq := utils.LoginReq{}
	err := c.Ctx.BindForm(&loginreq)
	if err != nil {
		c.Data["Result"] = "ERROR: " + err.Error()
	} else if loginreq.Email == "" || loginreq.Password == "" {
		c.Data["Result"] = "ERROR: Please enter all values."
	} else {
		// authenticate
		user, err := utils.Authenticate(&loginreq)
		if err != nil {
			c.Data["Result"] = "ERROR: " + err.Error()
		} else {
			// create session
			c.SetSession("user", *user)

			// redirect
			path := c.GetSession("redirect_after_login")
			if path != nil {
				if path, ok := path.(string); ok {
					c.Redirect(path, 302)
				}
			}
			c.Redirect("/admin", 302)
		}
	}
}
```

### User Profile

Let's add a controller that allows users to see and edit their profile (name and email). The reason why we are using a `Post` handler for editing instead of the more idiomatic `Put` or `Patch` is because the HTML Form that we add later can only do `GET` or `POST` methods without JavaScript or other AJAX-style requests.

```go
type ProfileController struct {
	BaseAdminController
}

func (c *ProfileController) Get() {
	c.RequireAuth()
	c.Data["Title"] = "Profile"
	c.TplName = "profile.tpl"
}

type EditProfile struct {
	Name  string `form:"name"`
	Email string `form:"email"`
}

func (c *ProfileController) Post() {
	c.RequireAuth()
	c.Data["Title"] = "Profile"
	c.TplName = "profile.tpl"

	ep := EditProfile{}
	err := c.Ctx.BindForm(&ep)
	if err != nil {
		c.Data["Result"] = "ERROR: " + err.Error()
	} else if ep.Email == "" || ep.Name == "" {
		c.Data["Result"] = "ERROR: Please enter all values."
	} else {
		user := c.GetCurrentUser()
		user.Name = ep.Name
		user.Email = ep.Email
		_, err := models.O.Update(user, "Name", "Email")
		if err != nil {
			c.Data["Result"] = "ERROR: " + err.Error()
		} else {
			// update the user in the session
			c.SetSession("user", *user)
			c.Data["Result"] = "Profile updated!"
		}
	}

}
```

Here's an accompanying template file.

`views/profile.tpl`

```html
{{ '{{' }} template "admin/layout.tpl" . }}
{{ '{{' }} define "content" }}
<h1 class="text-4xl mb-4">Profile</h1>

<form method="POST" action="/profile">
  <div class="form-control mb-4">
    <label class="label">
      <span class="label-text">Name</span>
    </label>
    <input value="{{ '{{' }}.User.Name}}" type="text" name="name" class="input input-bordered" required />
  </div>
  <div class="form-control mb-4">
    <label class="label">
      <span class="label-text">Email</span>
    </label>
    <input value="{{ '{{' }}.User.Email}}" type="email" name="email" class="input input-bordered" required />
  </div>
  <div class="form-control">
    <button type="submit" class="btn btn-primary">Update Profile</button>
  </div>
</form>  
{{ '{{' }} if .Result }}
  <div role="alert" class="alert mt-4 pe-8 w-fit">
    <svg xmlns="http://www.w4.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>{{ '{{' }} .Result }}</span>
  </div>
{{ '{{' }} end }}
{{ '{{' }} end }}
```

### Routes

Don't forget to add routes and test everything.

`routers/router.go`

```go
package routers

import (
	"queenbee/controllers"

	beego "github.com/beego/beego/v2/server/web"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/about", &controllers.AboutController{})
	beego.Router("/contact", &controllers.ContactController{})
	beego.Router("/profile", &controllers.ProfileController{})
	beego.Router("/admin", &controllers.AdminController{})
	beego.Router("/admin/login", &controllers.LoginController{})
	beego.Router("/admin/logout", &controllers.LogoutController{})
}
```

> Remember, to create a user, run your script with `go run scripts/create_user.go`. 
