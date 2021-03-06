# Strapdown reloaded

## Motivations

The ![strapdown repository](https://github.com/arturadib/strapdown) is dead. Such a shame !

And I wanted
- to switch from ![marked](http://github.com/chjj/marked) to ![markdown-it](https://github.com/markdown-it/markdown-it),
- to switch from ![google code prettify](https://github.com/google/code-prettify) to ![highlight.js]([https://highlightjs.org/) for more languages, and more themes,
- to use ![browserify](http://browserify.org/) to build it,
- to allow to load an external markdown file,
- and to use the bootswatch themes and highlight styles served via CDN.

## Usage

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">    
    <title>Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
<script src="downstrap.js"></script>
<script type="text/javascript">
var doc = new Downstrap({
    'theme'      : 'sandstone', 
    'syntaxTheme': 'agate'
});
doc.attachToBody('my_page.md')
</script>
</body>
</html>
```

## Build

First, install ![browserify](http://browserify.org/).

Then :

```bash
$ npm install

$ make
browserify main.js > stripdown.js
```


## Credits

99% of the job are done by these amazing libs

- ![strapdown.js](http://strapdownjs.com/)
- ![marked](http://github.com/chjj/marked/)
- ![highlight.js](https://highlightjs.org/)
- ![bootswatch](http://bootswatch.com/)
