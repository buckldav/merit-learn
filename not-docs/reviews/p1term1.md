# Computer Programming 1

Term 1 Review - Fall 2021

Name \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Strand 2

- 2.1 White space, naming identifiers and methods, camelCase or snake_case.
- 2.3 Keywords, identifiers.
- 2.4 Understand program components such as functions, methods, or procedures.

#### 1. In Python, what is the difference between a keyword and an identifier?

<br><br><br>

#### 2. Circle all INVALID identifiers.

```
hello           hello-there         1variable       -variable

hello there     hello_there         variable1       _variable

var+iable       varName             while           print
```

#### 3. Circle all Python keywords.

```
while           for                 int             print

def             float               if              elseif

elif            input               random          else
```

<br><br><br><br><br>

#### 4. In Python, when do we use `SCREAMING_SNAKE_CASE` versus `snake_case` when naming variables?

<br><br><br>

#### 5. In Python, what is a function and what are two reasons for using one?

<br><br><br>

## Strand 3

- 3.1 Employ basic use of elements and data types of a programming language.

#### 1. Fill in the table below for what data type should be used to represent data.

Use only `integer`, `float`, `boolean`, and `string`.

| Variable Name  | Description                               | Data Type |
| -------------- | ----------------------------------------- | --------- |
| `age`          | The age of a user                         | `integer` |
| `is_open`      | Is the pop-up window open?                |           |
| `first_name`   | First name of a user                      |           |
| `balance`      | How much money is left in a budget        |           |
| `screen_width` | The width of the turtle window, in pixels |           |
| `team_members` | The number of people per team             |           |
| `valid`        | Whether an input is valid or not          |           |
| `greeting`     | A greeting sentence to output             |           |
| `gpa`          | The grade point average of a student      |           |

<br><br><br><br><br>

#### 2. What is the problem with this code?

```python
age = int(input("What is your age?"))  # Assume user input is int
print("You are " + age + " years old!")
```

#### 3. What is the value of `a` at the end of this program?

```python
a = 2
b = 3
c = 4
a = c
b = a
c = b
a = b
print(a)
```

## Strand 4

- 4.2 If, if-else statements
- 4.3 For and while loops including nested ones

#### For the following code blocks, write what you could expect the result of the code to be. If there is an error in the code, indicate what is broken.

##### 1.

```python
num = 5
if num = 5:
    print("It's a 5!")
```

##### 2.

```python
i = 0
while i <= 5:
    i += 1

print(i)
```

<br><br>

##### 3.

```python
grade = 85
if grade > 90:
    print("A")
elif grade > 80:
    print("B")
elif grade > 70:
    print("C")
else:
    print("F")
```

##### 4.

```python
grade = 85
if grade > 90:
    print("A")
if grade > 80:
    print("B")
if grade > 70:
    print("C")
else:
    print("F")
```

##### 5.

```python
import turtle

turtle.pendown()

for i in range(6):
    turtle.forward(20)
    turtle.left(90)
```

##### 6.

```python
for i in range(5):
print(i)
```
