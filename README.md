# ts-parser

A tool that parses TypeScript descriptions into json.

### API reference

#### getAstByPath(path)
 
通过已知的文件路径，获取当前文件对应的 ast 描述，astProgramBody为数组形式，astProgramMap为 {key: value} 形式

```typescript
import { getAstByPath } from 'ts-parser';
const { astProgramBody, astProgramMap } = getAstByPath('src/classComponent.ts');

```

#### getPropsNameByPath(componentPath)

通过已知的文件路径 componentPath 获取 React 组件中的 props 对应的 TypeScript 命名

```typescript
// 'src/classComponent.ts'
import * as React from 'react';
interface ClassProps {
  name: string;
}
class Test extends React.Component<ClassProps> {}
export default Test;
```

```typescript
// 'src/functionComponent.ts'
import * as React from 'react';
interface FuncProps {
  name: string;
}

interface ExtendsProps extends React.FC<FuncProps> {
  age: number;
}

const Test = (props: FuncProps) => {};

const ExtendsComponent: ExtendsProps = () => {};

function TestFunction(props: FuncProps) {}
```

```typescript
import { getPropsNameByPath } from 'ts-parser';
const name1 = getPropsNameByPath('src/classComponent.ts');
const name2 = getPropsNameByPath('src/functionComponent.ts');
```

#### getPropsNameByAst(astBody)

通过已知的 astBody 获取 React 组件中的 props 对应的 TypeScript 命名

```typescript
import {  getPropsNameByAst, getAstByPath } from 'ts-parser';
const { astProgramBody, astProgramBodyMap } = getAstByPath('src/classComponent.ts');
const name3 = getPropsNameByAst(astProgramBody);
```

#### getTSDescByName(astName, {astProgramBody, astProgramMap})
