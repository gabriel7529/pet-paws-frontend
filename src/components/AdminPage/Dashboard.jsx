import BarChartHero from "./Dashboard/BarChartPosts";
import useDashboardData from "../../hooks/useDashboardData";
import DonutChartHero from "./Dashboard/DonutDataPost";

const Dashboard = () => {
  const { metrics, loading, error } = useDashboardData();

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <DonutChartHero
            data={metrics.porcentajeAdoptadoAdopcion}
            title="Porcentaje de mascotas adoptadas"
          />
        </div>
        <div>
          <DonutChartHero
            data={metrics.porcentajeEncontradoPerdido}
            title="Porcentaje de mascotas encontradas"
          />
        </div>

        <div>
          <BarChartHero
            data={metrics.estadoCount}
            title="Cantidad de publicaciones por estado"
          />
        </div>
        <div>
          <BarChartHero
            data={metrics.tipoMascotaCount}
            title="Cantidad de publicaciones por tipo de mascota"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
