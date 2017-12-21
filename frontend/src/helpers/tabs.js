/* Create tabs if markup is found on current page. Required markup for this
   to work is as follows (this also gives it basic style, feel free to add
   more classes to change how it looks like)

   <article class="tabs">
    <section class="tabs__header">
      <div class="tabs__header-item">Head I</div>
      <div class="tabs__header-item">Head II</div>
      <div class="tabs__header-item">Head III</div>
    </section>
    <section class="tabs__body">
      <div class="tabs__content">Content I</div>
      <div class="tabs__content">Content II</div>
      <div class="tabs__content">Content III</div>
    </section>
   </article>
 */

const classes = {
  tabsContentItem:       'tabs__content',
  tabsContentItemActive: 'tabs__content--active',
  tabsHeaderItems:       'tabs__header-item',
  tabsHeaderItemActive:  'tabs__header-item--active',
  activated:             'activated'
};

function changeActiveTab(root, tabId) {
  const currentActiveTabContent = root.getElementsByClassName(classes.tabsContentItemActive)[0],
        currentActiveTabHeader  = root.getElementsByClassName(classes.tabsHeaderItemActive)[0],
        tabContent              = root.querySelectorAll('.' + classes.tabsContentItem + '[data-id="' + tabId + '"]')[0],
        tabHeader               = root.querySelectorAll('.' + classes.tabsHeaderItems + '[data-id="' + tabId + '"]')[0];

  currentActiveTabContent.classList.remove(classes.tabsContentItemActive);
  tabContent.classList.add(classes.tabsContentItemActive);

  currentActiveTabHeader.classList.remove(classes.tabsHeaderItemActive);
  tabHeader.classList.add(classes.tabsHeaderItemActive);
}

function assignDataId(elements) {
  let counter = 1;
  [...elements].forEach(item => {
    item.dataset.id = counter;
    counter++;
  });
}

export default function () {
  const tabWrappers = document.getElementsByClassName('tabs');

  if (tabWrappers) {
    [...tabWrappers].forEach(tabWrapper => {
      if (tabWrapper.classList.contains(classes.activated)) return;
      
      const tabsHeaderItems  = tabWrapper.getElementsByClassName(classes.tabsHeaderItems),
            tabsContentItems = tabWrapper.getElementsByClassName(classes.tabsContentItem);

      assignDataId(tabsHeaderItems);
      assignDataId(tabsContentItems);

      tabsHeaderItems[0].classList.add(classes.tabsHeaderItemActive);
      tabsContentItems[0].classList.add(classes.tabsContentItemActive);

      tabWrapper.addEventListener('click', function (e) {
        if (e.target.classList.contains(classes.tabsHeaderItems) && !e.target.classList.contains(classes.tabsHeaderItemActive)) {
          changeActiveTab(tabWrapper, e.target.dataset.id);
        }
      });

      tabWrapper.classList.add(classes.activated)
    });
  }
};

