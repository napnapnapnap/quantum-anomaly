'use strict';

const helpers = require('./helpers');

const classes = {
  styleGuide: 'style-guide'
};

function init() {
  const styleGuide = document.getElementsByClassName(classes.styleGuide);
  if (styleGuide) {
    const form = document.getElementsByClassName('form__test');
    [].forEach.call(form, (form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        helpers.xhrForm(form, (err, response) => {
          console.log(err, response);
        });
      });
    });

    const updateButtons = document.getElementsByClassName('update-via-api');
    [].forEach.call(updateButtons, (button) => {
      button.addEventListener('click', (e) => {
        helpers.xhr({
          uri:    '/test-ux-api',
          method: 'post',
          data:   {id: e.target.dataset.id}
        }, (err, response) => {
          if (err) {
            helpers.genericErrorMessage(err);
          } else {
            document.getElementsByClassName('_text-ux-api-content')[0].innerHTML = response;
          }
        });
      });
    });
  }
}

module.exports = {
  init: init
};
