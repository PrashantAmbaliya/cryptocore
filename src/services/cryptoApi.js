import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const headers = {
    // Replace the following RapidAPI headers with your Coinbase API headers
    'X-RapidAPI-Key': '',
    'X-RapidAPI-Host': ''
}

const baseUrl = "https://coinranking1.p.rapidapi.com"

function createREQ(url) {
    return {
        url,
        headers: headers,
    }
}

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCoins: builder.query({
            query: (coinCount) => createREQ(`/coins${coinCount ? `?limit=${coinCount}` : ''}`)
        }),
        getCoinDetails: builder.query({
            query: (coinUuid) => createREQ(`/coin/${coinUuid}`)
        }),
        getCoinHistory: builder.query({
            query: ({ coinUuid , timeperiod }) =>
                createREQ(`/coin/${coinUuid}/history?timePeriod=${timeperiod}`),
        }),
        getExchanges: builder.query({
            query: () => createREQ('/exchanges'),
          }),
    })
})

export const {
    useGetCoinsQuery, useGetCoinDetailsQuery, useGetCoinHistoryQuery,useGetExchangesQuery
} = cryptoApi;