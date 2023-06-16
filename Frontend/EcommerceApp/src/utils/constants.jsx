
export const AUTH = "AUTH";
export const LOGOUT = "LOGOUT";
export const USER_INFO = "user_info"
export const CART = "cart_info"
export const PRODUCT = {
    ID: "id",
    CATEGORY: "category",
    DESCRIPTION: "description",
    IMAGE: "image",
    STATUS: "isAvailable",
    NAME: "name",
    PRICE: "price",
    QUANTITY: "quantity",
    RATING: "rating",

}

export const ADMIN = 5150;


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
