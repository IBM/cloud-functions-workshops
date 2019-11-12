# Managing Actions with Packages

This exercise will introduce the concepts needed to create and use packages with IBM Cloud Functions.

_Once you have completed this exercise, you will have…_

* **Learnt how to find public packages.**
* **Understood how to use public package actions and bindings.**
* **Created and shared custom packages.**

Once this exercise is finished, we will be able to create and share actions using packages using IBM Cloud Functions!

## Background

In IBM Cloud Functions, you can use _packages_ to bundle together related actions and even share them with others. Packages can only contain _actions_. _Triggers_ and _rules_ are not supported at the moment. Package nesting is not allowed, i.e. packages cannot contain other packages.

Packages also support default parameters. Package parameters are automatically passed into actions during invocations. This provides a convenient method to manage service credentials needed with multiple actions.

