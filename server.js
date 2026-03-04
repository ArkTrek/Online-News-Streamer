const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let cached_categories = {};

async function fetchAndCategorizeChannels() {
    if (Object.keys(cached_categories).length > 0) return cached_categories;

    try {
        const categories = {
            'Regional News (Malayalam)': [],
            'National News (India)': [],
            'International News': []
        };

        function parseM3U(content, maxLimit, excludeIndia = false) {
            const channels = [];
            const lines = content.split('\n');

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (line.startsWith('#EXTINF')) {
                    if (!line.includes('group-title="News"')) continue;

                    if (excludeIndia && (line.includes('.in"') || line.toLowerCase().includes('india'))) continue;

                    const logoMatch = line.match(/tvg-logo="([^"]+)"/);
                    const logo = logoMatch ? logoMatch[1] : null;

                    const nameParts = line.split(',');
                    const name = nameParts[nameParts.length - 1].trim();

                    if (i + 1 < lines.length) {
                        const url = lines[i + 1].trim();
                        if (url && !url.startsWith('#')) {
                            channels.push({ id: url, name, logo });
                        }
                    }
                }
                if (channels.length >= maxLimit) break;
            }
            return channels;
        }

        try {
            const resReg = await fetch('https://iptv-org.github.io/iptv/languages/mal.m3u');
            categories['Regional News (Malayalam)'] = parseM3U(await resReg.text(), 30);
        } catch (e) {
            console.error(e);
        }

        try {
            const resNat = await fetch('https://iptv-org.github.io/iptv/countries/in.m3u');
            categories['National News (India)'] = parseM3U(await resNat.text(), 30);
        } catch (e) {
            console.error(e);
        }

        try {
            const resInt = await fetch('https://iptv-org.github.io/iptv/categories/news.m3u');
            categories['International News'] = parseM3U(await resInt.text(), 30, true);
        } catch (e) {
            console.error(e);
        }

        for (const key in categories) {
            if (categories[key].length === 0) delete categories[key];
        }

        cached_categories = categories;
        return cached_categories;

    } catch (error) {
        console.error(error);
        return {};
    }
}

app.get('/', async (req, res) => {
    const categorizedChannels = await fetchAndCategorizeChannels();

    let default_channel = null;
    for (const cat in categorizedChannels) {
        if (categorizedChannels[cat].length > 0) {
            default_channel = categorizedChannels[cat][0];
            break;
        }
    }

    res.render('index', {
        categorizedChannels: categorizedChannels,
        default_channel: default_channel
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
