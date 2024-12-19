---
layout: default
title: CSS Basics
parent: Web Dev Basics
nav_order: 2
---

# CSS Basics
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

CSS is the styling language of websites and web applications. It styles the <a href="/docs/web-dev-basics/html">HTML</a> markup of web pages and is nothing without HTML. It would be trying to do paint-by-numbers without a coloring book. Therefore, you do need to know at least a little bit of HTML before you learn any CSS.
It is highly recommended that you learn HTML and CSS at the same time.<br>
<strong>It is highly recommended that you learn HTML and CSS at the same time.</strong>

## Tutorials

The best websites to learn CSS are the following:

1. <a href="https://www.w3schools.com/css/default.asp">w3schools</a><br><strong>A full CSS course for those who are new to web development looking for simple answers</strong><br>The simplest tutorial site for an introduction to CSS and other languages. Has examples, code sandboxes, and practice questions, and is rather comprehensive. Highly recommended for beginners.
2. <a href="https://developer.mozilla.org/en-US/docs/Web/CSS">MDN</a><br><strong>For those who are experienced coders looking for the right answers</strong><br>MDN (Mozilla Developer Network) is the standard documentation and examples for professional developers. Provides more detailed and accurate explanations than w3schools.
3. <a href="https://www.codecademy.com/learn/learn-css">codecademy</a><br><strong>For those who want to get a brief overview and learn by doing</strong><br>Codecademy has a great free mini course for learning CSS. It does require an account but teaches the basics quickly and effectively.
4. <a href="https://codehs.com/go/F5D0E">CodeHS</a><br><strong>For those who want a comprehensive web design course</strong><br>Click the link above to enroll in Merit Academy's complete web design course which covers HTML, CSS, Bootstrap, and other skills related to making web sites. The course code (if you need it upon signing up) is <b>F5D0E</b>.

## Introductory Examples and Resources

There are a couple of essentials when it comes to CSS:

### Selectors

CSS selectors allow you to style different parts of your HTML in an organized way. Here are the most important selectors to know from least specific to most specific.

| Selector      | Usage Example | HTML Example (below) |
| ------------- | ------------- | -------------------- |
| Element | Change the styling for all the paragraph tags | Paragraph 1 (black) |
| Class | Change the styling for most of the paragraph tags | Paragraphs 2 and 3 (red) |
| ID | Change the styling for one paragraph tag | Paragraph 4 (blue) |
| Inline style | Change the styling of a tag in HTML | Paragraph 5 (green) |

#### CSS
{: .no_toc }

```css
/* Element Selector */
p {
    color: black;
}

/* Class Selector */
.red {
    color: red;
}

/* ID Selector */
#blue {
    color: blue;
}
```

#### HTML
{: .no_toc }

```html
<html>
<head>
    <link rel="stylesheet" href="path/to/cssfile.css">
</head>
<body>
    <p>Paragraph 1</p>
    <p class="red">Paragraph 2</p>
    <p class="red">Paragraph 3</p>
    <p id="blue">Paragraph 4</p>
    
    <!-- Inline style -->
    <p style="color: green;">Paragraph 5</p>
</body>
</html>
```

### Cascade

The "Cascade" part of "CSS" refers to its loading behavior. CSS is loaded from top to bottom, thus bottom styles might override styles above them. 

#### CSS
{: .no_toc }

```css
p {
    color: blue;
}

/* This is the color that will be used because of the cascade */
p {
    color: red;
}
```

#### HTML
{: .no_toc }

```html
<html>
<head>
    <link rel="stylesheet" href="path/to/cssfile.css">
</head>
<body>
    <p>Red Text</p>
</body>
</html>
```

This behavior extends to multiple stylesheets loaded in the HTML document head, later stylesheets may override styles in previous stylesheets. In the example below, the styles from file2.css will be used instead of file1.css because of the order the stylesheets are linked in the HTML.

#### file1.css
{: .no_toc }

```css
p {
    color: blue;
}
```

#### file2.css
{: .no_toc }

```css
p {
    color: red;
}
```

#### HTML
{: .no_toc }

```html
<html>
<head>
    <link rel="stylesheet" href="file1.css">
    <link rel="stylesheet" href="file2.css">
</head>
<body>
    <p>Red Text</p>
</body>
</html>
```

### Conventions

<i>If you're unconvinced that following convention is important, visit this page.</i>

1. You should name your CSS classes and IDs with kebab case (e.g. class-name), never uppercase. A few people like using camel case for IDs but we personally don't recommend it.

2. Learn how to write utility classes. These are classes that have one job and are easy to reuse. For example, if you wanted for a few elements to have blue text, instead of repeating ```color: blue``` in each rule every time you wanted to use that color, simply make one class called ```.text-blue {}``` that could be used in your HTML whenever you need blue text.

    ```css
    .text-blue {
        color: blue;
    }
    ```

    You can easily write way too many utility classes so use them for things like margin, padding, colors where you know you'll need to be flexible.

3. You should try to keep your CSS as organized and readable as possible. You will quickly discover that your CSS can get very lengthy very quickly and it can be hard to keep your code DRY. A simple way to section out your CSS is the following:

    ```css
    /* Imports */
    @import googlefonts;
    @import otherstylesheet.css;

    /* General Styles */
    body
    h1, h2, h3...
    p
    a, button, a:hover...

    /* Typography */
    body {
        font-family: sans-serif;
    }

    code, pre {
        font-family: monospace;
    }

    /* Layout styles */
    nav {}
    .row {}
    .column {}
    #site-footer {}

    /* Utility classes */
    .text-blue {}
    .text-red {}

    /* Specific components */
    .card {}
    #middle-content {}
    ```

    The best way to order the selectors within a section is in the order they appear on the page (see the "Specific Components" section above), this way cascade loads the CSS in the order that the elements appear on the page. Another way to order your selectors is from most specific to least specific (element selectors, then class selectors, then ID selectors, see the "Layout Styles" section above).