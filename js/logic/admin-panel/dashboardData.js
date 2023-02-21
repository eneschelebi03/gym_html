$(document).ready(function () {
    loadDashboard()
});

const main = document.getElementById('main')
const dashboardMain = main.outerHTML

function recentFinances() {
    $.get("http://localhost:8080/admin-panel/recent/finances", function (finances) {

        console.log(finances)
        let sales = document.getElementById('sales')
        let expenses = document.getElementById('expenses')
        let profit = document.getElementById('profit')

        sales.innerText = finances.totalSales.toFixed(2)
        expenses.innerText = finances.costs.toFixed(2)
        profit.innerText = finances.profit.toFixed(2)


    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}

function recentOrders() {
    $.get("http://localhost:8080/admin-panel/recent/orders", function (orders) {

        console.log(orders)

        const tableBody = document.getElementById('recent-orders-tbody');

        try {

            let productCounter = 0;
            var BreakException = {}

            orders.forEach(function (order) {

                if (productCounter === 7) {
                    throw BreakException;
                }

                order.orderItems.forEach(function (item) {

                    // if (productCounter === 6) {
                    //     return false;
                    // }

                    const newRow = tableBody.insertRow(-1);

                    const pictureCell = newRow.insertCell(0);
                    const picture = document.createElement('img');
                    picture.src = item.pictureUrl;
                    pictureCell.appendChild(picture);

                    const nameCell = newRow.insertCell(1);
                    nameCell.appendChild(document.createTextNode(item.name));

                    const typeCell = newRow.insertCell(2);
                    typeCell.appendChild(document.createTextNode(item.type));

                    const sizeOrQuantityCell = newRow.insertCell(3);
                    sizeOrQuantityCell.appendChild(document.createTextNode(item.sizeOrQuantity));

                    const colorOrFlavorCell = newRow.insertCell(4);
                    colorOrFlavorCell.appendChild(document.createTextNode(item.colorOrFlavor));

                    const priceCell = newRow.insertCell(5);
                    priceCell.appendChild(document.createTextNode(item.price));

                    const costCell = newRow.insertCell(6);
                    costCell.appendChild(document.createTextNode(item.cost));

                    const countCell = newRow.insertCell(7);
                    countCell.appendChild(document.createTextNode(item.count));


                    const dateCell = newRow.insertCell(8);
                    dateCell.appendChild(document.createTextNode(order.orderedAt));

                    productCounter++;
                });
            });
        }

        catch (e) {
            if (e !== BreakException) {
                throw e
            }
        }
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}

function loadDashboard() {
    main.innerHTML = dashboardMain
    recentFinances()
    recentOrders()
}

function loadCustomers() {
    document.getElementById('sales-analytics').remove()

    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Customers</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                            <th>Name</th>\n' +
        '                            <th>Username</th>\n' +
        '                            <th>Phone</th>\n' +
        '                            <th>Address</th>\n' +
        '                            <th>Email</th>\n' +
        '                            <th>Orders</th>\n' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody id="customers-tbody">\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>'

    $.get("http://localhost:8080/admin-panel/customers/all", function (customers) {

        console.log(customers)

        const tableBody = document.getElementById('cusotmers-tbody');

        customers.forEach(function (user) {
            const newRow = tableBody.insertRow(-1);

            const nameCell = newRow.insertCell(0);
            nameCell.appendChild(document.createTextNode(user.name));

            const usernameCell = newRow.insertCell(1);
            usernameCell.appendChild(document.createTextNode(user.username));

            const phoneCell = newRow.insertCell(2);
            phoneCell.appendChild(document.createTextNode(user.phone));

            const addressCell = newRow.insertCell(3);
            addressCell.appendChild(document.createTextNode(user.address));

            const emailCell = newRow.insertCell(4);
            emailCell.appendChild(document.createTextNode(user.email));

            const ordersCell = newRow.insertCell(5);
            ordersCell.appendChild(document.createTextNode(user.orders));

        });
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}

function loadAllOrders() {
    document.getElementById('recent-updates').remove()

    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Orders</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                          <th style="width: 120px">Name</th>\n' +
        '                          <th>Type</th>\n' +
        '                          <th style="width: 20px;">Size/Quantity</th>\n' +
        '                          <th style="width: 40px;">Color/Flavor</th>\n' +
        '                          <th>Price</th>\n' +
        '                          <th>Cost</th>\n' +
        '                          <th>Count</th>\n' +
        '                          <th>OrderedAt</th>' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody id="all-orders-tbody">\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>'

    $.get("http://localhost:8080/admin-panel/orders/all", function (orders) {

        console.log(orders)

        const tableBody = document.getElementById('all-orders-tbody');

        orders.forEach(function (order) {

            order.orderItems.forEach(function (item) {

                // if (productCounter === 6) {
                //     return false;
                // }

                const newRow = tableBody.insertRow(-1);

                const pictureCell = newRow.insertCell(0);
                const picture = document.createElement('img');
                picture.src = item.pictureUrl;
                pictureCell.appendChild(picture);

                const nameCell = newRow.insertCell(1);
                nameCell.appendChild(document.createTextNode(item.name));

                const typeCell = newRow.insertCell(2);
                typeCell.appendChild(document.createTextNode(item.type));

                const sizeOrQuantityCell = newRow.insertCell(3);
                sizeOrQuantityCell.appendChild(document.createTextNode(item.sizeOrQuantity));

                const colorOrFlavorCell = newRow.insertCell(4);
                colorOrFlavorCell.appendChild(document.createTextNode(item.colorOrFlavor));

                const priceCell = newRow.insertCell(5);
                priceCell.appendChild(document.createTextNode(item.price));

                const costCell = newRow.insertCell(6);
                costCell.appendChild(document.createTextNode(item.cost));

                const countCell = newRow.insertCell(7);
                countCell.appendChild(document.createTextNode(item.count));


                const dateCell = newRow.insertCell(8);
                dateCell.appendChild(document.createTextNode(order.orderedAt));
            });
        });
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}

function loadAllProducts() {
    document.getElementById('recent-updates').remove()

    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Products</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                           <th></th>\n' +
        '                           <th>Name</th>\n' +
        '                           <th>Categories</th>\n' +
        '                           <th>Measurements</th>\n' +
        '                           <th>Characteristics</th>\n' +
        '                           <th>Price</th>\n' +
        '                           <th>Cost</th>\n' +
        '                           <th>Rating</th>\n' +
        '                           <th>Added On</th>' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody id="all-products-tbody">\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>'

    $.get("http://localhost:8080/admin-panel/products/all", function (products) {

        console.log(orders)

        const tableBody = document.getElementById('all-products-tbody');

        products.forEach(function (product) {
            const newRow = tableBody.insertRow(-1);

            const pictureCell = newRow.insertCell(0);
            const picture = document.createElement('img');
            picture.src = product.pictureUrl;
            pictureCell.appendChild(picture);

            const nameCell = newRow.insertCell(1);
            nameCell.appendChild(document.createTextNode(product.name));

            const categoriesCell = newRow.insertCell(2);
            categoriesCell.appendChild(document.createTextNode(product.Categories.join(', ')));

            const measurementsCell = newRow.insertCell(3);
            measurementsCell.appendChild(document.createTextNode(product.measurements.join(', ')));

            const characteristicsCell = newRow.insertCell(4);
            characteristicsCell.appendChild(document.createTextNode(product.characteristics.join(', ')));

            const priceCell = newRow.insertCell(5);
            priceCell.appendChild(document.createTextNode(product.price));

            const costCell = newRow.insertCell(6);
            costCell.appendChild(document.createTextNode(product.cost));

            const ratingCell = newRow.insertCell(7);
            ratingCell.appendChild(document.createTextNode(product.rating));

            const addedOnCell = newRow.insertCell(8);
            addedOnCell.appendChild(document.createTextNode(product.addedOn));

        });
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });

}