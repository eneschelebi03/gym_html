const main = document.getElementById('main')
const dashboardMain = main.outerHTML

const right = document.getElementById('right')
const dashboardRight = right.outerHTML


const options = document.querySelectorAll('.sidebar a')
options.forEach(option => {
    option.onclick = function () {
        options.forEach(option => {
            option.classList.remove('active')
        })

        linkLoad(option.name)

        option.classList.add('active')
    }
})

function showAllOrders() {
    options.forEach((option) => {
      option.classList.remove("active");
    });

    loadAllOrders()

    $('#link-orders').addClass('active')
}

function linkLoad(object) {
    hideRight()

    window.onresize = function () {
        hideRight()
    }

    switch (object) {
        case 'dashboard':
            loadDashboard()
            break;
        case 'customers-all':
            loadCustomers()
            break;
        case 'orders-all':
            loadAllOrders()
            break;
        case 'products-all':
            loadAllProducts()
            break;
        default:
            console.log('Not implemented yet')
    }
}

function loadDashboard() {
    location.reload();
}

function hideRight() {
    let sales = document.getElementById('sales-analytics')
    let upadtes = document.getElementById('recent-updates')

    if (window.matchMedia('(max-width: 1200px)').matches) {
        if (sales !== null) {
            sales.remove()
        }

        if (upadtes !== null) {
            upadtes.remove()
        }

    } else {
        right.innerHTML = dashboardRight
    }

    if (window.matchMedia('(min-width: 768px)').matches) {
        $('main .recent-orders h2').css('font-size', '1.4rem')
        $('main').css('margin-top', '3rem')
    } else {
        $('main .recent-orders h2').css('font-size', '2rem')
        $('main').css('margin-top', '5rem')

    }
}

function loadCustomers() {

    console.log('Loading all customers...')





    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Customers</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                            <th>Name</th>\n' +
        '                            <th>Username</th>\n' +
        '                            <th>Phone</th>\n' +
        '                            <th>Country</th>\n' +
        '                            <th>Address</th>\n' +
        '                            <th>Email</th>\n' +
        '                            <th>Orders</th>\n' +
        '                        </tr>\n' +
        '                    </thead>\n' +
        '                    <tbody id="customers-tbody">\n' +
        '                    </tbody>\n' +
        '                </table>\n' +
        '            </div>'


    // $('main .recent-orders').css('margin-top', '3rem')
    // $('main .recent-orders h2').css({
    //     'margin-bottom': '2rem',
    //     'text-align': 'center',
    //     'font-size': '2rem'
    // })
    // $('.container').css('grid-template-columns', '14rem auto')
    // $('.container').css('grid-auto-rows', '2rem auto')
    // $('.right').css('margin-top', '1rem')
    // $('aside').css('grid-row', '1 / 3')
    // $('main').css('grid-row', '2 / 3')
    // $('main .recent-orders table').css('width', '100%')


    $.get("https://www.gympowers.link/admin-panel/all/customers", function (customers) {

        console.log(customers)

        const tableBody = document.getElementById('customers-tbody');

        customers.forEach(function (user) {
            const newRow = tableBody.insertRow(-1);

            const nameCell = newRow.insertCell(0);
            nameCell.appendChild(document.createTextNode(user.name));

            const usernameCell = newRow.insertCell(1);
            usernameCell.appendChild(document.createTextNode(user.username));

            const phoneCell = newRow.insertCell(2);
            phoneCell.appendChild(document.createTextNode(user.phone));

            const countryCell = newRow.insertCell(3);
            countryCell.appendChild(document.createTextNode(user.country));

            const addressCell = newRow.insertCell(4);
            addressCell.appendChild(document.createTextNode(user.address));

            const emailCell = newRow.insertCell(5);
            emailCell.appendChild(document.createTextNode(user.email));

            const ordersCell = newRow.insertCell(6);
            ordersCell.appendChild(document.createTextNode(user.orders));

        });
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });
}

function loadAllOrders() {


    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Orders</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                          <th></th>' +
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


    // $('main .recent-orders').css('margin-top', '3rem')
    // $('main .recent-orders h2').css({
    //     'margin-bottom': '2rem',
    //     'text-align': 'center',
    //     'font-size': '2rem'
    // })
    // $('.container').css('grid-template-columns', '14rem auto')
    // $('.container').css('grid-auto-rows', '2rem auto')
    // $('.right').css('margin-top', '1rem')
    // $('aside').css('grid-row', '1 / 3')
    // $('main').css('grid-row', '2 / 3')
    // $('main .recent-orders table').css('width', '100%')

    $.get("https://www.gympowers.link/admin-panel/all/orders", function (orders) {

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

    main.innerHTML = '<div class="recent-orders">\n' +
        '                <h2>Products</h2>\n' +
        '                <table>\n' +
        '                    <thead>\n' +
        '                        <tr>\n' +
        '                           <th></th>\n' +
        '                           <th>Name</th>\n' +
        '                           <th>Categories</th>\n' +
        '                           <th>Options</th>\n' +
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


    // $('main .recent-orders').css('margin-top', '3rem')
    // $('main .recent-orders h2').css({
    //     'margin-bottom': '2rem',
    //     'text-align': 'center',
    //     'font-size': '2rem'
    // })
    // $('.container').css('grid-template-columns', '14rem auto')
    // $('.container').css('grid-auto-rows', '2rem auto')
    // $('.right').css('margin-top', '1rem')
    // $('aside').css('grid-row', '1 / 3')
    // $('main').css('grid-row', '2 / 3')
    // $('main .recent-orders table').css('width', '100%')

    $.get("https://www.gympowers.link/admin-panel/all/products", function (products) {

        console.log(products)

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
            categoriesCell.appendChild(document.createTextNode(product.categories.join(', ')));

            const measurementsCell = newRow.insertCell(3);
            measurementsCell.appendChild(document.createTextNode(product.options.join(', ')));

            const priceCell = newRow.insertCell(4);
            priceCell.appendChild(document.createTextNode(product.price));

            const costCell = newRow.insertCell(5);
            costCell.appendChild(document.createTextNode(product.cost));

            const ratingCell = newRow.insertCell(6);
            ratingCell.appendChild(document.createTextNode(product.rating));

            const addedOnCell = newRow.insertCell(7);
            addedOnCell.appendChild(document.createTextNode(product.addedOn));

        });
    })
        .done(function () { })
        .fail(function () {
            alert("failed");
        });

}