import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'components-jqueryui';
import 'owl.carousel';
import 'jquery-match-height';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/object-fit/ls.object-fit.js';
import 'object-fit-polyfill';

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');
