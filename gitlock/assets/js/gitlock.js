const now = new Date();
const day = now.getDay();
const hour = now.getHours();

let safeToLaunchCode = true;

if (day === 5 && hour >= 14) {
  safeToLaunchCode = false;
} else if (hour >= 16) {
  safeToLaunchCode = false;
}

if (!safeToLaunchCode) {
  const existingPageBlockers = document.getElementsByClassName('gitlock-page-block');

  if (!existingPageBlockers || !existingPageBlockers.length) {
    const message = (day === 5) ? 'No code launches are allowed after 2pm on a Friday' : 'No code launches are allowed after 4pm Mon-Thu';
    const pageBlocker = document.createElement('div');
    pageBlocker.classList.add('gitlock-page-block');
    pageBlocker.innerHTML = `<div><h1>${message}</h1><a href="#" class="gitlock-ignore">Do it anyway</a></div>`;
    document.body.appendChild(pageBlocker);

    const ignoreButton = pageBlocker.getElementsByClassName('gitlock-ignore')[0];

    ignoreButton.addEventListener('click', (e) => {
      e.preventDefault();
      pageBlocker.classList.add('hide');
    });
  }

  document.body.classList.add('gitlock-ext');
  const branchActions = document.getElementsByClassName('branch-action-body');
  if (branchActions.length) {
    branchActions[0].classList.add('gitlock-alert');
  }
}
