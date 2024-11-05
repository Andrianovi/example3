window.addEventListener('load', function () {
	let imagesHidden = document.querySelectorAll('.img-hidden');

	imagesHidden.forEach(i => {
		i.style.display = 'block';
	});
});