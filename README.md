CatSlider
==========

A super simple automated slideshow written in javascript using the mootools library, and filled with cats!

How to use
----------
- In the `<head>` of your html file, include mootools and the catslider javascript files:

```html
<script src="http://ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js" type="text/javascript" ></script>
<script src="js/catslider.js" type="text/javascript" ></script>
```

- Also be sure to include the css file for catslider also in the `<head>` of your html file. Place the following just before your closing `<head>` tag:

```html
<link rel="stylesheet" type="text/css" href="css/catslider.css" />
```

- At the bottom of your webpage, just before the closing `<body>` tag, add the following code (You will want to replace the `YourImage#.jpg`'s with your own images. You can add as many as you wish.):

```html
<script>
  var Cat = new CatSlider(['YourImage1.jpg','YourImage2.jpg','YourImage3.jpg','YourImage4.jpg']);
</script>
```

- (optional) If you want the CatSlider to auto-adjust on screen-resize, add the following code after the above javascript:

```html
<script>
window.onresize = function(event) {
  Cat.updateWindowSize();
  Cat.updateSlideSizes();
}
</script>
```

Changelog
==========
0.1.1
----------
- Fixed a bug if only one image was loaded into the CatSlider


0.1
----------
- First Release 
