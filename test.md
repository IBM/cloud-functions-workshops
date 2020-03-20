# One

## Two

### Three

- item1
- item2
- item3

This is freeform text

### Emojis

:+1: :100: :1st_place_medal: :fireworks: :hammer_and_wrench: :warning: :exclamation: :bomb: :bulb:

### HTML Extension info

{% hint style="info" %}
**Note** The **`Entity`** column indicates which action was invoked along with the function's internal version. Every time you update an action's code, the platform will increment the internal version number.
{% endhint %}

### HTML Extension success

{% hint style="success" %}
🎉 **Great work, you have now learned how to create, deploy and invoke your own serverless functions on IBM Cloud Functions. What about passing data into actions? Let's find out more…** 🎉
{% endhint %}

### HTML Extension Test Consecutive blocks

{% hint style="info" %}
**Note** The **`Entity`** column indicates which action was invoked along with the function's internal version. Every time you update an action's code, the platform will increment the internal version number.
{% endhint %}

{% hint style="success" %}
🎉 **Great work, you have now learned how to create, deploy and invoke your own serverless functions on IBM Cloud Functions. What about passing data into actions? Let's find out more…** 🎉
{% endhint %}

{% hint style="warning" %}
**Warning** Be careful not to overuse warnings in your instructions for courses.
{% endhint %}

{% hint style="tip" %}
**Tip** Be sure to keep your IBM CLI and its plugins up to date.
{% endhint %}

{% hint style="none" %}
The ideal of Serverless “in-a-nutshell” is...&NewLine;
_Event-driven programming using stand-alone functions with no deployment or operational considerations_
{% endhint %}

## indented code with hint

Some example of a hint immediately after a code block that is indented:

  ```bash
  command subcommand create BASE_PATH API_PATH API_VERB ACTION
  ```

{% hint style="warning" %}
**Some example of a hint immediately after a code block that is indented.**
{% endhint %}

### HTML Extension Test Indented

  {% hint style="warning" %}
  _Do not use an activation ID with the flag `--last`._
  {% endhint %}

### Hyperlinks

- Try **[This is a hyperlink in a list](201-using-event-providers/README.md)** and it is at the beginning and bolded.

The following link [Is in th3 m&ddle w!th s@me f^nky {har~cters?=:droplet:](../README.md) with a relative link backwards.

This hyperlink has empty text >>EMPTY>>[](README.md)<<EMPTY<< that we do not want to blow up.

This hyperlink has an empty target URL [Empty target URL]() that we do not want to blow up.

{% hint style="info" %}
**Note** Some links are within HTML extensions and have [**`Code`** formatting](https://openwhisk.apache.org/) which action was invoked along with the function's internal version. Every time you update an action's code, the platform will increment the internal version number.
{% endhint %}

This hyperlink is to a default (root) route [https://openwhisk.apache.org/](https://openwhisk.apache.org/) that we do not want to blow up.

This hyperlink is for an external .html file [https://openwhisk.apache.org/documentation.html](https://openwhisk.apache.org/documentation.html) that we do not want to blow up.

### image hyperlinks

An Inline-style image with alt text: ![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1") that we want to pass through.

This is a link to an image file (no alt text): ![](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png) that we want to pass through.

A Reference-style image with alt text ![alt text][logo] that we want to pass through.

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

This is a link to an image anchor '[logo](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)' that we want to pass through.

![Token WebHook Access Scope](images/github-access-scope-repo-hook.png)

### image size (height, width) included

This image file uses `\| width=x` and SHOULD NOT WORK: ![](https://www.ibm.com/design/language/9c48fd6dd58b66177ff460644f59e572/core-blue100.svg | width=200) that we want to pass through.

This image file uses `=widthxheight` and SHOULD convert: ![](https://www.ibm.com/design/language/9c48fd6dd58b66177ff460644f59e572/core-blue100.svg =200x200) that we want to pass through.

This image file uses HTML which should be preserved:
<img src="https://www.ibm.com/design/language/9c48fd6dd58b66177ff460644f59e572/core-blue100.svg" width="200" height="200"></img>
that we want to pass through.

### replace image paths

1. Select the "Create" button from the page.
![alt 1](images/101-ex5-create-trigger-hp.png)
2. Choose "Create Trigger" from the list.
![alt 2](images/101/ex5/101-ex5-create-trigger-select-trigger.png)

### API / endpoint link

1. Generate a GitHub [personal access token](https://github.com/settings/tokens).
      * **admin:repo_hook**: **write:repo_hook** to allow the feed action to create your webhook.
    ![Token WebHook Access Scope](images/github-access-scope-repo-hook.png)
    * Make sure to copy your new personal access token when shown. GitHub will not let you see it again once you leave the page!

### intra-document links

[goto another section](#another-section)

### Bash

```bash
ibmcloud fn action create hello hello.js
```

### JSON

```json
[
  {
    "title": "apples",
    "count": [12000, 20000],
    "description": {"text": "...", "sensitive": false}
  },
  {
    "title": "oranges",
    "count": [17500, null],
    "description": {"text": "...", "sensitive": false}
  }
]

```

### JS

```js
// sample
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
```

### JavaScript

```javascript
// sample
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
```

### Another section

This section header is used to test intra-document links
