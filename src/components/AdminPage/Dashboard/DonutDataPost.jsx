import { DonutChart, Legend } from "@tremor/react";
import { PropTypes } from "prop-types";

const valueFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}%`;

function DonutDataPost({ data, title }) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key.toLowerCase(),
    Cantidad: value,
  }));

  const legentCategories = Object.keys(data).map((key) => key.toLowerCase());
  return (
    <>
      <div className="mx-auto space-y-12">
        <div className="space-y-3">
          <div className="flex justify-center">
            <DonutChart
              data={chartData}
              category="Cantidad"
              index="name"
              valueFormatter={valueFormatter}
              colors={["blue", "fuchsia"]}
              className="w-40"
              variant="pie"
            />
            <Legend
              categories={legentCategories}
              colors={["blue", "fuchsia"]}
              className="max-w-xs"
            />
          </div>
          <span className="text-center block text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {title}
          </span>
        </div>
      </div>
    </>
  );
}

DonutDataPost.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
};
export default DonutDataPost;
