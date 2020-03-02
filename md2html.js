/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 // TODO: explore use of prism: https://prismjs.com/#plugins
 // as it hsa plugins that support line numbers and other niceties.
var fs = require('fs'),
    path = require('path'),
    showdown  = require('showdown'),
    showdownHighlight = require("showdown-highlight")

const MSG_DESCRIPTION = "Convert markdown file(s) to HTML in specified target directory."
const MSG_USAGE = "Usage: md2html.js ([-f <filename>] | [-s <source>]) [-t <target>] [-d]"
const MSG_EXAMPLE = `Example: Convert README.md to README.html in same directory:
    $ node md2html.js -f README.md
`
const MSG_OPTIONS = `
Options:
    Required (one of):
    -f : Single markdown (.md) filename for conversion to HTML (.html).
    -s : Source directory for recursive conversion of all markdown files (*.md)
         Note:
         - Defaults to current directory ('.').
         - Ignores NPM 'node_modules' directory")

    Optional:
    -t : Target directory for converted HTML files (path structure recreated).
         Note:
         - Defaults to current directory ('.html').
    -c : Copy all image files (e.g., .png, .jpg, .svg) to target directory (if different from source).
    -d': Debug trace enabled to console.
`

const MSG_HELP = MSG_USAGE + "\n" +  MSG_OPTIONS + "\n" + MSG_EXAMPLE

var argv = require('yargs')
              .usage(MSG_USAGE)
              .command('', MSG_DESCRIPTION)
              .example(MSG_EXAMPLE)
              .argv;

// Set flavor globally for all converter instances created
showdown.setFlavor('github');

const CURRENT_DIR = '.'
const SHOWDOWN_HTML_EXT_FILTER = "htmlExtFilter"

const EXT_MD = '.md';
const EXT_HTML = '.html';

// path matching options for Glob
// TODO: allow additional ".ignore" path options
var GLOB_OPTIONS= { ignore: ["**/node_modules/**", "./node_modules/**"] }
// TODO: allow for other file extensions to included in "copy" operation
const GLOB_FILE_PATTERN_IMAGES = "/**/*.?(png|jpg|svg|gif)"
const GLOB_FILE_PATTERN_MARKDOWN = "/**/*.md"

// NOTE: The HTML_EXT regex selects the "outer" group defined by '{% ... %} and
// the inner group which has the content we want to (re)format
const REGEX_HTML_EXT = /([ \t]*{% hint(.+\n)*[ \t]*{% endhint %})+/;
const REGEX_MD_ANCHOR = /\[.*?\]\((.*?)\)+/;
const REGEX_MD_ANCHOR_TEXT      = /\[(.*?)\]/;
const REGEX_MD_ANCHOR_HYPERLINK = /\((.*?)\)/;
const REGEX_HTML_PROTOCOL_PREFIX = /^https?:\/\//i;

// TODO: pre-pend lin numbers by adding another filter...
const REGEX_CODE_CONTENTS = '<pre><code class="' + // start of a code block with a class
  '(.*?)'              + // extract class name (result[1])
  '">'                 + // end of code tag
  '([\\s\\S]*?)'       + // extract code (result[2])
  '</code></pre>'        // end of code block

const HTML_BLOCKQUOTE_ELEMENT_BEGIN  = '\n<blockquote class="callout"><div>'
const HTML_BLOCKQUOTE_ELEMENT_MIDDLE = '</div><div class=\"callouttext\">'
const HTML_BLOCKQUOTE_ELEMENT_END    = '</div>' + '</blockquote>\n'

// Canned CSS to simulate gb-style experience
const CSS_HLJS = `
<!--
Highlight.js CSS
Hosted Library: https://cdnjs.com/libraries/highlight.js/
-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/androidstudio.min.css">
`;

var SVG_INFO = `
<svg height="1cm" width="1cm"  color="#26cb7c" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.1" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(1.8102 0 0 1.8095 -1.5812 -.60253)" stroke-width="1.1052">
<ellipse cx="12.465" cy="11.962" rx="10.358" ry="10.362" fill="none" opacity=".892" stroke="#06f" stroke-linecap="butt" stroke-linejoin="round" stroke-miterlimit="0" stroke-width="1.9339" style="paint-order:stroke markers fill"/>
<path d="m11.265 16.882c0 0.75681-0.1388 0.82889-1.1277 0.88295v0.68474h4.8752v-0.68474c-0.98892-0.05405-1.1277-0.12614-1.1277-0.88295v-7.3699l-0.12145-0.10812-3.5219 0.52256v0.6487l0.60723 0.0901c0.27759 0.03604 0.41639 0.19821 0.41639 0.91899zm1.2145-8.2529c0.95422 0 1.5962-0.72077 1.5962-1.5857 0-0.84691-0.60723-1.5677-1.5962-1.5677-0.97157 0-1.5788 0.72078-1.5788 1.5677 0 0.86493 0.60723 1.5857 1.5788 1.5857z" fill="#06f" stroke="none"/>
</g>
</svg>`

var SVG_SUCCESS = `
<svg height="1cm" width="1cm" color="#26cb7c" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.1" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(1.8102 0 0 1.8095 -1.5812 -.60253)" stroke-width="1.1052">
<path d="m12.465 0.63306c-6.243 0-11.325 5.0836-11.325 11.329 7e-7 6.2456 5.0819 11.329 11.325 11.329 6.243 0 11.325-5.0836 11.325-11.329 0-1.9701-0.38314-3.9389-1.588-5.6824l-1.3536 1.4808c0.6792 1.3536 1.0407 2.6657 1.0407 4.2995 0 5.2003-4.226 9.297-9.424 9.297-5.198 0-9.3914-4.1947-9.3914-9.395 1e-7 -5.2003 4.1933-9.395 9.3914-9.395 2.1313 0 4.1983 0.72492 5.8631 2.0562l1.2074-1.5111c-2.0073-1.6052-4.5007-2.4793-7.0705-2.4793z" color="#26cb7c" color-rendering="auto" dominant-baseline="auto" fill="#090" image-rendering="auto" opacity=".892" shape-rendering="auto" solid-color="#000000" stroke="none" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:stroke markers fill;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
<polyline transform="matrix(.85209 0 0 1 2.2285 .48689)" points="23 3 12 14 9 11" stroke="#090" stroke-width="2.095"/>
</g>
</svg>`

var SVG_TIP = `
<svg height="1.1cm" width="1.1cm" color="#26cb7c" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.1" viewBox="0 0 62 62" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<metadata>
<rdf:RDF>
<cc:Work rdf:about="">
<dc:format>image/svg+xml</dc:format>
<dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
<dc:title/>
</cc:Work>
</rdf:RDF>
</metadata>
<g transform="matrix(2.7077 0 0 2.7067 -.62077 -1.951)" stroke="#0cf">
<g fill="#0cf" stroke="#2ad4ff" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity=".84314" stroke-width=".82648">
<path d="m6.6936 2.7895 1.4352 1.4206"/>
<path d="m17.762 2.7861-1.4145 1.5976"/>
<path d="m14.259 1.2171-0.53453 2.0661"/>
<path d="m10.159 1.2171 0.53453 2.0661"/>
<path d="m4.595 5.2492 1.822 1.1102"/>
<path d="m19.905 5.2492-1.822 1.1102"/>
</g>
<g transform="matrix(.79047 0 0 1 2.6278 -.00027505)" fill="#0cf" stroke="#0cf" stroke-linecap="butt" stroke-linejoin="miter" stroke-opacity=".84314" stroke-width="1.0474">
<path d="m10.212 18.796 3.9697 2e-6"/>
<path d="m10.319 20.349 3.9697 2e-6"/>
</g>
<path transform="matrix(.55243 0 0 .55264 .87351 .33299)" d="m20.668 5.7422c-6.4792-2e-7 -11.666 5.564-11.666 12.262 0.29095 4.6426 2.8434 7.1112 5.0477 10.296 0.99699 1.3818 1.148 2.2767 1.1769 3.2l0.21875 7c0.04255 1.3585 0.985 2.6191 2.3438 2.6191h6.459c1.3587 0 2.0527-1.3225 2.0527-2.6816v-6.877c0.11153-1.1855 0.42666-2.2445 1.1357-3.2605 2.3172-2.7818 4.8994-6.79 4.8994-10.296-2e-6 -6.6978-5.1887-12.262-11.668-12.262zm0 3.5c4.4741-2e-7 8.168 3.8484 8.168 8.7617 0.02808 4.9694-3.1344 7.726-4.7193 9.9907-0.5458 1.0068-0.6999 2.7386-0.6811 3.9859l0.09375 6.2188h-5.2402l-0.0625-6.2188c-0.01751-1.7387-0.2051-3.023-0.81893-4.0038-2.2348-2.7667-4.5889-6.4134-4.9057-9.9727 0-4.9134 3.6919-8.7617 8.166-8.7617z" color="#26cb7c" color-rendering="auto" dominant-baseline="auto" fill="#2ad4ff" fill-opacity=".94118" image-rendering="auto" opacity=".892" shape-rendering="auto" solid-color="#000000" stroke-width="0" style="font-feature-settings:normal;font-variant-alternates:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;font-variant-position:normal;isolation:auto;mix-blend-mode:normal;paint-order:stroke markers fill;shape-padding:0;text-decoration-color:#000000;text-decoration-line:none;text-decoration-style:solid;text-indent:0;text-orientation:mixed;text-transform:none;white-space:normal"/>
</g>
</svg>`

var SVG_WARNING = `
<svg height="1cm" width="1cm" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" version="1.0" viewBox="0 0 43 37.6" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(.64711 0 0 .63482 1.5677 -3.4121)">
<ellipse cx="30.756" cy="50.614" rx="2.8766" ry="2.9017" fill="#fc0" stroke-width="0" style="paint-order:stroke markers fill"/>
<path d="m25.824 11.296-24.428 41.279a5.7681 5.8386 0 0 0 4.9317 8.7579h48.855a5.7681 5.8386 0 0 0 4.9317-8.7579l-24.428-41.279a5.7681 5.8386 0 0 0-9.8634 0z" stroke="#fc0" stroke-opacity=".94118" stroke-width="5.4608"/>
<line x1="30.756" x2="30.756" y1="25.778" y2="42.204" stroke="#fc0" stroke-opacity=".94118" stroke-width="5.4608"/>
</g>
</svg>
`

// TODO: externalize CSS file, import once on load
// TODO: allow command line option to point to alternative CSS files
// 1) to override
// 2) to add after our default (additive)to import (perhaps additive,
// that is, we load after pgr)
var CSS_BLOCKQUOTE = `
<style>

body {
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.625;
}

img {
  display:block;
  max-width:90vw;
  max-height:95vh;
  object-fit: contain;
  border:1px solid gainsboro;
  background-color: gainsboro;
}

code {
  font-family: consolas, monospace, courier !important;
  font-size: 1.1em !important;
  padding: 0.2em !important;
  background-color: gainsboro !important;
}

code.hljs {
  padding: 0.5em !important;
  color: #a9b7c6 !important;
  background-color: #282b2e !important;
}

blockquote
{
  border-left: 5px solid rgba(0,0,0,0.2) !important;
  margin: 16px 0em 16px 0px !important;
  padding-left: 2em !important;
}

.callout {
  background-color: whitesmoke !important;
  padding: 18px !important;
  display: flex !important;
}

.callouttext{
    background-color: transparent !important;
    margin-left: 1em !important;
    font-size: 1.0em;
}
</style>
`;

function displayUsageAndExit(msg){
  if(msg) {
    console.error(msg + "\n")
  }
  console.info(MSG_HELP)
  console.error("exiting...")
  process.exit();
}

/*
 * Extensions to Showdown
 */
function retrieveHTMLExtInnerText(converter, content){
  // Trim leading and trailing whitespace from HTML Extension regex as it can be indented
  var trimmed = content.trim();
  // Remove the actual HTML Extension elements defined by '{% .. %}' and remove multiline whitespace
  var strippedText = trimmed.replace(/({([^}]+)})/gim,"").replace(/\r?\n|\r/gim,"");
  // Use converter to format the inner text and remove any paragraph tags <p> added by converter
  var innerText = converter.makeHtml(strippedText).replace("<p>","").replace("</p>","");
  return innerText
}

showdown.extension(SHOWDOWN_HTML_EXT_FILTER, function() {
  'use strict';
  return [
    {
      type: 'lang',
      filter: function(text, converter, options) {
        //console.log("**BEFORE** filter:" + text);

        /* Filter and replace contents of HTML Extensions */
        var regexForHtmlExt = new RegExp(REGEX_HTML_EXT, "gm");
        text = text.replace(regexForHtmlExt, function replaceHtmlExtension(match, capture) {
          //console.log(">> MATCH=[" + match + "] ("+ typeof match+")");
          //console.log(">> CONTENT=[" + content +"] ("+ typeof content+")");

          // WARNING: Not stripping the regex matching content here will result in infinite recursion...
          var htmlText = retrieveHTMLExtInnerText(converter,capture)
          var svg = SVG_INFO
          if(capture.indexOf("\"success\"") > -1) {
            svg = SVG_SUCCESS
          } else if(capture.indexOf("\"tip\"") > -1) {
            svg = SVG_TIP
          } else if(capture.indexOf("\"warning\"") > -1) {
            svg = SVG_WARNING
          }
          return HTML_BLOCKQUOTE_ELEMENT_BEGIN + svg + HTML_BLOCKQUOTE_ELEMENT_MIDDLE + htmlText + HTML_BLOCKQUOTE_ELEMENT_END;
        });

        /* Filter and replace relative markdown hyperlinks */
        var regexForHyperlinks = new RegExp(REGEX_MD_ANCHOR, "gm");
        text = text.replace(regexForHyperlinks, function replaceHyperlinks(match, content) {
          //console.log(">> MATCH=[" + match + "]");
          //console.log(">> CONTENT=[" + content +"]");

            if( REGEX_HTML_PROTOCOL_PREFIX.test(content)) {
                // Do nothing, allow normal markdown to html conversion to occur
                return match;
            } else if (content.endsWith(EXT_MD)) {
                console.group("REPLACE URL: content (ORIGINAL)=("+content+")")
                var htmlURL = content.replace(EXT_MD, EXT_HTML)
                // replace the hyperlink's URL with markdown ext. to have an HTML ext.
                var match = match.replace(REGEX_MD_ANCHOR_HYPERLINK, "("+htmlURL+")")
                console.log(">> content (UPDATED)='" + htmlURL + "'");
                console.log(">> match (UPDATED)='" + match + "'");
                console.groupEnd()
                return match
            } else if (!content) {
              console.warn("WARN: Empty anchor link '"+match+"' found! " +
              "Returning text only.")
              var anchorText = match.match(REGEX_MD_ANCHOR_TEXT)
              console.error("TEXT="+anchorText)
              return anchorText[1]
            }
            // return original match
            //console.warn("WARN: Unexpected anchor '"+match+"' found! " + "Returning unmodified.")
            return match
        });

        //console.log("**AFTER** filter:" + text);
        return text;
      }
    }
  ]
});

/*
 * Conversion utils
 */
function replaceFileExtension(filename, targetExtension) {
    console.group('BEGIN: replaceFileExtension( ' + filename + "," + targetExtension + ")")
    var pos = filename.lastIndexOf(".");
    file2 = filename.substr(0, pos < 0 ? filename.length : pos) + targetExtension;
    console.groupEnd();
    return file2
}

function convertToHtml(err, rawMarkdown, outFilename, outputRoot) {
    console.group('BEGIN: convertToHtml')
    if (!err) {
        rawHtml = converter.makeHtml(rawMarkdown);
        enhancedHTML = CSS_HLJS + CSS_BLOCKQUOTE + rawHtml

        fs.writeFile(outFilename, enhancedHTML, 'utf-8', function (err) {
                console.group('writeFile(): ' + outFilename)
                if (err) {
                   return console.error(err);
                }
                console.groupEnd()
            });
    } else {
        console.error(err);
    }
    console.groupEnd();
}

function createTargetDirectory(targetDir) {
    console.group("BEGIN: createTargetDirectory( " + targetDir + " )")

    if (!fs.existsSync(targetDir)) {
        console.info("Creating Directory: " + targetDir + "...")
        fs.mkdirSync(targetDir, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }
        });
    } else {
        console.log("Directory [" + targetDir + "] exists (NOOP).")
    }
    console.groupEnd()
}

function createAbsoluteTargetFilename(relativeFilename, targetPath, targetFileExt){
  var absTargetFilename = path.join(__dirname, relativeFilename);

  if (targetPath) {
    absTargetFilename = path.join(__dirname, targetPath, relativeFilename);
  }

  if(targetFileExt){
    absTargetFilename = replaceFileExtension(absTargetFilename, targetFileExt)
  }

  return absTargetFilename
}

function convertMarkdownToHtml(mdFilename, targetPath){
    console.group("BEGIN: convertMarkdownToHtml( " + mdFilename + ", " + targetPath + " )")
    var mdFullFilename = path.join(__dirname, mdFilename);

    var htmlFilename = createAbsoluteTargetFilename(mdFilename, targetPath, EXT_HTML)
    createTargetDirectory(path.dirname(htmlFilename))

    fs.readFile(mdFullFilename, {encoding: 'utf-8'}, function anonConvertToHtml(err, rawMarkdown) {
        console.group('GROUP: anonConvertToHtml')
        console.log("SOURCE (.md): " + mdFullFilename + " (" + mdFilename + ")")
        console.log("TARGET (.html): " + htmlFilename)
        convertToHtml(err, rawMarkdown, htmlFilename, targetPath)
        console.groupEnd();
    });
    console.groupEnd()
}

/*
 * Main
 */

console.group('GROUP: main()')
var glob = require('glob')
var DEFAULT_HTML_OUTPUT_DIR = '.html';

// either file or directory-based conversion, but not both
if( (argv.f && argv.s) || !(argv.f || argv.s)) {
  displayUsageAndExit("ERROR: Requires either a valid filename (-f) or source (-s) option, but not both.")
}

// debug (trace) option
if (!argv.d) {
    // no-op all console commands part from warning() and error()
    console.group = function() {}
    console.groupEnd = function() {}
    console.log = function() {}
}

// Create a converter instance and register our custom extension
var converter = new showdown.Converter({
    // Add the highlight extensions along with my custom filter
    extensions: [showdownHighlight, SHOWDOWN_HTML_EXT_FILTER]
});

//converter.setFlavor('github');  // NOTE: we do this globally at the moment
converter.setOption('emoji', 'true');  // TODO: make global?

// If valid value, set as target directory for converted .html files
// otherwise, convert within existing directory path structure
// NOTE: code will create the directory structure as it goes; it doesn't need to exist
if (!argv.t) {
  // TODO: handle "-t" target_dir argument
  // TODO: validate ability to create target directory (as recursive root path)
  argv.t = DEFAULT_HTML_OUTPUT_DIR
}

// single file conversion
if (argv.f) {
  var inputFile = argv.f

  try{
    if(!inputFile.endsWith(EXT_MD)) {
      displayUsageAndExit("ERROR: Invalid input file '"+inputFile+"': must have a '.md' extension.")
    }
    console.info(">> Target directory: '" + argv.t + "'")
    console.info(">> converting: '" + inputFile + "'...")
    convertMarkdownToHtml(inputFile, argv.t)
  } catch(err){
    displayUsageAndExit("ERROR: Invalid input file: '"+inputFile+"': " + err)
  }

} else if (argv.s){  // else recursive conversion from target directory path

  if( !fs.existsSync(argv.s) ) {
    displayUsageAndExit("ERROR: Source '"+argv.s+"' does not exist.")
  } else if (!fs.lstatSync(argv.s).isDirectory()){
    displayUsageAndExit("ERROR: Source '"+argv.s+"' is not a directory.")
  }

  console.info(">> Source directory: '" + argv.s + "'")
  console.info(">> Target directory: '" + argv.t + "'")
  try {
      // directory (recursive) conversion ignoring 'node_modules' directory
      var startDir = argv.s
      var startPath = startDir + GLOB_FILE_PATTERN_MARKDOWN
      glob(startPath, GLOB_OPTIONS, function (err, files) {
        if (err) {
          displayUsageAndExit("ERROR: " + err)
        } else {
            for(let mdFilename of files) {
              console.info(">> converting: '" + mdFilename + "'...")
              convertMarkdownToHtml(mdFilename, argv.t)
            }
        }
      });
  } catch (error) {
    displayUsageAndExit("ERROR: " + error)
  }
}

/*
 * Copy Files (only if a target path was specified)
 */
if (argv.c && argv.t != CURRENT_DIR) {
  try {
    // directory (recursive) conversion ignoring 'node_modules' directory
    // TODO: allow additional ".ignore" path options
    var startDir = argv.s
    var startPath = startDir + GLOB_FILE_PATTERN_IMAGES
    glob(startPath, GLOB_OPTIONS, function (err, files) {
      if (err) {
        displayUsageAndExit("ERROR: " + err)
      } else {
          console.info(">> Processing images")
          for(let imageFilename of files) {
            console.info(">> copying: '" + imageFilename + "'...")
            targetImageFile = createAbsoluteTargetFilename(imageFilename, argv.t)
            createTargetDirectory(path.dirname(targetImageFile))
            fs.copyFile(imageFilename, targetImageFile, (err) => {
            if (err) throw err;
              console.log(">>      to: '" + path.relative(__dirname,targetImageFile) + "'...")
            });
          }
      }
    });
  } catch (error) {
    displayUsageAndExit("ERROR: " + error)
  }
}

console.groupEnd()
