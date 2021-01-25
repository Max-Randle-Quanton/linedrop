import { CircularProgress } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { getStoredToken } from "../helpers";
import GroupPreviewCard from "./GroupPreviewCard";

const GroupList = () => {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios({
          method: "POST",
          url: "/graphql",
          headers: {
            "content-type": "application/json",
            Authorization: `bearer ${getStoredToken()}`,
          },
          data: JSON.stringify({
            query: `
              {
                groups {
                  _id
                  members {
                    username
                  }
                  messages {
                    author {
                      username
                    }
                    text
                    createdAt
                  }
                }
              }
            `,
          }),
        });

        setGroups(res.data.data.groups);
      } catch (err) {
        console.log(err?.response?.data?.errors[0]?.message);
      } finally {
        setLoading(false);
      }
    };

    if (loading) {
      fetchData();
    }
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress size={120} />
      ) : (
        groups.map((group) => <GroupPreviewCard key={group._id} {...group} />)
      )}
    </>
  );
};

export default GroupList;

// <pre>{JSON.stringify(groups, null, 2)}</pre>
