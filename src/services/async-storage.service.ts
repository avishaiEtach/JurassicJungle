import { makeId } from "../assets/util";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  postMany,
};

async function query(entityType: string, delay = 1200) {
  const entitiesFromStorage = localStorage.getItem(entityType) ?? "[]";
  const entities = JSON.parse(entitiesFromStorage) || [];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(entities);
    }, delay);
  });
}

async function get(entityType: string, entityId?: string) {
  const entities: any = await query(entityType);
  return entityId
    ? entities.find((entity: any) => entity._id === entityId)
    : entities;
}

async function post(entityType: string, newEntity: any) {
  newEntity._id = makeId();
  let entities: any = await query(entityType);
  entities.push(newEntity);
  _save(entityType, entities);
  return newEntity;
}

async function put(entityType: string, updatedEntity: any) {
  let entities: any = await query(entityType);
  const idx = entities.findIndex(
    (entity: any) => entity._id === updatedEntity._id
  );
  entities.splice(idx, 1, updatedEntity);
  _save(entityType, entities);
  return updatedEntity;
}

async function remove(entityType: string, entityId: string) {
  let entities: any = await query(entityType);
  const idx = entities.findIndex((entity: any) => entity._id === entityId);
  entities.splice(idx, 1);
  _save(entityType, entities);
}

async function postMany(entityType: string, newEntities: any) {
  let entities: any = await query(entityType);
  newEntities = newEntities.map((entity: any) => ({
    ...entity,
    _id: entity._id ?? makeId(),
  }));
  entities.push(...newEntities);
  _save(entityType, entities);
  return entities;
}

function _save(entityType: string, entities: any) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}
