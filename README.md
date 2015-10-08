# Strapdown reloaded

## Motivations

The ![strapdown repository](https://github.com/arturadib/strapdown) is dead. Such a shame !

And I wanted
- to switch from ![marked](http://github.com/chjj/marked) to ![markdown.js](https://github.com/evilstreak/markdown-js), for the ![Maruku](https://github.com/bhollis/maruku) dialect,
- to switch from ![google code prettify](https://github.com/google/code-prettify) to ![highlight.js]([https://highlightjs.org/) for more languageq, and more themes,
- to use ![browserify](http://browserify.org/) to build it,
- and to use the bootswatch themes and highlight styles served via CDN.

## Usage

```html
<!DOCTYPE html>
<html>
<title>My page</title>
<meta charset="utf-8">
<xmp theme="yeti" hljs-theme="agate" style="display:none;">

# Title

## Everything seems to be ok


	def hello(name):
		now = datetime.now()
		return 'Hello {}.'.format(name)

	if __name__ == '__main__':
		hello('world')


</xmp>
<script src="downstrap/downstrap.js"></script>
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
