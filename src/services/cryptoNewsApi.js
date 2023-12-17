import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    // Replace the following RapidAPI headers with your Real-Time News Data API headers
    // 'X-Coinbase-API-Key': 'YOUR_COINBASE_API_KEY',
    // 'X-Coinbase-API-Host': 'api.coinbase.com',
}

const baseUrl = "https://real-time-news-data.p.rapidapi.com"

function createREQ(url) {
    return {
        url,
        headers: headers,
    }
}

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: () => createREQ('/search?query=Cryptocurrency&lang=en')
        })
    })
})

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi;