import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

function displayFamilies(families) {
    // fetch families from supabase
    // clear out the familiesEl
    familiesEl.textContent = '';
    // loop through each family and for each family:
    for (let family of families) {
        const familyEl = document.createElement('div');
        familyEl.classList.add('family');
        const nameEl = document.createElement('h3');
        nameEl.textContent = family.name;
        const bunniesEl = document.createElement('div');
        bunniesEl.classList.add('bunnies');

        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('div');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;

            bunnyEl.addEventListener('click', async () => {
                await deleteBunny(bunny.id);
                const updatedFamilies = await getFamilies();
                displayFamilies(updatedFamilies);
            });
            bunniesEl.append(bunnyEl);
        }
        familyEl.append(nameEl, bunniesEl);
        familiesEl.append(familyEl);
    }
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
