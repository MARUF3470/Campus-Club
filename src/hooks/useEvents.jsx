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

  const deleteEvent = async (id) => {
    await fetch(`/api/user/events/${id}`, {
      method: "DELETE",
    });
    // After deletion, re-fetch the data to update the UI
    mutate();
  };

  return {
    events,
    error,
    isLoading,
    isValidating,
    deleteEvent,
    mutate,
  };
};

export default useEvents;
