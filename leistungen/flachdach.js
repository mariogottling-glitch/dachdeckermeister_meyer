(() => {
  const cards = [...document.querySelectorAll('.flat-use')];
  const choice = document.querySelector('.flat-choice');
  const form = document.querySelector('#flat-inquiry-form');
  const selectedUseInput = form?.querySelector('input[name="use"]');
  const requestSelection = form?.querySelector('[data-request-selection]');
  const formStarted = form?.querySelector('input[name="form_started"]');
  const photoInput = form?.querySelector('input[type="file"]');
  const photoOutput = form?.querySelector('.flat-upload output');
  const formError = form?.querySelector('.flat-form__error');
  const formStatus = form?.querySelector('.flat-form__status');

  const uses = {
    gruendach: { title: 'Gründach', copy: 'Die Auswahl ist im Anfrageformular bereits eingetragen.' },
    photovoltaik: { title: 'Photovoltaik', copy: 'Die Auswahl ist im Anfrageformular bereits eingetragen.' },
    terrasse: { title: 'Dachterrasse', copy: 'Die Auswahl ist im Anfrageformular bereits eingetragen.' }
  };

  function selectUse(card) {
    const selected = uses[card.dataset.use];
    if (!selected) return;
    cards.forEach((item) => {
      const active = item === card;
      item.classList.toggle('is-selected', active);
      item.querySelector('button')?.setAttribute('aria-pressed', String(active));
    });
    if (choice) {
      choice.querySelector('strong').textContent = selected.title;
      choice.querySelector('p').textContent = selected.copy;
      choice.querySelector('a').href = '#flachdach-anfrage';
    }
    if (selectedUseInput) selectedUseInput.value = selected.title;
    if (requestSelection) requestSelection.textContent = selected.title;
  }

  cards.forEach((card) => card.querySelector('button')?.addEventListener('click', () => selectUse(card)));
  if (formStarted) formStarted.value = String(Math.floor(Date.now() / 1000));

  function setError(message = '') {
    if (!formError) return;
    formError.textContent = message;
    if (message) formError.focus({ preventScroll: true });
  }

  function photosAreValid() {
    const files = [...(photoInput?.files || [])];
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let message = '';
    if (files.length > 5) message = 'Bitte wählen Sie höchstens fünf Fotos aus.';
    else if (files.some((file) => file.size > 5 * 1024 * 1024)) message = 'Jedes Foto darf maximal 5 MB groß sein.';
    else if (totalSize > 15 * 1024 * 1024) message = 'Die Fotos dürfen zusammen maximal 15 MB groß sein.';
    if (photoOutput) photoOutput.textContent = files.length ? `${files.length} ${files.length === 1 ? 'Foto ausgewählt' : 'Fotos ausgewählt'}` : '';
    setError(message);
    return !message;
  }

  photoInput?.addEventListener('change', photosAreValid);

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity() || !photosAreValid()) return;
    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton || !formStatus) return;
    const buttonCopy = submitButton.innerHTML;
    setError();
    submitButton.disabled = true;
    submitButton.textContent = 'Wird gesendet …';

    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok) throw new Error(payload.message || 'Die Anfrage konnte nicht gesendet werden.');

      const heading = document.createElement('strong');
      const copy = document.createElement('p');
      const next = document.createElement('p');
      const phone = document.createElement('a');
      heading.textContent = 'Ihre Flachdach-Anfrage ist eingegangen';
      copy.textContent = payload.message || 'Vielen Dank. Ihre Angaben wurden sicher übermittelt.';
      next.textContent = 'Team Meyer prüft Ihre Auswahl, Projektdaten und Fotos persönlich und meldet sich zur Abstimmung.';
      phone.href = 'tel:+4917643487351';
      phone.textContent = '0176 43487351 anrufen';
      formStatus.replaceChildren(heading, copy, next, phone);
      form.classList.add('is-submitted');
      formStatus.focus({ preventScroll: true });
    } catch (error) {
      setError(`${error.message} Bitte versuchen Sie es erneut oder rufen Sie uns unter 0176 43487351 an.`);
      submitButton.disabled = false;
      submitButton.innerHTML = buttonCopy;
    }
  });
})();
