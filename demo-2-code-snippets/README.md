# Demo 2: Code Snippets

On this second demo, we are going to take a look at code snippets. Code snippets are easy to create but can boost your productivity to a whole new level. Code Snippets are a great place to start because they do not require any JavaScript or advanced logic. They are built in a JSON format that is easy to understand even for the non-programmers among us.

## Generating your extension

Just like in our first example we will be using [Node.js](https://nodejs.org/en/), [Yeoman](https://yeoman.io/) and the [VS Code Extension Generator](https://www.npmjs.com/package/generator-code) to build our project. If you need any help installing the required tools please revisit our first [guide/demo](../demo-1-hello-world/README.md).

In order to generate a new project run:

`yo code`

Just like before, the generator will be asking you a few basic questions. Make sure you select `-> New Code Snippets` as the extension type, do not import any existing snippets and choose a language ID of your choice. In my case, I chose `javascript` so if you want to follow along, I suggest you to do the same. Do not worry if you want to support multiple languages, we will be covering this as well. In case you do not know which language IDs are available, you can find a list of the supported IDs in the official [VS Code website](https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers).

## Developing your code snippets

Your newly generated project folder should have a very similar structure to the first demo. However, you may have noticed that we don't have a file named `extensions.js`. This is because code snippets are written in JSON files and not in JavaScript. As you can see we have a folder named `snippets` with a file named `snippets.json`, this file is where we will be writing our code snippets.

If you open up your `package.json` file you can find the following code:

```json
"contributes": {
  "snippets": [
    {
      "language": "javascript",
      "path": "./snippets/snippets.json"
    }
  ]
}
```

If you want to work in multiple files or if you want to add support for multiple languages you could do something like this:

```json
"contributes": {
  "snippets": [
    {
      "language": "javascript",
      "path": "./snippets/snippets.json"
    },
    {
      "language": "python",
      "path": "./snippets/python-snippets.json"
    }
  ]
}
```

Just keep in mind that your code snippets will only work on files of the chosen language. If you want your JavaScript snippets to work on `.html` files you will need to add a new object to the `snippets` array that has a language of `html` and the same `path` as the JavaScript one.

Code snippets in VS Code use the following structure:

```json
"snippetName": {
  "prefix": "",
  "body": "",
  "description": "A useful snippet description."
}
```

So let's say we wanted to build a `clg` snippet that renders a `console.log()` statement where your cursor is automatically placed inside the parenthesis. We could accomplish the desired result like this:

```json
"consoleLog": {
  "prefix": "clg",
  "body": "console.log('$1');\n$2",
  "description": "Displays a message in the console."
}
```

Let's talk a bit about what is going on here. The `prefix` is what fires our code snippet, it is what the user needs to type. The `description` is a helpful tooltip that is displayed so users know what the code snippet is supposed to do. The fun part, of course, happens in the `body`. `$1` and `$2` are variables, variables can be written using the following syntaxes `$name` or `${name:default}`. When a variable isn’t set, its default or an empty string is inserted. Whenever a code snippet is fired, the user's cursor is automatically placed at the first variable's position. Using the `tab` key we can move forward to the next variable. Notice how we used a `string` as the body's value. We could also have used an `array` of strings, in that case, each array item should be rendered as its own line. Meaning we should not need to use `\n` in order to jump to the next line. We will take a closer look at this in our next code snippet.

In order to test your new code snippet, you will need to press the `F5` key. Make sure you create a new JavaScript file and start typing your prefix. An autocomplete suggestion should appear but if that does not happen you can press `ctrl + spacebar`. When you select the `clg` code snippet the following code should be rendered `console.log();` with your cursor inside the parenthesis. If you now press the `tab` key your cursor should jump to the next variable, in our case that is `$2` which is rendered on its own line.

For the next example we are going to build a code snippet that renders the following code:

```javascript
export default class Untitled {
  constructor() {
    classBody;
  }
}
```

Now take a look at the class name of Untitled. That is the file's name. For this example, we are going to be using one of the available variables provided to us by VS Code. In your snippets.json file under the clg snippet paste the following code:

```json
"exportClass": {
  "prefix": "class",
  "body": [
    "export default class ${TM_FILENAME_BASE/[^a-z]//gi} {",
    "  constructor() {",
    "    ${1:classBody}",
    "  }",
    "};\n$2"
  ],
  "description": "Export default class in ES5 syntax."
}
```

Notice how I decided to use the array method I explained earlier for this example in place of the `\n` method. This is simply done for rideability purposes. In this example, you can also see a variable with a default value given to it (`${1:classBody}`). Now let's take a closer look at `${TM_FILENAME_BASE/[^a-z]//gi}`. The variable `TM_FILENAME_BASE` is given to us by VS Code and it stores the file name without its extension. Using `/[^a-z]//gi` we can filter out any nonletter character from the string. So for example, if the file's name is `MyClass-5` the class name rendered by our snippet is `MyClass`. You can now test the new snippet by pressing `F5` and by typing `class` inside a JavaScript file, just like with the previous example.

That is all for today's demo/guide! I really hope you guys found it somewhat useful. For more information about code snippets, I redirect you to the [official guide](https://code.visualstudio.com/docs/editor/userdefinedsnippets) where you can find all the information you need and also a list with all the available variables provided to us.
