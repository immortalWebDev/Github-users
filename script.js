const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Fetch user data
async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch (err) {
        if (err.response?.status === 404) {
            createErrorCard('There is no such profile on GitHub');
        }
    }
}

// Fetch repositories
async function getRepos(username) {
    try {
        const { data } = await axios(`${APIURL}${username}/repos?sort=created`);
        addReposToCard(data);
    } catch {
        createErrorCard("Oops, couldn't fetch repositories");
    }
}