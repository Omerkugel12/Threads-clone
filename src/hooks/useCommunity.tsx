import { fetchCommunities } from "@/lib/actions/community.actions";
import axios from "axios";
import React, { useState } from "react";

function useCommunity() {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState<{ getCommunities: boolean }>({
    getCommunities: false,
  });

  const getCommunities = async ({
    pageNumber,
    searchString,
  }: {
    pageNumber: number;
    searchString: string;
  }) => {
    setLoading((prevState) => {
      return { ...prevState, getCommunities: true };
    });
    try {
      const res = await axios.get(
        `/api/communities?page=${pageNumber}&limit=2&searchString=${searchString}`
      );

      setCommunities(res.data.res.communities);
      setLoading((prevState) => {
        return { ...prevState, getCommunities: false };
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading((prevState) => {
        return { ...prevState, getCommunities: false };
      });
    }
  };

  return { getCommunities, communities, loading };
}

export default useCommunity;
