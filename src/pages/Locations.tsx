import React, { useState } from 'react';

import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import { axiosLocationTypes } from '../../type';
import CustomSpinner from '../components/CustomSpinner';
import CustomError from '../components/CustomError';
import Layout from '../components/Layout';
import LocationCardWrapper from '../components/LocationCardWrapper';
import useInitialLocations from '../hooks/useInitialLocations';

function Episodes() {
  const [locationList, setLocationList] = useState<axiosLocationTypes>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  useInitialLocations({ setDataList: setLocationList, setLoading, setError });

  const loadMoreEpisodes = async () => {
    try {
      if (locationList?.info.next) {
        setLoading(true);
        const { data } = await axios.get<axiosLocationTypes>(locationList?.info.next);
        const modifiedResults = [...locationList.results, ...data.results];

        setLocationList(
          (prevState) =>
            ({ ...prevState, info: data.info, results: modifiedResults } as axiosLocationTypes),
        );
        setLoading(false);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    <CustomSpinner />;
  }

  if (error) {
    <CustomError error={error} />;
  }

  return (
    <Layout>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreEpisodes}
        hasMore={!!locationList?.info.next}
        loader={<CustomSpinner key={0} />}
      >
        {locationList?.results?.map((location) => (
          <LocationCardWrapper {...location} key={`${location.id}${location.name}`} />
        ))}
      </InfiniteScroll>
    </Layout>
  );
}

export default Episodes;
