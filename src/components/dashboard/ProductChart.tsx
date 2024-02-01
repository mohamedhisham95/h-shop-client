import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// API
import { getProductCountByCategory } from "api/";

// Utils
import { convertToPlainArray } from "utils/array-helpers";

const ProductChart = () => {
  // Query
  const { data, isLoading, isError, error }: any = useQuery({
    queryKey: ["get_product_stats"],
    queryFn: getProductCountByCategory,
    refetchOnWindowFocus: false,
  });

  const option = useMemo(() => {
    return {
      legend: {
        show: true,
        data: convertToPlainArray(data?.data, "name"),
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
      },
      xAxis: {
        type: "category",
        data: convertToPlainArray(data?.data, "name"),
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          // data: [
          //   120,
          //   {
          //     value: 200,
          //     itemStyle: {
          //       color: "#a90000", // Unique color for bar
          //     },
          //   },
          // ],
          data: convertToPlainArray(data?.data, "count"),
          type: "bar",
        },
      ],
    };
  }, [data]);

  return (
    <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
  );
};

export default ProductChart;
