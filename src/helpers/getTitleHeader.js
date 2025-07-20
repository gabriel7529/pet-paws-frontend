export const getTitleHeader = (pathname) => {
  switch (pathname) {
    case "/post/map":
      return "addLocationPet";
    case "/chats":
      return "myMessage";
    case "/post/info":
      return "addInfoPet";
    case "/post":
      return "createPostPet";
    case "/post/tag":
      return "addTagPet";
    case "/post/state":
      return "addStatePet";
    default:
      return pathname;
  }
};

