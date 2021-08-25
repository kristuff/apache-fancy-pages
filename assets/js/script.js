/**
 *  ___                  ___
 * | __|_ _ _ _  __ _  _| _ \__ _ __ _ ___ ___
 * | _/ _` | ' \/ _| || |  _/ _` / _` / -_|_-<
 * |_|\__,_|_||_\__|\_, |_| \__,_\__, \___/__/
 *                  |__/         |___/
 * 
 * This file is part of kristuff/apache-fancy-pages.
 * Version 0.1.6 - Copyright (c) 2021 Kristuff <kristuff@kristuff.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

(function(document) {
	'use strict';

    // support for document ready
    function documentReady(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Underscore string's titleize.
    function titleize(str) {
        return decodeURI(str).toLowerCase().replace(/(?:^|\s|-)\S/g, c => c.toUpperCase());
    }

    function setTitle() {
        let cleanPath = window.location.pathname.replace(/\/$/g, '');
        let titleText, breadcrumbHtml = '', index = 0, origin = window.location.origin + '/';
        
        if (cleanPath) {
            const parts = cleanPath.split('/');
            cleanPath = parts[parts.length - 1];
            titleText = titleize(cleanPath).replace(/-|_/g, ' ');

            breadcrumbHtml += '<a href="' + origin + '">Home</a><span class="separator">/</span>'
            parts.forEach((name) => {
                if (name){
                    origin += name + '/';
                    breadcrumbHtml += '<a ';

                    if (index == parts.length -1){
                        breadcrumbHtml += 'class="active" ';
                    }
                    breadcrumbHtml += 'href="' + origin + '">' + name + '</a><span class="separator">/</span>'
                }
                index++;
            });
        } else {
            titleText = window.location.host;
        }

        titleText = `Index of ${titleText}`;

        const titleContainer = document.querySelector('h1#title');
        const breadContainer = document.querySelector('div#breadcrumb');

        titleContainer.innerHTML = titleText;
        breadContainer.innerHTML = breadcrumbHtml;
        document.title = titleText;
    }

	var tableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
            var tableBody = document.querySelector('table#indexlist tBody');
            Arr.forEach.call(tableBody.rows, _filter);
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            if (row.classList.contains('indexbreakrow') || row.classList.contains('indexhead')) return;
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var input = document.querySelector('input#filter');
                if (input) {
                    input.oninput = _onInputEvent;
                }
			}
		};
	})(Array.prototype);


    // Go 
    documentReady(function(){
        setTitle();
        tableFilter.init();
    });

})(document);

