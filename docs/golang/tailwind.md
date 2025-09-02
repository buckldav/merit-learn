---
layout: default
title: Beego Part 2 - Styling with Tailwind
parent: Golang
nav_order: 3
---

# Beego Part 2 - Styling with Tailwind

This guide assumes that you are familiar with CSS. We are going to use a more common and modern approach to writing CSS. [Tailwind CSS](https://tailwindcss.com/) is an approach to styling where <abbr title="indivisible, has one job">atomic</abbr> utility classes are used as building blocks.

Here is an example utility class.

```css
.text-white {
    color: white; 
}
```

This approach is in contrast to having robust CSS classes that are not as reusable or maintainable.

```css
.heading-white {
    color: white;
    margin: 1rem 0;
    font-size: 1.5rem;
}

.heading-blue {
    color: blue;
    margin: 1rem 0;
    font-size: 1.5rem;
}
```

If you wanted the margins to be the same on each class above and change both of them to be `1.25rem 0`, you would have to remember to change it in two spots.

## Set Up Tailwind with DaisyUI

To set up our Beego project with Tailwind and a component library called [DaisyUI](https://daisyui.com/), you will need to have [NodeJS and NPM installed](https://nodejs.org/en/download). DaisyUI provides some useful component class names like `navbar`, `link`, `btn`, etc. so you don't have to use just utility classes.

```bash
# initialize project
npm init
# install dependencies
npm i -D @tailwindcss/cli tailwindcss daisyui
```

Create a file called `tailwind.config.js`. Here, we tell Tailwind to look in our `*.tpl` files for the classes used.


```js
/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./views/**/*.{html,tpl,tmpl}", "./static/**/*.{html,js}"],
};
```

Create a CSS file called `styles/main.css` where Tailwind and DaisyUI can be imported. Here is an example file. It includes a [Google Font](https://fonts.google.com/) and uses the `@apply` Tailwind directive take some of the existing utility classes and apply their styles to elements. It also includes a [DaisyUI theme](https://daisyui.com/docs/themes/).

```css
@import url("https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400..700;1,400..700&display=swap");
@import "tailwindcss";
@plugin "daisyui" {
  themes: emerald --default, dark --prefersdark;
}

@theme {
    /* Sets the default font for the website, see */
  --font-sans: "Cabin", sans-serif;
}

button {
  @apply btn btn-primary;
}

h1 {
  @apply text-4xl mb-4 font-bold;
}

h2 {
  @apply text-3xl mb-4 font-bold;
}

h3 {
  @apply text-2xl mb-4 font-bold;
}

h4 {
  @apply text-xl mb-4 font-bold;
}

h5 {
  @apply text-lg mb-4 font-bold;
}

h6 {
  @apply text-base mb-4 font-bold;
}

p {
  @apply mb-4;
}

.container {
  @apply max-w-5xl mx-auto block p-4;
}
```

Then, modify `package.json` to include two commands for compiling your CSS into something that can be served to the browser.

```diff
{
  "name": "queenbee",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
-   "test": "echo \"Error: no test specified\" && exit 1"
+   "test": "echo \"Error: no test specified\" && exit 1",
+   "build:css": "tailwindcss -i ./styles/main.css -o ./static/css/output.css --minify",
+   "watch:css": "tailwindcss -i ./styles/main.css -o ./static/css/output.css --minify --watch"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "packageManager": "pnpm@10.11.0",
  "devDependencies": {
    "@tailwindcss/cli": "^4.1.12",
    "daisyui": "^5.1.5",
    "tailwindcss": "^4.1.12"
  }
}
```

`npm run build:css` will compile the CSS once, `npm run watch:css` is a long-running process that will recompile the CSS whenever there is a change.

## Add CSS Classes to Markup

You can modify the `layout.tpl` template to include the theme that you are using.

```html
<html data-theme="emerald">
```

Try adding some CSS classes. `navbar` and `link link-primary` are from DaisyUI, `container` is defined by us in `main.css` and `flex gap-2 mb-4` are each Tailwind utility classes.

```html
<header class="navbar flex gap-2 mb-4">
    <a class="link link-primary" href="/">Home</a>
    <a class="link link-primary" href="/about">About</a>
    <a class="link link-primary" href="/contact">Contact</a>
</header>
<div class="container">
    {{ '{{' }} block "content" . }}{{ '{{' }} end }}
</div>
```