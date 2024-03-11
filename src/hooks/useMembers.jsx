import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useMembers = () => {
  const {
    data: members = [],
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR("/api/members", fetcher);

  const deleteMember = async (id) => {
    await fetch(`/api/members/${id}`, {
      method: "DELETE",
    });
    mutate();
  };
  const updatePayment = async ({ id, message, stripeID }) => {
    await fetch(`/api/payment`, {
      method: "PUT",
      body: JSON.stringify({ id, message, stripeID }),
    });
    mutate();
  };

  return {
    members,
    error,
    isLoading,
    isValidating,
    deleteMember,
    updatePayment,
    mutate,
  };
};

export default useMembers;
