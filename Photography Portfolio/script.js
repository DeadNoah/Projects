document.addEventListener('DOMContentLoaded', function () {
    const columns = document.querySelectorAll('.hero-column');
    const expandButtons = document.querySelectorAll('.expand-btn');
    const closeButtons = document.querySelectorAll('.close-btn');
    const isMobile = window.matchMedia('(max-width: 768px)').matches


    columns.forEach((column, index) => {
        column.addEventListener('click', (e) => {
            if (isMobile && !column.classList.contains('expanded')) {
                e.stopPropagation();
                columns.forEach(col => col.classList.remove('expanded'));
                column.classList.add('expanded');
                column.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    expandButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            columns.forEach(col => col.classList.remove('expanded'));
            columns[index].classList.add('expanded');
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            columns[index].classList.remove('expanded');
        });
    });

    columns.forEach((column, index) => {
        column.addEventListener('click', function (e) {
            if (
                this.classList.contains('expanded') &&
                !e.target.closest('.column-content') &&
                !e.target.closest('.expanded-content')
            ) {
                this.classList.remove('expanded');
            }
        });
    });
});

const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            document.querySelectorAll('.hero-column').forEach(col => {
                col.classList.remove('expanded');
            });
            document.querySelector('.hero-column:nth-child(4)').classList.add('expanded');
        });
    });

    expandButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            columns.forEach(col => col.classList.remove('expanded'));
            columns[index].classList.add('expanded');
            if (isMobile) {
                document.body.classList.add('column-expanded');
                columns[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    closeButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            columns[index].classList.remove('expanded');
            if (isMobile) {
                document.body.classList.remove('column-expanded');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
