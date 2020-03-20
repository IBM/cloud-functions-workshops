# Exposing Actions as APIs

This exercise shows you how to create public HTTP endpoints from IBM Cloud Functions Actions. You will learn how to create web actions and use the integrated API gateway.

_Once you have completed this exercise, you will have…_

* **Learned how to expose your Actions as HTTP endpoints.**
* **Created numerous examples of Web Actions**
* **Enabled API Gateway integration including authentication and rate-limiting.**

Once this exercise is finished, you will be able to creating scalable HTTP accessible APIs for Actions using IBM Cloud Functions!

## Background

Serverless applications are a great solution for building public API endpoints. Developers are now building "serverless web applications" by hosting their static files on a CDN and then using serverless platforms for their APIs.

OpenWhisk has a comprehensive RESTful API for the platform that allows you to invoke actions using authenticated HTTP requests. However, if you want to build APIs for public web sites or mobile applications, the authentication credentials will need embedding in client-side files. This is a terrible idea for obvious reasons…. but don't panic!

{% hint style="tip" %}
IBM Cloud Functions has a solution for creating public APIs to invoke your Actions without exposing credentials. 😎
{% endhint %}

First, let's review some concepts which explain how this feature works in Apache OpenWhisk...
