
const axios = require('axios');
const { baseUrl, apiKey } = require('./src/config');
const server = require('./src/server');

server.get('/image', async (req, res) => {

    const { mode, param } = req.query;
    switch (mode) {
        case 'search':
            method = `&method=flickr.photos.search&tags=${param}`;
            break;
        default:
            method = '&method=flickr.photos.getRecent';
            break;
    };

    let url = `${baseUrl}?api_key=${apiKey}&format=json&nojsoncallback=1${method}`;

    try {
        const response = await axios.get(url);
        const data = response.data.photos;

        let result = [];
        data['photo'].map(value => {
            result.push({
                image: `https://farm${value.farm}.staticflickr.com/${value.server}/${value.id}_${value.secret}.jpg`,
                id: value.id,
                title: value.title
            });
        });

        return res.send(result);

    } catch (error) { res.send(error.message) }

});
