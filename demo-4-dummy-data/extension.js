const vscode = require('vscode');
const faker = require('faker');

faker.locale = "nl";

function activate(context) {
  let loremProvider = vscode.languages.registerCompletionItemProvider('html', {
    provideCompletionItems() {
      const loremEmail = new vscode.CompletionItem('lorem-email');
      loremEmail.insertText = faker.internet.email();
      loremEmail.documentation = new vscode.MarkdownString(
        'Generate a random Email Address.',
      );

      const loremFirstName = new vscode.CompletionItem('lorem-firstName');
      loremFirstName.insertText = faker.name.firstName();
      loremFirstName.documentation = new vscode.MarkdownString(
        'Generate a random First Name.`',
      );

      const loremFullName = new vscode.CompletionItem('lorem-fullName');
      loremFullName.insertText = faker.name.findName();
      loremFullName.documentation = new vscode.MarkdownString(
        'Generate a random Full Name.',
      );

      const loremLastName = new vscode.CompletionItem('lorem-lastName');
      loremLastName.insertText = faker.name.lastName();
      loremLastName.documentation = new vscode.MarkdownString(
        'Generate a random Last Name.',
      );

      const loremPhoneNumber = new vscode.CompletionItem('lorem-phoneNumber');
      loremPhoneNumber.insertText = faker.phone.phoneNumber();
      loremPhoneNumber.documentation = new vscode.MarkdownString(
        'Generate a random Phone Number.',
      );

      const loremStreetAddress = new vscode.CompletionItem('lorem-streetAddress');
      loremStreetAddress.insertText = faker.address.streetAddress();
      loremStreetAddress.documentation = new vscode.MarkdownString(
        'Generate a random Street Address.',
      );

      return [
        loremEmail,
        loremFirstName,
        loremFullName,
        loremLastName,
        loremPhoneNumber,
        loremStreetAddress,
      ];
    },
  });

  context.subscriptions.push(loremProvider);
}

exports.activate = activate;
