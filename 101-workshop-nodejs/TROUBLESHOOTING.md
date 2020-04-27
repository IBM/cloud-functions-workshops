# Troubleshooting

## Action invoke errors

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
