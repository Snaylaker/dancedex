export const getFileStorageUrl = (userId: string, fileName: string) =>
  "public/" + userId + "/" + fileName;
