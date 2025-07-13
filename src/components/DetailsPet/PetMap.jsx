const PetMap = () => {
  return (
    <div className="w-full h-48">
      <iframe
        className="w-full h-full rounded-lg"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.641937056803!2d-77.01972472524027!3d-12.089292258187192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105ce5688d350a3%3A0x10987b1dbba72e80!2sSurquillo%2C%20Lima%2015047%2C%20Per%C3%BA!5e0!3m2!1ses-419!2sus!4v1632028993878!5m2!1ses-419!2sus"
        allowFullScreen=""
        loading="lazy"
        title="map"
      ></iframe>
    </div>
  );
};

export default PetMap;
