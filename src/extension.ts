import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { mainTemplate } from "./template/main";
import { styleTemplate } from "./template/style";

export function activate(context: vscode.ExtensionContext) {
  const commandFunc = async (uri: any) => {
    const fp = uri.fsPath;
    const component = await vscode.window.showInputBox({
      placeHolder: "입력형식->컴포넌트명 스타일링도구(st/sc)",
      validateInput: (str: string) => {
        if (!str) {
          return "컴포넌트명이 입력되지 않았습니다";
        }
        return undefined;
      },
    });
    const getStylingFile = (name: string, type: string) => {
      if (type == "st") return `${name}.styled.ts`;
      if (type == "sc") return `${name}.module.scss`;
      return "";
    };

    if (component) {
      const [componentName, componentStyle] = component?.split(" ");
      const componentPath = path.join(fp, componentName);
      const stylingFile = getStylingFile(componentName, componentStyle);

      if (fs.existsSync(componentPath)) {
        vscode.window.showInformationMessage(
          "컴포넌트 폴더 생성에 실패하였습니다."
        );
      } else if (componentStyle != "st" && componentStyle != "sc") {
        vscode.window.showInformationMessage(
          "올바르지 않은 스타일링 도구입니다."
        );
      } else {
        fs.mkdirSync(componentPath);

        const indexFilePath = path.join(componentPath, `${componentName}.tsx`);
        const styleFilePath = path.join(componentPath, `${stylingFile}`);

        fs.writeFileSync(
          indexFilePath,
          mainTemplate(componentName, stylingFile)
        );
        fs.writeFileSync(styleFilePath, styleTemplate(componentStyle));

        vscode.window.showInformationMessage("컴포넌트 폴더가 생성되었습니다.");
      }
    }
  };

  let disposable = vscode.commands.registerCommand("makeComponent", (uri) => {
    commandFunc(uri);
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
