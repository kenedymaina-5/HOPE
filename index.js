window.onload = function(){
	//cart box
	const iconShopping = document.querySelector('.iconShopping');
	const cartCloseBtn = document.querySelector('.fa-close');
	const cartBox = document.querySelector('.cartBox');

	
	iconShopping.addEventListener("click",function(){
		cartBox.classList.add('active');
	});
	cartCloseBtn.addEventListener("click",function(){
		cartBox.classList.remove('active');
	});


	// adding data to localstorage
	const attToCartBtn = document.getElementsByClassName('attToCart');
	let items = [];
	for(let i=0; i<attToCartBtn.length; i++){
		attToCartBtn[i].addEventListener("click",function(e){
			if(typeof(Storage) !== 'undefined'){
				let item = {
						id:i+1,
						name:e.target.parentElement.children[0].textContent,
						price:e.target.parentElement.children[1].children[0].textContent,
						no:1
					};
				if(JSON.parse(localStorage.getItem('items')) === null){
					items.push(item);
					localStorage.setItem("items",JSON.stringify(items));
					window.location.reload();
				}else{
					const localItems = JSON.parse(localStorage.getItem("items"));
					localItems.map(data=>{
						if(item.id == data.id){
							item.no = data.no + 1;
						}else{
							items.push(data);
						}
					});
					items.push(item);
					localStorage.setItem('items',JSON.stringify(items));
					window.location.reload();
				}
			}else{
				alert('local storage is not working on your browser');
			}
		});
	}
	

	//adding cartbox data in table
	const cardBoxTable = cartBox.querySelector('table');
	let tableData = '';
	tableData += '<tr><th>S no.</th><th>Item Name</th><th>Item No</th><th>item Price</th><th></th></tr>';
	if(JSON.parse(localStorage.getItem('items'))[0] === null){
		tableData += '<tr><td colspan="5">No items found</td></tr>'
	}else{
		JSON.parse(localStorage.getItem('items')).map(data=>{
			tableData += '<tr><th>'+data.id+'</th><th>'+data.name+'</th><th>'+data.no+'</th><th>'+data.price+'</th><th><a href="#" onclick=Delete(this);>Delete</a></th></tr>';
		 
		});
	}
	cardBoxTable.innerHTML = tableData;
	function addItemToCart(title, price, imageSrc) {
		var cartRow = document.createElement('div')
		cartRow.classList.add('cart-row')
		var cartItems = document.getElementsByClassName('cartBox')[0]
		var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
		for (var i = 0; i < cartItemNames.length; i++) {
			if (cartItemNames[i].innerText == title) {
				alert('This item is already added to the cart')
				return
			}
		}
		var cartRowContents = `
			<div class="cart-item cart-column">
				<img class="cart-item-image" src="${imageSrc}" width="100" height="100">
				<span class="cart-item-title">${title}</span>
			</div>
			<span class="cart-price cart-column">${price}</span>
			<div class="cart-quantity cart-column">
				<input class="cart-quantity-input" type="number" value="1">
				<button class="btn btn-danger" type="button">REMOVE</button>
			</div>`
		cartRow.innerHTML = cartRowContents
		cartItems.append(cartRow)
		cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
		cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
	}
	
}
