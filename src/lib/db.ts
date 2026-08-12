import fs from 'fs/promises';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'database.json');

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  isSoldOut: boolean;
  specs: string[];
  category: string;
  condition: string;
  badge: string;
}

export interface Order {
  id: string;
  buyer: string;
  item: string;
  status: string;
  time: string;
  otp?: string;
}

export interface User {
  name: string;
  phone: string;
  joinedAt: string;
}

interface Database {
  products: Product[];
  orders: Order[];
  users: User[];
}

export async function readDB(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { products: [], orders: [], users: [] };
  }
}

export async function writeDB(data: Database): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}
