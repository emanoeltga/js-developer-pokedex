const caixaModal = () => {
    const modal = document.querySelector('.modal');
    const corpo = document.querySelector('*');
    const stiloatual = modal.style.display;
    

    if (stiloatual == 'block') {
        modal.style.display = 'none';
        corpo.style.overflow='hidden!important';
    }
    else {
        modal.style.display = 'block';
        corpo.style.overflow='scroll';
    }
}
