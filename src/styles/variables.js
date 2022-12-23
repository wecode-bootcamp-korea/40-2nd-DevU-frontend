const variables = {
  flex: (direction = 'row', justify = 'center', align = 'center') => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,

  absolutePosition: (
    top = '50%',
    left = '50%',
    translateX = '-50%',
    translateY = '-50%'
  ) => `
    position: absolute;
    top: ${top};
    left: ${left};
    transform: translate(${translateX}, ${translateY});
  `,
};

export default variables;
