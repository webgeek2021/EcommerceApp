import Furniture from "../../assets/Images/furniture_image.jpg"
import book_image from "../../assets/Images/books_image.jpg";
import handBag_image from "../../assets/Images/handBags_image.jpg";
import headphone_image from "../../assets/Images/headphone_image.jpg";
import laptop_image from "../../assets/Images/laptop_image.jpg";
import shoes_image from "../../assets/Images/shoes_image.jpg";

import furniture from "../../assets/Images/furniture.png" 
import shoes from "../../assets/Images/shoes.png" 
import tech from "../../assets/Images/tech.png" 
import handbag from "../../assets/Images/Handbag.png" 
import travel from "../../assets/Images/travel.png" 
import books from "../../assets/Images/books.png" 

export const carousel_Data = [
    {
        category: "Furniture",
        description: "Transform your living space with our wide range of furniture pieces. Whether you're looking for sofas, tables, chairs, or storage solutions, our selection combines quality craftsmanship with modern designs.",
        poster: Furniture,
    },
    {
        category: "Shoes",
        poster: shoes_image,
        description: "Explore our collection of stylish and comfortable shoes and sneakers for every occasion. From athletic footwear to trendy fashion shoes, we have something for everyone.",
    },
    {
        category: "Headphone",
        poster: headphone_image,
        description: "Immerse yourself in music with our range of high-quality headphones. Whether you prefer over-ear, on-ear, or wireless options, we have the perfect pair to enhance your audio experience.",
    },
    {
        category: "Laptop",
        poster: laptop_image,
        description: "Discover powerful and reliable laptops designed to meet your computing needs. Whether you're a student, professional, or gamer, our diverse selection of laptops offers the performance and features you seek.",
    },
    {
        category: "HandBag",
        poster: handBag_image,
        description: " Carry your essentials in style with our collection of trendy bags. From backpacks and tote bags to messenger bags and handbags, we offer fashionable and functional options for every occasion.",
    },
    {
        category: "Books",
        poster: book_image,
        description: "Dive into a world of knowledge and entertainment with our diverse collection of books. From bestsellers to classics, fiction to non-fiction, we have books to satisfy every reader's interests.",
    }
]


export const category_data = [
    {
        category : "Furniture",
        poster : furniture
    },
    {
        category : "Hand Bag",
        poster : handbag
    },
    {
        category : "Books",
        poster : books
    },
    {
        category : "Tech",
        poster : tech
    },
    {
        category : "Sneakers",
        poster : shoes
    },{
        category  : "Travel",
        poster : travel
    }
]