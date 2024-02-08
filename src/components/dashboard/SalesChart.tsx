import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";

// Components
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { getSalesStatFromSpecificMonths } from "api/";

// Utils
import { convertToPlainArray } from "utils/array-helpers";

// Static Data
import { salesStatsDropdown } from "static-data/dropdown-data";

const SalesChart = () => {
  // State
  const [months, setMonths] = useState(3);

  // Query
  const { data, isFetched, isError, error }: any = useQuery({
    queryKey: [
      "get_sales_stats",
      {
        months,
      },
    ],
    queryFn: getSalesStatFromSpecificMonths,
  });

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
        valueFormatter: (value: any) => "₹" + value.toFixed(2),
      },
      xAxis: {
        type: "category",
        data: convertToPlainArray(data?.data, "date"),
        axisLabel: { interval: 0, rotate: 30 },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "Sales",
          data: convertToPlainArray(data?.data, "total_amount"),
          type: "bar",
          barWidth: "20%",
        },
      ],
    };
  }, [data]);

  return (
    <Card className="card-chart">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>Sales Stats</h5>
        <Form.Group controlId="days">
          <Form.Control
            as="select"
            size="sm"
            value={months}
            onChange={(e: any) => {
              setMonths(e.target.value);
            }}
          >
            {salesStatsDropdown?.map((item: any, key: number) => (
              <option key={key} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      </Card.Header>
      <Card.Body className="px-1">
        {!isFetched && <Loader />}

        {isFetched && !isError && (
          <ReactECharts
            option={option}
            style={{ height: "350px", width: "100%" }}
          />
        )}

        {isError && (
          <Message
            className="d-flex justify-content-center align-items-center"
            message={error?.message}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default SalesChart;
