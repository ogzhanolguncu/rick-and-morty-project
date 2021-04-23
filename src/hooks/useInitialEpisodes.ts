import React, { useEffect } from 'react';

import axios from 'axios';

import { EPISODES_URL } from '../constants/urls';
import { axiosEpisodeTypes } from '../../type';

const useInitialEpisodes = ({
  setDataList,
  setError,
  setLoading,
}: {
  setDataList: React.Dispatch<React.SetStateAction<axiosEpisodeTypes | undefined>>;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${EPISODES_URL}`);
        setLoading(false);
        setDataList(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
};

export default useInitialEpisodes;
