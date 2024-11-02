const axios = require('axios');

async function getUserData(username) {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return {
            username: response.data.login,
            name: response.data.name,
            avatar: response.data.avatar_url,
            url: response.data.html_url
        };
    } catch (error) {
        console.error("Usuário não encontrado no GitHub", error);
        throw new Error("Usuário não encontrado no GitHub");
    }
}

module.exports = { getUserData };
