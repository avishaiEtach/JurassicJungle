import { http } from "../http";

export const dinosaursServices = {
  getDinosaurs,
  searchDinosaurs,
  createDinosaur,
  uploadDinosaurImage,
  updateDinosaur,
};

async function getDinosaurs(
  page = 1,
  limit = 10
): Promise<{ rows: Dinosaur[]; amount: number }> {
  const dinosaurs: { rows: Dinosaur[]; amount: number } = await http.get(
    `/getDinosaurs/all?page=${page}&limit=${limit}`
  );
  return dinosaurs;
}

async function searchDinosaurs(
  searchParameters: any = [],
  page = 1,
  limit = 10
): Promise<{ rows: Dinosaur[]; amount: number }> {
  const dinosaurs: { rows: Dinosaur[]; amount: number } = await http.post(
    `/searchDinosaurs?page=${page}&limit=${limit}`,
    { searchParameters }
  );
  return dinosaurs;
}

async function createDinosaur(dinosaur: any): Promise<Dinosaur> {
  const newDinosaur: Dinosaur = await http.post(`/addDinosaur`, { dinosaur });
  return newDinosaur;
}

async function updateDinosaur(dinosaur: any, id: string): Promise<Dinosaur> {
  const newDinosaur: Dinosaur = await http.put(`/updateDinosaur/${id}`, {
    fieldsToChange: dinosaur,
  });
  return newDinosaur;
}

async function uploadDinosaurImage(image: string): Promise<string> {
  console.log("image", image);
  const url: string = await http.post(`/uploadDinosaurImage`, { image });
  return url;
}
