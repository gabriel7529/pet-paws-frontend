import { useMemo } from "react";
import useAllPosts from "./useAllPosts";

const useDashboardData = () => {
  const { posts, loading, error } = useAllPosts();

  const metrics = useMemo(() => {
    const tipoMascotaCount = {
      DOG: 0,
      CAT: 0,
      BIRD: 0,
      RABBIT: 0,
      OTHER: 0,
    };
    const estadoCount = {
      LOST: 0,
      FOUND: 0,
      ADOPTION: 0,
      ADOPTED: 0,
    };

    posts.forEach((post) => {
      tipoMascotaCount[post.pet.petType] =
        (tipoMascotaCount[post.pet.petType] || 0) + 1;
      estadoCount[post.state] = (estadoCount[post.state] || 0) + 1;
    });

    const totalPosts = posts.length;

    const totalEncontradoPerdido = estadoCount.FOUND + estadoCount.LOST;
    const totalAdoptadoAdopcion = estadoCount.ADOPTED + estadoCount.ADOPTION;

    const porcentajeEncontradoPerdido = {
      LOST: (estadoCount.LOST / totalEncontradoPerdido) * 100 || 0,
      FOUND: (estadoCount.FOUND / totalEncontradoPerdido) * 100 || 0,
    };

    const porcentajeAdoptadoAdopcion = {
      ADOPTED: (estadoCount.ADOPTED / totalAdoptadoAdopcion) * 100 || 0,
      ADOPTION: (estadoCount.ADOPTION / totalAdoptadoAdopcion) * 100 || 0,
    };

    return {
      tipoMascotaCount,
      estadoCount,
      totalPosts,
      porcentajeEncontradoPerdido,
      porcentajeAdoptadoAdopcion,
    };
  }, [posts]);

  const translatedToSpanishMetrics = {
    ...metrics,
    tipoMascotaCount: {
      PERRO: metrics.tipoMascotaCount.DOG,
      GATO: metrics.tipoMascotaCount.CAT,
      PAJARO: metrics.tipoMascotaCount.BIRD,
      CONEJO: metrics.tipoMascotaCount.RABBIT,
      OTRO: metrics.tipoMascotaCount.OTHER,
    },
    estadoCount: {
      PERDIDO: metrics.estadoCount.LOST,
      ENCONTRADO: metrics.estadoCount.FOUND,
      "EN ADOPCION": metrics.estadoCount.ADOPTION,
      ADOPTADO: metrics.estadoCount.ADOPTED,
    },
    porcentajeAdoptadoAdopcion: {
      ADOPTADO: metrics.porcentajeAdoptadoAdopcion.ADOPTED,
      "EN ADOPCION": metrics.porcentajeAdoptadoAdopcion.ADOPTION,
    },
    porcentajeEncontradoPerdido: {
      PERDIDO: metrics.porcentajeEncontradoPerdido.LOST,
      ENCONTRADO: metrics.porcentajeEncontradoPerdido.FOUND,
    },
  };

  return { metrics: translatedToSpanishMetrics, loading, error };
};

export default useDashboardData;
