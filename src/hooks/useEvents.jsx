import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useEvents = () => {
  const {
    data: events = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/user/events", fetcher);

  return {
    events,
    error,
    isLoading,
    isValidating,
    mutate,
  };
};

export default useEvents;
