# Connect actions to event sources

This exercise introduces concepts like **triggers** and **rules** used by the platform to connect events from event providers and sources to **actions**. If you recall, the _Trigger_ and _Rule_ entities were shown as part of the ICF programming model in the previous chapter.

Once you have completed this exercise, you will have:

* Learned how event sources are integrated into the IBM Cloud Functions (ICF) platform.
* Created example triggers and bound to actions using rules.
* Tested connecting triggers to external event sources.

Once this exercise is finished, you can start to develop event-driven serverless applications using ICF!

## Background

Serverless applications are often described as event-driven because you can connect serverless functions to external event sources, like message queues and database changes. When these external events fire, the serverless functions are automatically invoked, without any manual intervention.

In the previous example, you’ve been manually invoking actions using the command line. Let's move onto connecting your actions to external event sources. OpenWhisk supports multiple external event sources like CouchDB, Apache Kafka, a cron-based scheduler, and more.

Before you jump into the details, let's review some concepts which explain how this feature works in Apache OpenWhisk.
