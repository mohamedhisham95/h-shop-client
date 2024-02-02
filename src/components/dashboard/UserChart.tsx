import ReactECharts from "echarts-for-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Card, Form } from "react-bootstrap";

// Components
import Message from "components/common/Message";
import Loader from "components/common/Loader";

// API
import { getUserCountFromSpecificDays } from "api/";

// Utils
import { convertToPlainArray } from "utils/array-helpers";

// Static Data
import { userStatsDropdown } from "static-data/dropdown-data";

const UserChart = () => {
  // State
  const [days, setDays] = useState(3);

  // Query
  const { data, isFetched, isError, error }: any = useQuery({
    queryKey: [
      "get_user_stats",
      {
        days,
      },
    ],
    queryFn: getUserCountFromSpecificDays,
  });

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
        },
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
          name: "User",
          data: convertToPlainArray(data?.data, "count"),
          type: "bar",
          barWidth: "20%",
        },
      ],
    };
  }, [data]);

  return (
    <Card className="card-chart">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5>User Stats</h5>
        <Form.Group controlId="days">
          <Form.Control
            as="select"
            size="sm"
            value={days}
            onChange={(e: any) => {
              setDays(e.target.value);
            }}
          >
            {userStatsDropdown?.map((item: any, key: number) => (
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

export default UserChart;
