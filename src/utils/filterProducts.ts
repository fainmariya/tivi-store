
import type { Product } from '../types/product';


export function filterProducts(
    products: Product[],
    searchQuery: string,
    category: string, 
    
): Product[] {
    const newSearch = products.filter((product) => {
        return product.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    const searchCategory = newSearch.filter((search) =>{
        return category === 'All Categories' || search.category === category;
    })
    
    return searchCategory;
    
}