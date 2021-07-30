console.log('modal.js start');

const ref5 = {
	openModalBtn: document.querySelector('[data-action="open-modal"]'),
	closeModalBtn: document.querySelector('[data-action="close-modal"]'),
	//backdrop: document.querySelector('.js-backdrop'),
	//teamTable: document.querySelector(".team-members-table"),
	teamList: document.querySelector(".team-members-list"),
	teamDataSrc: document.querySelectorAll(".team-members-data img"),
};

ref5.openModalBtn.addEventListener('click', onOpenModal);
ref5.closeModalBtn.addEventListener('click', onCloseModal);

function onOpenModal(event) {
  document.body.classList.add('footer-show-modal');
}

function onCloseModal(event) {
  document.body.classList.remove('footer-show-modal');
}

let htmlText = "";
for (let i = 0; i < ref5.teamDataSrc.length; ++i) {
	const dataSrc = ref5.teamDataSrc[i];
	const li =
		`<li class="team-member-card">
		<img class="team-member-img" src="${dataSrc.getAttribute("src")}" alt="alt" data-src="" />
		<p class="team-member-name">${dataSrc.getAttribute("alt")}</p>
		<p class="team-member-mail">${dataSrc.getAttribute("git")}</p>
		</li>`;
	htmlText += li;
	//console.log(li);
}
ref5.teamList.insertAdjacentHTML("afterbegin", htmlText);

console.log("modal.js end");
