import type { Product } from "../types/product";
import antiHairLossImage from "../assets/shampoo/AntiHairLoss_Shampoo.png";
import volumeHairImage from "../assets/shampoo/Volume_Shampoo.png";
import lipidHairMaskImage from "../assets/mask/LipidHairMask.png";
import keratinHairMask from "../assets/mask/KeratinHairMask.png";
import hairCreamImage from "../assets/care/HairCream.png";
import woodenCombImage from "../assets/accessories/Comb.png";
import cosmeticBagImage from "../assets/accessories/CosmeticBag.png";
import silkHairSystem from "../assets/hairSystems/HairSystem.png";
import hair120_50Image from "../assets/hair/Hair2_120gm_50cm.png";
import hair116_50Image from "../assets/hair/Hair_116gm_50cm.png";
import hair98_65Image from "../assets/hair/Hair5_98gm_65cm.png";
import hair142_50Image from "../assets/hair/Hair1_142gm_50cm.png";
import hair110_50Image from "../assets/hair/Hair3_110gm_50cm.png";
import weftsImage from "../assets/hair/wefts_new..png"


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
    },
    {
        id: 4,
        name: "Keratin Hair Mask",
        category: "Hair Mask",
        price: 70,
        volume: "500 ml",
        image: keratinHairMask,
        description: "A restorative hair mask designed to smooth the hair surface, reduce frizz, and improve softness and manageability. Helps strengthen the feel of damaged hair and leaves it looking smooth and shiny.", 
    },
    {
        id: 5,
        name: "Moisturizing Hair Cream",
        category: "Hair Care",
        price: 70,
        volume: "150 ml",
        image: hairCreamImage,
        description: "A moisturizing leave-in hair cream that helps soften dry hair, reduce frizz, and improve manageability without weighing it down.", 
    },
    {
        id: 6,
        name: "Wide-Tooth Wooden Comb",
        category: "Accessories",
        price: 30,
        volume: "",
        image: woodenCombImage,
        description: "A wide-tooth wooden comb designed to gently detangle wet or dry hair, reduce pulling, and help prevent breakage.", 
    },
    {
        id: 7,
        name: "TIVI Cosmetic Bag",
        category: "Accessories",
        price: 30,
        volume: "",
        image: cosmeticBagImage,
        description: "An elegant cosmetic bag made from soft, textured material, featuring a secure zipper closure. Perfect for storing hair care essentials, cosmetics, and everyday beauty accessories.", 
    },
    {
        id: 8,
        name: "Silk Top Hair System",
        category: "Hair Systems",
        price: 1500,
        volume: "Cap size: 10 × 11 cm",
        image: silkHairSystem,
        description: "Natural scalp effect with a lightweight, seamless finish.", 
    },
    {
        id: 9,
        name: "Premium Human Hair",
        category: "Hair",
        price: 500,
        volume: "110 g / 50 cm",
        image: hair110_50Image,
        description: "Natural scalp effect with a lightweight, seamless finish.", 
    },
    {
        id: 10,
        name: "Premium Human Hair",
        category: "Hair",
        price: 500,
        volume: "142 g / 50 cm",
        image: hair142_50Image,
        description: "Natural scalp effect with a lightweight, seamless finish.", 
    },
    {
        id: 11,
        name: "Premium Human Hair",
        category: "Hair",
        price: 500,
        volume: "120 g / 50 cm",
        image: hair120_50Image,
        description: "Premium human hair selected for softness, natural movement, and seamless blending. Available in different lengths, shades, and weights for a customized result."
    },
    {
        id: 12,
        name: "Premium Human Hair",
        category: "Hair",
        price: 500,
        volume: "116 g / 50 cm",
        image: hair116_50Image,
        description: "Premium human hair selected for softness, natural movement, and seamless blending. Available in different lengths, shades, and weights for a customized result."
    },
    {
        id: 13,
        name: "Premium Human Hair",
        category: "Hair",
        price: 500,
        volume: "98 g / 65 cm",
        image: hair98_65Image,
        description: "Premium human hair selected for softness, natural movement, and seamless blending. Available in different lengths, shades, and weights for a customized result."
    },
    {
        id: 14,
        name: "Wefts",
        category: "Hair",
        price: 1000,
        image: weftsImage,
        description: "Weft extensions are a lightweight method of adding length and volume with natural-looking movement. Pricing is based on the grams of hair required and the installation service.."
    },
];