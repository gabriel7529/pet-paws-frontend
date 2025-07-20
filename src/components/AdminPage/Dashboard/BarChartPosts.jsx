import { BarChart } from "@tremor/react";
import { PropTypes } from "prop-types";

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const BarChartPosts = ({ data, title }) => {
  const chartData = Object.entries(data).map(([key, value]) => ({
    name: key.toLowerCase(),
    Cantidad: value,
  }));

  return (
    <>
      <BarChart
        data={chartData}
        index="name"
        categories={["Cantidad"]} // Categoría que muestra los valores
        colors={["blue"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
        onValueChange={(v) => console.log(v)}
        yAxisLabel="Cantidad"
      />
      <span className="text-center block text-tremor-default text-tremor-content dark:text-dark-tremor-content">
        {title}
      </span>
    </>
  );
};

BarChartPosts.propTypes = {
  data: PropTypes.object.isRequired,
  title: PropTypes.string,
};

export default BarChartPosts;
