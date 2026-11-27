import type { Product } from "../types/product";
import antiHairLossImage from "../assets/shampoo/AntiHairLoss_Shampoo.png";
import volumeHairImage from "../assets/shampoo/Volume_Shampoo.png";
import lipidHairMaskImage from "../assets/mask/LipidHairMask.png";

export const products: Product[] = [
    {
        id: 1,
        name: "Anti-Hair Loss Shampoo",
        category: "Shampoo",
        price: 30,
        volume: "300 ml",
        image: antiHairLossImage,
        description: "A gentle shampoo designed to cleanse the scalp, strengthen fragile hair, and help reduce breakage. Leaves hair feeling healthier, softer, and fuller-looking.",
    },
    {
        id: 2,
        name: "Volume Shampoo",
        category: "Shampoo",
        price: 30,
        volume: "300 ml",
        image: volumeHairImage,
        description: "A lightweight shampoo that gently cleanses fine hair and helps create natural-looking volume without weighing it down.", 
    },
    {
        id: 3,
        name: "Lipid Hair Mask",
        category: "Hair Mask",
        price: 70,
        volume: "500 ml",
        image: lipidHairMaskImage,
        description: "A nourishing hair mask designed to replenish lipids, improve softness, and help protect dry, damaged hair from breakage.", 
    }
];