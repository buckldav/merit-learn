---
layout: default
title: Learn Python
nav_order: "05"
has_children: true
permalink: /docs/python/
---

# Python

_Much of the content below is taken from [https://www.raspberrypi.org/documentation/usage/python/](https://www.raspberrypi.org/documentation/usage/python/)._

## Basic Python usage

Hello world in Python:

```python
print("Hello world")
```

Simple as that!

## Indentation

Some languages use curly braces `{` and `}` to wrap around lines of code which belong together, and leave it to the writer to indent these lines to appear visually nested. However, Python does not use curly braces but instead requires indentation for nesting. For example a `for` loop in Python:

```python
for i in range(10):
    print("Hello")
```

The indentation is necessary here. A second line indented would be a part of the loop, and a second line not indented would be outside of the loop. For example:

```python
for i in range(2):
    print("A")
    print("B")
```

would print:

```
A
B
A
B
```

whereas the following:

```python
for i in range(2):
    print("A")
print("B")
```

would print:

```
A
A
B
```

## Variables

To save a value to a variable, assign it like so:

```python
name = "Bob"
age = 15
```

Note that data types were not specified with these variables, as types are inferred, and can be changed later.

```python
age = 15
age += 1  # increment age by 1
print(age)
```

This time I used comments beside the increment command.

## Comments

Comments are ignored in the program but there for you to leave notes, and are denoted by the hash # symbol. Multi-line comments use triple quotes like so:

```python
"""
This is a very simple Python program that prints "Hello".
That's all it does.
"""

print("Hello")
```

## Lists

Python also has lists (called arrays in some languages) which are collections of data of any type:

```python
numbers = [1, 2, 3]
```

Lists are denoted by the use of square brackets `[]` and each item is separated by a comma.

## Iteration

Some data types are iterable, which means you can loop over the values they contain. For example a list:

```python
numbers = [1, 2, 3]

for number in numbers:
    print(number)
```

This takes each item in the list numbers and prints out the item:

```
1
2
3
```

Note I used the word number to denote each item. This is merely the word I chose for this - it's recommended you choose descriptive words for variables - using plurals for lists, and singular for each item makes sense. It makes it easier to understand when reading.

Other data types are iterable, for example the string:

```python
dog_name = "BINGO"

for char in dog_name:
    print(char)
```

This loops over each character and prints them out:

```
B
I
N
G
O
```

## Range

The integer data type is not iterable and trying to iterate over it will produce an error. For example:

```python
for i in 3:
    print(i)
```

will produce:

```
TypeError: 'int' object is not iterable
Python error
```

However you can make an iterable object using the range function:

```python
for i in range(3):
    print(i)
```

`range(5)` contains the numbers 0, 1, 2, 3 and 4 (five numbers in total). To get the numbers 1 to 5 (inclusive) use `range(1, 6)`.

## Length

You can use functions like len to find the length of a string or a list:

```python
name = "Jamie"
print(len(name))  # 5

names = ["Bob", "Jane", "James", "Alice"]
print(len(names))  # 4
```

## If statements

You can use if statements for control flow:

```python
name = "Joe"

if len(name) > 3:
    print("Nice name,")
    print(name)
else:
    print("That's a short name,")
    print(name)
```
