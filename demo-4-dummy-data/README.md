# Demo 4: Dummy Data

For our last demo, we are going to be building a Dummy Data Generator. It won't be as complex as [Demo 3](../demo-3-lorem-ipsum-hater/README.md) but it will yet again cover new concepts that we have not seen before. We are going to be using a third-party node package and we are going to build our own HTML autocomplete system. It's very easy to forget that we are simply working in a [Node.js](https://nodejs.org/en/) environment, and because of this, we have millions of pre-written node packages we can use inside our own extensions.

## Generating & Preparing your new extension

For this demo, we are going to generate a new extension with the type of `-> New Extension (JavaScript)` or `-> New Extension (TypeScript)` depending on your own preference. In case you do not know how, please take a look at the instructions of [Demo 1](../demo-1-hello-world/README.md). For the Dummy Data generation, we are going to use a node package named [Faker](https://www.npmjs.com/package/faker). You can install Faker using the following command:

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

You can change faker.locale to any region/country you want, just make sure you check Faker's documentation for the full list of supported regions. In case you want to support a different language you can change `html` to any supported [Language ID](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

Inside our `activate()` function you can find a variable named `loremProvider` that contains a empty function named `provideCompletionItems()`. This is where we are going to write our HTML autocomplete suggestions.

## Developing your extension

Autocomplete suggestions can be written in multiple ways, we are going to use its simplest form:

```javascript
const suggestion = new vscode.CompletionItem('prefix');
suggestion.insertText = 'Hello World!';
suggestion.documentation = new vscode.MarkdownString('Displays: Hello World.');
```

The code snippet above will show the user an autocomplete suggestion whenever he starts typing `prefix` and presses `ctrl + spacebar`. If the user accepts the suggestion, it will replace the string he was typing with `Hello World!`. Easy right? Yet very powerful.

Let's say we wanted to build a new autosuggestion with the prefix of `lorem-fullName` that generates a new full name each time the user accepts our suggestion. Using Faker our code should look like this:

```javascript
const loremFullName = new vscode.CompletionItem('lorem-fullName');
loremFullName.insertText = faker.name.findName();
loremFullName.documentation = new vscode.MarkdownString(
  'Generate a random Full Name.',
);
```

Now, all we need to do is write a code snippet like the one above for each suggestion we want to provide with our extension. Just make sure you paste your code inside `provideCompletionItems()`. I went ahead and created a few more suggestions, email, firstName, lastName, phoneNumber & streetAddress.

Before we can test our extension, we need to return each suggestion we created inside the `provideCompletionItems()` function:

```javascript
return [
  loremEmail,
  loremFirstName,
  loremFullName,
  loremLastName,
  loremPhoneNumber,
  loremStreetAddress,
];
```

Now you should be able to test your new autocomplete system by pressing `F5`. Next, you will need to make sure you are working with a file of the chosen Language ID, in my case `html`. If you start typing your prefix and no suggestion comes up, try pressing `ctrl + spacebar` that should work.

There Is one last thing I wanted to mention before wrapping up this demo. You can also suggest an code snippet using the following syntax:

```javascript
snippetCompletion.insertText = new vscode.SnippetString(
  'Good ${1|morning,afternoon,evening|}. It is ${1}, right?',
);
```

I really hope you guys learned something from this 4 demos. I spend a lot of time researching the VS Code API, building the demos and writing this short guides. I learned a lot from this experience and I enjoyed myself doing so.

Take care, everyone!
