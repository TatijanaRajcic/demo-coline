var cart = document.querySelector('#cart tbody');
var calc = document.getElementById('calc');

function updateSubtot(product) {
  var price = Number(product.querySelector(".pu span").innerText)
  var quantity = Number(product.querySelector(".qty input").value)
  var subTotal = price*quantity
  product.querySelector(".subtot span").innerText = subTotal
  return subTotal
}

function calcAll() {
  let total = document.querySelector("h2 span")
  let numTotal = 0
  var products = document.querySelectorAll(".product")
  products.forEach(function(product){
    numTotal += updateSubtot(product)
  })
  // products.forEach(product => {updateSubtot(product)})
  total.innerText = numTotal
}

calc.onclick = calcAll;


// Je rajoute un event listener à chaque bouton delete existant !
function addEventListenersToDeleteButtons() {
  var dltButtons = document.querySelectorAll(".btn-delete")
  dltButtons.forEach(dltButton => {
    dltButton.onclick = deleteProduct
  })
}

function deleteProduct(e) {
  e.target.parentElement.parentElement.remove()
  calcAll()
}

addEventListenersToDeleteButtons()

// Deuxième version
// var dltButtons = document.querySelectorAll(".btn-delete")
// dltButtons.forEach(dltButton => {
//   dltButton.onclick = function deleteProduct(e) {
//     console.log(e)
//   }
// })

var createButton = document.getElementById("create")

createButton.onclick = createNewProduct

function createNewProduct() {
  var newLine = document.createElement("tbody")
  document.getElementById("cart").insertBefore(newLine, document.querySelector("tfoot"))
  newLine.innerHTML = `<tr class="product">
                        <td class="name">
                          <span>${document.getElementById("new-name").value}</span>
                        </td>

                        <td class="pu">
                          $<span>${document.getElementById("new-price").value}</span>
                        </td>

                        <td class="qty">
                          <label>
                            <input type="number" value="0" min="0">
                          </label>
                        </td>

                        <td class="subtot">
                          $<span>0</span>
                        </td>

                        <td class="rm">
                          <button class="btn btn-delete">Delete</button>
                        </td>
                      </tr>`
  newLine.querySelector(".btn-delete").onclick = deleteProduct
  newLine.querySelector(".qty input").oninput = updatePrice
}


function addEventListenersToInputs() {
  var inputFields = document.querySelectorAll(".qty input")
  inputFields.forEach(inputField => {
    inputField.oninput = updatePrice
  })
}

function updatePrice(e) {
  updateSubtot(e.target.closest(".product"))
}

addEventListenersToInputs()