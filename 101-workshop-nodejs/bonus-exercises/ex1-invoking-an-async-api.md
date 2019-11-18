<!--
#
# Licensed to the Apache Software Foundation (ASF) under one or more
# contributor license agreements.  See the NOTICE file distributed with
# this work for additional information regarding copyright ownership.
# The ASF licenses this file to You under the Apache License, Version 2.0
# (the "License"); you may not use this file except in compliance with
# the License.  You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
-->

# Calling an external API from an Async action

In this exercise, we will create a new action  that takes a price and currency and returns a message contains the equivalent amount of Bitcoin by calling an external API asynchronously.

## Input

The action should take two parameters, `amount` and `currency`. The `amount` parameter is a number and `currency` is a three letter [currency code](https://www.iban.com/currency-codes.html).

## Output

Return the following JSON template with the input parameters and bitcoin amounts.

```json
{
  "amount": 1.5,
  "message": "10000 USD is worth 1.5 bitcoins."
}
```

If either the `amount` or `currency` parameters are missing, return an error with details.

## Resources

This [Coindesk API](https://api.coindesk.com/v1/bpi/currentprice.json) returns real-time bitcoin prices. This includes rates for the `USD`, `GBP` and `EUR` currencies.

This [Currency Converter API](https://free.currencyconverterapi.com/) returns exchanges rates between traditional currencies.

Use the `request-promise` [module](https://www.npmjs.com/package/request-promise) to make external API requests. It comes pre-installed in the runtime.

## Tests

### Test with currencies in the Coindeck API response.

```bash
ibmcloud fn action invoke bitcoin -r -p amount 1000 -p currency USD
```

```json
{
    "amount": "0.160814",
    "label": "1000 USD is worth 0.160814 bitcoins."
}
```

```bash
ibmcloud fn action invoke bitcoin -r -p amount 1000 -p currency EUR
```

```json
{
    "amount": "0.187235",
    "label": "1000 EUR is worth 0.187235 bitcoins."
}
```

```bash
ibmcloud fn action invoke bitcoin -r -p amount 1000 -p currency GBP
```

```json
{
    "amount": "0.213012",
    "label": "1000 GBP is worth 0.213012 bitcoins."
}
```

### Test with currencies not in the Coindeck API response.

```bash
ibmcloud fn action invoke bitcoin -r -p amount 1000 -p currency AUD
```

```json
{
    "amount": "0.10814",
    "label": "1000 AUD is worth 0.10814 bitcoins."
}
```

### Test with missing parameters.

```bash
ibmcloud fn action invoke bitcoin -r -p amount 1000
```

```json
{
    "error": "Missing mandatory argument: currency"
}
```

```bash
ibmcloud fn action invoke bitcoin -r  -p currency GBP
```

```json
{
    "error": "Missing mandatory argument: amount"
}
```
