'use strict';
import { commands, workspace, window, ExtensionContext } from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
export function activate(context: ExtensionContext) {

  console.log('Congratulations, your extension "npmignore" is now active!');

  let npmIgnore = commands.registerCommand('extension.npmIgnore', (context) => {
    console.log(context);
    if (!context) {
      window.showErrorMessage('Execute this command failed. You only can use this function when you pick a file.')
      return;
    }
    const relativePath = path.relative(workspace.rootPath, context.path);
    console.log(workspace.rootPath);
    const npmingorePath = path.join(workspace.rootPath, '.npmignore');
    fs.readFile(npmingorePath, 'utf8', (err, data) => {
      if (data && data.indexOf(relativePath) !== -1) {
        window.showErrorMessage('Add to .npmignore failed. Aleady ignored this file.');        
      } else {
        fs.appendFile(npmingorePath, `${relativePath}\r\n`, err => {
          console.log(err);
          if (err) return window.showErrorMessage('Add to .npmignore failed');
        });
      }
    });
  });

  context.subscriptions.push(npmIgnore);
}