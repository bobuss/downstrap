var marked = function(markdown) {
    var MarkdownIt = require('markdown-it'),
        md         = new MarkdownIt({linkify: true});
    return md.render(markdown);
}
var hljs = require('highlight.js');

// bootswatch themes
var bootSwatchThemes = [
    'cerulean',
    'cosmo',
    'cyborg',
    'darkly',
    'flatly',
    'journal',
    'lumen',
    'paper',
    'readable',
    'sandstone',
    'simplex',
    'slate',
    'spacelab',
    'superhero',
    'united',
    'yeti'
];

// highlight.js themes
var hljsThemes = [
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

//////////////////////////////////////////////////////////////////////
//
// Shims for IE < 9
//
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

function buildLinkNode(href) {
    var linkEl = document.createElement('link');
    linkEl.href = href;
    linkEl.rel = 'stylesheet';
    return linkEl;
}

function getBootSwatchHref(theme) {
    theme = theme.toLowerCase();

    if (-1 != bootSwatchThemes.indexOf(theme)) {
        return 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.5/' + theme + '/bootstrap.min.css';
    } else {
        return 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css';
    }
}

function getHighLightJsHref(theme) {    
    theme = theme.toLowerCase();

    if (-1 != hljsThemes.indexOf(theme)) {
        return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/' + theme + '.min.css';
    } else {
        return 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css';
    }
}

function Downstrap(options) {
    this.theme = options.theme || 'bootstrap';
    this.syntaxTheme = options.syntaxTheme || 'default';
    // Hide body until we're done fiddling with the DOM
    document.body.style.display = 'none';
    this.createHeadStuffs()
}

Downstrap.prototype.createHeadStuffs = function() {
    var self = this;

    document.head = document.getElementsByTagName('head')[0];

    // Get theme
    document.head.appendChild(
        buildLinkNode(
            getBootSwatchHref(self.theme)
        )
    );

    // highlight.js theme
    document.head.appendChild(
        buildLinkNode(
            getHighLightJsHref(self.syntaxTheme)
        )
    );

    var styleNode = document.createElement('style');
    styleNode.innerHTML = 'body{padding-top: 60px;padding-bottom: 40px;font-size: 15px;line-height: 150%;}';
    document.head.appendChild(styleNode);
};

Downstrap.prototype.attachToBody = function(url) {
  
    var self = this;

    function createMarkup(markdown) {
             
        //////////////////////////////////////////////////////////////////////
        //
        // Get user elements we need
        //
        var markdownEl = document.createElement('div'),
            titleEl    = document.getElementsByTagName('title')[0],
            scriptEls  = document.getElementsByTagName('script'),
            navbarEl   = document.getElementsByClassName('navbar')[0];

        var newNode = document.createElement('div');
        newNode.className = 'container';
        newNode.id = 'content';
        document.body.appendChild(newNode);

        // Insert navbar if there's none
        var newNode = document.createElement('div');
        newNode.className = 'navbar navbar-default navbar-fixed-top';
        if (!navbarEl && titleEl) {
            var title = titleEl.innerHTML;
            var nodeContent = '';
            nodeContent += '<div class="container">';
            nodeContent += '  <div class="navbar-header">';
            nodeContent += '    <a class="navbar-brand" href="#">';
            nodeContent += title;
            nodeContent += '    </a>';
            nodeContent += '  </div>';
            nodeContent += '</div>';
            newNode.innerHTML = nodeContent;
            document.body.insertBefore(newNode, document.body.firstChild);
        }

        //////////////////////////////////////////////////////////////////////
        //
        // Markdown!
        //
        // Generate Markdown
        var html = marked(markdown);
        document.getElementById('content').innerHTML = html;

        // highlight.js
        var codeEls = document.querySelectorAll('pre code');
        for (var i = 0; i < codeEls.length; ++i) {
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
    }

    function getUrl(url, callback) {
        var xmlhttp;

        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
                    callback(xmlhttp.responseText);
                }
            }
        }

        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }


    getUrl(url, function(content) {
        createMarkup(content);
    });
}

module.exports = Downstrap;
