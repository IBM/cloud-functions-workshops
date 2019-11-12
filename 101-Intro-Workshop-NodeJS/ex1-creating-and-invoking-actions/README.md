# Creating and Invoking Actions

This exercise will introduce the concepts needed to create and use actions with IBM Cloud Functions.

_Once you have completed this exercise, you will have…_

* **Created and invoked actions.**
* **Understood how to pass parameters to actions.**
* **Created actions which return asynchronous results.**

Once this exercise is finished, we will be able to create simple serverless functions using IBM Cloud Functions!

## Background

Actions are stateless code snippets that run on the OpenWhisk platform. An action can be written as a JavaScript, Swift, PHP, or Python function, a Java method, static binary or a custom executable packaged in a Docker container. For example, an action can be used to detect the faces in an image, respond to a database change, aggregate a set of API calls, or post a Tweet.

Actions can be explicitly invoked, or run in response to an event. In either case, each run of an action results in an activation record that is identified by a unique activation ID. The input to an action and the result of an action are a dictionary of key-value pairs, where the key is a string and the value a valid JSON value. Actions can also be composed of calls to other actions or a defined sequence of actions.

