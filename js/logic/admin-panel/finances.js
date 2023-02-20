$(document).ready(function () {
    recentFinances()
});

function recentFinances() {
    $.get("http://localhost:8080/admin-panel/finances", function (finances) {

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