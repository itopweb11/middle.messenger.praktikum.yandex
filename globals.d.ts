declare global {
    let window: Window;
    let document: Document;
    let describe: typeof import('mocha').describe;
    let it: typeof import('mocha').it;
}

export {};


