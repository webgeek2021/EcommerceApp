
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const USER_INFO = "user_info"
export const CART = "cart_info"

export const PRODUCT = {
    ID: "id",
    CATEGORY: "category",
    SUBCATEGORY : "subCategroy",
    DESCRIPTION: "description",
    IMAGE: "image",
    STATUS: "isAvailable",
    NAME: "name",
    PRICE: "price",
    QUANTITY: "quantity",
    RATING: "rating",

}

export const ADMIN = 5150;

export const DELIVERYOPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'inTransit', label: 'In Transit' },
  { value: 'outForDelivery', label: 'Out for Delivery' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'failed', label: 'Failed' },
  { value: 'returned', label: 'Returned' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const ORDERSTATUS = [
  {value : "pending" , label : 'Pending'},
  {value : "inprogress" , label : "In Progress"},
  {value : "shipped" , label : "Shipped"},
  {value : "delivered" , label : "Delivered"}
]

export const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
