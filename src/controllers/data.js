const axios = require('axios');



export const fetch_data = async () => {
    try {
        const data = await axios.get('https://api.hatchways.io/assessment/students');
        return data.data;
    } catch (e) {
        throw "Could not fetch the data"
    }



}
