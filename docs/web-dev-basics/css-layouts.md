---
layout: default
title: CSS Layouts
parent: Web Dev Basics
nav_order: 3
---

# CSS Layouts and Frameworks

{: .no_toc }

## Table of contents

{: .no_toc .text-delta }

1. TOC
   {:toc}

---

## Layouts

By default, web pages display HTML in a single vertical layout (i.e. each element is loaded directly beneath it). For more flexibility in your web design, you need to learn how to do layouts in CSS using CSS flexbox and CSS grid. In short, flexbox is used for horizontal or vertical aligning (like for a navigation bar) while grid is used for laying out entire pages. Both are important to know, but flexbox is probably a good place to start and is capable in its own right of laying out entire pages.

- <b><a href="https://medium.com/youstart-labs/beginners-guide-to-choose-between-css-grid-and-flexbox-783005dd2412">Beginner's Guide to Choosing Between CSS Grid and Flexbox</a></b><br>This guide has some great resources for learning Grid and Flexbox.
- <b><a href="https://codepip.com/games/flexbox-froggy/">Flexbox Froggy</a></b><br>This is a great game to practice Flexbox.
- <b><a href="https://codepip.com/games/grid-garden/">Grid Garden</a></b><br>This is a great game to practice Grid.

## Frameworks

A general rule in coding is that someone has probably already made the thing you're making or have run into the same problems that you have. Once you have a grasp on selectors and layouts, it is strongly recommended that you become comfortable with a framework or two. Frameworks eliminate the need for you to build an entire design ecosystem, rather, you can just use what the pros have made and tweak it to fit your needs. They provide you with layout classes, components, and utilities to help you design your site swiftly. There are two frameworks I recommend for beginners:

### Bootstrap 4

The most popular framework and the first one to learn is Bootstrap. It exclusively uses Flexbox for its layouts and has many built-in components and utility classes that help you avoid building your site from scratch. The drawback to Bootstrap compared other frameworks is that it's fairly large and difficult to modify out of the box (in CSS, learn Sassy CSS if you want to modify Bootstrap extensively), so if you only want your framework to do a little bit for you, consider using something else like Skeleton.

<b><a href="https://getbootstrap.com/docs/4.4/getting-started/introduction/">Introduction (Bootstrap Documentation)</a></b>

If you find the above intimidating, w3schools provides a watered-down version of the documentation. However, some of their examples are outdated so transition to the official docs above as soon as possible.

<b><a href="https://www.w3schools.com/bootstrap4/default.asp">Bootstrap 4 (w3schools)</a></b>

### Skeleton CSS

If you're looking for a lightweight system that does a few things like Grid layouts and button styling, check out Skeleton. It focuses on mobile-first responsive design and is an easy way to start building a small app or site. Unlike Bootstrap, it is easy to build on top of because the entire code base is less than 400 lines.

<b><a href="http://getskeleton.com/">Skeleton: Responsive CSS Boilerplate</a></b>

### Other Frameworks

This article outlines a few other frameworks for beginners in addition to the two above. I particularly like <a href="https://get.foundation/sites.html">Foundation</a>, which is taught in the Sassy CSS unit of Web Development Capstone because it's particularly effective with <a href="https://sass-lang.com/">Sass</a> (which is CSS, but better! You should learn it once you feel comfortable with CSS).

<b><a href="https://medium.com/swlh/a-beginners-guide-to-css-frameworks-7bdfb9a1acb0">A Beginner's Guide to CSS Frameworks</a></b>

<b>
<a href="https://dev.to/chetan_atrawalkar/20-best-css3-library-for-developers-58p ">20 CSS3 Libraries/Frameworks</a>
</b>
