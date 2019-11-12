# Concepts

## Triggers

Triggers are a named channel for a class of events. The following are examples of triggers:

* A trigger of location update events.
* A trigger of document uploads to a website.
* A trigger of incoming emails.

Triggers can be _fired_ \(activated\) by using a dictionary of key-value pairs. Sometimes this dictionary is referred to as the _event_. As with actions, each firing of a trigger results in an activation ID.

Triggers can be explicitly fired by a user or by an external event source. A _feed_ is a convenient way to configure an external event source to fire trigger events that can be consumed by IBM Cloud Functions. Examples of feeds include the following:

* CouchDB data change feed that fires a trigger event each time a document in a database is added or modified.
* A Git feed that fires a trigger event for every commit to a Git repository.

🎉🎉🎉 **Triggers are an implementation of the Observer pattern. Instances of triggers can be fired with parameters. Next we need to find out how to register observers.** 🎉🎉🎉

## Rules

A rule associates one trigger with one action, with every firing of the trigger causing the corresponding action to be invoked with the trigger event as input.

With the appropriate set of rules, it's possible for a single trigger event to invoke multiple actions, or for an action to be invoked as a response to events from multiple triggers.

For example, consider a system with the following actions:

* `classifyImage` action that detects the objects in an image and classifies them.
* `thumbnailImage` action that creates a thumbnail version of an image.

Also, suppose that there are two event sources that are firing the following triggers:

* `newTweet` trigger that is fired when a new tweet is posted.
* `imageUpload` trigger that is fired when an image is uploaded to a website.

You can set up rules so that a single trigger event invokes multiple actions, and have multiple triggers invoke the same action:

* `newTweet -> classifyImage` rule.
* `imageUpload -> classifyImage` rule.
* `imageUpload -> thumbnailImage` rule.

The three rules establish the following behavior: images in both tweets and uploaded images are classified, uploaded images are classified, and a thumbnail version is generated.

🎉🎉🎉 **Just remember rules allow you to register an observer on a trigger. That's all we need to know for now, let's look at using these new concepts…** 🎉🎉🎉

