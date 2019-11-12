# Creating Triggers

_Triggers_ represent a named "channel" for a stream of events.

Let's create a trigger to send _location updates_:

```text
$ ibmcloud wsk trigger create locationUpdate
```

```text
ok: created trigger locationUpdate
```

You can check that the trigger has been created like this:

```text
$ ibmcloud wsk trigger list
```

```text
triggers
locationUpdate                         private
```

So far we have only created a named channel to which events can be fired.

Let's now fire the trigger by specifying its name and parameters:

```text
$ ibmcloud wsk trigger fire locationUpdate -p name "Donald" -p place "Washington, D.C"
```

```text
ok: triggered locationUpdate
```

Triggers also support default parameters. Firing this trigger without any parameters will pass in the default values.

```text
$ ibmcloud wsk trigger update locationUpdate -p name "Donald" -p place "Washington, D.C."
```

```text
ok: updated trigger locationUpdate
```

```text
$ ibmcloud wsk trigger fire locationUpdate
```

```text
ok: triggered locationUpdate
```

Events you fire to the `locationUpdate` trigger currently do not do anything. To be useful, we need to create a rule that associates the trigger with an action.

🎉🎉🎉 **That was easy? Let's keep going by connecting actions to triggers…** 🎉🎉🎉

