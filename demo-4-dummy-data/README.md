# Demo 4: Dummy Data

For our last demo, we are going to be building a Dummy Data Generator. It won't be as complex as [Demo 3](../demo-3-lorem-ipsum-hater/README.md) but it will yet again cover new concepts that we have not seen before. We are going to be using a third-party node package and we are going to build our own HTML autocomplete system. It's very easy to forget that we are simply working in a [Node.js](https://nodejs.org/en/) environment, and because of this, we have millions of pre-written node packages we can use inside our own extensions.

## Generating & Preparing your new extension

For this demo, we are going to generate a new extension with the type of `-> New Extension (JavaScript)` or `-> New Extension (TypeScript)` depending on your own preference. In case you do not know how, please take a look at the instructions of [Demo 1](../demo-1-hello-world/README.md). For the Dummy Data generation, we are going to use a node package named [Faker](). You can install Faker using the following command:

`npm install --save faker`

Next, we are going to clean up our `package.json` file just like we did in Demo 3. Remove everything from the `contributes` object and replace your `activationEvents` array with:

```json
"activationEvents": [
  "*"
]
```

Now open your `extension.js` file and replace its entire content with:

```javascript
const vscode = require('vscode');
const faker = require('faker');

faker.locale = 'nl';

function activate(context) {
  let loremProvider = vscode.languages.registerCompletionItemProvider('html', {
    provideCompletionItems() {},
  });

  context.subscriptions.push(loremProvider);
}

exports.activate = activate;
```

You can change `faker.locale` to any region/country you want, just make sure you check Faker's documentation for a full list of supported regions.

Inside our `activate()` function you can find a variable named `loremProvider` that contains a empty function named `provideCompletionItems()`. This is where we are going to write our HTML autocomplete suggestions.

## Developing your extension
