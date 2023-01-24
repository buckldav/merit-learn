---
layout: default
title: Objects in Python
nav_order: "01"
parent: Learn Python
---

# Objects in Python

## Intro to Objects

A object is a data structure that can encapsulate variables and functions into a single entity. For example, strings are objects in Python. Here's a simplified look at it.

```python
name = "Jeff"

# The dot operator (.) allows you to access variables and functions from the object.
name.lower() # jeff
name.upper() # JEFF
```

## Constructors

Many objects are created by calling a special function called a **constructor**. For example, when using Python's turtle library, the constructor `Turtle()` creates a Turtle object that you can store in a variable. In below code, three Turtle objects are instantiated. Each has a different color and gets displaced a different amount.

```py
import turtle

t1 = turtle.Turtle()
t2 = turtle.Turtle()
t3 = turtle.Turtle()

t1.color("red")
t1.goto(30, 0)
t2.color("green")
t2.goto(20, 0)
t3.color("blue")
t3.goto(10, 0)
```

![Turtle instances](/assets/images/python/objects/instances.png)

## Write a Shape Class

**Classes** contain the logic for instantiating (creating) objects. Here's an example of a `Shape` class that draws a dot at `x, y`.

```python
import turtle

class Shape:
  def __init__(self, x, y):
    self.x = x
    self.y = y
    self.t = turtle.Turtle()
    self.t.hideturtle()
    self.t.penup()
    self.t.speed(0)
    self.t.setpos(self.x, self.y)

  def draw(self):
    self.t.dot()

# Make a Shape at x=50, y=10
s1 = Shape(50, 10)
s1.draw()
# Make as many shapes as you want
s2 = Shape(-30, 10)
s2.draw()
```

- The `__init__` function is the **constructor** definition and is what gets called with `Shape(x, y)`.
- The `self` property holds all of the variables of the object. The first parameter of every function in a class should have `self` as the first parameter.

Try instantiating different shapes and calling their `draw()` functions.

## Triangle Class

One useful feature of classes is that they can share implementations through inheritance. A Triangle is a Shape in that it has a Turtle (`self.t`) and an `x, y` position. Triangles also have a size, which is the side length of one of their segments.

### Inheritance

To inherit from a class, the following pattern is used:

```py
class ChildClass(ParentClass):
    pass

# Triangle is a child of Shape, and inherits Shape's functionality
class Triangle(Shape):
    pass
```

### Child Constructors and `super()`

In the constructor for the Triangle class (`__init__`), calling the `super()` function accesses the parent class (Shape), which you can initialize with `super().__init__(x, y)`.

```python
class Triangle(Shape):
  def __init__(self, x, y, size):
    # Calls the Shape constructor
    super().__init__(x, y)
    # Set the size of the triangle
    self.size = size
```

By calling `super()`, a Triangle now has the following members: `self.t`, `self.x`, and `self.y` in addition to its own `self.size` variable. It also moves the turtle into position at based on `self.x` and `self.y`.

### Full Triangle Code

Now, let's **override** the `draw()` function to draw a triangle based on the `self.size`.

```python
class Triangle(Shape):
  def __init__(self, x, y, size):
    super().__init__(x, y)
    self.size = size

  def draw(self):
    self.t.pendown()
    self.t.forward(self.size)
    self.t.right(120)
    self.t.forward(self.size)
    self.t.right(120)
    self.t.forward(self.size)

t1 = Triangle(-10, -10, 30)
t1.draw()

t2 = Triangle(0, 50, 30)
t2.draw()
```

![Triangles](/assets/images/python/objects/triangles.png)

## Composite Class with Multiple Shapes (Draw a Monster)

We can use these classes like building blocks to create small images. This Monster (pictured below) is made up of two Shapes (dots) and four Triangles.

![Monster](/assets/images/python/objects/monster.png)

Here's the implementation. Notice that the monster does not need to inherit from `Shape` because it has lots of Shapes in it that can draw themselves.

```python
class Monster():
  def __init__(self, x, y, size):
    self.teeth = [
      Triangle(x, y, size),
      Triangle(x+size, y, size),
      Triangle(x+size*2, y, size),
      Triangle(x+size*3, y, size),
    ]
    self.eyes = [
      Shape(x+size, y+size),
      Shape(x+size*3, y+size),
    ]

  def draw(self):
    for tooth in self.teeth:
      tooth.draw()
    for eye in self.eyes:
      eye.draw()

m = Monster(-200, 0, 20)
m.draw()
```

## Challenge

Create your own Shape child class (i.e. Square, Circle, etc.) and your own Composite Class (i.e. JackOLantern, SmileyFace, etc.)

[Turtle docs](https://docs.python.org/3/library/turtle.html)
