HTML is the primary language for declaring the structural components of a webpage independent of stylistic decisions. This code is written in an HTML file separate from the styles that are defined in an SCSS file. This *separation of concerns* is a common theme in computer science and makes our code easier to understand and share with others. Let's take look at the basic concepts underlying HTML.

## HTML tags

A webpage's elements are declared using HTML tags. Each tag corresponds to a specific section of a webpage and consists of the name of its element type, enclosed in a `<` and `>` symbol. Some common tags include: `<h1>` (headings), `<p>` (paragraphs), and `<img>` (images), and `<button>` (buttons). The `<div>` (division) tag is the general tag that can be used to declare any block of the page.

Most tags exist in pairs, with the second tag having a `/` symbol to symbolize that it is the closing tag, e.g. `<tag-name>content</tag-name>`. Try changing the `<h1>` tag to a generic `<div>` tag. You'll notice that the `<h1>` tag comes with some default styling whereas the `<div>` tag does not.

```html
/// file: weekly-goals-item.component.html
<!-- ADD TEXT ON A NEW LINE -->
---<h1>---+++<div>+++Hello world!---</h1>---+++</div>+++
```

## HTML attributes

HTML tags also allow one to specify element *attributes* within the opening tag. For example, in order to declare an image, one needs to specify the actual image source using the `src="filepath"` syntax. Try adding the below image using the `img` tag and `src` attribute:

```html
/// file: weekly-goals-item.component.html
<!-- ADD TEXT ON A NEW LINE -->
<div>Hello world!</div>
+++<img src="https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif"/>+++
```

You'll also note that the `img` tag is one of the few tags that does not come in pairs. Instead, it just has a single tag with the typical `/` syntax of a closing tag.

## Try defining some HTML elements

Try to define your own elements and observe their similarities and differences. Here are some elements you might consider:

* `<h1>`, `<h2>`, and `<h3>` are header elements that come with various default styles for font size and spacing
* `<p>` is a paragraph element whose default style has one line of spacing below it and the following element
* `<button>` is a button element with a default browser button style when you hover or click it
* `<div>` is the generic division tag that we commonly use by default
