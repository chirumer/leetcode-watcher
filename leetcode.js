const axios = require('axios');
const cheerio = require('cheerio');

function findProperty(obj, propName) {
    for (var key in obj) {
        if (key === propName) {
            return obj[key];
        } else if (typeof obj[key] === 'object') {
            var result = findProperty(obj[key], propName);
            if (result !== undefined) {
                return result;
            }
        }
    }
    return undefined;
}

async function scrape_leetcode_profile(username) {
    const url = `https://leetcode.com/${username}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scriptContent = $('#__NEXT_DATA__').html();
    if (!scriptContent) {
        throw new Error("User Data Not Found");
    }
    const jsonData = JSON.parse(scriptContent);
    return jsonData;
}

async function leetcode_recently_solved_by_user(username) {
    const jsonData = await scrape_leetcode_profile(username);
    const recentProblems = findProperty(jsonData, 'recentAcSubmissionList');
    return recentProblems;
}


module.exports = {
    scrape_leetcode_profile, leetcode_recent_problems
};