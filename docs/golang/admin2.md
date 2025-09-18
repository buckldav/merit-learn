---
layout: default
title: Beego Part 6 - Users and Admin Interface Part 2
parent: Golang
nav_order: 7
---

# Users and Admin Interface Part 2

In this section, we will create a <abbr title="Create, Read, Update, Delete">CRUD</abbr> interface to manage contacts.

`controllers/crud.go`

```go
package controllers

import (
	"fmt"
	"queenbee/models"
	"reflect"
	"strconv"
)

type ContactListController struct {
	BaseAdminController
}

type ContactDetailController struct {
	BaseAdminController
}

// READ HELPERS
type Item struct {
	Key   string
	Value any // Using 'any' to allow any type for Value
}

// Function to convert struct to ordered data based on struct field order
func structToOrderedData(v any) []Item {
	var orderedData []Item
	// Use reflection to get the value and type of the struct
	val := reflect.ValueOf(v)
	typ := val.Type()
	// Iterate over the struct fields in their defined order
	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fieldType := typ.Field(i)
		orderedData = append(orderedData, Item{Key: fieldType.Name, Value: field.Interface()})
	}
	return orderedData
}

func read(c *BaseAdminController, createModel func(id uint64) any) any {
	idStr := c.Ctx.Input.Param(":id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.Ctx.Output.SetStatus(400) // Bad Request
		c.Data["json"] = map[string]string{"error": "Invalid ID"}
		c.ServeJSON()
		return nil
	}

	ptr := createModel(id)
	err = models.O.Read(ptr)
	if err != nil {
		c.Ctx.Output.SetStatus(404)
		c.Data["json"] = map[string]string{"error": "Not Found"}
		c.ServeJSON()
		return nil
	}

	return ptr
}

// List
func (c *ContactListController) Get() {
	c.RequireAuth()

	c.Data["Title"] = "Contacts"
	c.TplName = "admin/list.tpl"
	q := models.O.QueryTable("contact_model")
	var contacts []*models.ContactModel
	q.All(&contacts)
	var l [][]Item
	for _, contact := range contacts {
		l = append(l, structToOrderedData(*contact))
	}
	c.Data["List"] = l
	c.Data["BaseHref"] = "/admin/contacts"
}

// Create (NOT IMPLEMENTED)
// func (c *ContactListController) Post() {
// 	c.RequireAuth()

// 	c.Data["Title"] = "Contacts"
// 	c.TplName = "admin/create.tpl"
// }

// Read
func (c *ContactDetailController) Get() {
	c.RequireAuth()

	c.Data["Title"] = "Contacts"
	c.TplName = "admin/read.tpl"

	contact := read(&c.BaseAdminController, func(id uint64) any {
		contact := &models.ContactModel{Id: id}
		return (any)(contact)
	})

	if m, ok := contact.(*models.ContactModel); ok {
		val := structToOrderedData(*m)
		c.Data["Title"] = fmt.Sprintf("Contact %d", m.Id)
		c.Data["Item"] = val
		c.Data["Id"] = m.Id
		c.Data["BaseHref"] = "/admin/contacts"
	}
}

// Update (NOT IMPLEMENTED)
// func (c *ContactDetailController) Post() {
// 	c.RequireAuth()

// 	c.Data["Title"] = "Contacts"
// 	c.TplName = "admin/update.tpl"
// }

// Delete
func (c *ContactDetailController) Delete() {
	c.RequireAuth()

	idStr := c.Ctx.Input.Param(":id")
	id, _ := strconv.ParseUint(idStr, 10, 64)
	contact := &models.ContactModel{Id: id}
	_, err := models.O.Delete(contact)
	fmt.Println(err)
	c.Data["Title"] = "Contacts"
}
```

`routers/router.go`

Add these two routes.

```go
beego.Router("/admin/contacts/:id", &controllers.ContactDetailController{})
beego.Router("/admin/contacts", &controllers.ContactListController{})
```

`admin/read.go`

```html
{{ '{{' }} template "admin/layout.tpl" . }}
{{ '{{' }} define "content" }}
<h1 class="text-4xl">{{ '{{' }}.Title}}</h1>

<button class="btn btn-error" onclick="fetch(window.location.href, {method:'DELETE'}).then(()=>{window.location.href = {{ '{{' }}.BaseHref}}})">BALEETED!</button>
<table class="table w-full mt-4">
  <thead>
    <tr>
      <th class="bg-gray-200">Key</th>
      <th class="bg-gray-200">Value</th>
    </tr>
  </thead>
  <tbody>
    {{ '{{' }}range .Item}}
    <tr>
      <td class="border px-4 py-2">{{ '{{' }}.Key}}</td>
      <td class="border px-4 py-2">{{ '{{' }}.Value}}</td>
    </tr>
    {{ '{{' }}end}}
  </tbody>
</table>
{{ '{{' }} end }}
```

`admin/list.tpl`

```html
{{ '{{' }} template "admin/layout.tpl" . }}
{{ '{{' }} define "content" }}
<h1 class="text-4xl">{{ '{{' }}.Title}}</h1>
<table class="table w-full">
  {{ '{{' }}if eq (len .List) 0}} 
  <tr>
    <td colspan="3">No records</td> 
  </tr>
  {{ '{{' }}else}}
  <thead>
    <tr>
    {{ '{{' }}range index .List 0}}
      <th class="bg-gray-200">{{ '{{' }}.Key}}</th>
    {{ '{{' }}end}}
    </tr>
  </thead>
  <tbody>
    {{ '{{' }}range .List}}
    <tr>
    {{ '{{' }}range .}}
      {{ '{{' }}if eq .Key "Id"}}
        <td class="border px-4 py-2">
        <a href="{{ '{{' }}$.BaseHref}}/{{ '{{' }}.Value}}">
        {{ '{{' }}.Value}}
        </a>
        </td>
      </a>
      {{ '{{' }}else}}
        <td class="border px-4 py-2">{{ '{{' }}.Value}}</td>
      {{ '{{' }}end}}
    {{ '{{' }}end}}
    </tr>
    </a>
    {{ '{{' }}end}}
  </tbody>
  {{ '{{' }}end}}
</table>
{{ '{{' }} end }}
```
