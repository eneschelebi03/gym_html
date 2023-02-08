function addToCart(id, chosenColor, chosenSize) {
    let email = window.sessionStorage.getItem('username')

    $.ajax({
        url: 'http://localhost:8080/cart/addProduct?' + $.param({ email: email }),
        method: 'POST',
        contentType: "application/json",
        data: JSON.stringify({ wearId: id, color: chosenColor, size: chosenSize })
        
    });
}


