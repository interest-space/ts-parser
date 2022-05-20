
import * as fs from 'fs';
import * as path from 'path';
import * as parser from "@babel/parser";
import * as t from "@babel/types";

const extList = ['.js', '.tsx', '.d.ts', '.jsx', '.ts'];

const getAstNodeName = (astNode: any): string | null => {
  const { id } = astNode;
  if (id && id.name) {
    return id.name;
  }
  return null;
}

const formatProgramBodyToMap = (sourcePath: string, astProgramBody: t.Statement[]) => {
  const astProgramMap = new Map<string, t.Statement | t.Declaration>();
  // 格式化数据
  astProgramBody.forEach(astNode => {
    /**
     * interface A {}
     */
    if (t.isTSInterfaceDeclaration(astNode)) {
      const name = getAstNodeName(astNode);
      if (name) {
        astProgramMap.set(name, astNode);
      }
    }

    //
    /**
     * type A = {}
     */
    if (t.isTSTypeAliasDeclaration(astNode)) {
      const name = getAstNodeName(astNode);
      if (name) {
        astProgramMap.set(name, astNode)
      }
    }

    //
    /**
     * class A extends B {}
     */
    if (t.isClassDeclaration(astNode)) {
      const name = getAstNodeName(astNode);
      if (name) {
        astProgramMap.set(name, astNode)
      }

    }

    /**
     * export type A = {}
     * export interface A extends B = {}
     * export const A {}
     * export default class A {}
     */
    if (t.isExportNamedDeclaration(astNode)) {
      const { declaration } = astNode;
      if (declaration) {
        const name = getAstNodeName(declaration);
        if (name) {
          astProgramMap.set(name, declaration)
        }
      }
    }
  });
  return astProgramMap;
}

export const getAstByPath = (sourcePath: string) => {
  const code = fs.readFileSync(sourcePath, 'utf8');
  const res = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  const astProgramBody: t.Statement[] = res.program.body;
  const astProgramMap = formatProgramBodyToMap(sourcePath, astProgramBody)

  return {
    astProgramBody,
    astProgramMap
  }
}