# Monitoring and APIs

## Monitoring activations

IBM Cloud Functions (ICF) Web UI comes with a [comprehensive visualization dashboard](https://cloud.ibm.com/functions/dashboard) for monitoring invocations of actions and triggers within a region and namespace.

Developers can see activation results, invocation times, and logging output through the dashboard. An activation summary and timeline are displayed and can be filtered by action name.  Trigger invocations can also be excluded from the view.

![Monitoring dashboard](images/101-ex5-monitoring.png)

Clicking on an activation ID in the "Activity Log" will show you the complete activation record in either raw or JSON format along with the HTTP request and response headers.

When things are going wrong with your actions, this dashboard will provide a nice starting point to debug the issue.

{% hint style="info" %}
If you wish to retain and create views on activations across your account, you can setup and connect ICF to the IBM Cloud logging service by clicking on the "Logs" item in the left menu.
{% endhint %}

## Managing APIs

HTTP endpoints for web actions can be created and managed through the ICF Web UI. Using this interface is often a lot more intuitive than using the CLI tool for managing more complex APIs.

Select "APIs" from the left-hand menu panel on the homepage.

![API homepage](images/101-ex5-apis-homepage.png)

### Details overview

The API details page shows properties for the chosen API, including an API monitoring page showing invocations.

![API homepage](images/101-ex5-api-details.png)

Using the menu on the left-hand side, different properties for the API can be accessed and modified.

* **Summary** - API overview page and monitoring dashboard for API invocations.
* **Definition** - API configuration properties, allows updating properties live.
* **Sharing** - Configure the exposing API with your internal users.
* **API Explorer** - API documentation for your endpoints.

### Create APIs

Click the "Create API" from the [APIs homepage](https://cloud.ibm.com/functions/).

In this page, API details can either be filled out manually or imported from an existing Swagger file.

1. Click on "Create Managed API”.
![Creating an API](images/101-ex5-create-apis-hp.png)
2. Fill out the "API name" field as "myapi".
3. Fill out the "Base path for API" field as "/api".
4. Click on the "Create Operation" button to add new HTTP endpoints to this API.
![Creating an API](images/101-ex5-create-apis-basepath.png)
5. Fill out the "Path" field as "/hello".
6. Choose an action from the drop-down list.
7. Click the "Create" button.

{% hint style="success" %}
As you can see, you can do everything within the web UI that can be done from the IBM Cloud CLI and the Cloud Functions plugin and more!
{% endhint %}
