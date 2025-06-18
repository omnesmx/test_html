const photoInput = document.getElementById('photoInput');
const photoContainer = document.getElementById('photoContainer');
const meter = document.getElementById('meter');
const meterValue = document.getElementById('meterValue');

function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        photoContainer.innerHTML = `<img src="${e.target.result}" alt="Foto">`;
    };
    reader.readAsDataURL(file);
}

function randomizeMeter() {
    let value = parseInt(meter.value, 10);
    const change = Math.floor(Math.random() * 21) - 10; // -10 a +10
    value += change;
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    meter.value = value;
    meterValue.textContent = value;
}

photoInput.addEventListener('change', handlePhotoUpload);
setInterval(randomizeMeter, 2000);
