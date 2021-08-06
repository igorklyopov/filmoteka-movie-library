const ref5 = {
  openModalBtn: document.querySelector('[data-action="open-modal"]'),
  closeModalBtn: document.querySelector('[data-action="close-modal"]'),
  teamList: document.querySelector('.team-members-list'),
  teamDataSrc: document.querySelectorAll('.team-members-data img'),
  teamMemberEmailSvg: document.querySelector('.team-member-email-svg'),
  teamMemberGithubSvg: document.querySelector('.team-member-github-svg'),
  addWatched: document.querySelector('.add-to-watched-btn'),
  addQueue: document.querySelector('.add-to-queue-btn'),
};

ref5.openModalBtn.addEventListener('click', onOpenModal);
ref5.closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  document.body.classList.add('footer-show-modal');
}

function onCloseModal(event) {
  document.body.classList.remove('footer-show-modal');
}

let htmlText = '';
for (let i = 0; i < ref5.teamDataSrc.length; ++i) {
  const dataSrc = ref5.teamDataSrc[i];
  const li = `<li class="team-member-card">
		<img class="team-member-img" src="${dataSrc.getAttribute('src')}" alt="alt" data-src="" />
		<p class="team-member-name">${dataSrc.getAttribute('name')}</p>
		<p class="team-member-surname">${dataSrc.getAttribute('surname')}</p>
        <div class="team-member-links">
        <a href="mailto:${dataSrc.getAttribute('email')}" class="team-member-link">
        	<svg class="team-member-icon">
                <use href="${ref5.teamMemberEmailSvg.getAttribute('href')}"></use>
            </svg>
        </a>

        <a href="${dataSrc.getAttribute('git')}" target="_blank" class="team-member-link">
        	<svg class="team-member-icon">
                <use href="${ref5.teamMemberGithubSvg.getAttribute('href')}"></use>
            </svg>
        </a>
        </div>
		</li>`;
  htmlText += li;
}
ref5.teamList.insertAdjacentHTML('afterbegin', htmlText);
