---
layout: default
title: HTML
parent: Web Dev Basics
nav_order: 1
---

# HTML
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

HTML is the markup language of websites and web applications. It's the way that content (text, graphics, and other media) is defined and organized on a web page. HTML by itself does not look fantastic. To style the content defined by HTML (add fonts, colors, layouts, etc. to your web pages), you need to learn <a href="/docs/web-dev-basics/css">CSS</a>.<br>
<strong>It is highly recommended that you learn HTML and CSS at the same time.</strong>

## Tutorials

The best websites to learn HTML are the following:

1. <a href="https://www.w3schools.com/html/default.asp">w3schools</a><br><strong>A full HTML course for those who are new to web development looking for simple answers</strong><br>The simplest tutorial site for an introduction to HTML and other languages. Has examples, code sandboxes, and practice questions, and is rather comprehensive. Highly recommended for beginners.
2. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">MDN</a><br><strong>For those who are experienced coders looking for the right answers</strong><br>MDN (Mozilla Developer Network) is the standard documentation and examples for professional developers. Provides more detailed and accurate explanations than w3schools.
3. <a href="https://www.codecademy.com/learn/learn-html">codecademy</a><br><strong>For those who want to get a brief overview and learn by doing</strong><br>Codecademy has a great free mini course for learning HTML. It does require an account but teaches the basics quickly and effectively.
4. <a href="https://codehs.com/go/F5D0E">CodeHS</a><br><strong>For those who want a comprehensive web design course</strong><br>Click the link above to enroll in Merit Academy's complete web design course which covers HTML, CSS, Bootstrap, and other skills related to making web sites. The course code (if you need it upon signing up) is <b>F5D0E</b>.

## Introductory Examples and Resources

There are a few things to know that are essential for coding HTML:

### Tags

<b>Tags</b> define the content on the page. There are distinct tags for headings (titles), paragraphs, images, links, etc. Most <b>HTML elements</b> have an opening and closing tag because they encapsulate text or other content. Fewer elements are <b>singleton tags</b>, like images.

```html
<h1>Heading 1</h1>
<p>Paragraph</p>
<img src="link-to-image.jpg">
<a href="link-to-page.html">Link</a>
```

<b>Attributes</b> are options that further define the content. For example, an image tag has a source attribute (src) that references the image file to be displayed (```<img src="filename.jpg">```).

### Conventions

<i>If you're unconvinced that following convention is important, visit this page.</i>

Tags should always be lowercase (```<h1>``` not ```<H1>```).

Attributes should be lowercase and values should always be in quotes (```width="200px"``` not ```WIDTH=200px```).

When multiple elements are <b>nested</b> inside one another, it is good practice to match the indentation (horizontal spacing) of the elements.

```html
<main>
    <section>
        <p>Some text</p>
    </section>
</main>
```

File names should be kebab case (lowercase with dashes instead of spaces; ```file-name.html```) or snake case (lowercase with underscores; ```file_name.html```). Be consistent, pick either kebab case or snake case for your files and stick to it.

