import {JSDOM} from 'jsdom';
import {describe, it} from 'mocha';

// jsdom
const jsdom = new JSDOM(`<body>
<div id="app"></div>
</body>`);

// eslint-disable-next-line no-undef
global.window = jsdom.window;
// eslint-disable-next-line no-undef
global.document = jsdom.window.document;

// mocha
// eslint-disable-next-line no-undef
global.describe = describe;
// eslint-disable-next-line no-undef
global.it = it;

