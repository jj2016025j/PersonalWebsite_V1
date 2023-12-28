//取得資料
function findJson(url) {
    // 返回 Promise 对象
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(jsonData => {
                resolve(jsonData); // 解析 Promise，返回 JSON 数据
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                reject(error); // 拒绝 Promise，返回错误
            });
    });
}


//列出熱門商品
function createHotProductList(products, salesRecords) {
    let salesMap = {};
    // 累计每个产品的销售量
    salesRecords.forEach(record => {
        if (salesMap[record.product_name]) {
            salesMap[record.product_name] += record.quantity;
        } else {
            salesMap[record.product_name] = record.quantity;
        }
    });
    // 匹配产品信息并创建热门商品列表
    return products
        .filter(product => salesMap[product.name])
        .map(product => ({
            image: product.image,
            name: product.name,
            category: product.category,
            price: product.price,
            quantity: salesMap[product.name]
        }));
}

//過濾熱門分類
function getCategoryBestSellers(products) {
    const categoryBestSellers = new Map();
    products.forEach(product => {
        const category = product.category;
        if (!categoryBestSellers.has(category) || categoryBestSellers.get(category).sales < product.sales) {
            categoryBestSellers.set(category, { image: product.image, sales: product.sales });
        }
    });
    return Array.from(categoryBestSellers, ([category, { image, sales }]) => ({ category, image, sales }));
}

// list中选择前X个商品
function selectRandomProducts(products, maxCount) {
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random()); // 打乱数组
    return shuffledProducts.slice(0, maxCount);
}

function getCategoriesList(jsonData) {
    let parentCategories = [];

    for (let category in jsonData.category) {
        parentCategories.push(category);
    }

    return parentCategories;
}
function getAllSubcategories(jsonData) {
    let subCategories = [];
    for (let category in jsonData.category) {
        subCategories = subCategories.concat(Object.keys(jsonData.category[category]));
    }
    return subCategories;
}
function getSubcategories(parentCategory) {
    if (jsonData.category[parentCategory]) {
        return Object.keys(jsonData.category[parentCategory]);
    } else {
        return [];
    }
}

export {
    findJson, createHotProductList, getCategoryBestSellers, selectRandomProducts,
    getCategoriesList, getAllSubcategories, getSubcategories
}