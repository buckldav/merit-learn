# Computer Programming 1

Semester 1 Review - Fall 2022

Name \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Strand 1

#### 1. List two differences between a compiled language and an interpreted language.

<br><br><br>

#### 2. Arrange the following languages from lowest level to highest level.

_Hint: low level is closest to the hardware, high level is closest to human language._

```
C           Assembly         Python         Machine Code (Binary)
```

#### 3. What is an IDE? How does it differ from a plain text editor?

<br><br><br>

#### 4. Match the errors with their definition.

| Error         | Definition                                              |
| ------------- | ------------------------------------------------------- |
| Syntax Error  | A spelling or grammar error.                            |
| Logic Error   | A mistranslation between your idea and the program.     |
| Runtime Error | A program crashes while executing because of bad input. |

#### 5. What is debugging?

<br><br><br>

## Strand 2

#### 1. Order the steps of the software development lifecycle from beginning to end.

```
Requirements Analysis       Testing             Release & Maintenance
Planning/Design             Implementation
```

<br><br>

#### 2. Circle all INVALID identifiers.

```
hello           hello-there         1variable       -variable

hello there     hello_there         variable1       _variable

var+iable       varName             while           print
```

#### 3. Circle all Python keywords (built-in words).

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

<br>

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

#### 4. What does it mean to initialize a variable?

<br><br>

#### 5. Fill in the truth tables for the logical operators.

| A   | B   | A and B |
| --- | --- | ------- |
| T   | T   |         |
| T   | F   |         |
| F   | T   |         |
| F   | F   |         |

| A   | B   | A or B |
| --- | --- | ------ |
| T   | T   |        |
| T   | F   |        |
| F   | T   |        |
| F   | F   |        |

#### 6. What is the difference in output for integer division and float division?

```python
# integer division
print(5 // 2)
# float division
print(5 / 2)
```

#### 7. What is the value of x at the end of the program?

```python
def fun():
    x = 4

x = 5
fun()
print(x)
```

#### 8. Evaluate the expression.

```python
2 * (5 - 1) + 3 % 2
```

## Strand 4

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

<br><br><br><br>

##### 6.

```python
for i in range(5):
print(i)
```

##### 7.

```python
for i in range(10):
    print("Hello")
    break
```

##### 8.

```python
a = 0
b = 5
if a >= 0:
    if b < 5:
        print("one")
    else:
        print("two")
else:
    print("three")
```

## Strand 5

#### 1. Describe the roles of the members of a software engineering team.

- Team Leader
- Analyst
- Senior Developer
- Junior Developer
- Client/Subject Matter Expert

#### 2. List two ways that a user could misuse software.

<br><br>
