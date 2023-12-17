import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// API
import { getMyOrderById } from "api/";

const MyOrder = () => {
  // Params
  const { id } = useParams<{ id: string }>();

  console.log("id : ", id);

  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: [
      "get_my_order_id",
      {
        id,
      },
    ],
    queryFn: getMyOrderById,
    refetchOnWindowFocus: false,
  });

  console.log("Data :: ", data);

  return <div>MyOrder</div>;
};

export default MyOrder;
