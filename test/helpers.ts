export const asMock = <F extends (...args: any[]) => any>(mockFunc: F) => mockFunc as jest.MockedFunction<typeof mockFunc>;
