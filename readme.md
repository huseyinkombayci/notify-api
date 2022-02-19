# notify

> Simple HTTP notification client

## Clone

```
git clone git@github.com:huseyinkombayci/notify-api.git
```

## Usage

```js
import notify from "notify-api";

console.log((await notify) - api({ url, message }));
//=> ${new Date().toISOString()} - ${message} is sent.
```

## API

### notify(options)

Returns a `Promise<string>` with success message.

#### options

Type: `object`

##### url

Type: `string`\

API endpoint to send messages.

##### message

Type: `string`\

Message to send.

```js
import notify from "notify-api";

console.log(
  await ipify({ url: "http://localhost:8080/notify", message: "test message" })
);
```
