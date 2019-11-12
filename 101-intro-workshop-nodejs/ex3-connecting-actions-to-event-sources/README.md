# Connecting Actions to Event Sources

This exercise introduces concepts \(triggers and rules\) used by the platform to integrate external event providers.

_Once you have completed this exercise, you will have…_

* **Understood how event sources are integrated into the platform.**
* **Created example triggers and bound to actions using rules.**
* **Tested connecting triggers to external event sources.**

Once this exercise is finished, we can start to develop event-driven serverless applications using IBM Cloud Functions!

## Background

Serverless applications are often described as "event-driven" because you can connect serverless functions to external event sources, like message queues and database changes. When these external events fire, the serverless functions are automatically invoked, without any manual intervention.

In the previous example, we've been manually invoking actions using the command-line. Let's move onto connecting your actions to external event sources. OpenWhisk supports multiple external event sources like CouchDB, Apache Kafka, a cron-based scheduler and more.

Before we jump into the details, let's review some concepts which explain how this feature works in Apache OpenWhisk.

