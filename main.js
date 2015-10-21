var marked = function(markdown) {
    return require('markdown').markdown.toHTML(markdown, 'Maruku');
}
var hljs = require('highlight.js');

// Hide body until we're done fiddling with the DOM
document.body.style.display = 'none';

//////////////////////////////////////////////////////////////////////
//
// Shims for IE < 9
//

document.head = document.getElementsByTagName('head')[0];

if (!('getElementsByClassName' in document)) {
    document.getElementsByClassName = function(name) {
        function getElementsByClassName(node, classname) {
            var a = [];
            var re = new RegExp('(^| )' + classname + '( |$)');
            var els = node.getElementsByTagName("*");
            for (var i = 0, j = els.length; i < j; i++)
                if (re.test(els[i].className)) a.push(els[i]);
            return a;
        }
        return getElementsByClassName(document.body, name);
    }
}

//////////////////////////////////////////////////////////////////////
//
// Get user elements we need
//

var markdownEl = document.getElementsByTagName('xmp')[0] || document.getElementsByTagName('textarea')[0],
    titleEl = document.getElementsByTagName('title')[0],
    scriptEls = document.getElementsByTagName('script'),
    navbarEl = document.getElementsByClassName('navbar')[0];

//////////////////////////////////////////////////////////////////////
//
// <head> stuff
//

// Use <meta> viewport so that Bootstrap is actually responsive on mobile
var metaEl = document.createElement('meta');
metaEl.name = 'viewport';
metaEl.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
if (document.head.firstChild)
    document.head.insertBefore(metaEl, document.head.firstChild);
else
    document.head.appendChild(metaEl);

// Get origin of script
var origin = '';
for (var i = 0; i < scriptEls.length; i++) {
    if (scriptEls[i].src.match('downstrap')) {
        origin = scriptEls[i].src;
    }
}
var originBase = origin.substr(0, origin.lastIndexOf('/'));


function buildLinkNode(href) {
    var linkEl = document.createElement('link');
    linkEl.href = href;
    linkEl.rel = 'stylesheet';
    return linkEl;
}

function getBootSwatchHref(theme) {
    // bootswatch themes
    var themes = ['cerulean', 'cosmo', 'cyborg',  'darkly', 'flatly', 'journal', 'lumen', 'paper',
                            'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti'];
    theme = theme.toLowerCase();

    if (-1 != themes.indexOf(theme)) {
        return 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/' + theme + '/bootstrap.min.css';
    } else {
        return 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css';
    }
}

function getHighLightJsHref(theme) {
    // highlight.js themes
    var themes = [
        'agate',
        'androidstudio',
        'arta',
        'ascetic',
        'atelier-cave.dark',
        'atelier-cave.light',
        'atelier-dune.dark',
        'atelier-dune.light',
        'atelier-estuary.dark',
        'atelier-estuary.light',
        'atelier-forest.dark',
        'atelier-forest.light',
        'atelier-heath.dark',
        'atelier-heath.light',
        'atelier-lakeside.dark',
        'atelier-lakeside.light',
        'atelier-plateau.dark',
        'atelier-plateau.light',
        'atelier-savanna.dark',
        'atelier-savanna.light',
        'atelier-seaside.dark',
        'atelier-seaside.light',
        'atelier-sulphurpool.dark',
        'atelier-sulphurpool.light',
        'brown_paper',
        'brown_pap',
        'codepen-embed',
        'color-brewer',
        'dark',
        'darkula',
        'default',
        'docco',
        'far',
        'foundation',
        'github-gist',
        'github',
        'googlecode',
        'grayscale',
        'hopscotch',
        'hybrid',
        'idea',
        'ir_black',
        'kimbie.dark',
        'kimbie.light',
        'magula',
        'mono-blue',
        'monokai_sublime',
        'monokai',
        'obsidian',
        'paraiso.dark',
        'paraiso.light',
        'pojo',
        'pojoaque',
        'railscasts',
        'rainbow',
        'school_book',
        'school_',
        'solarized_dark',
        'solarized_light',
        'sunburst',
        'tomorrow-night-blue',
        'tomorrow-night-bright',
        'tomorrow-night-eighties',
        'tomorrow-night',
        'tomorrow',
        'vs',
        'xcode',
        'zenburn'
    ];
    theme = theme.toLowerCase();

    if (-1 != themes.indexOf(theme)) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/' + theme + '.min.css';
    } else {
        return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css';
    }
}

// Get theme
var theme = markdownEl.getAttribute('theme');
document.head.appendChild(
    buildLinkNode(
        getBootSwatchHref(theme)
    )
);

// downstrap.css
document.head.appendChild(
    buildLinkNode(
        originBase + '/downstrap.css'
    )
);

// highlight.js theme
theme = markdownEl.getAttribute('hljs-theme');
document.head.appendChild(
    buildLinkNode(
        getHighLightJsHref(theme)
    )
);

//////////////////////////////////////////////////////////////////////
//
// <body> stuff
//

var markdown = markdownEl.textContent || markdownEl.innerText;

var newNode = document.createElement('div');
newNode.className = 'container';
newNode.id = 'content';
document.body.replaceChild(newNode, markdownEl);

// Insert navbar if there's none
var newNode = document.createElement('div');
newNode.className = 'navbar navbar-default navbar-fixed-top';
if (!navbarEl && titleEl) {
    newNode.innerHTML = '<div class="container"> <div class="navbar-header"> <a id="headline" class="navbar-brand" href="#"></a> </div> </div>';
    document.body.insertBefore(newNode, document.body.firstChild);
    var title = titleEl.innerHTML;
    var headlineEl = document.getElementById('headline');
    if (headlineEl)
        headlineEl.innerHTML = title;
}

//////////////////////////////////////////////////////////////////////
//
// Markdown!
//

// Generate Markdown
var html = marked(markdown);
document.getElementById('content').innerHTML = html;

// highlight.js
var codeEls = document.querySelectorAll('pre code'), i;
for (i = 0; i < codeEls.length; ++i) {
    var codeEl = codeEls[i];
    var lang = codeEl.className.substr(5);
    hljs.highlightBlock(codeEl);
}

// Style tables
var tableEls = document.getElementsByTagName('table');
for (var i = 0, ii = tableEls.length; i < ii; i++) {
    var tableEl = tableEls[i];
    tableEl.className = 'table table-striped table-bordered';
}

// All done - show body
document.body.style.display = '';