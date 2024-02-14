const https = require('https');

const data = {
  content: null,
  embeds: [
    {
      title: 'New LeetCode Problem Solved!',
      description: 'by <@865183868973219860>',
      color: 12904201,
      fields: [
        { name: 'Problem Title', value: 'Count Vowel Strings in Ranges' },
        { name: 'Problem Link', value: 'https://leetcode.com/problems/count-vowel-strings-in-ranges/description/' },
        { name: 'Difficulty Level', value: 'Medium' }
      ],
      footer: { text: 'Solved', icon_url: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png' },
      timestamp: '2024-02-14T08:30:00.000Z',
      image: { url: 'https://cdn.cdo.mit.edu/wp-content/uploads/sites/67/2021/01/0_zuhXdNAIUoxEem4-.png' },
      thumbnail: { url: 'https://leetcode.com/static/images/LeetCode_logo_rvs.png' }
    }
  ],
  attachments: []
};

const webhook_channel = '1207286809516572682';
const webhook_key = 'redacted'

const options = {
  hostname: 'discord.com',
  port: 443,
  path: `/api/webhooks/${webhook_channel}/${webhook_key}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  console.log(`Response status: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(JSON.stringify(data));
req.end();
