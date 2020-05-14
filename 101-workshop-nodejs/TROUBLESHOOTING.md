
# Troubleshooting lab exercises

{% hint style="tip" %}
You may skip this section and continue onto the course. Feel free to reference this if you have any trouble during lab exercises.
{% endhint %}

## Organization

This guide is organized to describe error conditions by IBM Cloud Functions (ICF) entity type, such as actions, triggers and APIs, and the CLI commands the exhibit the error.

## Contact us

Please contact the course staff to report any errors that are not covered and be sure to include:

* IBM Cloud Namespace and region
* IBM CLI commands that exhibit the error and
* Results of "get" commands on any affected actions, triggers or APIs. For example:

```bash
ibmcloud fn [ action | trigger | api ] get <Name of entity>
```

## Action invoke errors

Errors reported as a result of an `ibmcloud action invoke` command.

### Reserved properties error

You may see the following error while attempting to invoke the an action with parameters:

```text
error: Unable to invoke action 'hello': Request defines parameters that are not allowed (e.g., reserved properties).
```

This likely means the action was turned into a web action, causing all its bound parameters to become `final` (protected).

You can verify this by looking at the value of the `final` annotation of the action using the `get` command. For example, the `hello` action has its `final` annotation set to `true` which would cause this error:

```bash
ibmcloud fn action get hello

ok: got action hello
{
    "name": "hello",
    ...
    "annotations": [
        ...
        {
            "key": "final",
            "value": true
        }
    ],
   ...
}
```

The simplest solution is to set the `final` annotation to `false`.  This example shows how to do this with the `hello` action:

```bash
ibmcloud fn action update hello -a final false
ok: updated action hello
```
