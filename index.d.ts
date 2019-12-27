/**
 * @author Vivekanandan Sakthivelu
 * @version 1.0.0 
 */

export type key = string;
export type json = { [key: string]: any };

export interface store {
    insert();
}

export function init(path:string, reintialize:boolean);

/**
 @param key 
 @param json 
 */
export function insert(key: key, json: json, expiresIn: number): void;

/**
 @param key 
 @param json 
 */
export function update(key: key, json: json, expiresIn: number): void;

/**
 @param key 
 */
export function select(key: key): json;

/**
 
 @param key 
 */
export function has(key: key): boolean;

/**
 
 @param key 
 */
export function remove(key: key): boolean;

