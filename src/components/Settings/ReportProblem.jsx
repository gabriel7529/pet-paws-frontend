import { useForm } from "react-hook-form";
import Button from "./ui/Button";

const ReportProblem = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("Reporte enviado:", data);
    alert("Reporte enviado con éxito");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 space-y-4 bg-white shadow rounded"
    >
      <h2 className="text-xl font-bold mb-4 text-custom-250">Reportar un Problema</h2>
      <textarea
        {...register("problema")}
        className="border p-2 w-full border-custom-250 resize-none rounded-lg placeholder:text-custom-250 text-custom-250"
        rows="6"
        placeholder="Describe el problema..."
      />
      <Button type="submit">Enviar Reporte</Button>
    </form>
  );
};

export default ReportProblem;
