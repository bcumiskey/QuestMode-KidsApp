import {
  ref,
  get,
  set,
  update,
  remove,
  onValue,
  type DatabaseReference,
  type Unsubscribe,
} from 'firebase/database'
import { db } from './app.ts'

export function dbRef(path: string): DatabaseReference {
  return ref(db, path)
}

export async function dbGet<T>(path: string): Promise<T | null> {
  try {
    const snapshot = await get(dbRef(path))
    return snapshot.exists() ? (snapshot.val() as T) : null
  } catch (error) {
    console.error(`[Firebase] GET failed at ${path}:`, error)
    return null
  }
}

export async function dbSet<T>(path: string, data: T): Promise<void> {
  try {
    await set(dbRef(path), data)
  } catch (error) {
    console.error(`[Firebase] SET failed at ${path}:`, error)
    throw error
  }
}

export async function dbUpdate(path: string, data: Record<string, unknown>): Promise<void> {
  try {
    await update(dbRef(path), data)
  } catch (error) {
    console.error(`[Firebase] UPDATE failed at ${path}:`, error)
    throw error
  }
}

export async function dbRemove(path: string): Promise<void> {
  try {
    await remove(dbRef(path))
  } catch (error) {
    console.error(`[Firebase] REMOVE failed at ${path}:`, error)
    throw error
  }
}

export function dbOnValue<T>(
  path: string,
  callback: (data: T | null) => void,
): Unsubscribe {
  return onValue(
    dbRef(path),
    (snapshot) => {
      callback(snapshot.exists() ? (snapshot.val() as T) : null)
    },
    (error) => {
      console.error(`[Firebase] LISTENER error at ${path}:`, error)
    },
  )
}
