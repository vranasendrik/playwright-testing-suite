import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const env = (key: string): string => {
    const value = process.env[key];
    if (value) {
        return value;
    } else {
        console.warn(`Environment variable ${key} not found. Using default value.`);
        return '';
    }
};

export const getJsonFromFile = <T = Record<string, any>>(filePath: string): T => {
    try {
        const fullPath = path.join(process.cwd(), filePath);
        const data = fs.readFileSync(fullPath, 'utf-8');
        return JSON.parse(data) as T;

    } catch (error) {
        console.log(filePath)
        throw new Error(`Error reading JSON file from ${filePath}: ${error.message}`);
    }
};
