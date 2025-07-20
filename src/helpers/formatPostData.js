// Mapeo de opciones del frontend a los enums de Prisma
const petTypeMap = {
  'Perro': 'DOG',
  'Gato': 'CAT',
  'Pájaro': 'BIRD',
  'Conejo': 'RABBIT',
  'Otro': 'OTHER',
};

const petAgeMap = {
  'Cachorro': 'PUPPY',
  'Joven': 'YOUNG',
  'Adulto': 'ADULT',
  'Anciano': 'SENIOR',
};

const petSizeMap = {
  'Pequeño': 'SMALL',
  'Mediano': 'MEDIUM',
  'Grande': 'LARGE',
};

const petGender = {
  'Macho' : 'MALE',
  'Hembra' : 'FEMALE'
}

// Función para transformar los datos del frontend al formato de Prisma
export function formatPostData(postData) {
  delete postData.id; // Eliminar el id del post
  delete postData.user_id; // Eliminar el id del usuario
  delete postData.reward; // Eliminar el resto de propiedades

  const { location, pictures, date_lost, ...rest } = postData;

  const formattedData = {
    ...rest,
    latitude: location?.lat ?? null,
    longitude: location?.lng ?? null,
    picture: pictures?.[0]?.url ?? null,
    pet_gender: petGender[postData.pet_gender] ?? null,
    pet_state: 'LOST', // Valor por defecto para pet_status
    pet_type: petTypeMap[postData.pet_type] || 'OTHER', // Asignar 'OTHER' como predeterminado
    pet_age: petAgeMap[postData.pet_age] || 'ADULT', // Valor por defecto ADULT
    pet_size: petSizeMap[postData.pet_size] || 'MEDIUM', // Valor por defecto MEDIUM
    date_lost: new Date(date_lost).toISOString(), // Fecha actual
  };

  return formattedData;
}
