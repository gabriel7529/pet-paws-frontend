import PetInfo from "../components/DetailsPet/PetInfo";
import PetDescription from "../components/DetailsPet/PetDescription";

const DetailsPublication = () =>{
  return (
    <div className="flex place-content-evenly items-center">
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <PetInfo />
          <PetDescription />
        </div>
      </div>
    </div>
  );
}

export default DetailsPublication;
