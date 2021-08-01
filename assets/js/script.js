/**
 *  ___                  ___         _
 * | __|_ _ _ _  __ _  _|_ _|_ _  __| |_____ __
 * | _/ _` | ' \/ _| || || || ' \/ _` / -_) \ /
 * |_|\__,_|_||_\__|\_, |___|_||_\__,_\___/_\_\
 *                  |__/
 * 
 * This file is part of kristuff/apache-fancy-index.
 * Version 0.1.1 - Copyright (c) 2021 Kristuff <kristuff@kristuff.fr>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

{
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
        let path = window.location.pathname;
        let cleanPath = window.location.pathname.replace(/\/$/g, '');
        let titleText, breadcrumbHtml = '', partsNb = 0, origin = window.location.origin + '/';
        
        if (cleanPath) {
            const parts = cleanPath.split('/');
            cleanPath = parts[parts.length - 1];
            titleText = titleize(cleanPath).replace(/-|_/g, ' ');

            breadcrumbHtml += '<a href="' + origin + '">Home</a><span class="separator">/</span>'
            parts.forEach((name) => {
                if (name){
                    origin += name + '/'
                    breadcrumbHtml += '<a href="' + origin + '">' + name + '</a><span class="separator">/</span>'
                    partsNb++;
                }

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

  /**
   * Get the value and unit to use for RelativeTimeFormat.
   * @param {number} seconds Difference in seconds between two dates.
   */
  function getTimeFormatArgs(seconds) {
    const absoluteSeconds = Math.abs(seconds);
    if (absoluteSeconds > 60 * 60 * 24 * 365) {
      return { value: seconds / (60 * 60 * 24 * 365), unit: 'year' };
    }

    if (absoluteSeconds > 60 * 60 * 24 * 30) {
      return { value: seconds / (60 * 60 * 24 * 30), unit: 'month' };
    }

    if (absoluteSeconds > 60 * 60 * 24) {
      return { value: seconds / (60 * 60 * 24), unit: 'day' };
    }

    if (absoluteSeconds > 60 * 60) {
      return { value: seconds / (60 * 60), unit: 'hour' };
    }

    if (absoluteSeconds > 60) {
      return { value: seconds / 60, unit: 'minute' };
    }

    return { value: seconds, unit: 'second' };
  }

   /**
    * Convert the date output from the server to a Date instance.
    * @param {string} str Date string from the server.
    * @return {Date | null}
    */
    function getDateFromString(str) {
        if (!str) {
            return null;
        }

        // 2014-12-09 10:43 -> 2014, 11, 09, 10, 43, 0.
        const parts = str.split(' ');
        const day = parts[0].split('-');
        const timeOfDay = parts[1].split(':');
        const year = parseInt(day[0], 10);
        const month = parseInt(day[1], 10) - 1;
        const _day = parseInt(day[2], 10);
        const hour = parseInt(timeOfDay[0], 10);
        const minutes = parseInt(timeOfDay[1], 10);

        return new Date(year, month, _day, hour, minutes, 0);
    }

    function fixTime() {
        const hasRelativeTimeFormatter = 'RelativeTimeFormat' in Intl;
        if (!hasRelativeTimeFormatter) return;

        const formatter = new Intl.RelativeTimeFormat();
        const now = Date.now();

        Array.from(document.querySelectorAll('.indexcollastmod')).forEach((date, i) => {
        // Skip the first row because it's the link to the parent directory.
        if (i === 0) {
            return;
        }

        const lastModified = getDateFromString(date.textContent.trim());

        if (lastModified && !Number.isNaN(lastModified)) {
            const difference = Math.round((lastModified.getTime() - now) / 1000);
            const relativeFormat = getTimeFormatArgs(difference);
            date.textContent = formatter.format(Math.round(relativeFormat.value), relativeFormat.unit);
        }
        });
    }

    documentReady(function(){
        setTitle();
        //fixTime();
    });
}

