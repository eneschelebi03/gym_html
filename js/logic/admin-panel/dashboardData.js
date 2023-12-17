$(document).ready(function () {
	recentFinances();
	recentOrders();
});

function recentFinances() {
	// localhost:8080
	$.get(
		"http://localhost:8080/admin-panel/recent/finances",
		function (finances) {
			console.log(finances);
			const sales = document.getElementById("sales");
			const expenses = document.getElementById("expenses");
			const profit = document.getElementById("profit");
			const ordersOnline = document.getElementById("recent-orders");
			const ordersOffline = document.getElementById("recent-orders-of");
			const newCustomers = document.getElementById("new-customers");

			const zero = 0.0;

			sales.innerText = finances.totalSales
				? finances.totalSales.toFixed(2)
				: zero.toFixed(2);
			expenses.innerText = finances.costs
				? finances.costs.toFixed(2)
				: zero.toFixed(2);
			profit.innerText = finances.profit
				? finances.profit.toFixed(2)
				: zero.toFixed(2);

			ordersOnline.innerText = finances.ordersNumber
				? finances.ordersNumber.toFixed(2)
				: zero.toFixed(2);
			ordersOffline.innerText = finances.ordersNumber
				? finances.ordersNumber.toFixed(2)
				: zero.toFixed(2);
			newCustomers.innerText = finances.newUsers
				? finances.newUsers.toFixed(2)
				: zero.toFixed(2);

        

		}
	)
		.done(function () {})
		.fail(function () {
			alert("failed");
		});
}

function recentOrders() {
	// localhost:8080;
	$.get("http://localhost:8080/admin-panel/recent/orders", function (orders) {
		console.log(orders);

		const tableBody = document.getElementById("recent-orders-tbody");

		try {
			let productCounter = 0;
			var BreakException = {};

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
					const picture = document.createElement("img");
					picture.src = item.pictureUrl;
					pictureCell.appendChild(picture);

					const nameCell = newRow.insertCell(1);
					nameCell.appendChild(document.createTextNode(item.name));

					const typeCell = newRow.insertCell(2);
					typeCell.appendChild(document.createTextNode(item.type));

					const sizeOrQuantityCell = newRow.insertCell(3);
					sizeOrQuantityCell.appendChild(
						document.createTextNode(item.sizeOrQuantity)
					);

					const colorOrFlavorCell = newRow.insertCell(4);
					colorOrFlavorCell.appendChild(
						document.createTextNode(item.colorOrFlavor)
					);

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
		} catch (e) {
			if (e !== BreakException) {
				throw e;
			}
		}
	})
		.done(function () {})
		.fail(function () {
			alert("failed");
		});
}
