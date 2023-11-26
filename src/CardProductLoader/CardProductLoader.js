import { getShoppingCart } from "../utilities/fakedb";

const CardProductLoadewr = async () => {
    const storedDb = getShoppingCart();
    let ids = [];
    for (const str in storedDb) {
        ids.push(str)
    }
    const loadesProduct = await fetch(`http://localhost:5400/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ids: ids })
    });
    const products = await loadesProduct.json();

    let cartArr = [];

    for (let id in storedDb) {
        const isExist = products.find((product) => product._id === id);
        if (isExist) {
            isExist.quantity = storedDb[id];
            cartArr.push(isExist)
        }
    }
    return cartArr;
}
export default CardProductLoadewr;