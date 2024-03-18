export const mainTemplate = (name: string, stylePath: string) => {
  return `import * as S from "./${stylePath}";

export const ${name} = () => {
    return <div>${name}</div>
}
`;
};
