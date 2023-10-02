import { getShoppingCart } from "../utilities/fakedb";

const CardProductLoadewr = async () => {
    const loadesProduct = await fetch('products.json');
    const products = await loadesProduct.json();

    let cartArr = [];
    const storedDb = getShoppingCart();
    for (let id in storedDb) {
        const isExist = products.find((product) => product.id === id);
        if (isExist) {
            isExist.quantity = storedDb[id];
            cartArr.push(isExist)
        }
    }
    return cartArr;
}
export default CardProductLoadewr;