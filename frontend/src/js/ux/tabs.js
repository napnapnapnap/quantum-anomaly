'use strict';

/*
   Create tabs if markup is found on current page. Required markup for this
   to work is as follows (this also gives it basic style, feel free to add
   more classes to change how it looks like)

   <section class="tabs">
    <article class="tabs__header">
      <div class="tabs__header-item">Head I</div>
      <div class="tabs__header-item">Head II</div>
      <div class="tabs__header-item">Head III</div>
    </article>
    <article class="tab-body">
      <div class="tab tab-active">Content I</div>
      <div class="tab">Content II</div>
      <div class="tab">Content III</div>
    </article>
   </section>
 */

const helpers = require('../helpers/helpers');

const tabWrappers = document.getElementsByClassName('tabs'),
      classes     = {
        tabsContentItem:       'tabs__content',
        tabsContentItemActive: 'tabs__content--active',
        tabsHeaderItems:       'tabs__header-item',
        tabsHeaderItemActive:  'tabs__header-item--active',
      };

const _changeActiveTab = (root, tabId) => {
  const currentActiveTabContent = root.getElementsByClassName(classes.tabsContentItemActive)[0],
        currentActiveTabHeader = root.getElementsByClassName(classes.tabsHeaderItemActive)[0],
        tabContent = root.querySelectorAll('.' + classes.tabsContentItem + '[data-id="'+ tabId+'"]')[0],
        tabHeader = root.querySelectorAll('.' + classes.tabsHeaderItems + '[data-id="'+ tabId+'"]')[0];

  currentActiveTabContent.classList.remove(classes.tabsContentItemActive);
  tabContent.classList.add(classes.tabsContentItemActive);

  currentActiveTabHeader.classList.remove(classes.tabsHeaderItemActive);
  tabHeader.classList.add(classes.tabsHeaderItemActive);
};

const _assignDataId = (elements) => {
  let counter = 1;
  [].forEach.call(elements, function (item) {
    item.dataset.id = counter;
    counter++;
  });
};

const init = () => {
  if (tabWrappers) {
    [].forEach.call(tabWrappers, function (tabWrapper) {
      const tabsHeaderItems  = tabWrapper.getElementsByClassName(classes.tabsHeaderItems),
            tabsContentItems = tabWrapper.getElementsByClassName(classes.tabsContentItem);

      _assignDataId(tabsHeaderItems);
      _assignDataId(tabsContentItems);

      tabsHeaderItems[0].classList.add(classes.tabsHeaderItemActive);
      tabsContentItems[0].classList.add(classes.tabsContentItemActive);

      tabWrapper.addEventListener('click', function (e) {
        if (e.target.classList.contains(classes.tabsHeaderItems) && !e.target.classList.contains(classes.tabsHeaderItemActive)) {
          _changeActiveTab(tabWrapper, e.target.dataset.id);
        }
      });
    });
  }
};

module.exports = {
  init: init
};
