const SAVE_URL = 'http://localhost/diverses/furzarsch-muss-scheissen/api/public/post';
const GET_URL = 'http://localhost/diverses/furzarsch-muss-scheissen/api/public/get';

import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

export default class Database {

    constructor() {
    }

    /**
     * @param name
     * @param score
     */
    saveScore(name, score) {
        console.log('save score', name, score);
        $.ajax({
            url: SAVE_URL,
            type: "POST",
            crossDomain: true,
            data: {
                name: name,
                score: score
            },
            success: function (response, data, status) {
                console.log('success', response, data, status);
            },
            error: function (xhr, status) {
                console.error(xhr, status);
            }
        });
    }

    getHighscore(limit = 1, callback = null) {
        console.log('get highscore');
        $.ajax({
            url: GET_URL + '/' + limit,
            type: "GET",
            crossDomain: true,
            success: function (response, data, status) {
                console.log('success', response, data, status);
                if (callback) {
                    const score = response[0].score;
                    console.log(score);
                    callback(score);
                }
            },
            error: function (xhr, status) {
                console.error(xhr, status);
            }
        });
    }
}