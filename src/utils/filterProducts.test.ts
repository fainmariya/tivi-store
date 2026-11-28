import { describe, expect, test } from "vitest";
import { filterProducts } from "./filterProducts";
import type { Product } from '../types/product';



  describe('filterProducts', () => {
    const testProducts: Product[] = [
        {
            id: 2,
            name: "Volume Shampoo",
            category: "Shampoo",
            price: 30,
            volume: "300 ml",
            image: "testImg",
            description: "A lightweight shampoo that gently cleanses fi...", 
        },
        { 
            id: 4,
            name: "Keratin Hair Mask",
            category: "Hair Mask",
            price: 70,
            volume: "500 ml",
            image: "testImg",
            description: "A restorative hair mask designed to smooth the.." 

        }
      ];
    test('поиск товаров по указанной категории', () => {
          const result = filterProducts(testProducts, '', 'Shampoo');
        expect(result).toEqual([testProducts[0]])
    });

    test('поиск без учета регистра', () => {
          const result = filterProducts(testProducts, 'VOLUME', 'All Categories');
        expect(result).toEqual([testProducts[0]])
      });
      
    test('поиск по названию и выбор категории работают одновременно.', () =>{
        
          const result = filterProducts(testProducts, "Keratin", "Shampoo");
          expect(result).toEqual([])
      });

    test('возвращает пустой массив, если товар не найден', () => {
        const result = filterProducts(testProducts, "Conditioner", "All Categories");
        expect(result).toEqual([])
      });
      
    test('находит товар по части названия', () => {
        const result = filterProducts(testProducts, "Hair", "All Categories");
        expect(result).toEqual([testProducts[1]])
      })
})