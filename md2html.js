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

const SHOWDOWN_HTML_EXT_FILTER = "htmlExtFilter"
const EXT_MD = '.md';
const EXT_HTML = '.html';
//const LEN_EXT_MD = EXT_MD.length * -1; // we want the length expressed as negative for slices

// NOTE: The HTML_EXT regex selects the "outer" group defined by '{% ... %} and
// the inner group which has the content we want to (re)format
const REGEX_HTML_EXT = /([ \t]*{% hint(.+\n)*[ \t]*{% endhint %})+/;
const REGEX_MD_ANCHOR = /\[.*?\]\((.*?)\)+/;
const REGEX_MD_ANCHOR_TEXT      = /\[(.*?)\]/;
const REGEX_MD_ANCHOR_HYPERLINK = /\((.*?)\)/;
const REGEX_HTML_PROTOCOL_PREFIX = /^https?:\/\//i;

const HTML_BLOCKQUOTE_ELEMENT_BEGIN  = '\n<blockquote class="callout"><div>'
const HTML_BLOCKQUOTE_ELEMENT_MIDDLE = '</div><div class=\"callouttext\">'
const HTML_BLOCKQUOTE_ELEMENT_END    = '</div>' + '</blockquote>\n'

// Canned CSS to simulate gb-style experience
const CSS_HLJS = `
<!--
Highlight.js CSS
Demo: https://highlightjs.org/static/demo/
Hosted Library: https://cdnjs.com/libraries/highlight.js/
Usage: https://highlightjs.org/usage/
-->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/androidstudio.min.css">

`;

var SVG_INFO = `
<svg preserveAspectRatio="xMidYMid meet" height="1cm" width="1cm" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="none" style="color: rgb(56, 132, 255);"><g><path d="M12.2 8.98c.06-.01.12-.03.18-.06.06-.02.12-.05.18-.09l.15-.12c.18-.19.29-.45.29-.71 0-.06-.01-.13-.02-.19a.603.603 0 0 0-.06-.19.757.757 0 0 0-.09-.18c-.03-.05-.08-.1-.12-.15-.28-.27-.72-.37-1.09-.21-.13.05-.23.12-.33.21-.04.05-.09.1-.12.15-.04.06-.07.12-.09.18-.03.06-.05.12-.06.19-.01.06-.02.13-.02.19 0 .26.11.52.29.71.1.09.2.16.33.21.12.05.25.08.38.08.06 0 .13-.01.2-.02M13 16v-4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0M12 3c-4.962 0-9 4.038-9 9 0 4.963 4.038 9 9 9 4.963 0 9-4.037 9-9 0-4.962-4.037-9-9-9m0 20C5.935 23 1 18.065 1 12S5.935 1 12 1c6.066 0 11 4.935 11 11s-4.934 11-11 11" fill-rule="evenodd"></path></g></svg>
`

var SVG_SUCCESS = `
<svg preserveAspectRatio="xMidYMid meet" height="1cm" width="1cm" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke="currentColor" style="color: rgb(38, 203, 124);"><g><path d="M22 11.07V12a10 10 0 1 1-5.93-9.14"></path><polyline points="23 3 12 14 9 11"></polyline></g></svg>
`

var CSS_BLOCKQUOTE = `
<style>
body {
  font-family: Roboto, sans-serif;;
  font-weight: 400;
  line-height: 1.625;
}

code {
  font-family: monospace;
  font-size: 16px;
  background-color: gainsboro;
}

blockquote
{
  border-left: 5px solid rgba(0,0,0,0.2);
  margin-left: 0;
  padding-left: 2em;
}

.callout {
  background-color: whitesmoke;
  padding: 18px;
  display: flex;
}

.callouttext{
    background-color: transparent;
    margin-left: 8px;
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
                //var htmlURL = content.slice(0, LEN_EXT_MD) + EXT_HTML
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
function replaceFileExtension(file, ext) {
    console.group('BEGIN: replaceFileExtension( ' + file + "," + ext + ")")
    var pos = file.lastIndexOf(".");
    file2 = file.substr(0, pos < 0 ? file.length : pos) + '.' + ext;
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

function convertMarkdownToHtml(mdFilename,htmlRoot){
    console.group("BEGIN: convertMarkdownToHtml( " + mdFilename +", " + htmlRoot + " )")

    var filePath = path.join(__dirname);
    var mdFullFilename = path.join(__dirname,mdFilename);

    if (!htmlRoot) {
    } else {
        filePath = path.join(__dirname, htmlRoot);
    }

    var htmlFilename = path.join(filePath, mdFilename)
    htmlFilename = replaceFileExtension(htmlFilename, 'html')

    var targetDir = path.dirname(htmlFilename)
    createTargetDirectory(targetDir)

    fs.readFile(mdFullFilename, {encoding: 'utf-8'}, function anonConvertToHtml(err, rawMarkdown) {
        console.group('GROUP: anonConvertToHtml')
        console.log("SOURCE (.md): " + mdFullFilename + " (" + mdFilename + ")")
        console.log("TARGET (.html): " + htmlFilename)
        convertToHtml(err, rawMarkdown, htmlFilename, htmlRoot)
        console.groupEnd();
    });
    console.groupEnd()
}

/*
 * Main
 */

console.group('GROUP: main()')
var glob = require('glob')
var HTML_OUTPUT_DIR = '.html';

// slice(2) skips first 2 args (which are `node` command and the `.js` file being interpreted
var myArgs = process.argv.slice(2);

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
  argv.t = HTML_OUTPUT_DIR
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
    convertMarkdownToHtml(inputFile, HTML_OUTPUT_DIR)
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
      // TODO: allow additional ".ignore" path options
      var GLOB_OPTIONS= { ignore: ["**/node_modules/**", "./node_modules/**"] }
      var startDir = argv.s
      var startPath = startDir + "/**/*.md"
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

console.groupEnd()
