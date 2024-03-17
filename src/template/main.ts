export const mainTemplate = (name: string, stylePath: string) => {
  return `import * as S from "./${stylePath}";

export const ${name} = () => {
    return <div>${name} 컴포넌트</div>
}
`;
};
