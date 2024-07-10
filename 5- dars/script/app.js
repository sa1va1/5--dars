let products = JSON.parse(localStorage.getItem('products')) || []

document.getElementById('productForm').addEventListener('submit', function(e) {
    e.preventDefault()

    let name = document.getElementById('name').value
    let amount = parseInt(document.getElementById('amount').value)
    let price = parseInt(document.getElementById('price').value)

    let newProduct = { name, amount, price }
    products.push(newProduct)

    document.getElementById('productForm').reset()

    localStorage.setItem('products', JSON.stringify(products))
    displayProducts()
    calculateTotalCost()
})

function displayProducts() {
    let productList = document.getElementById('productList')
    productList.innerHTML = ''

    products.forEach((product, index) => {
        let productItem = document.createElement('div')
        productItem.className = 'product-item'
        productItem.innerHTML = `
            <strong>${product.name}</strong><br>
            Amount: ${product.amount}<br>
            Price: ${product.price}<br>
            <button class="delete-button" onclick="deleteProduct(${index})">Delete</button>
        `
        productList.appendChild(productItem)
    })
}

function deleteProduct(index) {
    products.splice(index, 1)
    localStorage.setItem('products', JSON.stringify(products))
    displayProducts()
    calculateTotalCost()
}

function calculateTotalCost() {
    let totalCost = products.reduce((total, product) => total + product.amount * product.price, 0)
    document.getElementById('totalCost').textContent = `Total Cost: ${totalCost}`
}

displayProducts()
calculateTotalCost()
