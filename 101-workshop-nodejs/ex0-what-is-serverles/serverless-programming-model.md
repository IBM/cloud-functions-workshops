# Serverless Programming Model

## The Least Common Denominator (LCD) view

There is no open standard for Serverless, its programming model, its deployment model or as a consequence its APIs.  Different providers may use different, but similar, semantics to describe the component parts that play a role in taking an event and causing a Serverless function to execute.

Shown below is a basic view of how Serverless works using the most common semantics from the Serverless domain and applicable to IBM Cloud Functions.

![Serverless LCD View](images/101-ex0-serverless-lcd-model.png)

## It all starts with an Event

Regardless of implementation or who you discuss Serverless with, it is all about invoking a function based upon an associated event and the data it is designed to operate on.

## These events all come from an "Event Source"

Events that can be associated with functions always come from "real world" or originating sources. In a Serverless programming model, the Event Source can just be conceptual or represent an actual "adapter" (service) that understands how to receive "raw" event data from the "originator" and turn it into data that a function can process.

Event sources can represent or adapt data from manual or automated originating sources, for example these may include:

### Manual examples

- _Directly_ - from a user calling a front-end API (public or private) with data.
- _Indirectly_ - from a user interacting with a website that uses Serverless to generated web content.

### Automated examples

- Periodic "alarm" events to process data on a schedule (e.g., batch jobs)
- Changes data storage devices (e.g., SQL databases, S3 Cloud Object Storage)
- Messages received on a Message Queue (e.g., Kafka, Rabbit MQ)
- Email messages
- Mobile "push" notifications
- IoT sensor data (e.g., Vehicle performance data, weather data)

The conceptual list of automated sources that can be processed by Serverless functions is of course endless!
