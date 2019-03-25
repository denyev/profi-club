import '@babel/polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import 'components-jqueryui';
import 'owl.carousel';
import 'jquery-match-height';

svg4everybody();

window.$ = $;
window.jQuery = $;

require('ninelines-ua-parser');
