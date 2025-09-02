---
layout: default
title: Intro to Go
parent: Golang
nav_order: 1
---

# Intro to Go

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/446E-r0rXHI?si=tdhwhe1CiRR69fQV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Some Examples

*Examples taken from [https://gobyexample.com/](https://gobyexample.com/). Here are a few key examples linked below.*

- [Variables](https://gobyexample.com/variables)
- [Functions](https://gobyexample.com/functions)
- [Pointers](https://gobyexample.com/pointers)
- [Structs](https://gobyexample.com/structs)
- [Errors](https://gobyexample.com/errors)

Here’s a table that outlines common data types in Go, along with their descriptions and examples:

| **Data Type** | **Description**                          | **Example**          |
|---------------|------------------------------------------|----------------------|
| **int**       | A signed integer type.                   | `var x int = 42`     |
| **float64**   | A double-precision floating-point type. | `var y float64 = 3.14`|
| **string**    | A sequence of characters.                | `var name string = "Alice"` |
| **bool**      | A boolean type, can be true or false.   | `var isActive bool = true` |
| **byte**      | An alias for `uint8`, represents a byte. | `var b byte = 'A'`   |
| **rune**      | An alias for `int32`, represents a Unicode code point. | `var r rune = 'A'` |
| **array**     | A fixed-size sequence of elements of the same type. | `var arr [3]int = [3]int{1, 2, 3}` |
| **slice**     | A dynamically-sized sequence of elements of the same type. | `var s []int = []int{1, 2, 3}` |
| **map**       | A collection of key-value pairs.        | `var m map[string]int = map[string]int{"one": 1, "two": 2}` |
| **struct**    | A composite data type that groups together variables. | `type Person struct { Name string; Age int }` |

This table provides a clear overview of the fundamental data types in Go, along with examples to illustrate their usage. If you have any specific questions about these data types or need further details, feel free to ask!

## Some Resources

[Create Module Tutorial](https://go.dev/doc/tutorial/create-module)
