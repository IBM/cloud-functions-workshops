# Concepts

## Web Actions

OpenWhisk actions can be annotated with a special flag at runtime to convert them into "web actions". Web actions can then be invoked through the public platform API using a HTTP request without user authentication. HTTP request parameters are automatically converted in event parameters. Values returned from the action are automatically serialised to a JSON response.

Web actions are a simple way to expose public HTTP endpoints from OpenWhisk actions. If you want to implement user authentication, rate limiting or routing, web actions have to manually handle this in the OpenWhisk action code. If you are building high-traffic and enterprise APIs, you will want a better solution to implementing these API features, that doesn't require lots of boilerplate code…

## API Gateway

OpenWhisk comes with an integrated API Gateway. This allows the developers to create new HTTP APIs which map incoming requests to web actions. The API Gateway handles capabilities like routing based on request properties \(URI paths and HTTP method\), user authentication, rate limiting and more. Developers do not need to implement this features within the web action code.

Using the API Gateway is an extension to web actions that allows you to build enterprise high-traffic HTTP APIs with minimal effort using IBM Cloud Functions. _Note that this feature is quite deep and outside of the scope of this class._

