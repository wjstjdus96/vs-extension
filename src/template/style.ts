export const styleTemplate = (type: string) => {
  const getTemplate = () => {
    if (type == "st") {
      return `import styled from "styled-components"`;
    }
    return ``;
  };

  return `${getTemplate()}`;
};
